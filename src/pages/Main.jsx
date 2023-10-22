import React, {useState} from "react";
import {Link} from "react-router-dom";
import { ReactComponent as Favorite } from "../image/favorite.svg";
import { Split } from "@geoffcox/react-splitter";
import {Button} from "devextreme-react";
import {ASIDE_A0101000000} from "../components/Include/AsideMenus";

const Main = (props) => {
  const [isActive, setActive] = useState(false);

  const toggleFavorite = () => {
    setActive(!isActive);
  }

  return (
    <Split initialPrimarySize='300px' minPrimarySize='20px' minSecondarySize='calc(100% - 300px)' splitterSize='5px' vertical>
      <div className="aside-section">
        <ASIDE_A0101000000 />
      </div>
      <div className="contents-section">
        <div className="contents">

          <div className="page-header">
            <h2 className="ph-tit">
          <span className="favorite-icon">
            <Favorite width={24} height={24} className={isActive ? "active" : "inactive"} onClick={toggleFavorite}/>
          </span>
              {props.title}
            </h2>

            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={props.firstDepthPath}>{props.firstDepth}</Link>
              </li>
              <li className="breadcrumb-item active">
                {props.secondDepth}
              </li>
            </ul>
          </div>

          <div className="grid-container">
            <div className="grid-section">

              <div className="grid-headline">

                <div className="result-info">
                  <span className="tit-icon"></span>
                  <span className="title">Detail</span>
                </div>

                <div className="grid-top-buttons">
                  <Button>
                    SQL Viewer
                  </Button>
                  <Button>
                    엑셀 다운로드
                  </Button>
                </div>

              </div>

              <ul>
                <li>
                  ✅ <Link to="/site/MDM_PRG_A0105000000">Grid - MDM_PRG_A0105000000</Link>
                </li>
                <li>
                  ✅ <Link to="/reference/MDM_PRG_A0302000000">Grid - Master > Detail - MDM_PRG_A0302000000</Link>
                </li>
                <li>
                  ✅ <Link to="/reference/MDM_PRG_A0306010000">Grid - Tab - MDM_PRG_A0306010000</Link>
                </li>
                <li>
                  ✅ <Link to="/model/MDM_PRG_A0204010000">Grid - Tree - MDM_PRG_A0204010000</Link>
                </li>
                <li>
                  ✅ <Link to="/model/MDM_PRG_A0203000000">Graph - Grid - MDM_PRG_A0203000000</Link>
                </li>
                <li>
                  ✅ <Link to="/model/MDM_PRG_A0201000000">Master-Detail-Detail Grid - MDM_PRG_A0201000000</Link>
                </li>
                <li>
                  ✅ <Link to="/model/MDM_PRG_A0202000000">Master-3Detail - MDM_PRG_A0202000000</Link>
                </li>
                <li>
                  ✅ <Link to="/reference/MDM_PRG_A0308010000">2Master – 1Detail - MDM_PRG_A0308010000</Link>
                </li>
                <li>
                  ✅ <Link to="/error">Error</Link>
                </li>
                <li>
                  ✅ <Link to="/dkwjhdewjh">Notfound</Link>
                </li>
              </ul>

              <div className="grid-bottom">
                <div className="grid-total">
                  총 00개(현재페이지 0/전체페이지 000000)
                </div>

                <div className="grid-buttons">
                  <Button className="normal-button">저장</Button>
                  <Button className="confirm-button">확정</Button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Split>
  )
}

export { Main }