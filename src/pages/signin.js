import React, { useState, useEffect } from "react";
import { isEmailValid, isPasswordValid } from "../util/validation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/API";
import styled from "styled-components";

const SigninContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SigninTitle = styled.h1`
  font-size: 1.8em;
  text-align: center;
  margin-bottom: 0.8em;
`;

const SigninForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px dashed #577d86;
  padding-top: 40px;
`;

const SigninInput = styled.input`
  background-color: white;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1.5px solid #577d86;
  font-size: 16px;
  :focus {
    outline: none;
    border-color: #9cb4cc;
  }
`;

const SigninLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
`;

const SigninButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #577d86;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f2d7d9;
    color: black;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;
const ToSignupButton = styled.button`
  width: 4.5rem;
  height: 2rem;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  background-color: #d3cedf;
  font-size: 16px;
  cursor: pointer;
`;

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (
      token &&
      (window.location.pathname === "/signin" ||
        window.location.pathname === "/signup")
    ) {
      navigate("/todo");
    } else if (
      !token &&
      window.location.pathname !== "/signin" &&
      window.location.pathname !== "/signup"
    ) {
      navigate("/signin");
    }
  }, [navigate]);

  const isFormValid = () => {
    return isEmailValid(email) && isPasswordValid(password);
  };

  const handleSignIn = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, {
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      alert("로그인 되었습니다. 환영합니다.");
      navigate("/todo");
      window.location.reload(); // todo 에서 빈배열이 먼저 뜨는 것을 막기위함
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    handleSignIn(email, password);
  }

  return (
    <SigninContainer>
      <SigninTitle>로그인</SigninTitle>
      <SigninForm onSubmit={handleSubmit}>
        <SigninLabel htmlFor="email">Email:</SigninLabel>
        <SigninInput
          type="email"
          id="email"
          data-testid="email-input"
          placeholder="올바른 이메일 형식 입력"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <SigninLabel htmlFor="password">Password:</SigninLabel>
        <SigninInput
          type="password"
          id="password"
          data-testid="password-input"
          placeholder="8자리 이상 입력"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <SigninButton
          type="submit"
          onClick={handleSubmit}
          disabled={!isFormValid()}
          data-testid="signin-button"
        >
          로그인
        </SigninButton>
      </SigninForm>
      <ToSignupButton onClick={() => navigate("/signup")}>
        회원가입
      </ToSignupButton>
    </SigninContainer>
  );
}

export default SignIn;
