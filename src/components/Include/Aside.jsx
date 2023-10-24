import React from "react";
import "../../assets/aside.css";
import { 
  ASIDE_A0101000000, 
  ASIDE_A0105000000,
  ASIDE_A0302000000, 
  ASIDE_A0103000000, 
  ASIDE_A0306010000,
  ASIDE_A0204010000,
  ASIDE_A0203000000,
  ASIDE_A0201000000,
  ASIDE_A0202000000,
  ASIDE_A0308010000,

} from "./AsideMenus";
import { ReactComponent as Close } from "../../image/close.svg";
import { useLocation } from "react-router-dom";
import { Button } from "devextreme-react";

const Aside = () => {
  const isLocation = useLocation();

  let leftPanel;

  switch (true) {
    case isLocation.pathname === "/site":
      leftPanel = <ASIDE_A0101000000 />;
      break;
    case isLocation.pathname.includes("/MDM_PRG_A0101000000"):
      leftPanel = <ASIDE_A0101000000 />;
      break;
    case isLocation.pathname.includes("/MDM_PRG_A0105000000"):
      leftPanel = <ASIDE_A0105000000 />;
      break;
    case isLocation.pathname.includes("/MDM_PRG_A0302000000"):
      leftPanel = <ASIDE_A0302000000 />;
      break;
    case isLocation.pathname.includes("/MDM_PRG_A0103000000"):
      leftPanel = <ASIDE_A0103000000 />;
      break;
    case isLocation.pathname.includes("/MDM_PRG_A0306010000"):
      leftPanel = <ASIDE_A0306010000 />;
      break;
    case isLocation.pathname.includes("/MDM_PRG_A0204010000"):
      leftPanel = <ASIDE_A0204010000 />;
      break;
    case isLocation.pathname.includes("/MDM_PRG_A0203000000"):
      leftPanel = <ASIDE_A0203000000 />;
      break;
    case isLocation.pathname.includes("/MDM_PRG_A0201000000"):
      leftPanel = <ASIDE_A0201000000 />;
      break;
    case isLocation.pathname.includes("/MDM_PRG_A0202000000"):
      leftPanel = <ASIDE_A0202000000 />;
      break;
    case isLocation.pathname.includes("/MDM_PRG_A0308010000"):
      leftPanel = <ASIDE_A0308010000 />;
      break;
    default:
      break;
  }

  const closeAside = () => {
    document.querySelector('.split-container').style.cssText = '--react-split-min-primary: 20px; --react-split-min-secondary: calc(100% - 300px); --react-split-primary: 0px; --react-split-splitter: 5px';
  }

  return (
    <div className="aside-scroll">

      <div className="search-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
          <rect x="8.98926" y="9.90332" width="2" height="7" transform="rotate(-45 8.98926 9.90332)" fill="white"/>
          <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="2"/>
        </svg>
        <span className="search-tit">Search</span>
      </div>

      <span className="as-close" onClick={closeAside}>
        <Close/>
      </span>

      {leftPanel}

      <Button type="button" className="search-button" text="조회" />
      
    </div>
  )
}

export { Aside }