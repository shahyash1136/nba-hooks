import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl, endpoints } from '../../API/index';
import { Radar, Doughnut } from 'react-chartjs-2'
import './PlayerProfile.scss';
import Loader from '../../Components/Loader/Loader';
import Game from '../../Components/Game/Game';


const PlayerProfile = (props) => {
    let year, date, month, currentDate, statsmarkup, chartMarkup, playerData = {}, teamData = {};

    year = new Date().getUTCFullYear();
    date = new Date().getUTCDate();
    month = new Date().getUTCMonth();
    currentDate = `${year}-${month + 1}-${date}`;

    const [playerStats, setPlayerStats] = useState(() => null);
    const [playerAvg, setPlayerAvg] = useState(() => null);
    const [loading, setLoading] = useState(false);
    const [season, setSeason] = useState(year - 1);

    /* const [chartData, setChartData] = useState({}); */





    const { player_ids } = props.match.params;

    const playerStatsData = async () => {
        try {
            await axios(`${baseUrl}/${endpoints.stats}?per_page=100&end_date=${currentDate}&seasons[]=${season}&player_ids[]=${player_ids}`).then(res => {
                setPlayerStats(res.data);
            });
            await axios(`${baseUrl}/${endpoints.season_averages}?season=${season}&player_ids[]=${player_ids}`).then(res => {
                setPlayerAvg(res.data);
            });
            setLoading(true);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setLoading(false)
        playerStatsData();
    }, [season])


    if (loading) {
        const { data } = playerStats;
        const { player, team } = data[0];
        let LastTenGames = [], dateSort, chartData;
        /* chartData = {
            labels: ['MIN', 'PTS', 'REB', 'AST', 'STL', 'BLK', 'FGM', 'FGA', 'FG%', '3PM', '3PA', '3P%', 'FTM', 'FTA', 'FT%', 'OFF', 'DEF', 'TO', 'PF'],
            datasets: [
                {
                    data: [
                        Number(playerAvg.data[0].min),
                        Number(playerAvg.data[0].pts),
                        Number(playerAvg.data[0].reb),
                        Number(playerAvg.data[0].ast),
                        Number(playerAvg.data[0].stl),
                        Number(playerAvg.data[0].blk),
                        Number(playerAvg.data[0].fgm),
                        Number(playerAvg.data[0].fga),
                        Number(playerAvg.data[0].fgperct),
                        Number(playerAvg.data[0].threepm),
                        Number(playerAvg.data[0].threepa),
                        Number(playerAvg.data[0].threepperct),
                        Number(playerAvg.data[0].ftm),
                        Number(playerAvg.data[0].fta),
                        Number(playerAvg.data[0].ftperct),
                        Number(playerAvg.data[0].off),
                        Number(playerAvg.data[0].deff),
                        Number(playerAvg.data[0].turnOver),
                        Number(playerAvg.data[0].pf),

                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                    ]
                }
            ]
        }

        chartMarkup = <Doughnut data={chartData} options={{ aspectRatio: true, title: { display: true, text: `${playerAvg.data[0].season} Season Average`, fontSize: 25 }, }} /> */




        dateSort = data.sort((a, b) => {
            return new Date(b.game.date) - new Date(a.game.date);
        })

        dateSort.slice(0, 10).map(el => {
            LastTenGames.push(el);
        });

        playerData = player;
        teamData = team;
        console.log(player, team)


    } else {
        statsmarkup = <Loader />
    }



    return (
        <div className="playerProfile">
            <div className="playerProfile__data--top">
                <div className="selectBox">
                    <select name="season" value={season} onChange={(e) => setSeason(e.target.value)}>
                        <option value="">Select Season</option>
                        <option value="2020">2020-21</option>
                        <option value="2019">2019-20</option>
                        <option value="2018">2018-19</option>
                        <option value="2017">2017-18</option>
                        <option value="2016">2016-17</option>
                        <option value="2015">2015-16</option>
                        <option value="2014">2014-15</option>
                        <option value="2013">2013-14</option>
                        <option value="2012">2012-13</option>
                        <option value="2011">2011-12</option>
                        <option value="2010">2010-11</option>
                        <option value="2009">2009-10</option>
                        <option value="2008">2008-09</option>
                        <option value="2007">2007-08</option>
                        <option value="2006">2006-07</option>
                        <option value="2005">2005-06</option>
                        <option value="2004">2004-05</option>
                        <option value="2003">2003-04</option>
                        <option value="2002">2002-03</option>
                        <option value="2001">2001-02</option>
                        <option value="2000">2000-01</option>
                        <option value="1999">1999-00</option>
                        <option value="1998">1998-99</option>
                        <option value="1997">1997-98</option>
                        <option value="1996">1996-97</option>
                        <option value="1995">1995-96</option>
                        <option value="1994">1994-95</option>
                        <option value="1993">1993-94</option>
                        <option value="1992">1992-93</option>
                        <option value="1991">1991-92</option>
                        <option value="1990">1990-91</option>
                        <option value="1989">1989-90</option>
                        <option value="1988">1988-89</option>
                        <option value="1987">1987-88</option>
                        <option value="1986">1986-87</option>
                        <option value="1985">1985-86</option>
                        <option value="1984">1984-85</option>
                        <option value="1983">1983-84</option>
                        <option value="1982">1982-83</option>
                        <option value="1981">1981-82</option>
                        <option value="1980">1980-81</option>
                        <option value="1979">1979-80</option>
                    </select>
                </div>
                <div className="playerProfile__left">
                    <div className="playerProfile__details">
                        <div className="playerProfile__name">
                            <span className="firstName">{playerData.first_name}</span>
                            <span className="lastName">{playerData.last_name}</span>
                        </div>
                        <div className="playerProfile__team" dataTeamId={teamData.id}>
                            {/* <img src={require(`../../assets/images/teams/${teamData.id}.png`).default} alt={`${teamData.full_name}`} /> */}
                            <span className="teamName">{teamData.full_name}</span>
                        </div>

                    </div>
                    <div className="playerProfile__img">
                        <img src={require('../../assets/images/players/default.png').default} alt={`${playerData.first_name} ${playerData.last_name}`} />
                    </div>
                </div>
                <div className="playerProfile__right">
                    {chartMarkup}
                </div>



                {/* {statsmarkup} */}
            </div>
        </div>
    )
}

export default PlayerProfile;