import './Login.css'
import Home from '../assets/home-img.jpg'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/devicelist");
  }

  return (
    <div className='loginpage'>
      <table style={{width:'100%'}}>
        <tbody>
        <tr>
          <th style={{width:'50%'}}>
            <div className='form'>
              <h1>Device Scheduler</h1>
              <p>Please enter the credentials.</p>
              <div className='fields'>
              <Form.Floating className="mb-3">
              <Form.Control
                id="name"
                type="email"
                placeholder="name@example.com"
              />
                <label htmlFor="name">Email address</label>
              </Form.Floating>
              <Form.Floating className="mb-3">
              <Form.Control
                id="pass"
                type="password"
                placeholder="abcd1234"
              />
                <label htmlFor="pass">Password</label>
              </Form.Floating>
              <Button variant="outline-secondary" onClick={()=>handleLogin()}>LOGIN</Button>
              </div>
            </div>
          </th>
          <th className='home-img'>
            <img src={Home} alt='img'></img>
          </th>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Login