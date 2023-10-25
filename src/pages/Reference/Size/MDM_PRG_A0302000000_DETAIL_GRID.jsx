import React, {useEffect, useRef, useState} from "react";
import { Button, Popup } from "devextreme-react";
import { Link } from "react-router-dom";
import { ReactComponent as Favorite } from "../../../image/favorite.svg";
import { Split } from "@geoffcox/react-splitter";
import { ASIDE_A0302000000 } from "../../../components/Include/AsideMenus";
import AxiosCustomInstance from "../../../common/api/AxiosCustomInstance";
import useErrorHandling from "../../../common/hooks/useErrorHandling";
import {GridView, LocalDataProvider} from "realgrid";
import { detailFields, detailColumns, detailOptions } from "./MDM_PRG_A0302000000_detailData";
import { sizeFields, sizeColumns, sizeOptions } from "./MDM_PRG_A0302000000_sizeData";

const MDM_PRG_A0302000000 = (props) => {
  const [sizeDataProvider, setSizeDataProvider] = useState(null);
  const [detailDataProvider, setDetailDataProvider] = useState(null);
  const [sizeGridView, setSizeGridView] = useState(null);
  const [detailGridView, setDetailGridView] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const sizeGridElement = useRef(null);
  const detailGridElement = useRef(null);
  const [sizeGridRowCnt, setSizeGridRowCnt] = useState(0); //그리드카운트 표시용
  const [detailGridRowCnt, setDetailGridRowCnt] = useState(0); //그리드카운트 표시용
  const [formData, setFormData] = useState({});
  const { setError } = useErrorHandling(); // 커스텀 훅스 에러 사용

  const handleInputChange = (e) => {
    const name = (e.component.NAME === 'dxRadioGroup') ? e.element.accessKey : (e.component.NAME === 'dxSelectBox') ? e.itemData.name : e.event.target.name;
    const value = (e.component.NAME === 'dxRadioGroup') ? e.value : (e.component.NAME === 'dxSelectBox') ? e.itemData.value : e.event.target.value;

    // setFormData(prevData => ({...prevData, [name]: value}));

    setFormData((prevState) => {
      return {
        ...prevState,
        [name] : value
      }
    })
  }

  useEffect(() => {
    const sizeContainer = sizeGridElement.current;
    const sizeProvider = new LocalDataProvider(false); // 서버에서 데이터를 수정하도록 변경
    const sizeGrid = new GridView(sizeContainer);

    const detailContainer = detailGridElement.current;
    const detailProvider = new LocalDataProvider(false); // 서버에서 데이터를 수정하도록 변경
    const detailGrid = new GridView(detailContainer);

    sizeGrid.setDataSource(sizeProvider);
    sizeProvider.setFields(sizeFields);
    sizeGrid.setColumns(sizeColumns);
    sizeGrid.setOptions(sizeOptions);

    detailGrid.setDataSource(detailProvider);
    detailProvider.setFields(detailFields);
    detailGrid.setColumns(detailColumns);
    detailGrid.setOptions(detailOptions);

    setSizeDataProvider(sizeProvider);
    setSizeGridView(sizeGrid);

    setDetailDataProvider(detailProvider);
    setDetailGridView(detailGrid);

    sizeGrid.onCellClicked = function (gridSel, oldSel, newSel, clickData) {
      if (newSel < 0) return;

      onCellClicked();
    };

    return () => {
      sizeGrid.commit(true);
      sizeProvider.clearRows();
      sizeGrid.destroy();
      sizeProvider.destroy();

      detailGrid.commit(true);
      detailProvider.clearRows();
      detailGrid.destroy();
      detailProvider.destroy();
    };
  }, []);

  // useEffect(() => {
  //   const container = detailGridElement.current;
  //   const provider = new LocalDataProvider(false); // 서버에서 데이터를 수정하도록 변경
  //   const grid = new GridView(container);
  //
  //   grid.setDataSource(provider);
  //   provider.setFields(detailFields);
  //   grid.setColumns(detailColumns);
  //   grid.setOptions(detailOptions);
  //
  //   setDetailDataProvider(provider);
  //   setDetailGridView(grid);
  //
  //   return () => {
  //     grid.commit(true);
  //     provider.clearRows();
  //     grid.destroy();
  //     provider.destroy();
  //   };
  // }, []);

  const handleFetchButtonClick = async () => {
    sizeGridView.cancel(); // Cancel any ongoing edit before fetching new data
    //detailGridView.cancel();

    setIsFetching(true);

    try {
      const response = await AxiosCustomInstance({}).post("http://localhost:10000/size/sizeList",formData);
      const data = response.data;
      // const detailResponse = await AxiosCustomInstance({}).post("http://localhost:10000/size/detailList",formData);
      // const detailData = detailResponse.data;
      console.log("===========:::", sizeDataProvider);
      if (sizeDataProvider) {
        if (Array.isArray(data)) {
          sizeDataProvider.setRows(data);
        } else {
          sizeDataProvider.setRows([data]); // 데이터를 배열로 감싸서 설정
        }
        setSizeGridRowCnt(sizeDataProvider.getRowCount()); //데이타 카운트 처리
      }

      // if (detailDataProvider) {
      //   if (Array.isArray(detailData)) {
      //     detailDataProvider.setRows(detailData);
      //   } else {
      //     detailDataProvider.setRows([detailData]); // 데이터를 배열로 감싸서 설정
      //   }
      //   setDetailGridRowCnt(detailDataProvider.getRowCount()); //데이타 카운트 처리
      // }
    }catch (error) {
      console.error("Error fetching data:", error);
      setError(error)
    }finally {
      setIsFetching(false);
    }
  };

  const onCellClicked = async () => {
    //sizeGridView.cancel(); // Cancel any ongoing edit before fetching new data
    // detailGridView.cancel();

    setIsFetching(true);

    //console.log("===========:::", JSON.stringify(formData));

    try {
      const detailResponse = await AxiosCustomInstance({}).post("http://localhost:10000/size/detailList",formData);
      const detailData = detailResponse.data;
      //console.log("===========:::", JSON.stringify(detailDataProvider));
      console.log("===========:::", detailDataProvider);
      if (detailDataProvider) {alert("1");
        if (Array.isArray(detailData)) {alert("2");
          detailDataProvider.setRows(detailData);
        } else {alert("3");
          detailDataProvider.setRows([detailData]); // 데이터를 배열로 감싸서 설정
        }
        setDetailGridRowCnt(detailDataProvider.getRowCount()); //데이타 카운트 처리
      }
    }catch (error) {
      console.error("Error fetching data:", error);
      setError(error)
    }finally {
      setIsFetching(false);
    }
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


  return (
    <Split initialPrimarySize='300px' minPrimarySize='20px' minSecondarySize='calc(100% - 300px)' splitterSize='5px' vertical>
      <div className="aside-section">
        <ASIDE_A0302000000 handleInputChange={handleInputChange} handleFetchButtonClick={handleFetchButtonClick} />
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

              <div className="grid-area">

                <div style={{ height: "600px", background: "#ddd" }}>
                  <div ref={sizeGridElement} style={{ height: "100%", width: "100%" }}></div>
                </div>

              </div>

              <div className="grid-bottom">
                <div className="grid-total">
                  총 {sizeGridRowCnt}개(현재페이지 0/전체페이지 000000)
                </div>

                <div className="grid-buttons">
                  <Button className="normal-button" onClick={togglePopup}>저장</Button>
                  <Button className="confirm-button" onClick={togglePopup2}>확정</Button>
                </div>
              </div>

            </div>

            <div className="grid-section">

              <div className="grid-headline">

                <div className="result-info">
                  <span className="tit-icon"></span>
                  <span className="title">Detail</span>
                </div>

              </div>

              <div className="grid-area">

                <div style={{ height: "600px", background: "#ddd" }}>
                  <div ref={detailGridElement} style={{ height: "100%", width: "100%" }}></div>
                </div>

              </div>

              <div className="grid-bottom">
                <div className="grid-total">
                  총 {detailGridRowCnt}개(현재페이지 0/전체페이지 000000)
                </div>

                <div className="grid-buttons">
                  <Button className="normal-button">등록</Button>
                  <Button className="normal-button">삭제</Button>
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
export {MDM_PRG_A0302000000};