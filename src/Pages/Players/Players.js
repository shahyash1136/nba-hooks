import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import Player from '../../Components/Player/Player';
import Loader from "../../Components/Loader/Loader";
import axios from "axios";
import { baseUrl, endpoints } from "../../API/index";
import './Players.scss';

const Players = (props) => {

    let markup, prevDisable, nextDisable, histoy;

    histoy = useHistory();

    const [playersData, setPlayersData] = useState(null);
    const [prevPage, setPrevPage] = useState('');
    const [nextPage, setNextPage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState('');

    const playerJsonData = async () => {
        setNextPage(Number(props.match.params.pageNo) + 1);
        setPrevPage(Number(props.match.params.pageNo) - 1);
        setCurrentPage(props.match.params.pageNo);
        try {
            await axios.get(`${baseUrl}/${endpoints.players}?per_page=40&page=${props.match.params.pageNo}`)
                .then(res => {
                    setPlayersData(res.data);
                });
            setLoader(true);
        } catch (error) {
            console.error(error);
        }
    }

    const playerSearchData = async () => {
        setNextPage(Number(props.match.params.pageNo) + 1);
        setPrevPage(Number(props.match.params.pageNo) - 1);
        setCurrentPage(props.match.params.pageNo);
        try {
            await axios.get(`${baseUrl}/${endpoints.players}?per_page=40&page=${props.match.params.pageNo}&search=${search}`)
                .then(res => {
                    setPlayersData(res.data);
                });
            setLoader(true);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setLoader(false);
        if (search === '') {
            playerJsonData();
        } else {
            playerSearchData();
        }
    }, [prevPage, nextPage, search])

    /*     useEffect(() => {
            setLoader(false);
        }, [prevPage, nextPage, search]) */


    if (loader) {
        const { data, meta } = playersData;
        markup = data.map(player => {
            return <Player playerData={player} key={player.id} />
        })
        prevDisable = Number(currentPage) !== 1 ? '' : 'disable';
        nextDisable = meta.next_page !== null ? '' : 'disable';
    } else {
        markup = <Loader />
    }


    return (
        <div className="players">
            <div className="main__container">
                <div className="top">
                    <div className="btnBox pagination">
                        <Link to={`/players/${prevPage}`} onClick={() => setPrevPage(prevPage - 1)} className={`btn btnPre ${prevDisable}`}>
                            <span>Previous</span>
                        </Link>
                        <Link to={`/players/${nextPage}`} onClick={() => setNextPage(nextPage + 1)} className={`btn btnNext ${nextDisable}`}>
                            <span>Next</span>
                        </Link>
                    </div>
                    <div className="searchBox">
                        <input type="text" name="" className="searchPlayer" onChange={(e) => setSearch(e.target.value)} />
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
