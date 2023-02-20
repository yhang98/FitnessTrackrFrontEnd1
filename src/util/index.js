export const fetchUserData = async (token) => {
  try {
    const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error)
  };
};

export const fetchPublicRoutinesFeaturingActivity = async (activityId) => {
  try {
    await fetch(`https://fitnesstrac-kr.herokuapp.com/api/activities/${activityId}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    }) .then(response => response.json())
    .then(result => {
      console.log(result)
      return result
    })
  } catch (error) {
    console.log("Trouble gathering routines that feature activity", error)
  };
};

export const fetchPublicRoutinesByUser = async (username) => {
  await fetch(`https://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`, {
    headers: {
      "Content-Type": "application/json",
    },
  }) .then(response => response.json())
  .then(result => {
    console.log(result)
    return result
  })
  .catch(console.error);
};

export const updateMyRoutine = async (token, routineId) => {
  const response = await fetch (`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: updatedName,
      goal: updatedGoal
    })
  }).then(response = response.json())
  .then(result => {
    console.log(result);
  })
  .catch(console.error)
};

export const deleteUserRoutine = async (token, routineId) => {
  await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(response => response.json())
  .then(result => {
    console.log(result);
  })
  .catch(console.error);
  };