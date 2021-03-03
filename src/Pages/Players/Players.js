import React, { useState, useEffect, useContext } from 'react';
import { PlayersContext } from '../../Context/Context/PlayersContext';
import { NavLink } from "react-router-dom";
import Player from '../../Components/Player/Player';
import Loader from "../../Components/Loader/Loader";
import axios from "axios";
import { baseUrl, endpoints } from "../../API/index";
import './Players.scss';

const Players = (props) => {
    const { playersList } = useContext(PlayersContext);

    const [playersData, setPlayersData] = useState({});

    const [prevPage, setPrevPage] = useState('');
    const [nextPage, setNextPage] = useState('');


    const { data } = playersData;


    const nextPageData = async () => {
        const res = await axios.get(`${baseUrl}/${endpoints.players}?per_page=50&page=${props.match.params.pageNo}`);
        const { data } = res;
        setPlayersData(data);
        setNextPage(Number(props.match.params.pageNo) + 1);
    }
    const prevPageData = async () => {
        const res = await axios.get(`${baseUrl}/${endpoints.players}?per_page=50&page=${props.match.params.pageNo}`);
        const { data } = res;

        setPlayersData(data);
        setPrevPage(Number(props.match.params.pageNo) - 1);
    }




    /* const { next_page } = meta; */
    useEffect(() => {
        setPlayersData(playersList);
        nextPageData()
        prevPageData()
    }, [playersData])


    let markup;
    if (!data) {
        markup = <Loader />
    } else {
        markup = data.map(player => {
            return <Player playerData={player} key={player.id} />
        })
    }


    return (
        <div className="players">
            <div className="main__container">
                <div className="top">
                    <div className="btnBox pagination">
                        <NavLink to={`/players/${prevPage}`} className="btn btnPre" data-btn="pre">
                            <span>Previous</span>
                        </NavLink>
                        <NavLink to={`/players/${nextPage}`} className="btn btnNext" data-btn="next">
                            <span>Next</span>
                        </NavLink>
                    </div>
                    <div className="searchBox">
                        <input type="text" name="" className="searchPlayer" />
                    </div>
                </div>
                <div className="playersList__container">
                    {markup}
                </div>
            </div>
        </div>
    )
}

export default Players;
