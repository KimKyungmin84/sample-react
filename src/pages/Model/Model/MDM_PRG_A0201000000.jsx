import React, {useState} from "react";
import {Button, Popup} from "devextreme-react";
import {Link} from "react-router-dom";
import {ReactComponent as Favorite} from "../../../image/favorite.svg";
import {Split} from "@geoffcox/react-splitter";
import {ASIDE_A0201000000} from "../../../components/Include/AsideMenus";
import {MDM_PRG_A0201000000_MODEL_GRID} from "./MDM_PRG_A0201000000_MODEL_GRID";
import {useModelDetailGridData, useModelGridData, useModelTrackingGridData} from "../../../common/hooks/useModelApi";
import {MDM_PRG_A0201000000_TRACKING_GRID} from "./MDM_PRG_A0201000000_TRACKING_GRID";
import {MDM_PRG_A0201000000_DETAIL_GRID} from "./MDM_PRG_A0201000000_DETAIL_GRID";

const MDM_PRG_A0201000000 = (props) => {
  const [modelGridData, setModelGridData] = useState([]);
  const [trackingGridData, setTrackingGridData] = useState([]);
  const [modelDetailGridData, setModelDetailGridData] = useState([]);


  const [init, setInit] = useState(false);

  const [formData, setFormData] = useState({
    Category : '',
    SubCategory : '',
    ModelId : '',
    ModelName : '',
    UseYn : '',
    ConfirmYn : '',
  });

  const {refetch} = useModelGridData(formData, init);
  // const {refetch:trackingRefetch} = useModelTrackingGridData(parentModelId, formData.Category, formData.SubCategory, trackingInit);

  const minHeight = 200;
  const [masterDomHeight, setMasterDomHeight] = useState(270);
  const [detailFirstDomHeight, setDetailFirstDomHeight] = useState(294);
  const [detailSecondDomHeight, setDetailSecondDomHeight] = useState(294);

  const handleMouseDown = (e, id) => {
    const startY = e.clientY;
    const initialHeight = masterDomHeight;

    const handleMouseMove = (e) => {
      console.log(id)
      const deltaY = e.clientY - startY;
      const newHeight = initialHeight + deltaY;
      if (id === "divA") {
        if (newHeight >= minHeight) {
          setMasterDomHeight(newHeight);
        }
      } else if (id === "divB") {
        if (newHeight >= minHeight) {
          setDetailFirstDomHeight(newHeight);
        }
      } else if (id === "divC") {
        if (newHeight >= minHeight) {
          setDetailSecondDomHeight(newHeight);
        }
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

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

  const handleInputChange = (e) => {
    const name = (e.component.NAME === 'dxRadioGroup') ? e.element.accessKey : (e.component.NAME === 'dxSelectBox') ? e.itemData.name : e.event.target.name;
    const value = (e.component.NAME === 'dxRadioGroup') ? e.value : (e.component.NAME === 'dxSelectBox') ? e.itemData.value : e.event.target.value;

    setFormData((prevState) => {
      return {
        ...prevState,
        [name] : value
      }
    })
  }

  const handleFetchButtonClick = () => {
    setInit(true);

    refetch().then(result => {
      setModelGridData(result.data);
    }).catch(e => console.log(e));
  }

  const  handlerModelGridCellClick = (ModelId) => {
    // setParentModelId(ModelId);
    setTrackingGridData([]);
    useModelTrackingGridData(ModelId, '', '').then(result => {
      setTrackingGridData(result);
    }).catch(e => console.log(e));
  };

  const handlerModelTrackingGridCellClick = (ModelId) => {
    setModelDetailGridData([]);
    useModelDetailGridData(ModelId, '', '').then(result => {
      setModelDetailGridData(result);
    }).catch(e => console.log(e));
  }

  return (
    <Split initialPrimarySize='300px' minPrimarySize='20px' minSecondarySize='calc(100% - 300px)' splitterSize='5px' vertical>
      <div className="aside-section">
        <ASIDE_A0201000000 handleInputChange={handleInputChange} handleFetchButtonClick={handleFetchButtonClick} />
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

          <div className="grid-container grid-split">

            <div className="grid-section grid-drag-height" style={{ height: `${masterDomHeight}px` }}>
              <MDM_PRG_A0201000000_MODEL_GRID togglePopup={togglePopup} togglePopup2={togglePopup2} modelGridData={modelGridData} handlerModelGridCellClick={handlerModelGridCellClick} />

              <div className="drag-handle" onMouseDown={(e) => handleMouseDown(e,"divA")}></div>
            </div>

            <div className="grid-section grid-drag-height with-title" style={{ height: `${detailFirstDomHeight}px` }}>
              <div className="grid-headline gh2">

                <div className="result-info">
                  <span className="tit-icon"></span>
                  <span className="title">Model Tracking</span>
                </div>
              </div>

              <MDM_PRG_A0201000000_TRACKING_GRID togglePopup={togglePopup} togglePopup2={togglePopup2} trackingGridData={trackingGridData} handlerModelTrackingGridCellClick={handlerModelTrackingGridCellClick} />

              <div className="drag-handle" onMouseDown={(e) => handleMouseDown(e,"divB")}></div>
            </div>

            <div className="grid-section grid-drag-height with-title" style={{ height: `${detailSecondDomHeight}px` }}>

              <div className="grid-headline gh2">

                <div className="result-info">
                  <span className="tit-icon"></span>
                  <span className="title">Site Model</span>
                </div>
              </div>

              <MDM_PRG_A0201000000_DETAIL_GRID togglePopup={togglePopup} togglePopup2={togglePopup2} modelDetailGridData={modelDetailGridData} />
              {/*<div className="grid-area">*/}

              {/*  <div className="grid-inner" style={{ background: "#ddd" }}>그리드 영역</div>*/}

              {/*  <div className="grid-bottom">*/}
              {/*    <div className="grid-total">*/}
              {/*      총 00개(현재페이지 0/전체페이지 000000)*/}
              {/*    </div>*/}

              {/*    <div className="grid-buttons">*/}
              {/*      <Button className="normal-button" onClick={togglePopup}>저장</Button>*/}
              {/*      <Button className="confirm-button" onClick={togglePopup2}>확정</Button>*/}
              {/*    </div>*/}
              {/*  </div>*/}

              {/*</div>*/}

              <div className="drag-handle" onMouseDown={(e) => handleMouseDown(e,"divC")}></div>
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
export {MDM_PRG_A0201000000};