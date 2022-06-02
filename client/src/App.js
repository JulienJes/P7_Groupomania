import { UidContext } from "./components/AppContext";
import { useEffect, useState } from "react";
import Routes from "./components/Routes";
import axios from "axios";

function App() {
  const [uid, setUid] = useState(null); //obtention de l'ID utilisateur
  useEffect(() => {
    const fetchToken = async() =>{
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true
      })
      .then((res) => {
        setUid(res.data);
      })
      .catch((error) => console.log("No token"))
    };
    fetchToken();
  }, [uid]);

  return (
    <div>
      <UidContext.Provider value={uid}> {/*on stock le user ID dans les hooks de l'app pour contextualiser l'ensemble de l'application*/}
        <Routes />
      </UidContext.Provider>
    </div>
  );
}

export default App;
