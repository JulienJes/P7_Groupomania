import Log from '../components/Log'
import { UidContext } from '../components/AppContext';
import { useContext } from 'react';

function Profil() {
  const uid = useContext(UidContext);
  return (
    <div className="profil-page">
      {uid ? ( //contextualisation avec uid
        <h1>UPDATE PAGE</h1>
      ): (
        <div className="log-container">
        <Log signin={false} signup={true} />
        <div className="img-container">
          <img src="./img/log.svg" alt="Connexion"></img>
        </div>
      </div>
      )}
    </div>
  );
}

export default Profil