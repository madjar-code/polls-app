import { useState, useContext } from 'react';
import styled from 'styled-components'

import AuthContext from '../context/AuthContext';


const Container = styled.div`
  height: 100vh;
  background-color: #FCFCFC;
`;

const Wrapper = styled.div`
  padding: 15px 30px;
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
  border: 3px solid #00C200;
  border-radius: 15px;
  font-weight: 500;
  font-size: 16px;
  color: #00C200;
  margin-left: 50px;
  margin-top: 25px;

  &:hover {
    color: #FFF;
    background-color: #00C200;
    transition: 500ms;
  }
`;

const Register = () => {
  let { signupUser } = useContext(AuthContext)
  let [credentials, setCredentials] = useState(
    { username: '', email: '', password: '' }
  )

  const handleEmailChange = (e) => {
    setCredentials({...credentials, email: e.target.value })
  }

  const handleUsernameChange = (e) => {
    setCredentials({...credentials, username: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setCredentials({ ...credentials, password: e.target.value })
  }

  const handleClick = (credentials) => {
    signupUser(credentials)
  }

  return (
    <Container>
      <Wrapper>
        <Title>СОЗДАТЬ АККАУНТ</Title>
        <InputWrapper>
          <Input
            placeholder="username"
            onChange={(e) => handleUsernameChange(e)}/>
          <Input
            placeholder="email"
            onChange={(e) => handleEmailChange(e)}/>
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => handlePasswordChange(e)}/>
        </InputWrapper>
        <Button 
          onClick={() => handleClick(credentials)}
        >
          СОЗДАТЬ
        </Button>
      </Wrapper>
    </Container>
  )
};

export default Register;
