import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import getPosts from '../actions/post.actions'
import { isEmpty } from "../utils/Utils";
import Card from "./Post/Card";

function Thread() {
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5); //affichage de 5 posts par 5 posts en vue de l'infinite scroll
    const dispatch = useDispatch(count);
    const posts = useSelector((state) => state.postReducer);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true)
        }
    }

    useEffect (() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
            setCount(count + 5 );
        }

        window.addEventListener('scroll', loadMore);
        return() => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch, count])

    return(
        <div className="thread-container">
            <ul>
                {!isEmpty(posts[0]) &&posts.map((post) => {
                    return <Card post={post} key={post._id} />
                })}
            </ul>
        </div>
    )
}

export default Thread;