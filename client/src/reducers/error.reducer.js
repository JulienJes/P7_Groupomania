import { GET_POST_ERRORS } from "../actions/post.actions";
import { GET_USER_ERRORS } from "../actions/user.actions";

const initialState = {userError: [], postError: []};

function errorReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POST_ERRORS:
            return {
                postError: action.payload,
                userErrors: []
            }
        case GET_USER_ERRORS:
            return {
                userError: action.payload,
                postError: []
            }
        default:
            return state;
    }
}

export default errorReducer;