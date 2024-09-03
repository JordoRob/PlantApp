const jwt = require("jsonwebtoken")
const db = require(__dirname + "/config/db.config.js");
require("dotenv").config();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwtKey = process.env.JWT_SECRET;
const jwtExpirySeconds = 300

const signIn = async (req, res) => {
    let user_id=0;
	// Get credentials from JSON body
	const { email, password } = req.body
	if (email && password) {
        const row = await db.query('SELECT id, password FROM users WHERE email=$1::text',[email]);
            if(row.rows.length>0){
				bcrypt.compare(password, row.rows[0].password, (err, result) => {
					if (err) {
						res.status(500).send("Error comparing passwords");
						return;
					}
				});

                if(result){
                    user_id=row.rows[0].id;
                }else{
                    return res.status(401).json({ message: 'Password is incorrect'})
                }
        console.log(user_id);
		// return 401 error is username or password doesn't exist, or if password does
		// not match the password in our records
		
	}else{
        return res.status(401).json({ message: 'User does not exist'})

    }

	// Create a new token with the username in the payload
	// and which expires 300 seconds after issue
	const token = jwt.sign({ user_id : user_id, email : email }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	})
	console.log("token:", token)

	// set the cookie as the token string, with a similar max age as the token
	// here, the max age is in milliseconds, so we multiply by 1000
	res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true })
	res.status(200).json({ message: 'success', token })
}
}
const auth = (req, res) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).end()
    }

    var payload
    try {
        payload = jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end()
        }
        return res.status(400).end()
    }
    res.status(200).json({ user_id: payload.user_id, email : payload.email, message: 'success'})
}

const refresh = (req, res) => {
	// (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
	const token = req.cookies.token

	if (!token) {
		return res.status(401).end()
	}

	var payload
	try {
		payload = jwt.verify(token, jwtKey)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
		return res.status(400).end()
	}
	// (END) The code uptil this point is the same as the first part of the `welcome` route

	// We ensure that a new token is not issued until enough time has elapsed
	// In this case, a new token will only be issued if the old token is within
	// 30 seconds of expiry. Otherwise, return a bad request status
	const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
	if (payload.exp - nowUnixSeconds > 30) {
		return res.status(400).end()
	}

	// Now, create a new token for the current user, with a renewed expiration time
	const newToken = jwt.sign({ username: payload.username }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	})

	// Set the new token as the users `token` cookie
	res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 })
	res.end()
}
const logout = (req, res) => {
    res.cookie('token', '', { maxAge: 0 })
    res.end()
  }


  const register = async (req, res) => {
    const { email, username, password } = req.body
    const row = await db.query('SELECT * FROM users WHERE email=$1::text',[email]);
    if(row.rows.length>0){
        return res.status(401).end()
    }
	bcrypt.genSalt(saltRounds, (err, salt) => {
		if (err) {
			res.status(500).send("Error hashing password");
			return;
		}});
	bcrypt.hash(password, salt, (err, hash) => {
		if (err) {
			res.status(500).send("Error hashing password");
			return;
		}});

    const result = await db.query('INSERT INTO users (email, username, password) VALUES ($1::text, $2::text, $3::text) RETURNING id',[email, username, hash]);
    
    const user_id = result.rows[0].id;
    const token = jwt.sign({ user_id }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	})
	console.log("token:", token)

	// set the cookie as the token string, with a similar max age as the token
	// here, the max age is in milliseconds, so we multiply by 1000
	res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
	res.end()
}

module.exports = { signIn, refresh, auth, logout, register };