import React, {useState} from "react";
import { Gnb, HistoryStack } from "./components/Include";
import { Outlet } from "react-router-dom";


const LayoutProvider = () => {
  const [isFold, setIsFold] = useState(null);

  const gnbFolding = () => {
    setIsFold(!isFold);
  }

  return (
    <div className={`container-wrapper ${isFold ? "gnbFold" : "gnbUnFold"}`}>

      <Gnb gnbFolding={gnbFolding} />

      <div className="contents-wrapper">
        <Outlet />
      </div>

      <HistoryStack />

    </div>
  )
};

export default LayoutProvider;