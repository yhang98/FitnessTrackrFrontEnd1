import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchUserData } from "../util";
import "./RegisterLogin.css";

const Login = ({setToken, setIsLoggedIn, isLoggedIn, setCurrentUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showCredentialsError, setShowCredentialsError] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/account")
  }, []);

  const submitAccountInfo = async (event) => {
    event.preventDefault();
    const response = await fetch("https://fitnesstrac-kr.herokuapp.com/api/users/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: username,
          password: password,
      })
    })
    if (response.ok) {
      const result = await response.json();
      const token = result.token;
      setToken(token);
      setIsLoggedIn(true);
      const userData = await fetchUserData(token);
      setCurrentUser(userData.username);
      setShowCredentialsError(false);
      navigate("/account");
    } else {
      console.error;
      const errorMessage = "login" ? "Incorrect username and password combination." : "Username already taken."
      setLoginError(errorMessage);
      setShowCredentialsError(true);
    }
  }

    return <>
    <div className="loginForm">
      <form onSubmit={submitAccountInfo} className="registerLoginForm">
      <h1 className="pageName">Login</h1>
        <input type="text" id="username" placeholder="username" minLength="8" onChange={
            (event) => {setUsername(event.target.value)}} required/>
        <input type="password" id="password" placeholder="password" minLength="8" onChange={
            (event) => {setPassword(event.target.value)}} required/>
        { showCredentialsError ? <div className="error">{loginError}</div> : null }
        <button type="submit">Login</button>
        
      </form>

      <div className="registerLink">
        <Link to="/register">Don't have an account? <br /> Sign up!</Link>
      </div>
    </div>
  </>
}

export default Login;