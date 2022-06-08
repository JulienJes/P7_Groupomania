import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dateParser, { isEmpty } from '../../utils/Utils';

function Card({ post }) {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    //const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData])

    return(
        <li className='card-container' key={post._id}>
            {isLoading ? (
                <i className='fas fa-spinner fa-spin'></i>
            ) : (
                <>
                    <div className='card-left'>
                        <img src={!isEmpty(usersData[0]) && usersData.map((user) => {
                            if(user._id === post.posterId)
                                return user.picture;
                        }).join('')
                        } alt ="Avatar" />
                    </div>
                    <div className='card-right'>
                        <div className='card-header'>
                            <div className='pseudo'>
                                <h3>
                                    {
                                        !isEmpty(usersData[0]) && usersData.map((user) => {
                                        if(user._id === post.posterId)
                                            return user.pseudo;
                                        })
                                    }
                                </h3>
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                    </div>
                </>
            )}
        </li>
    )
}

export default Card;