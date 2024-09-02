import React from 'react'
import { useEffect, useState }  from 'react'
import axios from 'axios'



function Home(){
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
    axios
    .get('/products')
    .then(res => res.data)
    .then(data => setData(data))
    .then(() => console.log(data));
  }, []);
 

  return (
    <div>
      <ul>
      { data.map(item => (
              <li key={item.product_id}>
                <p>{item.product_id}</p>
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.description}</p>
              </li>
    ))}
  </ul></div>

  )
}

export default Home