import React from 'react';
import './Game.scss';
import vsSvg from '../../assets/images/vs.svg';

export default function Game({ gamedata }) {
    let winATeam, winBTeam, option, newDate, gameStatus, awayTeamScore, homeTeamScore;


    const { home_team_id, home_team_score, period, visitor_team_id, visitor_team_score, status, time, date } = gamedata;

    option = { year: 'numeric', month: 'short', day: 'numeric' };

    newDate = new Date(date).toLocaleString(undefined, option);


    if (period === 0) {
        gameStatus = '';
        awayTeamScore = '';
        homeTeamScore = '';
    } else if (period === 4 && status === 'Final') {
        gameStatus = 'FT';
        awayTeamScore = visitor_team_score;
        homeTeamScore = home_team_score;
    } else {
        gameStatus = 'Live'
        awayTeamScore = visitor_team_score;
        homeTeamScore = home_team_score;
    }




    winATeam = home_team_score > visitor_team_score ? 'si-win' : '';
    winBTeam = visitor_team_score > home_team_score ? 'si-win' : '';


    return (
        <div className="fixtures__box">
            <div className="fixtures__boxHead">
                <div className="fixtures__date">
                    <span>{newDate}</span>
                </div>
                <div className="fixtures__status">
                    <span>{gameStatus}</span>
                </div>
            </div>
            <div className="fixtures__container">
                <div className="fixtures__content team__A">
                    <div className="team__name">
                        <span className="fullName">Team Name</span>
                        <span className="shortName">Team Name</span>
                    </div>
                    <div className="team__logo">
                        <img src={require(`../../assets/images/teams/${home_team_id}.png`).default} alt={`team name`} />
                    </div>
                </div>
                <div className="fixtures__content team__vs">
                    <div className={`team__left ${winATeam}`}>
                        <span>{homeTeamScore}</span>
                    </div>
                    <div className="team__center">
                        <div className="vs-svg">
                            <img src={vsSvg} alt='' />
                            <span className="vs-txt">vs</span>
                        </div>
                        <div className="time">
                            <span>{time}</span>
                        </div>
                    </div>
                    <div className={`team__left ${winBTeam}`}>
                        <span>{awayTeamScore}</span>
                    </div>
                </div>
                <div className="fixtures__content team__B">
                    <div className="team__name">
                        <span className="fullName">Team Name</span>
                        <span className="shortName">Team Name</span>
                    </div>
                    <div className="team__logo">
                        <img src={require(`../../assets/images/teams/${visitor_team_id}.png`).default} alt={`team name`} />
                    </div>
                </div>
            </div>
        </div>
    )
}
