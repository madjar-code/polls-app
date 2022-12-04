import { useState, useEffect } from "react";

import styled from "styled-components";
import APIService from "../API/APIService";
import Navbar from "../components/Navbar";


const Container = styled.div`
  height: 100vh;  
  background-color: #FCFCFC;
`

const PageLabel = styled.h1`
  opacity: 0.7;
  font-size: 25px;
  margin-top: 45px;
  text-align: center;
`

const Grid = styled.div`
  width: 770px;
  position: relative;
  left: 50%;
  margin-left: -385px;
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(4, 170px);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
`

const ProfileItem = styled.div`
  background-color: #FFF;
  height: 175px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`

const Color = styled.div`
  margin-top: 15px;
  margin-left: 35px;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  background-color: ${props => props.bgc};
`

const Text = styled.div`
  width: 170px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  margin-top: 7.5px;
`



const AllProfiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    APIService.getAllProfiles(setProfiles)
  }, [])

  return (
    <Container>
      <Navbar/>
      <PageLabel>ВСЕ ПОЛЬЗОВАТЕЛИ</PageLabel>
      <Grid>
        {profiles.map((profile, index) => (
          <ProfileItem key={index}>
            <Color bgc={profile?.background_color}/>
            <Text>{ profile?.username }</Text>
            <Text>{ profile?.ncs }</Text>
          </ProfileItem>
        ))}
      </Grid>
    </Container>
  )
};

export default AllProfiles;
