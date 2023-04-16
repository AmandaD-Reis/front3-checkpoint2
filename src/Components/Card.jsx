import { Link } from "react-router-dom";
import { useTheme } from "../context/useTheme";
import styles from "./Card.module.css";

const Card = (props) => {

  const {theme} = useTheme()

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`card-${theme} ${styles.cardStyle}`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${styles.CardBody}`}>
          {/* Na linha seguinte o link deverá utilizar a matricula, nome e sobrenome do dentista
          que vem da API */}
           <a href={`/dentist/MatriculaDoDentista`}>
            {<Link to={`/dentista/${props.data.matricula}`}>
              <h5 className={`card-title ${styles.title}`}>{props.data.nome} {props.data.sobrenome}</h5>
            </Link>}
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;
