import { useState, useEffect, useContext } from 'react'

import styled from 'styled-components'

import Navbar from '../components/Navbar'
import PollItem from '../components/PollItem'
import APIService from '../API/APIService'
import AuthContext from '../context/AuthContext'


const Container = styled.div`
  height: 100vh;
  background-color: ${props => props.bgc};
`

const PageLabel = styled.h1`
  opacity: 0.7;
  font-size: 25px;
  margin-top: 45px;
  text-align: center;
`

const UserInfoContainer = styled.div`
  position: relative;
  left: 50%;
  margin-top: 30px;
  margin-left: -460px;
  border-radius: 10px;
  width: 920px;
  height: 40px;
  background-color: #FFF;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
`

const UserInfoWrapper = styled.div`
  height: 40px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const UserInfoItem = styled.div`
`

const UserInfoLabel = styled.span`
  opacity: 0.7;
  font-weight: 700;
`

const UserData = styled.span`
  font-weight: 700;
`

const LocalLabel = styled.h2`
  text-align: center;
  font-size: 20px;
  margin-top: 70px;
  opacity: 0.7;
`

const Grid = styled.div`
  width: 920px;
  position: relative;
  left: 50%;
  margin-left: -460px;
  margin-top: 25px;
  display: grid;
  grid-template-columns: 450px 450px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`

const ChangeColorContainer = styled.div`
  position: fixed;
  padding: 10px;
  box-sizing: content-box;
  background-color: #FFF;
  right: 5px;
  bottom: 5px;
  display: flex;
  width: 220px;
  height: 50px;
  border-radius: 15px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
`

const ChangeColorButton = styled.button`
  width: 100px;
  background-color: white;
  border: 2px solid #00C200;
  color: #00C200;
  font-weight: 600;
  border-radius: 15px;
  margin-right: 5px;

  &:hover {
    cursor: poiner;
    transition: 500ms;
    color: #FFF;
    background-color: #00C200;
  }
`

const ColorItem = styled.div`
  margin-top: 6.75px;
  margin-right: 5px;
  width: 40px;
  height: 37.5px;
  text-align: center;
  padding-top: 9px;
  background-color: ${props => props.bgc};
  border-radius: 20px;
  font-weight: 600;
  outline: 2px solid black;
  scale: ${props => props.scale};

  &:hover {
    scale: 1.05;
    cursor: pointer;
    transtion: 500ms;
  }
`

const COLORS = ['#FCFCFC', '#E6FFF1', '#FDE6FF']


const Profile = () => {
  let [currentUser, setCurrentUser] = useState(null)
  let [targetColor, setTargetColor] = useState(null)
  let [polls, setPolls] = useState([])
  let { authTokens } = useContext(AuthContext)

  useEffect(() => {
    APIService.getCurrentUser(setCurrentUser, authTokens)
    APIService.getPollsForCurrentUser(setPolls, authTokens)
  }, [])

  const handleClick = (color) => {
    const credentials = {'color': color}
    APIService.changeColor(credentials, authTokens)
    window.location.reload()
  }

  return (
    <Container bgc={currentUser?.background_color}>
      <Navbar/>
      <PageLabel>МОЙ ПРОФИЛЬ</PageLabel>

      <UserInfoContainer>
        <UserInfoWrapper>
          <UserInfoItem>
            <UserInfoLabel>username: </UserInfoLabel>
            <UserData>{ currentUser?.username }</UserData>
          </UserInfoItem>
          <UserInfoItem>
            <UserInfoLabel>email: </UserInfoLabel>
            <UserData>{ currentUser?.email }</UserData>
          </UserInfoItem>
          <UserInfoItem>
            <UserInfoLabel>количество валюты: </UserInfoLabel>
            <UserData>{ currentUser?.valuta }</UserData>
          </UserInfoItem>
        </UserInfoWrapper>
      </UserInfoContainer>

      <LocalLabel>ВАШИ ОПРОСЫ</LocalLabel>
      <Grid>
        {polls.map((poll, index) => (
          <PollItem poll={poll} key={index}/>
        ))}
      </Grid>

      <ChangeColorContainer>
        <ChangeColorButton
          onClick={() => handleClick(targetColor)}
        >
          СМЕНИТЬ ФОН
        </ChangeColorButton>
        {
          COLORS.map((color, index) => {
            let scale = 1.0
            if (targetColor == color) {
              scale = 1.1
            }

            return (
              <ColorItem
                bgc={color}
                scale={scale}
                onClick={() => setTargetColor(color)}
              >
                3
              </ColorItem>
            )
          })
        }
      </ChangeColorContainer>
    </Container>
  )
};

export default Profile;
