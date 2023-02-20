import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./NewItem.css";

const NewRoutine = ({token, isLoggedIn}) => {
  const blankRoutine = {name: "", goal: ""};
  const [routine, setRoutine] = useState(blankRoutine);
  const navigate = useNavigate();

  useEffect(() => {
      if(!isLoggedIn) navigate("/login")
  },[]);

  const createRoutine = async (event) => {
    event.preventDefault();
    const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/routines", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: routine.name,
        goal: routine.goal,
        isPublic: true
      })
    }) .then(response => response.json())
    .then(result => {
      console.log(result);
      navigate("/routines");
    })
    .catch(console.error);
  }

  return <>
    <h1 className="pageName">Create a new routine!</h1>
    <form  className="createForm" onSubmit={createRoutine}>
      <input type="text" name="name" value={routine.name} placeholder="Name of New Routine" minLength="1" required onChange={(event) => {
        setRoutine({...routine, name: event.target.value})
      }}></input>
      <input type="text" name="goal" value={routine.goal} placeholder="What is the goal?" minLength="1" required onChange={(event) => {
        setRoutine({...routine, goal: event.target.value})
      }}></input>
      <br />
      <button type="submit">Create</button>
    </form>
  </>
}

export default NewRoutine; 