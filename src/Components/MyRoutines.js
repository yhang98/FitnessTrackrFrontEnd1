import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { fetchPublicRoutinesFeaturingActivity, fetchPublicRoutinesByUser, deleteUserRoutine, updateMyRoutine } from "../util"
import "./Routines.css"

const MyRoutines= ({token, isLoggedIn}) => {
    const [routines, setRoutines] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("searchTerm")

    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn) navigate("/login")
    },[])

    // OPTION 1:
    //      Filter through Routines.js, outputting only the users' posts
    // OPTION 2:
    //      Copy all of Routines.js and filter only the users' posts.

    return <>
    <h1 className="pageName"> My Routines! </h1>
    </>
}

export default MyRoutines;