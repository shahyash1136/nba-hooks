import React, { useContext } from 'react';
import { TeamsContext } from '../../Context/TeamsContext/TeamsContext';
import Team from "../../Components/Team/Team";
import Loader from '../../Components/Loader/Loader';

const Teams = () => {
    const { teamsList } = useContext(TeamsContext);
    const { data } = teamsList;
    let markup;
    if (data === undefined) {
        markup = <Loader />
    } else {
        markup = data.map(team => {
            return <Team teamData={team} key={team.id} />
        })
    }
    return (
        <div>
            {markup}
        </div>
    )
}
export default Teams;
