import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Activities.css";

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("searchTerm");

    const fetchActivities = async () => {
        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/activities`);
            const result = await response.json();
            if (result.error) throw result.error;
            setActivities(result);
        } catch (error) {
            console.log("Trouble gathering activities!". error);
        };
    };

    useEffect(fetchActivities, []);

    const searchActivities = (activity, text) => {
        text = text.toLowerCase();
        const {name, description} = activity;
        for (const field of [name, description]) {
            if(field.toLowerCase().includes(text)) {
                return true;
            }
        }
    }

    const filteredActivities = searchTerm ? activities.filter(activity => searchActivities(activity, searchTerm)) : activities;

    return <>
        <h1 className="pageName"> Activities </h1>
            <div className="facilitate">
                <input className="searchbar" type="text" name="search" placeholder="Search Activities or Descriptions!" value={searchTerm || ""} onChange={(event) => {
                    setSearchParams({searchTerm:event.target.value})
                }}/>
                <Link className="createLink" to="/NewActivity"> Create a New Activity </Link>
            </div>
            <div className="individualActivityContainter">
                { filteredActivities && filteredActivities.length ?
                    filteredActivities.map((activity, id) => {
                        return (
                            <div className="individualActivity animate__animated animate__fadeInLeft" key={id}>
                                <div>
                                    <span><b> Activity: </b><br /><br />{(activity.name).toUpperCase()}<br /></span>
                                    <br />
                                    <span><b> Description: </b><br /><span className="activityDescription">{activity.description}</span></span>
                                </div>
                            </div>
                        )
                    })
                    : null
                }
            </div>
    </>
}

export default Activities;