import axios from 'axios';

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";

export default function getUser(uid) { //récupération des données utilisateurs à envoyer au reducer
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data})
            })
            .catch((error) => console.log(error));
    }
}

export function uploadPicture(data, id) {
    return(dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/user/upload/`, data)
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${id}/`)
                    .then((rest) => {
                        dispatch({type: UPLOAD_PICTURE, payload: res.data.picture})
                    })
            })
        .catch((error) => console.log(error))
    }
}

export function updateBio(userId, bio) {
    return(dispatch) => {
        return axios({
            method:"put",
            url: `${process.env.REACT_APP_API_URL}apu/user/` + userId,
            data: { bio }
        })
            .then((res) => {
                dispatch({ type: UPDATE_BIO, payload: bio })
            })
            .catch((error) => console.log(error))
    }
}