import { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Navbar from "../components/Navbar";
import APIService from '../API/APIService';
import AuthContext from '../context/AuthContext';


const Container = styled.div`
  height: 100vh;
  background-color: #FCFCFC;
`

const PollContainer = styled.div`
  position: relative;
  left: 50%;
  margin-left: -475px;
  border-radius: 20px;
  width: 950px;
  background-color: #FFF;
  padding: 15px 30px;
  margin-top: 70px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
`

const Date = styled.p`
  opacity: 0.7;
`

const Title = styled.h2`
  margin-top: 20px;
  font-size: 21px;
`

const Description = styled.div`
  margin-top: 15px;
  font-weight: 500;
`

const ChoiceContainer = styled.div`
`

const SubTitle = styled.h4`
  text-align: center;
  margin-top: 35px;
`

const Choices = styled.div`
  margin-top: 10px;
`

const Choice = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  margin-top: 10px;
  height: 45px;
  font-weight: 500;
  font-size: 20px;
  padding-left: 10px;
  padding-top: 8px;
  background-color: ${props => props.backgroundColor};

  &:hover {
    background-color: ${ 
      props => props.backgroundColor == '#FFF'
      ? 'rgba(0, 0, 0, 0.1)' 
      : props.backgroundColor
    };
    cursor: pointer;
  }
`

const Button = styled.button`
  width: 200px;
  height: 30px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 15px;
  background-color: #FFF;
  border: 3px solid #00C200;
  color: #00C200;
  margin-top: 15px;
  position: relative;
  left: 50%;
  margin-left: -100px;

  &:hover {
    background-color: #00C200;
    color: #FFF;
    transition: 500ms;
  }
`

const StatisticContainer = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
`

const StatisticItem = styled.p`
  font-weight: 600;
  opacity: 0.5;
`


const PollPage = () => {
  const params = useParams()
  const pollSlug = params.pollSlug

  let { user, authTokens } = useContext(AuthContext)
  let [poll, setPoll] = useState(null)
  let [isVoted, setIsVoted] = useState(false)
  let [currentVote, setCurrentVote] = useState(null)

  let [voteData, setVoteData] = useState(
    {'user_id': '', 'choice_id': '', 'poll_id': ''}
  )
  let [targetChoice, setTargetChoice] = useState(null)

  useEffect(() => {
    APIService.getOnePoll(
      setPoll, setIsVoted, setCurrentVote, pollSlug, authTokens)
  }, [])

  const vote = () => {
    voteData.user_id = user?.user_id
    voteData.choice_id = targetChoice?.id
    voteData.poll_id = poll?.id
    APIService.vote(voteData)
    window.location.reload()
  }

  return (
    <Container>
      <Navbar/>

      <PollContainer>
        <Date>{poll?.created_at.slice(0, 10)}</Date>
        <Title>{poll?.title.toUpperCase()}</Title>
        <Description>
          {poll?.description}
        </Description>

        {
        !isVoted
        ?
        <ChoiceContainer>
          <SubTitle>НАЖМИТЕ НА ВАШ ВАРИАНТ</SubTitle>
          <Choices>
            {poll?.choices.map((choice, index) => {
              let bgc = '#FFF'
              if (choice === targetChoice) {
                bgc = 'rgba(0, 0, 0, 0.2)'
              }
              return (
                <Choice
                  backgroundColor={bgc}
                  onClick={() => setTargetChoice(choice)}
                  key={index}>
                  {choice?.choice_text}
                </Choice>)
            }
            )}
          </Choices>
          {
            targetChoice
            ? <Button onClick={() => vote(user, poll)}>
                готово!
              </Button>
            : <></>
          }  
        </ChoiceContainer>

        :
        <ChoiceContainer>
          <SubTitle>ВЫ ГОЛОСОВАЛИ В ЭТОМ ОПРОСЕ!</SubTitle>
          <Choices>
            {poll?.choices.map((choice, index) => {
              let bgc = '#FFF'
              if (choice.id === currentVote.choice) {
                bgc = 'rgba(0, 0, 0, 0.2)'
              }
              return (
                <Choice
                  backgroundColor={bgc}
                  key={index}>
                  {choice?.choice_text}
                </Choice>)
            }
            )}
          </Choices>
        </ChoiceContainer>
        }

        <StatisticContainer>
          <StatisticItem>посмотрело: 1000</StatisticItem>
          <StatisticItem>проголосовало: {poll?.number_of_votes}</StatisticItem>
        </StatisticContainer>

      </PollContainer>
    </Container>
  )
};

export default PollPage;
