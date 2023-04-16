import { useEffect } from "react";
import { useState } from "react";
import Card from "../Components/Card";

const Home = () => {

  const [dentistas, setDentistas] = useState([])

  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
    fetch("https://dhodonto.ctdprojetos.com.br/dentista")
    .then(response => {
      if(response.status === 200) {
        response.json().then(data => {
          setDentistas(data)
        })
      } else {
        alert("Erro! por favor, tente mais tarde")
      }
    })
  
}, []);

  return (
    <>
      <h1>Home</h1>
    <div className="card-grid container">
      {
        dentistas.map(
          (dentista) => (
            <Card key={dentista.matricula} data={dentista} />
          ))
      }

    </div>
    </>
  );
};

export default Home;
