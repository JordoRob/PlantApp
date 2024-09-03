require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express');
const db = require(__dirname + "/config/db.config.js");
var cors = require('cors');
const { signIn, refresh, auth, logout, register } = require("./handlers");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const app = express();
app.use(bodyParser.json())
app.use(cookieParser())




app.use(cors({ origin: '*' }));

const PORT = process.env.PORT || 9000;

//Functions
// const getPlants =  (req, res) => {
//   db.query('SELECT * FROM plants WHERE user_id=$1::integer',[userId], (error, plants) => {
//     if (error) {
//       throw error
//     }
//     res.status(200).json(plants.rows)

//   })
// }

//Here you can add your routes
//Here's an example
app.get("/", (req, res) => {
    res.send("Hello Mad!");
  });

// app.post('/plants/:userId', getPlants)

app.post('/signin',signIn)
app.post("/refresh", refresh)
app.post("/auth", auth);
app.get("/logout", logout);
app.post("/register", register);
app.listen(PORT, () => {
    console.log(`Server listening on the port  ${PORT}`);
})