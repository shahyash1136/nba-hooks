import React, { useEffect, useReducer } from 'react';
import axios from "axios";
import { baseUrl, endpoints } from "../API/index";
import { TeamsContext } from "../Context/TeamsContext/TeamsContext";
import Reducer from "../Context/Reducer";
import { GET__TEAMS } from "../Context/action.type";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Players from "./Players/Players";
import Teams from "./Teams/Teams";
import Games from "./Games/Games";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const Layout = () => {
    const [teamsList, dispatch] = useReducer(Reducer, []);

    const getTeamsData = async () => {
        try {
            const res = await axios.get(`${baseUrl}/${endpoints.teams}`);
            const { data } = res;
            dispatch({
                type: GET__TEAMS,
                payload: data
            })
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
                <TeamsContext.Provider value={{ teamsList, dispatch }}>
                    <section className="body">
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/teams' component={Teams} />
                            <Route path='/players' component={Players} />
                        </Switch>
                    </section>
                </TeamsContext.Provider>
                <Footer />
            </div>
        </div>
    )
}
export default Layout;