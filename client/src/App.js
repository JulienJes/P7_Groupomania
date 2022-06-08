import { UidContext } from "./components/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Index from "./components/Routes";
import { useDispatch } from "react-redux";
import getUser from "./actions/user.actions";


function App() {
  const [uid, setUid] = useState(null); //obtention de l'ID utilisateur
  const dispatch = useDispatch;

  useEffect(() => {
    const fetchToken = async() => {
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

    if (uid) dispatch(getUser(uid)) //on met les infos dans le store SI il y en a
  }, [uid, dispatch]);

  return (
      <UidContext.Provider value={uid}> {/*on stock le user ID dans les hooks de l'app pour contextualiser l'ensemble de l'application*/}
        <Navbar />
        <Index />
      </UidContext.Provider>
  );
}

export default App;
