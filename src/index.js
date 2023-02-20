import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Routes, Route, NavLink, BrowserRouter as Router } from "react-router-dom"
import "./index.css";

import {
    Account,
    Activities,
    Home,
    Login,
    MyRoutines,
    NewActivity,
    NewRoutine,
    Register,
    Routines,
} from "./Components"

const App = () => {
    const [token, setToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({})

    useEffect(async () => {
        const savedToken = localStorage.getItem("token")
        if (savedToken) {
            console.log("Hello!");
            setToken(savedToken);
            setIsLoggedIn(true);
            const userData = await fetchUserData (savedToken);
            console.log("Does this work?", userData.data.guest);
            setCurrentUser(userData.data.guest);
        };
      }, []);

    return <>
        <nav className="navigation" title="Gym Workout">
            <h1 className="Logo"> Fitness Tracker </h1>
            <div className="nav-links">
                <NavLink to="/"> Home </NavLink>
                <NavLink to="/routines"> Routines </NavLink>
                <NavLink to="/activities"> Activities </NavLink>
                <div></div>
                { 
                    isLoggedIn ? 
                        <>
                        <NavLink to="/account"> Account </NavLink>
                        <NavLink to="/" onClick={() => {
                            setToken("")
                            setIsLoggedIn(false)
                            setCurrentUser(false)
                        }}>Logout</NavLink>
                        </>
                    : 
                    <>
                        <NavLink to="/login"> Login </NavLink>
                        <NavLink to="/register"> Register </NavLink>
                    </>
                } 
            </div>
        </nav>
        <Routes>
            <Route path="/" exact element={<Home />}/>
            <Route path="/account" element={<Account isLoggedIn={isLoggedIn} currentUser={currentUser}/>}/>
            <Route path="/login" element={<Login setToken={setToken} token={token} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser}/>}/>
            <Route path="/register" element={<Register setToken={setToken} token={token} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser}/>}/>
            <Route path="/routines" element={<Routines token={token} currentUser={currentUser}/>}/>
            <Route path="/myroutines" element={<MyRoutines setToken={setToken} token={token} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser}/>}/>
            <Route path="/activities" element={<Activities />}/>
            <Route path="/newactivity" element={<NewActivity token={token} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser}/>}/>
            <Route path="/newroutine" element={<NewRoutine token={token} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser}/>}/>
            <Route path="/activities/:activityId/routines" element={<Routines />}/>
            <Route path="/routines/:activityId/routines" element={<Routines />}/>
        </Routes>
    </>
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app')
);