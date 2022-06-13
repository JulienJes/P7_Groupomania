import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTrends } from "../actions/post.actions";
import { isEmpty } from "../utils/Utils";

function Trends() {
    const posts = useSelector((state) => state.allPostsReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const trendList = useSelector((state) => state.trendingReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!isEmpty(posts[0])) {
            const postsArr = Object.keys(posts).map((i) => posts[i]);
            let sortedArray = postsArr.sort((a, b) => {
                return b.likers.length - a.likers.length;
            })
            sortedArray.length = 5; //modifier cette valeur pour afficher plus ou moins de posts dans le trending
            dispatch(getTrends(sortedArray))
        }
    }, [posts, dispatch])

    return(
        <div className="trending-container">
            <h4>Trending</h4>
            <NavLink exact to="/trending" />
                <ul>
                    {trendList.length &&
                    trendList.map((post) => {
                        return (
                            <li key={post._id}>
                                <div>
                                    {post.picture && <img src={post.picture} alt="illustration du post" />}
                                    {isEmpty(post.picture) && (
                                        <img src={usersData[0] && usersData.map((user) => {
                                            if(user._id === post.posterId) {
                                                return user.picture;
                                            } else return null; 
                                        }).join("")
                                        } alt="Avatar" />
                                    )}
                                </div>
                                <div className="trend-content">
                                    <p>{post.message}</p>
                                    <span>Lire</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
        </div>
    )
}

export default Trends;