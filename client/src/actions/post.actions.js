import axios from 'axios';

//posts
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

//comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT"

export default function getPosts(num) {
    return(dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`)
            .then((res) => {
                const array = res.data.slice(0, num)
                dispatch({ type: GET_POSTS, payload: array })
            })
            .catch((error) => console.log(error))
    }
}

export function likePost(postId, userId) {
    return (dispatch) => {
        return axios ({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
            data: { id: userId }
        })
        .then((res) => {
            dispatch({ type: LIKE_POST, payload: { postId, userId }})
        })
        .catch((error) => console.log(error))
    }
}

export function unlikePost(postId, userId) {
    return (dispatch) => {
        return axios ({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
            data: { id: userId }
        })
        .then((res) => {
            dispatch({ type: UNLIKE_POST, payload: { postId, userId }})
        })
        .catch((error) => console.log(error))
    }
}

export function updatePost(postId, message) {
    return (dispatch) => {
        return axios ({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data: { message }
        })
        .then((res) => {
            dispatch({ type: UPDATE_POST, payload: { message, postId }})
        })
        .catch((error) => console.log(error))
    }
}

export function deletePost(postId) {
    return (dispatch) => {
        return axios ({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`
        })
        .then((res) => {
            dispatch({ type: DELETE_POST, payload: { postId }})
        })
        .catch((error) => console.log(error))
    }
}

export function addComment(postId, commenterId, text, commenterPseudo) {
    return(dispatch) => {
        return axios ({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
            data: { commenterId, text, commenterPseudo }
        })
        .then((res) => {
            dispatch({ type: ADD_COMMENT, payload: { postId }})
        })
        .catch((error) => console.log(error))
    }
}

export function editComment (postId, commentId, text) {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
        data: { commentId, text },
      })
        .then((res) => {
          dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
        })
        .catch((err) => console.log(err));
    }
}
  
export function deleteComment (postId, commentId) {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
        data: { commentId },
      })
        .then((res) => {
          dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
        })
        .catch((err) => console.log(err));
    }
}