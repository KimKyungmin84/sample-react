import React, {useEffect, useRef, useState} from "react";
import {Button, Popup} from "devextreme-react";
import { Link } from "react-router-dom";
import { ReactComponent as Favorite } from "../../../image/favorite.svg";
import { Split } from "@geoffcox/react-splitter";
import { ASIDE_A0105000000 } from "../../../components/Include/AsideMenus";
import AxiosCustomInstance from "../../../common/api/AxiosCustomInstance"
import useErrorHandling from "../../../common/hooks/useErrorHandling";
import { MDM_PRG_A0105000000_SAVE_GRID } from "./MDM_PRG_A0105000000_SAVE_GRID";
import { MDM_PRG_A0105000000_CONFIRM_GRID } from "./MDM_PRG_A0105000000_CONFIRM_GRID";
import {GridView, LocalDataProvider} from "realgrid";
import {columns, fields, options} from "./MDM_PRG_A0105000000_DATA";

const MDM_PRG_A0105000000 = (props) => {
  const [gridView, setGridView] = useState(null);
  const [dataProvider, setDataProvider] = useState(null);
  const gridElement = useRef(null);
  const [gridRowCnt, setGridRowCnt] = useState(0); //그리드카운트 표시용
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState({});
  const [saveGridData, setSaveGridData] = useState({});
  const [confirmGridData, setconfirmGridData] = useState({});
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
    const container = gridElement.current;
    const provider = new LocalDataProvider(false); // 서버에서 데이터를 수정하도록 변경
    const grid = new GridView(container);

    grid.setDataSource(provider);
    provider.setFields(fields);
    grid.setColumns(columns);
    grid.setOptions(options);

    setDataProvider(provider);
    setGridView(grid);

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
      ]
    });

    const fetchCompanyData = async () => {
      try {
        const response = await AxiosCustomInstance({}).get("http://localhost:10000/filter/filterCompany");
        const companyData = response.data; // 콤보 데이터
        const companyColumn = grid.columnByName("Company");

        if (companyData && companyData.length > 0) {
          grid.beginUpdate(); // 업데이트 시작

          // 먼저 "선택" 옵션을 배열에 추가
          companyColumn.values = ["", ...companyData.map(item => item.Company)]; // 실제 값 설정
          companyColumn.labels = ["선택", ...companyData.map(item => item.Company)]; // 표시되는 텍스트 설정

          grid.endUpdate(); // 업데이트 종료
        }else{
          companyColumn.values = [""]; // 실제 값 설정
          companyColumn.labels = ["선택"]; // 표시되는 텍스트 설정
        }

      } catch (error) {
        console.error("Error fetching companyData :", error);
      }
    };
    fetchCompanyData();

    const fetchPlantData = async () => {
      try {
        const response = await AxiosCustomInstance({}).get("http://localhost:10000/filter/filterPlant");
        const plantData = response.data; // 콤보 데이터
        const plantColumn = grid.columnByName("Plant");

        if (plantData && plantData.length > 0) {
          grid.beginUpdate(); // 업데이트 시작

          // 먼저 "선택" 옵션을 배열에 추가
          plantColumn.values = ["", ...plantData.map(item => item.Plant)]; // 실제 값 설정
          plantColumn.labels = ["선택", ...plantData.map(item => item.Plant)]; // 표시되는 텍스트 설정

          grid.endUpdate(); // 업데이트 종료
        }else{
          plantColumn.values = [""]; // 실제 값 설정
          plantColumn.labels = ["선택"]; // 표시되는 텍스트 설정
        }

      } catch (error) {
        console.error("Error fetching plantData :", error);
      }
    };
    fetchPlantData();

    const fetchOperData = async () => {
      try {
        const response = await AxiosCustomInstance({}).get("http://localhost:10000/filter/filterOper");
        const operData = response.data; // 콤보 데이터
        const operColumn = grid.columnByName("Oper");

        if (operData && operData.length > 0) {
          grid.beginUpdate(); // 업데이트 시작

          // 먼저 "선택" 옵션을 배열에 추가
          operColumn.values = ["", ...operData.map(item => item.Plant)]; // 실제 값 설정
          operColumn.labels = ["선택", ...operData.map(item => item.Plant)]; // 표시되는 텍스트 설정

          grid.endUpdate(); // 업데이트 종료
        }else{
          operColumn.values = [""]; // 실제 값 설정
          operColumn.labels = ["선택"]; // 표시되는 텍스트 설정
        }

      } catch (error) {
        console.error("Error fetching operData :", error);
      }
    };
    fetchOperData();

    grid.onCellClicked = function (gridSel, clickData) {
      const currentRow = gridSel.getCurrent().dataRow;

      if(currentRow === -1){
        return;
      }

      const idColumn = gridSel.columnByName("Company");
      const lineColumn = gridSel.columnByName("Line");
      const currState = provider.getRowState(currentRow);

      if (currentRow >= 0 && idColumn) {

        const rowState = provider.getRowState(currentRow);
        if (rowState === "created" && ( idColumn.name === gridSel.getCurrent().fieldName || lineColumn.name === gridSel.getCurrent().fieldName)) {
          // idColumn.editor = { ...idColumn.editor, readOnly: false };
          grid.setColumnProperty("Company", "readOnly", false);
          grid.setColumnProperty("Line", "readOnly", false);
        }else{
          grid.setColumnProperty("Company", "readOnly", true);
          grid.setColumnProperty("Line", "readOnly", true);
        }
      }

      grid.setColumnProperty("UseYn", "readOnly", true);
      grid.setColumnProperty("ConfirmType", "readOnly", true);
      grid.setColumnProperty("ConfirmUserId", "readOnly", true);
      grid.setColumnProperty("ConfirmDt", "readOnly", true);
      grid.setColumnProperty("CreateUserId", "readOnly", true);
      grid.setColumnProperty("CreateDt", "readOnly", true);
      grid.setColumnProperty("UpdateUserId", "readOnly", true);
      grid.setColumnProperty("UpdateDt", "readOnly", true);

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

    return () => {
      grid.commit(true);
      provider.clearRows();
      grid.destroy();
      provider.destroy();
    };
  }, []);

  const handleFetchButtonClick = async () => {
    setIsFetching(true);

    console.log("inputParam:::", formData);

    try {
      const response = await AxiosCustomInstance({}).post("http://localhost:10000/line/lineList",formData);
      const data = response.data;

      console.log("handleFetchButtonClick:::", data)
      if(dataProvider) {
        if(dataProvider.getRowCount() > 0 ){
          dataProvider.clearRows();
        }
        if (Array.isArray(data)) {
          dataProvider.setRows(data);
        } else {
          dataProvider.setRows(data);
        }
      }
    }catch (error) {
      console.error("Error fetching data:", error);
      setError(error)
    }finally {
      setIsFetching(false);
    }
  };

  const btnGridDelete = () => {
    gridView.commit();

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
      dataProvider.removeRow(currRow);
      currState = dataProvider.getRowState(currRow);
      gridView.onCurrentRowChanged(gridView,gridView.getCurrent().dataRow,gridView.getCurrent().dataRow);//데이타 삭제시 onCurrentRowChanged 이벤트를 인식하지 못하기 때문에 실행을 시켜야 한다는 군
      dataProvider.setValue(gridView.getCurrent().dataRow, "UseYn", "N"); //삭제여부 값 변경
    }
    console.log("삭제후-- currRow:::" + currRow + "::: state ::: " + currState);
    console.log("삭제후-- 그리드 카운트 :::" + dataProvider.getRowCount());
  };

  const btnGridInsert = () => {
    gridView.commit();
    var dataRow = dataProvider.addRow({});

    setGridRowCnt(dataProvider.getRowCount()); //데이타 카운트 처리
    gridView.setCurrent({dataRow: dataRow}); //추가된 행으로 포커스 이동
  };

  const handleSaveButtonClick = async () => {
    if (!gridView) return;
    gridView.commit();

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

    console.log("handleSaveButtonClick", jRowsData);

    setIsFetching(true);

    try {
      let response = await AxiosCustomInstance({}).post("http://localhost:10000/line/saveProcess",jRowsData);
      let data = response.data;

      response = await AxiosCustomInstance({}).post("http://localhost:10000/line/lineList",formData);
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
      closeSaveModal();
      setIsFetching(false);
    }
  };

  const handleConfirmButtonClick = async () => {
    if (!gridView) return;
    gridView.commit();

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

    console.log("handleConfirmButtonClick:::", jRowsData);

    setIsFetching(true);
    try {
      let response = await AxiosCustomInstance({}).post("http://localhost:10000/line/confirmProcess",jRowsData);
      let data = response.data;

      response = await AxiosCustomInstance({}).post("http://localhost:10000/line/lineList",formData);
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
      closeConfirmModal();
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

    console.log("2222222" + dataProvider)
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
    console.log("getPopUpData:::", retData);

    return retData;
  }

  const [isPopupVisible, setPopupVisibility] = useState(false);
  const openSaveModal = () => {
    const newData = getPopUpData();

    if(newData === 0){ //선택된 데이타 미 존재시 모달창 실행하지 않는다.
      alert("저장할 데이타를 선택해 주세요")
      return;
    }else if(newData === -1){ //선택된 데이타 미 존재시 모달창 실행하지 않는다.
      alert("Company는 필수입니다.")
      return;
    }

    setPopupVisibility(!isPopupVisible);

    console.log("openSaveModal:::", newData);

    setIsFetching(true);

    try {
      if (Array.isArray(newData)) {
        setSaveGridData(newData);
      } else {
        setSaveGridData([newData]); // 데이터를 배열로 감싸서 설정
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error)
    }finally {
      setIsFetching(false);
    }
  };

  function closeSaveModal() {
    setPopupVisibility(!isPopupVisible);
  };

  const [isPopupVisible2, setPopupVisibility2] = useState(false);

  const openConfirmModal = () => {
    const newData = getPopUpData();
    if(newData === 0){ //선택된 데이타 미 존재시 모달창 실행하지 않는다.
      alert("저장할 데이타를 선택해 주세요")
      return;
    }else if(newData === -1){ //선택된 데이타 미 존재시 모달창 실행하지 않는다.
      alert("Company는 필수입니다.")
      return;
    }

    setPopupVisibility2(!isPopupVisible2);

    console.log("openConfirmModal:::", newData);

    setIsFetching(true);

    try {
      if (Array.isArray(newData)) {
        setconfirmGridData(newData);
      } else {
        setconfirmGridData([newData]); // 데이터를 배열로 감싸서 설정
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error)
    }finally {
      setIsFetching(false);
    }
  };

  function closeConfirmModal() {
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
                  <div ref={gridElement} style={{ height: "100%", width: "100%" }} />
                </div>

              </div>

              <div className="grid-bottom">
                <div className="grid-total">
                  총 {gridRowCnt}개(현재페이지 0/전체페이지 000000)
                </div>

                <div className="grid-buttons">
                  <Button className="normal-button" onClick={btnGridInsert}>등록</Button>
                  <Button className="normal-button" onClick={btnGridDelete}>삭제</Button>
                  <Button className="normal-button" onClick={openSaveModal}>저장</Button>
                  <Button className="confirm-button" onClick={openConfirmModal}>확정</Button>
                </div>
              </div>

            </div>

          </div>

          {/* //-- 저장 모달 */}
          <Popup
            visible={isPopupVisible}
            hideOnOutsideClick={true}
            width={1000}
            height={500}
            dragEnabled={false}
            shadingColor="rgba(0, 0, 0, 0.5)"
          >
            <MDM_PRG_A0105000000_SAVE_GRID
              saveGridData={saveGridData}
              closeSaveModal={closeSaveModal}
              handleSaveButtonClick={handleSaveButtonClick}
            />
          </Popup>
           저장 모달 --//

           //-- 확정 모달
          <Popup
            visible={isPopupVisible2}
            hideOnOutsideClick={true}
            width={1000}
            height={500}
            dragEnabled={false}
            shadingColor="rgba(0, 0, 0, 0.5)"
          >
            <MDM_PRG_A0105000000_CONFIRM_GRID
              confirmGridData={confirmGridData}
              closeConfirmModal={closeConfirmModal}
              handleConfirmButtonClick={handleConfirmButtonClick}
            />
          </Popup>
           확정 모달 --//
        </div>
      </div>
    </Split>
  )
}
export {MDM_PRG_A0105000000};