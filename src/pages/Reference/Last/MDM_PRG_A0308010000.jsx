import React, {useState} from "react";
import { Button, Popup, SelectBox, TextBox } from "devextreme-react";
import { Link } from "react-router-dom";
import { ReactComponent as Favorite } from "../../../image/favorite.svg";
import { Split } from "@geoffcox/react-splitter";
import { ASIDE_A0308010000} from "../../../components/Include/AsideMenus";

const MDM_PRG_A0308010000 = (props) => {
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };

  const [isPopupVisible2, setPopupVisibility2] = useState(false);

  const togglePopup2 = () => {
    setPopupVisibility2(!isPopupVisible2);
  };

  const [isActive, setActive] = useState(false);

  const toggleFavorite = () => {
    setActive(!isActive);
  }

  const exSelect = ['All', 'EX']

  return (
    <Split initialPrimarySize='300px' minPrimarySize='20px' minSecondarySize='calc(100% - 300px)' splitterSize='5px' vertical>
      <div className="aside-section">
        <ASIDE_A0308010000 />
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

            <div className="grid-two-wrap">
              <div className="grid-section">

                <div className="grid-area">

                  <div style={{ height: "400px", background: "#ddd" }}>그리드 영역</div>

                </div>

                <div className="grid-bottom">
                  <div className="grid-total">
                    총 00개(현재페이지 0/전체페이지 000000)
                  </div>

                  <div className="grid-buttons">
                    <Button className="normal-button">등록</Button>
                    <Button className="normal-button">삭제</Button>
                    <Button className="normal-button" onClick={togglePopup}>저장</Button>
                    <Button className="confirm-button" onClick={togglePopup2}>확정</Button>
                  </div>
                </div>

              </div>

              <div className="grid-section">

                <div className="grid-area">

                  <div style={{ height: "400px", background: "#ddd" }}>그리드 영역</div>

                </div>

                <div className="grid-bottom">
                  <div className="grid-total">
                    총 00개(현재페이지 0/전체페이지 000000)
                  </div>

                  <div className="grid-buttons">
                    <Button className="normal-button">등록</Button>
                    <Button className="normal-button">삭제</Button>
                    <Button className="normal-button" onClick={togglePopup}>저장</Button>
                    <Button className="confirm-button" onClick={togglePopup2}>확정</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-section">

              <div className="grid-area">

                <div style={{ height: "400px", background: "#ddd" }}>그리드 영역</div>

              </div>

              <div className="grid-bottom">
                <div className="grid-total">
                  총 00개(현재페이지 0/전체페이지 000000)
                </div>

                <div className="grid-buttons">
                  <Button className="normal-button">등록</Button>
                  <Button className="normal-button">삭제</Button>
                  <Button className="normal-button" onClick={togglePopup}>저장</Button>
                  <Button className="confirm-button" onClick={togglePopup2}>확정</Button>
                </div>
              </div>
            </div>

          </div>


          {/* //-- 저장 모달 */}
          <Popup
            visible={isPopupVisible}
            hideOnOutsideClick={true}
            onHiding={togglePopup}
            width={1000}
            height={500}
            dragEnabled={false}
            shadingColor="rgba(0, 0, 0, 0.5)"
          >
            <div className="modal-header">
              <h3 className="modal-tit">저장</h3>
              <span className="modal-subtit">{props.title}</span>
            </div>

            <div className="modal-body">
              <h5 className="mc-tit">
                <span className="mct-icon"></span>저장목록(총 4개)
              </h5>

              <div className="grid-box">그리드영역</div>

              <p className="mc-ques">상기 항목을 저장 하시겠습니까?</p>
            </div>

            <div className="modal-footer">
              <Button className="cancle-btn" onClick={togglePopup}>취소</Button>
              <Button className="confirm-btn" onClick={togglePopup}>확인</Button>
            </div>

          </Popup>
          {/* 저장 모달 --// */}


          {/* //-- 확정 모달 */}
          <Popup
            visible={isPopupVisible2}
            hideOnOutsideClick={true}
            onHiding={togglePopup2}
            width={1000}
            height={500}
            dragEnabled={false}
            shadingColor="rgba(0, 0, 0, 0.5)"
          >
            <div className="modal-header">
              <h3 className="modal-tit">확정</h3>
              <span className="modal-subtit">{props.title}</span>
            </div>

            <div className="modal-body">
              <h5 className="mc-tit">
                <span className="mct-icon"></span>확정목록(총 4개)
              </h5>

              <div className="grid-box">그리드영역</div>

              <p className="mc-ques">상기 항목을 확정 하시겠습니까?</p>
            </div>

            <div className="modal-footer">
              <Button className="cancle-btn" onClick={togglePopup2}>취소</Button>
              <Button className="confirm-btn" onClick={togglePopup2}>확인</Button>
            </div>

          </Popup>
          {/* 확정 모달 --// */}

        </div>
      </div>
    </Split>
  )
}
export {MDM_PRG_A0308010000};