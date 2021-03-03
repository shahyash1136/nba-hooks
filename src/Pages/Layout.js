import React, { useEffect, useReducer } from 'react';
import axios from "axios";
import { baseUrl, endpoints } from "../API/index";
import { TeamsContext } from "../Context/Context/TeamsContext";
import { PlayersContext } from "../Context/Context/PlayersContext";
import TeamsReducer from "../Context/Reducer/TeamsReducer";
import PlayersReducer from "../Context/Reducer/PlayersReducer";
import { GET__PLAYERS, GET__TEAMS } from "../Context/action.type";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Players from "./Players/Players";
import Teams from "./Teams/Teams";
import Games from "./Games/Games";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const Layout = () => {
    let [teamsList, teamsDispatch] = useReducer(TeamsReducer, []);
    let [playersList, playersdispatch] = useReducer(PlayersReducer, []);

    const getTeamsData = async () => {
        try {
            const res = await axios.get(`${baseUrl}/${endpoints.teams}`);
            const { data } = res;
            teamsDispatch({
                type: GET__TEAMS,
                payload: data
            })
        } catch (error) {
            console.error(error);
        }
    }

    const getPlayersData = async () => {
        try {
            const res = await axios.get(`${baseUrl}/${endpoints.players}?per_page=50`);
            const { data } = res;
            playersdispatch({
                type: GET__PLAYERS,
                payload: data,
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTeamsData();
    }, [])
    return (
        <div className="si-main">
            <div className="si-wrapper">
                <Header />
                <TeamsContext.Provider value={{ teamsList, teamsDispatch }}>
                    <PlayersContext.Provider value={{ playersList, playersdispatch }}>
                        <section className="body">
                            <Switch>
                                <Route path='/' exact component={Home} />
                                <Route path='/teams' component={Teams} />
                                <Route path='/players/:pageNo' component={Players} />
                            </Switch>
                        </section>
                    </PlayersContext.Provider>
                </TeamsContext.Provider>
                <Footer />
            </div>
        </div>
    )
}
export default Layout;