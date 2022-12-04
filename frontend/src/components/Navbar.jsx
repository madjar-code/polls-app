import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import BallotIcon from '@mui/icons-material/Ballot';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import styled from 'styled-components'

import AuthContext from '../context/AuthContext'
import APIService from '../API/APIService';


const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 35px;
  height: 50px;
  background-color: #FFF;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
`

const Logo = styled.h1`
  font-size: 27.5px;

  &:hover {
    cursor: pointer;
  }
`

const Right = styled.span`
  color: blue;
`

const Left = styled.span`
`

const NavLinks = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`

const Link = styled.a`
  text-decoration: none;
  color: black;
  opacity: 0.8;
  font-weight: 600;
  margin-right: 20px;
  font-size: 15px;

  &:hover {
    transition: 500ms;
    cursor: pointer;
    color: blue;
  }
`


const Navbar = () => {
  const navigate = useNavigate()
  const [ currentUser, setCurrentUser] = useState(null)
  const { user, logoutUser, authTokens } = useContext(AuthContext)


  useEffect(() => {
    if (user){
      APIService.getCurrentUser(setCurrentUser, authTokens)
    }
    
  }, [])
  
  return (
    <Container>
      <Logo onClick={() => navigate('/all-polls')}>
        <Left>Polls </Left><Right>App</Right>
      </Logo>
      <NavLinks>
        <Link href='/all-polls'>
          <BallotIcon style={{ height: '20px'}}/>ВСЕ ОПРОСЫ
        </Link>
        <Link href='/all-profiles'>
          <PeopleIcon style={{ height: '20px'}}/>ВСЕ ЛЮДИ
        </Link>
        <Link href='/profile'>
          <PersonIcon style={{ height: '20px'}}/>{currentUser?.username.toUpperCase()}
        </Link>

        { user
        ?
          <Link onClick={logoutUser}>
            <LogoutIcon style={{ height: '20px'}}/>ВЫЙТИ
          </Link>
        :
        <Link href='/login'>
          <LoginIcon style={{ height: '20px'}}/>ВОЙТИ
        </Link>
        }
        
      </NavLinks>
    </Container>
  )
};

export default Navbar;
