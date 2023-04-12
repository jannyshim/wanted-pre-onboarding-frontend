import React, { useState, useEffect } from "react";
import { isEmailValid, isPasswordValid } from "../util/validation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/API";
import styled from "styled-components";

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupTitle = styled.h1`
  font-size: 1.8em;
  text-align: center;
  margin-bottom: 0.8em;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px dashed #577d86;
  padding-top: 40px;
`;

const SignupInput = styled.input`
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

const SignupLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
`;

const SignupButton = styled.button`
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

function SignUp() {
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

  const handleSignUp = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (isFormValid()) {
      handleSignUp(email, password);
      navigate("/signin");
    }
  }

  return (
    <SignupContainer>
      <SignupTitle>회원가입</SignupTitle>
      <SignupForm onSubmit={handleSubmit}>
        <SignupLabel htmlFor="email">Email</SignupLabel>
        <SignupInput
          type="email"
          id="email"
          data-testid="email-input"
          placeholder="올바른 이메일 형식 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SignupLabel htmlFor="password">Password</SignupLabel>
        <SignupInput
          type="password"
          id="password"
          data-testid="password-input"
          placeholder="8자리 이상 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SignupButton
          type="submit"
          onClick={handleSubmit}
          disabled={!isFormValid()}
          data-testid="signup-button"
        >
          회원가입
        </SignupButton>
      </SignupForm>
    </SignupContainer>
  );
}

export default SignUp;
