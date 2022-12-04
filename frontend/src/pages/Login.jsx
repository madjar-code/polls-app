import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components'

import AuthContext from '../context/AuthContext';


const Container = styled.div`
  height: 100vh;
  background-color: #FCFCFC;
`;

const Wrapper = styled.div`
  padding: 20px 30px;
  position: relative;
  top: 50%;
  left: 50%;
  margin-left: -180px;
  margin-top: -130px;
  width: 360px;
  height: 260px;
  background-color: #FFF;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const Title = styled.h1`
  font-size: 22.5px;
  text-align: center;
  font-weight: 600;
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  border: none;
  background-color: #F5F5F5;
  border-radius: 10px;
  font-size: 20px;
  margin-top: 15px;
  padding-left: 10px;
`;

const InputWrapper = styled.div`
  margin-top: 10px;
`

const Button = styled.button`
  width: 200px;
  height: 30px;
  background-color: white;
  border: 3px solid blue;
  border-radius: 15px;
  font-weight: 500;
  font-size: 16px;
  color: blue;
  margin-left: 50px;
  margin-top: 25px;

  &:hover {
    color: #FFF;
    background-color: blue;
    transition: 500ms;
  }
`;

const Link = styled.div`
  margin-top: 20px;
  text-align: center;
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }
`;


const Login = () => {
  let { loginUser } = useContext(AuthContext)
  let [credentials, setCredentials] = useState(
    {email: '', password: ''}
  )

  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setCredentials({...credentials, email: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setCredentials({ ...credentials, password: e.target.value })
  }

  const handleClick = () => {
    loginUser(credentials)
  }

  return (
    <Container>
      <Wrapper>
        <Title>ВОЙТИ</Title>
        <InputWrapper>
          <Input
            placeholder="email"
            onChange={(e) => handleEmailChange(e)}/>
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => handlePasswordChange(e)}/>
        </InputWrapper>
        <Button onClick={handleClick}>ВОЙТИ</Button>
        <Link onClick={() => navigate('/register')}>СОЗДАТЬ НОВЫЙ АККАУНТ</Link>
      </Wrapper>
    </Container>
  )
};

export default Login;
