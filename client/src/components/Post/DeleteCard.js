import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

function DeleteCard(props) {
    const dispatch = useDispatch();

    const deleteQuote = () => dispatch(deletePost(props.id));

    return (
        <div onClick={() =>{
            if(window.confirm('Voulez-vous supprimer cette publication?')) {
                deleteQuote();
            }
        }}>
            <img src="./img/icons/trash.svg" alt="supprimer" />
        </div>
    )
}

export default DeleteCard;