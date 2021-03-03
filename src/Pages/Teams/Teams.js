import React, { useState, useContext } from 'react';
import { TeamsContext } from '../../Context/Context/TeamsContext';
import Team from "../../Components/Team/Team";
import Loader from '../../Components/Loader/Loader';
import Tabs from '../../Components/Tabs/Tabs';

const Teams = () => {

    const { teamsList } = useContext(TeamsContext);
    const { data } = teamsList;
    const [conference, setConference] = useState('west');
    const [conferenceData, setConferenceData] = useState([
        { name: 'West Conference', confer: 'west' },
        { name: 'East Conference', confer: 'east' },]);

    let markup;
    if (data === undefined) {
        markup = <Loader />
    } else {
        markup = data.map(team => {
            if (conference === team.conference.toLowerCase()) {
                return <Team teamData={team} key={team.id} />
            }
        })
    }

    const tabClick = (confer) => {
        setConference(confer);
    }

    let tabMarkup = conferenceData.map(el => {
        return <Tabs key={el.confer} tabValue={el.name} tabDataValue={el.confer} activeTab={conference} tabClick={() => tabClick(el.confer)} />
    })

    return (
        <div className="main__container">
            <ul className="tabs">
                {tabMarkup}
            </ul>
            <div className="teams__box">
                {markup}
            </div>
        </div>
    )
}
export default Teams;
