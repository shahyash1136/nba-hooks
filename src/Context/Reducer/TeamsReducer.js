import { GET__TEAMS } from "../action.type";

export default (state, action) => {
    switch (action.type) {
        case GET__TEAMS:
            return action.payload;
        default:
            return state;
    }
}