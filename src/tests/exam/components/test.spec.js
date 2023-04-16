import { render, screen } from "../../test-utils"
import Login from '../../../Routes/Login';
import Home from '../../../Routes/Home';
import Navbar from "../../../Components/Navbar";
import ScheduleForm from "../../../Components/ScheduleForm";
import ScheduleFormModal from "../../../Components/ScheduleFormModal";
import DetailCard from "../../../Components/DetailCard";


test('should show login form', async () => {
  render(<Login />)
  expect(screen.getByText('Login')).toBeInTheDocument();
});
test('se o navbar foi renderizado', async () => {
  render (<Navbar />)
  expect(screen.getByText('Dh Odonto')).toBeInTheDocument();
});
test('Se o formulado de agendamento foi Renderizado', async () => {

  render(<ScheduleForm />)

  expect(screen.getByText('Dentist')).toBeInTheDocument()

});
test('Se a home foi Renderizado', async () => {

  render(<Home />)

  expect(screen.getByText('Home')).toBeInTheDocument()

});
test('Se o card de detalhe foi Renderizado', async () => {

  render(<DetailCard />)

  expect(screen.getByText('Detail about Dentist')).toBeInTheDocument()
  expect(screen.getByText('Nome:')).toBeInTheDocument()
  expect(screen.getByText('Sobrenome:')).toBeInTheDocument()
  expect(screen.getByText('Usuário:')).toBeInTheDocument()
});

test('Se o modal de agendamento foi Renderizado', async () => {

  render(<ScheduleFormModal />)

  expect(screen.getByText('Selecione o dentista, paciente e a data e hora')).toBeInTheDocument()

});

test('Tela dos cards - Renderizando de forma correta', () => {

  render(<DetailCard />)

  expect(screen.getByRole('heading',{level: 1})).toBeInTheDocument(); //busca pelo h1
  expect(screen.getByRole('button')).toBeInTheDocument(); //busca pelo botao
});

test('Inputs - validando 2 (1 de login, 1 de password)',() =>{
  
  render(<Login />)

  expect(screen.getByPlaceholderText('Login')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
});