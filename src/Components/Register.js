import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchUserData } from "../util";
import "./RegisterLogin.css";

const Register = ({setToken, setIsLoggedIn, isLoggedIn, setCurrentUser}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCredentialsError, setShowCredentialsError] = useState(false);
    const [registerError, setRegisterError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
      if (isLoggedIn) navigate("/account")
    }, []);

    const createAccount = async (event) => {
      event.preventDefault();
      const response = await fetch("https://fitnesstrac-kr.herokuapp.com/api/users/register", {
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
      console.log(response);
      const result = await response.json();
      console.log(result);
      const token = result.token;
      setToken(token);
      setIsLoggedIn(true);
      const userData = await fetchUserData(token);
      setCurrentUser(userData.data);
      navigate("/account");
    } else {
      console.error;
      const errorMessage = "login" && "Username already taken."
      setRegisterError(errorMessage);
      setShowCredentialsError(true);
    }
  }

    return <>
    <h1 className="pageName">REGISTER</h1>
      <form onSubmit={createAccount} className="registerLoginForm">
        <input type="text" value={username} id="username" placeholder="username" minLength="8" onChange={
          (event) => {setUsername(event.target.value)}} required/>
        <input type="password" value={password} id="password" placeholder="password" minLength="8" onChange={
          (event) => {setPassword(event.target.value)}} required/>
        <input type="password" value={confirmPassword} id="confirm_password" name= "confirm_password" placeholder="confirm password" onChange={
          (event) => {setConfirmPassword(event.target.value)}} required/>
        {password !== confirmPassword && <div>Passwords do not match</div>}
        { showCredentialsError ? <div className="error">{registerError}</div> : null }
        <button type="submit">Create Account</button>
      </form>
    </>
}

export default Register;