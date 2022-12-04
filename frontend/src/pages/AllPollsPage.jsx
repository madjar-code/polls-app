import { useState, useEffect } from "react";

import styled from "styled-components";
import APIService from "../API/APIService";
import Footer from "../components/Footer";

import Navbar from "../components/Navbar";
import PollItem from "../components/PollItem";


const Container = styled.div`
  height: 100vh;
  background-color: #FCFCFC;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const PageLabel = styled.h1`
  opacity: 0.7;
  font-size: 25px;
  margin-top: 45px;
  text-align: center;
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


const AllPollsPage = () => {
  let [polls, setPolls] = useState([])

  useEffect(() => {
    APIService.getPolls(setPolls)
  }, [])

  return (
    <Container>
      <Navbar/>
      <div>
      <PageLabel>ВСЕ ОПРОСЫ</PageLabel>

      <Grid>
        {polls.map((item, index) => (
          <PollItem poll={item} key={index}/>
        ))}
      </Grid>
      </div>
      <Footer/>
    </Container>
  )
};

export default AllPollsPage;
