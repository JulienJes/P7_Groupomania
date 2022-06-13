import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../../actions/user.actions';
import UploadImg from './UploadImg';
import errorReducer from '../../reducers/error.reducer';
import dateParser from '../../utils/Utils.js';
import LeftNav from '../LeftNav';

function UpdateProfil() {
    const userData = useSelector((state) => state.userReducer)
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const error = useSelector((state) => state.errorReducer.userError);
    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false); //vérifier si elle était true?
    }

    return(
        <div className="profil-container">
            <LeftNav />
            <h2> Profil de {userData.pseudo}</h2>
            <div className='update-container'>
                <div className='left-part'>
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="Avatar"/>
                    <UploadImg />
                    <p>{error.format}</p>
                    <p>{error.maxSize}</p>
                </div>
                <div className='right-part'>
                    <h3>Bio</h3>
                    {updateForm === false && (
                        <>
                            <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                            <button onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
                        </>
                    )}
                    {updateForm && (
                        <>
                            <textarea type="text" defaultValue={userData.bio} onChange={(e) =>
                            setBio(e.target.value)}>
                            </textarea>
                            <button onClick={handleUpdate}>Valider modifications</button>
                        </>
                    )}
                    <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4> {/*mongodb qui fait ça, à noter que dans le cadre d'un export de donnés, createdAt disparait*/}
                </div>
            </div>
        </div>
    )
};

export default UpdateProfil;