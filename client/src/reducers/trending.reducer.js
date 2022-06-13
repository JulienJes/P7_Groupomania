import { GET_TRENDS } from "../actions/post.actions";

const initialState = {};

function trendingReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRENDS:
            return action.payloard;
    default:
        return state;
    }
}

export default trendingReducer;