import React from 'react';
import './Player.scss';
import { NavLink } from 'react-router-dom'

function Player({ playerData }) {
    const { first_name, id, last_name, position, } = playerData;

    let imgUrl;

    try {
        imgUrl = require(`../../assets/images/players/${id}.png`).default
    } catch (error) {
        imgUrl = require('../../assets/images/players/default.png').default
    }
    let playerName = `${first_name} ${last_name}`;
    playerName = playerName.replace(/\s+/g, '-').toLowerCase()
    return (
        <div className="player" id={id}>
            <NavLink to={`/player/${playerName}/${id}`} className="player__container">
                <div className="player__head">
                    <div className="player__img">
                        <img src={imgUrl} alt={`${first_name} ${last_name}`} />
                    </div>
                    <div className="player__team">
                        <img src={require(`../../assets/images/teams/${playerData.team.id}.png`).default} alt="" />
                    </div>
                    <div className="player__pos">
                        <span>{position}</span>
                    </div>
                </div>
                <div className="player__body">
                    <div className="player__firstName">
                        <h2>{first_name}</h2>
                    </div>
                    <div className="player__lastName">
                        <h3>{last_name}</h3>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default Player;