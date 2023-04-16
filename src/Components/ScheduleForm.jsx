import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/useTheme";
import { useToken } from "../context/useToken";
import styles from "./ScheduleForm.module.css";

const ScheduleForm = () => {
  const [denstistas, setDentistas] = useState([])
  const [pacientes, setPacientes] = useState([]);

  const [dentistaMatricula, setDentistaMatricula] = useState("")
  const [pacienteMatricula, setPacienteMatricula] = useState("")
  const [schedule, setSchedule] = useState("")
  const {token} = useToken()
  const navigate = useNavigate()



  useEffect(() => {

    fetch(`http://dhodonto.ctdprojetos.com.br/dentista`)
      .then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            setDentistas(data)
          })
        }
        else {
          alert("Dentistas não encontrado")
        }
      })

  }, []);

  useEffect(() => {

    fetch(`http://dhodonto.ctdprojetos.com.br/paciente`)
      .then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            setPacientes(data.body)
          })
        }
        else {
          alert("Pacientes não encontrado")
        }
      })

  }, []);

  const handleSubmit = (event) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro

    event.preventDefault()



    const body = {
      paciente: {
        matricula: pacienteMatricula
      },
      dentista: {
        matricula: dentistaMatricula
      },
      dataHoraAgendamento: schedule
    }

    const requestHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  }

  const requestConfig = {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(body)
  }

  fetch(`http://dhodonto.ctdprojetos.com.br/consulta`, requestConfig)
  .then(response => {
    if (response.status === 200) {
      response.json().then(data => {
        alert("Consulta marcada com sucesso!")
        navigate("/home")
      })
    }
    else if (response.status === 403) {
      navigate("/contact")
    } else {
      response.text().then(error => {
        alert(error)
      })
    }
  })
  };

  const { theme} = useTheme()

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container${theme}}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select className="form-select" name="dentist" id="dentist" onChange={e => setDentistaMatricula(e.target.value)}>
                {denstistas.map(dentista => (
                  <option key={dentista.nome} value={dentista.matricula}>
                    {`${dentista.nome} ${dentista.sobrenome}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select className="form-select" name="patient" id="patient" onChange={e => setPacienteMatricula(e.target.value)}>
                {pacientes.map(paciente => (
                  <option key={paciente.matricula} value={paciente.matricula}>
                    {`${paciente.nome} ${paciente.sobrenome}`}
                  </option>
                ))}

              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Date
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
                onChange={e => setSchedule(e.target.value)}
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn ${theme} ${styles.button
                }`}
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;