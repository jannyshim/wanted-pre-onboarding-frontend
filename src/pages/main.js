import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  margin-bottom: 0.5em;
  color: #1a5f7a;
`;

const SubTitle = styled.h2`
  font-size: 2em;
  text-align: center;
  margin-bottom: 1em;
  color: #1a5f7a;
`;

const Button = styled.button`
  font-size: 1em;
  color: white;
  background-color: #748da6;
  border: 0.5px solid #748da6;
  border-radius: 7px;
  width: 7rem;
  height: 3rem;
  margin: 0.5rem;
`;

function Main() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>오늘의 TODO</Title>
      <SubTitle>🎉환영합니다🎉</SubTitle>
      <Button onClick={() => navigate("/signin")}>로그인하기</Button>
      <Button onClick={() => navigate("/signup")}>회원가입하기</Button>
    </Container>
  );
}

export default Main;
