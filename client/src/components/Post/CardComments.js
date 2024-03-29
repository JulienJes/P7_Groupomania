import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import getPosts from '../../actions/post.actions';
import { addComment } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../../utils/Utils";
import EditDeleteComment from "./EditDeleteComment";

function CardComments({ post }) {
    const [text, setText] = useState("");
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleComment = (e) => {
        e.preventDefault();
    
        if (text) {
          dispatch(addComment(post._id, userData._id, text, userData.pseudo))
            .then(() => dispatch(getPosts()))
            .then(() => setText(''));
        } else {
            alert("Veuillez entrer un commentaire");
        }
    }

    return (
        <div className="comments-container">
            {post.comments.map((comment) => {
                return (
                    <div
                        className={
                            comment.commenterId === userData._id
                                ? "comment-container client"
                                : "comment-container"
                        }
                        key={comment._id}>
                        <div className="left-part">
                            <img
                                src={
                                    !isEmpty(usersData[0]) && usersData.map((user) => {
                                            if (user._id === comment.commenterId) {
                                                return user.picture;
                                            } else {
                                                return null;
                                            }
                                        })
                                        .join("")
                                }
                                alt="avatar"
                            />
                        </div>

                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                <span>
                                    {usersData.map((user) => {
                                        if(user._id === comment.commenterId) {
                                        return user.pseudo
                                    }})}
                                </span>
                                </div>
                                <span>{timestampParser(comment.timestamps)}</span>
                            </div>
                            <p>{comment.text}</p>
                            <EditDeleteComment comment={comment} postId={post._id} />
                        </div>
                    </div>
                )
            })}
            {userData._id && (
                <form action="" onSubmit={handleComment} className="comment-form">
                    <input
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder="Laisser un commentaire"
                    />
                    <br />
                    <input type="submit" value="Envoyer" />
                </form>
            )}
        </div>
    )
}

export default CardComments;