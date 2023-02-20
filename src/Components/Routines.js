import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchPublicRoutinesFeaturingActivity, fetchPublicRoutinesByUser, deleteUserRoutine, updateMyRoutine } from "../util";
import "./Routines.css";

const Routines = ({ currentUser, token }) => {
    const [routines, setRoutines] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("searchTerm");

    const fetchRoutines = async () => {
        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines`);
            const result = await response.json();
            if (result.error) throw result.error;
            setRoutines(result);
        } catch (error) {
            console.log("Trouble gathering routines!". error);
        };
    };

    useEffect(fetchRoutines, []);

    const searchRoutines = (routine, text) => {
        text = text.toLowerCase();
        const {name, goal, creatorName} = routine;
        for (const field of [name, goal, creatorName]) {
            if(field.toLowerCase().includes(text)) {
                return true;
            };
        };
    };

    const filteredRoutines = searchTerm ? routines.filter(routine => searchRoutines(routine, searchTerm)) : routines;

    //Logging the proper routines, but the filter is not functioning properly.
    const handleFetchPublicRoutinesFeaturingActivity = async (activityId) => {
        await fetchPublicRoutinesFeaturingActivity(activityId)
        const routinesWithActivities = routines.filter((routine) => activityId === routine.id)
        console.log(routines)
        console.log(activityId)
        setRoutines(routinesWithActivities)
    };

    const handlePublicRoutinesByUser = async (username) => {
        await fetchPublicRoutinesByUser(username)
        const userRoutines = routines.filter((routine) => username === routine.creatorName)
        setRoutines(userRoutines)
    };

    const handleDelete = async (token, routineId) => {
        await deleteUserRoutine(token, routineId)
        const newRoutines = routines.filter((routine) => routineId !== routine.id)
        setRoutines(newRoutines)
    };

    return <>
        <h1 className="pageName"> Routines! </h1>
            <div className="facilitate">
                <input className="searchbar" type="text" name="search" placeholder="Search Routines, Goals, or Creators!" value={searchTerm || ""}  onChange={(event) => {
                    setSearchParams({searchTerm:event.target.value})
                }}/>
                <Link className="createLink" to="/newroutine">Create a New Routine?</Link>
            </div>
            <div className="individualRoutinesContainer"> 
                { filteredRoutines && filteredRoutines.length
                    ? filteredRoutines.map((routine) => {
                    return (
                        <div className="individualRoutines animate__animated animate__fadeInLeft" key={routine.id}>
                            <span><b> Name: </b>{routine.name.toUpperCase()}</span><br />
                            <span><b> Goal: </b>{routine.goal}</span><br />
                            <span><b> Creator: </b>                            
                                <Link to={`${routine.creatorName}/routines`} onClick={(event) => {
                                    event.preventDefault();
                                    const specificCreatorRoutines = handlePublicRoutinesByUser(routine.creatorName)
                                    fetchRoutines(specificCreatorRoutines)
                                }}>{routine.creatorName}</Link></span>
                            {routine.activities.map((activity) => {
                                return (
                                    <div key={activity.id}>
                                        <b>Activity: </b>
                                            <Link to={`${activity.id}/routines`} onClick={(event) => {
                                                event.preventDefault();
                                                const routinesFeaturingActivity = handleFetchPublicRoutinesFeaturingActivity(activity.id)
                                                fetchRoutines(routinesFeaturingActivity);
                                            }}>{activity.name}</Link><br />
                                        <b>Description: </b>{activity.description}<br />
                                        <b>Duration: </b>{activity.duration}<br />
                                        <b>Count: </b>{activity.count}<br />
                                    </div>
                                )
                            })}
                            <div className="userButtons">
                                { currentUser === routine.creatorName ? <button className="deleteButton" onClick={() => handleDelete(token, routine.id)}>Delete</button> : null }
                                { currentUser === routine.creatorName ? <button className="updateButton" onClick={() => updateMyRoutine(token, routine)}>Update</button> : null }
                            </div>
                        </div>
                    )
                    })
                :null
                }
            </div>
    </>
}

export default Routines;