import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import getPosts, { addPost } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../../utils/Utils";

function NewPostForm(){
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    //const error = useSelector((state) => state.errorReducer.postError);
    const dispatch = useDispatch();

    
    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    };

    const handlePost = async () => {
        if(message || postPicture) {
            const data = new FormData();
            data.append("posterId", userData._id);
            data.append("message", message);
            if(file) {
                data.append("posts", file);
            }

            await dispatch(addPost(data));
            dispatch(getPosts());
            cancelPost();

        } else {
            alert("Veuillez entrer un message");
        }
    };

    const cancelPost = () => {
        setMessage("");
        setPostPicture("");
        setFile("");
    };

    useEffect(() => {
        if(!isEmpty(userData)) {
            setIsLoading(false);
        }
    }, [userData, message])

    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <>
                <NavLink exact="true" to="/profil">
                    <div className="user-info">
                        <img src={userData.picture} alt="Avatar"/>
                    </div>
                </NavLink>
                <div className="post-form">
                    <textarea
                        name="message"
                        id="message"
                        placeholder="Quoi de beau?"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <label htmlFor="message">Publication</label>
                    {message || postPicture ? (
                        <li className="card-container">
                            <div className="card-left">
                                <img src={userData.picture} alt="Illustation du post"/>
                            </div>
                            <div className="card-right">
                                <div className="card-header">
                                    <div className="pseudo">
                                        <h3>{userData.pseudo}</h3>
                                    </div>
                                    <span>{timestampParser(Date.now())}</span>
                                </div>
                                <div className="content">
                                    <p>{message}</p>
                                    <img src={postPicture} alt="Illustation du post"/>
                                </div>
                            </div>
                        </li>
                    ) : null}
                    <div className="footer-form">
                        <div className="icon">
                            <>
                                <img src="./img/icons/picture.svg" alt="upload"/>
                                <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => handlePicture(e)} />
                                <label htmlFor="file-upload">Image</label>
                            </>
                        </div>
                        {/*{!isEmpty(error.format) && <p>{error.format}</p>}*/}
                        {/*{!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}*/}
                        <div className="btn-send">
                            {message || postPicture ? (
                                <button className="cancel" onClick={cancelPost}>Annuler</button>
                            ) : null}
                            <button className="send" onClick={handlePost}>Publier</button>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
    )
}

export default NewPostForm;