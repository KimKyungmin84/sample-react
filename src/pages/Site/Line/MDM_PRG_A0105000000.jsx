import React, { useEffect, useRef, useState } from "react";
import { Button, Popup } from "devextreme-react";
import { Link } from "react-router-dom";
import { ReactComponent as Favorite } from "../../../image/favorite.svg";
import "../../../assets/contents.css";
import "../../../assets/modal.css";
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import { Split } from "@geoffcox/react-splitter";
import { ASIDE_A0105000000 } from "../../../components/Include/AsideMenus";
import { GridView, LocalDataProvider } from "realgrid";
import AxiosCustomInstance from "../../../common/api/AxiosCustomInstance"
import useErrorHandling from "../../../common/hooks/useErrorHandling";
import { fields, columns, options } from "./MDM_PRG_A0105000000_data";
import { popUpFields, popUpColumns, popUpOptions } from "./MDM_PRG_A0105000000_popUpData";

const MDM_PRG_A0105000000 = (props) => {
  const [dataProvider, setDataProvider] = useState(null);
  const [popUpDataProvider, setPopUpDataProvider] = useState(null);
  const [gridView, setGridView] = useState(null);
  const [popUpGridView, setPopUpGridView] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const realgridElement = useRef(null);
  const popUpGridElement = useRef(null);
  const [formData, setFormData] = useState({});
  const [popUpData, setPopUpData] = useState({}); // popUpData 상태 추가
  const { setError } = useErrorHandling(); // 커스텀 훅스 에러 사용
  const [gridRowCnt, setGridRowCnt] = useState(0); //그리드카운트 표시용

  // formData 초기 값 지정
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
    }));
  }, []);

  const handleInputChange = (e) => {
    let name;
    let value;

    // Radio
    if (e.component.NAME === "dxRadioGroup") {
      name = e.element.accessKey;
      value = e.value;
    }
    // SelectBox
    else if (e.component.NAME === "dxSelectBox") {
      name = e.itemData.name;
      value = e.itemData.value;
    }
    // textBox
    else {
      name = e.event.target.name;
      value = e.event.target.value;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const container = realgridElement.current;
    const provider = new LocalDataProvider(false); // 서버에서 데이터를 수정하도록 변경
    const grid = new GridView(container);

    const popUpContainer = popUpGridElement.current;
    const popUpProvider = new LocalDataProvider(true);
    const popUpGrid = new GridView(popUpContainer);

    grid.setDataSource(provider);
    provider.setFields(fields);
    grid.setColumns(columns);
    grid.setOptions(options);

    popUpGrid.setDataSource(popUpProvider);
    popUpProvider.setFields(popUpFields);
    popUpGrid.setColumns(popUpColumns);
    popUpGrid.setOptions(popUpOptions);
    //provider.setRows(newData);

    setDataProvider(provider);
    setGridView(grid);

    setPopUpDataProvider(popUpProvider);
    setPopUpGridView(popUpGrid);

    //삭제데이타 보이기
    provider.softDeleting = true;
    grid.hideDeletedRows = false;

    grid.setCheckBar({
      checkLocation: "bottom",
      width: 30,
      columns: [
        {
          fieldName: 'checkbar',
          width: 50,
          renderer: { type: 'check' }, // 체크바 열로 설정
          styles: { textAlign: 'center' } // 열의 스타일 설정 (선택사항)
        },
        // 다른 컬럼들...
      ]
    });

    // 서버에서 도시 데이터를 가져와서 콤보 박스의 값을 업데이트
    // const fetchRegionData = async () => {
    //   try {
    //     const response = await AxiosCustomInstance({}).get("http://localhost:10000/member/cityList");
    //     const regionData = response.data; // 콤보 데이터
    //     const regionColumn = grid.columnByName("region");
    //
    //     if (regionData && regionData.length > 0) {
    //       grid.beginUpdate(); // 업데이트 시작
    //
    //       // 먼저 "선택" 옵션을 배열에 추가
    //       regionColumn.values = ["", ...regionData.map(item => item.cityNm)]; // 실제 값 설정
    //       regionColumn.labels = ["선택", ...regionData.map(item => item.cityNm)]; // 표시되는 텍스트 설정
    //
    //       grid.endUpdate(); // 업데이트 종료
    //     }else{
    //       regionColumn.values = [""]; // 실제 값 설정
    //       regionColumn.labels = ["선택"]; // 표시되는 텍스트 설정
    //     }
    //
    //   } catch (error) {
    //     console.error("Error fetching regionData :", error);
    //   }
    // };

    // 페이지 로드 시에 콤보 데이터를 가져오도록 호출
    //fetchRegionData();

    grid.onCellClicked = function (gridSel, clickData) {
      const currentRow = gridSel.getCurrent().dataRow;

      if(currentRow === -1){
        return;
      }

      const idColumn = gridSel.columnByName("Company");
      const useYnColumn = gridSel.columnByName("UseYn");
      const currState = provider.getRowState(currentRow);

      if (currentRow >= 0 && idColumn) {

        const rowState = provider.getRowState(currentRow);
        if (rowState === "created" && ( idColumn.name === gridSel.getCurrent().fieldName || useYnColumn.name === gridSel.getCurrent().fieldName)) {
          // idColumn.editor = { ...idColumn.editor, readOnly: false };
          grid.setColumnProperty("Company", "readOnly", false);
          grid.setColumnProperty("UseYn", "readOnly", false);
        }else{
          grid.setColumnProperty("Company", "readOnly", true);
          grid.setColumnProperty("UseYn", "readOnly", true);
        }
      }

      return true; // 이벤트 처리를 계속 진행
    };

    grid.onCurrentRowChanged = function (gridSel, oldRow, newRow) {

      let rowState = newRow > -1 ? provider.getRowState(newRow) : "";
      let editable =  (rowState === "created");

      if(rowState === "deleted"){
        editable = false
      }else{
        editable = true
      }

      gridSel.setEditOptions({
        "editable": editable
      })

      return true; // 이벤트 처리를 계속 진행
    };

    grid.setCheckableExpression("(state = 'c') or (state = 'u') or (state = 'd')", true);

    popUpGrid.setCheckBar({visible: false});
    popUpGrid.setStateBar({visible: false});
    popUpGrid.setEditOptions({editable: false});

    return () => {
      grid.commit(true);
      provider.clearRows();
      grid.destroy();
      provider.destroy();

      popUpGrid.commit(true);
      popUpProvider.clearRows();
      popUpGrid.destroy();
      popUpProvider.destroy();
    };
  }, []);


  const handleFetchButtonClick = async () => {
    gridView.cancel(); // Cancel any ongoing edit before fetching new data

    setIsFetching(true);

    console.log("===========:::", JSON.stringify(formData));

    try {
      const response = await AxiosCustomInstance({}).post("http://localhost:10000/line/lineList",formData);
      const data = response.data;

      if (dataProvider) {
        if (Array.isArray(data)) {
          dataProvider.setRows(data);
        } else {
          dataProvider.setRows([data]); // 데이터를 배열로 감싸서 설정
        }
        setGridRowCnt(dataProvider.getRowCount()); //데이타 카운트 처리
      }
    }catch (error) {
      console.error("Error fetching data:", error);
      setError(error)
    }finally {
      setIsFetching(false);
    }
  };

  const btnGridInsert = () => {
    gridView.commit();
    var dataRow = dataProvider.addRow({});

    // // city 컬럼의 값을 설정
    // const regionColumn = gridView.columnByName("region");
    // const regionValues = regionColumn.values;
    // if (regionValues.length > 0) {
    //   // 기본값을 첫 번째 값으로 설정
    //   dataProvider.setValue(dataRow, "region", regionValues[0]);
    // }

    setGridRowCnt(dataProvider.getRowCount()); //데이타 카운트 처리
    gridView.setCurrent({dataRow: dataRow}); //추가된 행으로 포커스 이동
  };

  const btnGridDelete = () => {
    gridView.commit();

    // gridView.onCurrentRowChanged = function (grid, oldRow, newRow) {alert(2)
    //   const columns = grid.getColumnNames();
    //   columns.forEach(function(obj) {
    //           grid.setColumnProperty(obj,"editable",false)
    //   });
    // };

    let currRow = gridView.getCurrent().dataRow;

    if(currRow === -1){
      return;
    }

    let currState = dataProvider.getRowState(currRow);

    if(currState === "created"){
      dataProvider.softDeleting = false;
      dataProvider.removeRow(currRow);
      dataProvider.softDeleting = true;
      setGridRowCnt(dataProvider.getRowCount()); //데이타 카운트 처리
      return;
    }else{
      console.log()
      dataProvider.removeRow(currRow);
      currState = dataProvider.getRowState(currRow);
      gridView.onCurrentRowChanged(gridView,gridView.getCurrent().dataRow,gridView.getCurrent().dataRow);//데이타 삭제시 onCurrentRowChanged 이벤트를 인식하지 못하기 때문에 실행을 시켜야 한다는 군
      dataProvider.setValue(gridView.getCurrent().dataRow, "UseYn", "N"); //삭제여부 값 변경

      // gridView.setEditOptions({readOnly: true});
    }
    // dataProvider.removeRow(currRow);
    // currState = dataProvider.getRowState(currRow);
    console.log("삭제후-- currRow:::" + currRow + "::: state ::: " + currState);
    console.log("삭제후-- 그리드 카운트 :::" + dataProvider.getRowCount());
  };
  const handleSaveButtonClick = async () => {
    if (!gridView) return;
    gridView.commit();

    let state;
    let jData;
    let jRowsData = {
      updated: [],
      deleted: [],
      created: []
    };

    let rows = dataProvider.getAllStateRows();
    let checkedRowsIndex = gridView.getCheckedRows(true); //checkbar 선택된 데이타

    if (rows.updated.length > 0) {
      rows.updated.forEach(function(v) {
        if(isNumberInArray(checkedRowsIndex,v)){ //변경대상 로우만 찾음
          let jData = dataProvider.getJsonRow(v);
          jData.state = "updated";
          jRowsData.updated.push(jData);
        }
      });
    }

    if (rows.deleted.length > 0) {
      rows.deleted.forEach(function(v) {
        if(isNumberInArray(checkedRowsIndex,v)){ //변경대상 로우만 찾음
          let jData = dataProvider.getJsonRow(v);
          jData.state = "deleted";
          jRowsData.deleted.push(jData);
        }
      });
    }

    if (rows.created.length > 0) {
      rows.created.forEach(function(v) {
        if(isNumberInArray(checkedRowsIndex,v)){ //변경대상 로우만 찾음
          let jData = dataProvider.getJsonRow(v);
          jData.state = "created";
          jRowsData.created.push(jData);
        }
      });
    }

    console.log(JSON.stringify(jRowsData));
    // return;

    setIsFetching(true);
    try {
      let response = await AxiosCustomInstance({}).post("http://localhost:10000/line/lineProcess",jRowsData);
      let data = response.data;

      response = await AxiosCustomInstance({}).post("http://localhost:10000/line/lineList",{});
      data = response.data;

      if (dataProvider) {
        if (Array.isArray(data)) {
          dataProvider.setRows(data);
        } else {
          dataProvider.setRows([data]); // 데이터를 배열로 감싸서 설정
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      closeModal();
      setIsFetching(false);
    }
  };

  function isValidateItem(item) {
    const company = item.Company?.trim();
    
    if (!company) {
      return false;
    }
    return true; // 유효성 검사 통과
  }

  function isNumberInArray(numberArray, targetNumber) {
    return numberArray.includes(targetNumber);
  }

  const getPopUpData = () =>{
    if (!gridView) return;
    gridView.commit();

    //선택된 row가 미존재시 0를 리턴한다.
    let checkedRowsIndex = gridView.getCheckedRows(true);
    if (checkedRowsIndex.length === 0){
      return 0;
    }

    let retData = [];
    let isValidData = true; //저장할 데이타인가 체크

    var rows = dataProvider.getAllStateRows();

    console.log(">>>>>>>>>>>>>>>>>>>>>>  checked rows:::" + (gridView.getCheckedRows(true)))
    console.log(">>>>>>>>>>>>>>>>>>>>>>  dataProvider rows:::" + (JSON.stringify(rows)))
    console.log(">>>>>>>>>>>>>>>>>>>>>>  변경되 내역 존재하는가 확인:::" + isNumberInArray(checkedRowsIndex,1))

    if (rows.updated.length > 0) {
      rows.updated.forEach(function(v) {
        if(isNumberInArray(checkedRowsIndex,v)){ //변경대상 로우만 찾음
          let jData = dataProvider.getJsonRow(v);
          if(!isValidateItem(jData)){
            return isValidData=false;
          }
          retData.push(jData);
        }
      });
      if(!isValidData){
        return -1;
      }
    }

    if (rows.deleted.length > 0) {
      rows.deleted.forEach(function(v) {
        if(isNumberInArray(checkedRowsIndex,v)){//변경대상 로우만 찾음
          let jData = dataProvider.getJsonRow(v);
          if(!isValidateItem(jData)){
            return isValidData=false;
          }
          retData.push(jData);
        }
      });
      if(!isValidData){
        return -1;
      }
    }

    if (rows.created.length > 0) {
      rows.created.forEach(function(v) {
        if(isNumberInArray(checkedRowsIndex,v)){//변경대상 로우만 찾음
          let jData = dataProvider.getJsonRow(v);
          if(!isValidateItem(jData)){
            return isValidData=false;
          }
          retData.push(jData);
        }
      });
      if(!isValidData){
        return -1;
      }

    }
    console.log("$$$$$$$", JSON.stringify(retData));
    return retData;
  }

  const [isPopupVisible, setPopupVisibility] = useState(false);

  const openModal = () => {
    const newData = getPopUpData();
    if(newData === 0){ //선택된 데이타 미 존재시 모달창 실행하지 않는다.
      alert("저장할 데이타를 선택해 주세요")
      return;
    }else if(newData === -1){ //선택된 데이타 미 존재시 모달창 실행하지 않는다.
      alert("Company는 필수입니다.")
      return;
    }
    setPopupVisibility(!isPopupVisible);
    setPopUpData(newData);
    //const [popUpData, setPopUpData] = useState(newData); // popUpData 상태 추가

    console.log("###########" + JSON.stringify(popUpData));

    setIsFetching(true);

    popUpGridView.cancel();

    try {
      if (popUpDataProvider) {
        if (Array.isArray(popUpData)) {
          popUpDataProvider.setRows(popUpData);
        } else {
          popUpDataProvider.setRows([popUpData]); // 데이터를 배열로 감싸서 설정
        }
      }
    }catch (error) {
      console.error("Error fetching data:", error);
      setError(error)
    }finally {
      setIsFetching(false);
    }
  };

  function closeModal() {
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
        <ASIDE_A0105000000 handleInputChange={handleInputChange} handleFetchButtonClick={handleFetchButtonClick} />
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

                <div style={{ height: "500px", background: "#ddd" }} >
                  <div ref={realgridElement} style={{ height: "100%", width: "100%" }} />
                </div>

              </div>

              <div className="grid-bottom">
                <div className="grid-total">
                  총 {gridRowCnt}개(현재페이지 0/전체페이지 000000)
                </div>

                <div className="grid-buttons">
                  <Button className="normal-button" onClick={btnGridInsert}>등록</Button>
                  <Button className="normal-button" onClick={btnGridDelete}>삭제</Button>
                  <Button className="normal-button" onClick={openModal}>저장</Button>
                  <Button className="confirm-button" onClick={togglePopup2}>확정</Button>
                </div>
              </div>

            </div>

          </div>
          <div ref={popUpGridElement} style={{ height: "100%", width: "100%" }} />
          {/* //-- 저장 모달 */}
          <Popup
            visible={isPopupVisible}
            hideOnOutsideClick={true}
            onHiding={openModal}
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
                <span className="mct-icon"></span>저장목록(총 {popUpData.length}개)
              </h5>

              <div className="grid-box">
                <div id="realgrid" ref={popUpGridElement} style={{ height: "100%", width: "100%" }} />
              </div>

              <p className="mc-ques">상기 항목을 저장 하시겠습니까?</p>
            </div>

            <div className="modal-footer">
              <Button className="cancle-btn" onClick={closeModal}>취소</Button>
              <Button className="confirm-btn" onClick={handleSaveButtonClick}>확인</Button>
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
export {MDM_PRG_A0105000000};