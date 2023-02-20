import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Account.css";

const Account = ({isLoggedIn, currentUser}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn) navigate("/login")
    },[]);

    return <>
        <h1 className="pageName">Account Page</h1>
        <h2 className="userWelcome"> Welcome {currentUser} </h2>
        <div className="accountNavigationContainer">
            <div>
                <Link className="userNav newPost" to="/newroutine">Create New Routine</Link>
            </div>
            <div>
                <Link className="userNav myRoutines" to="/myroutines">My Routines</Link>
            </div>
            <div>
                <Link className="userNav newActivity" to="/newactivity">Create New Activity</Link>
            </div>
        </div>
    </>
}

export default Account;