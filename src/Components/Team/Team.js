import React from 'react';
import "./Team.scss";
import { NavLink } from "react-router-dom";
const Team = ({ teamData }) => {
    let name = teamData.full_name;
    name = name.replace(/\s+/g, '-').toLowerCase();
    return (

        <div className="club" data-conference={teamData.conference.toLowerCase()}>
            <NavLink to={`/team/${name}/${teamData.id}/`} className="club__container">
                <div className="club__logo">
                    <img
                        src={require(`../../assets/images/teams/${teamData.id}.png`).default}
                        alt={teamData.full_name} />
                </div>
                <div className="club__name">
                    <span className="fullName">{teamData.full_name}</span>
                </div>
            </NavLink>
        </div>
    )
}

export default Team;