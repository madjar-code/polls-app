import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CheckIcon from '@mui/icons-material/Check';


const Container = styled.div`
  width: 450px;
  position: relative;
  height: 100px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  background-color: #FFF;

  &:hover {
    transition: 500ms;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`

const Title = styled.p`
  text-align: center;
  padding-top: 7px;
  font-size: 21px;
  font-weight: 500;
`

const DataContainer = styled.div`
  position: absolute;
  bottom: 10px;
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DateItem = styled.div`
  padding-left: 20px;
`

const DateLabel = styled.span`
  opacity: 0.6;
`

const Data = styled.span`
  padding-left: 5px;
  opacity: 0.6;
`

const StatisticContainer = styled.div`
  display: flex;
  padding-right: 20px;
`

const StatisticItem = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
`


const PollItem = ({ poll }) => {
  const navigate = useNavigate()

  return (
      <Container onClick={() => navigate(`/${poll.slug}`)}>
      <Title>
        { poll?.title }
      </Title>
      <DataContainer>
        <DateItem>
          <DateLabel>Дата:</DateLabel>
          <Data>{poll?.created_at.slice(0, 10)}</Data>
        </DateItem>
        <StatisticContainer>
          <StatisticItem>
            <RemoveRedEyeIcon style={{opacity: 0.4, fontSize: '21px'}}/>
            <Data>1000</Data>
          </StatisticItem>
          <StatisticItem>
            <CheckIcon style={{opacity: 0.4, fontSize: '21px'}}/>
            <Data>{ poll?.number_of_votes }</Data>
          </StatisticItem>
        </StatisticContainer>
      </DataContainer>
    </Container>
  )  
};

export default PollItem;
