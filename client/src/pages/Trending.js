//import { useContext } from "react";
import { useSelector } from "react-redux";
//import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import Card from "../components/Post/Card";
import { isEmpty } from "../utils/Utils";

function Trending() {
  //const uid = useContext(UidContext);
  const trendingList = useSelector((state) => state.trendingReducer);
  
  return (
    <div className="trending-page">
      <LeftNav />
      <div className="main">
        {!isEmpty(trendingList[0]) && trendingList.map((post) => <Card post={post} key={post._id}/>)}
      </div>
    </div>
  );
}

export default Trending