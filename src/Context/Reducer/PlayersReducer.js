import { GET__PLAYERS } from "../action.type";

export default (state, action) => {
    switch (action.type) {
        case GET__PLAYERS:
            return action.payload;
        default:
            return state;
    }
}