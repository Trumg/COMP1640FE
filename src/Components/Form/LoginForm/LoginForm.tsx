import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LoginLogo } from "../../../Assets/Image/LoginLogo/LoginLogo";
import { LoginBackground } from "../../../Assets/Image/LoginBackground/LoginBackground";
import GlobalStyles from "../../../Styles/GlobalStyles/GlobalStyles";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const Background = styled.div`
  background: url(${LoginBackground}) no-repeat center center fixed;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormBackground = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  width: 400px;

  @media (max-width: 480px) {
    width: 90%;
    padding: 20px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const Logo = styled.img`
  width: 175px;

  @media (max-width: 480px) {
    width: 150px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  font-size: 16px;
  width: calc(100% - 26px);

  &:focus {
    outline: none;
    border-color: #0078d4;
  }
`;

const SubmitButton = styled.button`
  background-color: #0078d4;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005a9e;
  }
`;

const SignUpText = styled.span`
  color: #000000;
  margin-top: 20px;
`;

const SignUpLink = styled(Link)`
  color: #0078d4;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        // Store the JWT token securely (e.g., local storage)
        localStorage.setItem("token", token);
        console.log("Login successful. Token:", token);
      } else {
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <>
      <GlobalStyles />
      <Background>
        <FormBackground onSubmit={handleLogin}>
          <LogoWrapper>
            <Logo src={LoginLogo} alt="LoginLogo" />
            <Link to="/">
              <CloseIcon />
            </Link>
          </LogoWrapper>
          <Form>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <SubmitButton type="submit">Login</SubmitButton>
            <SignUpText>
              Don't have an account?
              <SignUpLink to="/signup"> Signup</SignUpLink>
            </SignUpText>
          </Form>
        </FormBackground>
      </Background>
    </>
  );
};

export default LoginForm;
