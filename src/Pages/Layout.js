import React, { useEffect, useReducer } from 'react';
import axios from "axios";
import { baseUrl, endpoints } from "../API/index";
import { TeamsContext } from "../Context/Context/TeamsContext";
import { PlayersContext } from "../Context/Context/PlayersContext";
import TeamsReducer from "../Context/Reducer/TeamsReducer";
import PlayersReducer from "../Context/Reducer/PlayersReducer";
import { GET__TEAMS } from "../Context/action.type";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Teams from "./Teams/Teams";
import Players from "./Players/Players";
import PlayerProfile from "./PlayerProfile/PlayerProfile";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const Layout = () => {
    let [teamsList, teamsDispatch] = useReducer(TeamsReducer, []);
    let [playersList, playersdispatch] = useReducer(PlayersReducer, {});

    const getTeamsData = async () => {
        try {
            await axios.get(`${baseUrl}/${endpoints.teams}`).then(res => {
                teamsDispatch({
                    type: GET__TEAMS,
                    payload: res.data
                })
            });
        } catch (error) {
            console.error(error);
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
                                <Route exact path='/' component={Home} />
                                <Route path='/teams' component={Teams} />
                                <Route path='/players/:pageNo' component={Players} />
                                <Route path='/player/:playerName/:player_ids' component={PlayerProfile} />
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