import React, { useState, useEffect } from "react";

function FetchPlants(){
    const [plants, setPlants] = useState([]);
    useEffect(() => {
      fetch(`https://perenual.com/api/species-list?key=sk-RK2p66525724d42485654&&indoor=1`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          data = data.data;
          setPlants(data);
        });
    }, []);
    return (
      <div>
        <ul>
        {plants.map((plant) => (
            <li>
            <h2>{plant.common_name}</h2>
            <p>{plant.scientific_name}</p>
            </li>
        ))}
        </ul>
      </div>
    );
}
export default FetchPlants;