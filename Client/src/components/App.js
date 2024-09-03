import '../styles/App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';


function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
    .post('/plants/1')
    .then(res => res.data)
    .then(data => setData(data));
  }, []);

  return (
    
    <div className='container my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
          <tbody>
            { data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.scientific_name}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table> 
      </div>
  )};

export default App;