import { GET__AVERAGE, GET__GAMES, GET__PLAYERS, GET__STATS, GET__TEAMS } from "./action.type";

export default (state, action) => {
    switch (action.type) {
        case GET__TEAMS:
            return action.payload;
        case GET__GAMES:
            return action.payload;
        case GET__PLAYERS:
            return action.payload;
        case GET__STATS:
            return action.payload;
        case GET__AVERAGE:
            return action.payload;
        default:
            return state;
    }
}