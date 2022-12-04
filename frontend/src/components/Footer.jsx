import styled from 'styled-components'


const Container = styled.footer`
  height: 50px;
  margin-top: 80px;
  padding-bottom: 100px;
`

const TopPart = styled.div`
  display: grid;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  grid-template-columns: 1fr 500px 1fr;
  height: 60px;
  background-color: var(--front-color);
`

const LeftLabel = styled.p`
  opacity: 0.7;
  font-weight: 500;
  text-align: right;
  margin-right: 40px;
  margin-top: 17.5px;
  font-size: 18px;
`

const RightLabel = styled.p`
  opacity: 0.7;
  font-weight: 500;
  margin-top: 7.5px;
  font-size: 16px;
`

const BottomPart = styled.div`
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`

const Footer = () => {
  return (
    <Container>
      <TopPart>
        <LeftLabel>Footer Content</LeftLabel>
        <RightLabel>
          Тестовый проект - сайт с опросами.
          Автор проекта - Маджар Иван Петрович.
          Почта evanmadjar@gmail.com
        </RightLabel>
      </TopPart>
      <BottomPart>
        © 2022 Copyright: mad-blog07.herokuapp.com
      </BottomPart>
    </Container>
  )
};

export default Footer;
