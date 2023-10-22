import React, {useState} from "react";
import {Button, Popup} from "devextreme-react";
import {Link, NavLink} from "react-router-dom";
import { ReactComponent as Favorite } from "../../../image/favorite.svg";
import { Split } from "@geoffcox/react-splitter";
import { ASIDE_A0204020000 } from "../../../components/Include/AsideMenus";

const MDM_PRG_A0204020000 = (props) => {
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };

  const [isActive, setActive] = useState(false);

  const toggleFavorite = () => {
    setActive(!isActive);
  }

  return (
    <Split initialPrimarySize='300px' minPrimarySize='20px' minSecondarySize='calc(100% - 300px)' splitterSize='5px' vertical>
      <div className="aside-section">
        <ASIDE_A0204020000 />
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

          <div className="grid-tab-box">
            <NavLink to={'/model/MDM_PRG_A0204010000'} className="grid-tab">BOM</NavLink>
            <NavLink to={'/model/MDM_PRG_A0204020000'} className="grid-tab">BOM Structure</NavLink>
          </div>

          <div className="grid-container">

            <div className="grid-wrap">
              <div className="grid-section">

                <div className="grid-area">

                  <div style={{ height: "400px", background: "#ddd" }}>
                    그리드 영역
                    <Button className="normal-button" onClick={togglePopup}>BOM Structure View</Button>
                  </div>

                </div>

                <div className="grid-bottom">
                  <div className="grid-total">
                    총 00개(현재페이지 0/전체페이지 000000)
                  </div>
                </div>

              </div>
            </div>

          </div>

          <Popup
            visible={isPopupVisible}
            hideOnOutsideClick={true}
            onHiding={togglePopup}
            width={750}
            height={714}
            dragEnabled={false}
            shadingColor="rgba(0, 0, 0, 0.5)"
          >
            <div className="modal-body">

              <div className="">
                <img src={`${process.env.PUBLIC_URL}/assets/bom-structure.png`} width="100%" alt="" />
              </div>
            </div>

            <div className="modal-footer">
              <Button className="confirm-btn" onClick={togglePopup}>닫기</Button>
            </div>

          </Popup>

        </div>
      </div>
    </Split>
  )
}
export {MDM_PRG_A0204020000};