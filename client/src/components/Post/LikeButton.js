import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

function LikeButton({ post }) {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch;

    const like = () => {
        dispatch(likePost(post._id, uid))
        setLiked(true)
    }

    const unlike = () => {
        dispatch(unlikePost(post._id, uid))
        setLiked(false)
    }

    useEffect(() => {
        if(post.likers.includes(uid)) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [uid, post.likers, liked])

    return(
        <div className='Like-container'>
            {uid && liked === false && (
                <img src=".img/icons/heart.svg" onClick={like} alt="like" />
            )}
            {uid && liked && (
                <img src=".img/icons/heart-filled.svg" onClick={unlike} alt="unlike"/>
            )}
            <span>{post.likers.length}</span>
        </div>
    )
}

export default LikeButton;