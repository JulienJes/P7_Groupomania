import Log from '../components/Log'

function Profil() {
    return (
      <div class="profil-page">
        <div className="log-container">
          <Log />
          <div class="img-container">
            <img src="./img/log.svg" alt="Connexion"></img>
          </div>
        </div>
      </div>
    );

}

export default Profil