import { useEffect, useState } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/useTheme";

const DetailCard = () => {

  const [denstista, setDentista] = useState([])
  const [user, setUser] = useState([])
  const params = useParams()
  const {theme} = useTheme()

  useEffect(() => {
    fetch(`http://dhodonto.ctdprojetos.com.br/dentista?matricula=${params.id}`)
      .then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            setDentista(data)
            setUser(data.usuario.username)
          })
        }
        else {
          alert("Dentista não encontrado")
        }
      })

  }, [params]);

  return (
    //As instruções que estão com {''} precisam ser 
    //substituídas com as informações que vem da api
    <>
      <h1>Detail about Dentist {denstista.nome} </h1>
      <section className="card col-sm-12 col-lg-6 container">
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div
          className={`card-body row ${theme}`}
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {denstista.nome}</li>
              <li className="list-group-item">
                Sobrenome: {denstista.sobrenome}
              </li>
              <li className="list-group-item">
                Usuário: {user}
              </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn ${theme} ${styles.button
                  }`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
