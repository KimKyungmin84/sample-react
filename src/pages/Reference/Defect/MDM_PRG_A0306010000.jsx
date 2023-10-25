import React, {useState, useEffect, useRef, useCallback} from "react";
import { Button, Popup, SelectBox, TextBox } from "devextreme-react";
import {Link, NavLink} from "react-router-dom";
import { ReactComponent as Favorite } from "../../../image/favorite.svg";
import { Split } from "@geoffcox/react-splitter";
import {ASIDE_A0306010000} from "../../../components/Include/AsideMenus";
import {CellIndex, GridView, LocalDataProvider} from "realgrid";
import {columns, fields, options} from "./MDM_PRG_A0306010000_data";
import {popUpColumns, popUpFields, popUpOptions} from "./MDM_PRG_A0306010000_popUpData";
import AxiosCustomInstance from "../../../common/api/AxiosCustomInstance"
import useErrorHandling from "../../../common/hooks/useErrorHandling";

const MDM_PRG_A0306010000 = (props) => {
  const [dataProvider, setDataProvider] = useState(null);
  const [gridView, setGridView] = useState(null);
  const defectGridElement = useRef(null);
  const [formData, setFormData] = useState({});

  const [savePopUpDataProvider, setSavePopUpDataProvider] = useState(null);
  const [savePopUpGridView, setSavePopUpGridView] = useState(null);
  const savePopUpGridElement = useRef(null);
  const [popUpData, setPopUpData] = useState({}); // popUpData 상태 추가

  const [confirmPopUpDataProvider, setConfirmPopUpDataProvider] = useState(null);
  const [confirmPopUpGridView, setConfirmPopUpGridView] = useState(null);
  const confirmPopUpGridElement = useRef(null);

  const [isFetching, setIsFetching] = useState(false);
  const { setError } = useErrorHandling(); // 커스텀 훅스 에러 사용
  const [gridRowCnt, setGridRowCnt] = useState(0); //그리드카운트 표시용




  //탭메뉴
  const tabActive = () => {

    const tabItem = document.querySelectorAll('.grid-tab');

    tabItem.forEach((tab, idx)=> {
      tab.addEventListener('click', function(){
        tabItem.forEach((item)=> {
          item.classList.remove('active');
        });

        tabItem[idx].classList.add('active');
      });
    });
  }

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

  const fetchDefectGroupData = async () => {
    const response = await AxiosCustomInstance({}).get("http://localhost:10000/defect/filterDefectGroup");
    return response.data
  };

  const fetchDefectGroupInfoList = async () => {
    const response = await AxiosCustomInstance({}).post("http://localhost:10000/defect/defectGroupInfomationList",{});
    return response.data;
  };


  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
    }));
    tabActive();

    fetchDefectGroupInfoList().then(defectGroupData => {
      console.log('asdf : ', defectGroupData);
      if (defectGroupData && defectGroupData.length > 0) {
        defectGridElement.current.gridDefectGroupList = defectGroupData;
      }else{
        defectGridElement.current.gridDefectGroupList = [];
      }
    });

    const container = defectGridElement.current;
    const provider = new LocalDataProvider(false); // 서버에서 데이터를 수정하도록 변경
    const grid = new GridView(container);

    grid.setDataSource(provider);
    provider.setFields(fields);
    grid.setColumns(columns);
    grid.setOptions(options);
    setDataProvider(provider);
    setGridView(grid);

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
    }
    );

    fetchDefectGroupData().then(defectGroupData => {
      const defectGroupColumn = grid.columnByName("defectGroup");

      if (defectGroupData && defectGroupData.length > 0) {
        grid.beginUpdate(); // 업데이트 시작

        // 먼저 "선택" 옵션을 배열에 추가
        defectGroupColumn.values = ["", ...defectGroupData.map(item => item.DefectGroup)]; // 실제 값 설정
        defectGroupColumn.labels = ["선택", ...defectGroupData.map(item => item.DefectGroup)]; // 표시되는 텍스트 설정

        grid.endUpdate(); // 업데이트 종료
      }else{
        defectGroupColumn.values = [""]; // 실제 값 설정
        defectGroupColumn.labels = ["선택"]; // 표시되는 텍스트 설정
      }
    }).catch(e => console.log(e));

    grid.onCellClicked = function (gridSel, clickData) {
      const currentRow = gridSel.getCurrent().dataRow;

      if(currentRow === -1){
        return;
      }

      const defectColumn = gridSel.columnByName("defect");
      const defectGroupColumn = gridSel.columnByName("defectGroup");
      const confirmYnColumn = gridSel.columnByName("confirmYn");
      const currState = provider.getRowState(currentRow);

      if (currentRow >= 0 && defectColumn) {

        const rowState = provider.getRowState(currentRow);
        if (rowState === "created" && ( defectColumn.name === gridSel.getCurrent().fieldName || defectGroupColumn.name === gridSel.getCurrent().fieldName)) {
          grid.setColumnProperty("defect", "readOnly", false);
          grid.setColumnProperty("defectGroup", "readOnly", false);
          if(confirmYnColumn.name === gridSel.getCurrent().fieldName){
            gridSel.setEditOptions({
              "editable": true
            })
          }
        }else{
          grid.setColumnProperty("defect", "readOnly", true);
          grid.setColumnProperty("defectGroup", "readOnly", true);
        }
      }
      return true; // 이벤트 처리를 계속 진행
    };

    grid.onEditCommit  = function (grid, index, oldValue, newValue) {
      if (index.fieldName === "defectGroup") {
        if (oldValue !== newValue) {
          defectGridElement.current.gridDefectGroupList.forEach(function(data){ // callback 함수
            if(data.defectGroup===newValue){
              grid.setValue(index.itemIndex, "defectType", data.defectType);
              grid.setValue(index.itemIndex, "defectGroupName", data.defectGroupName);
            }
          });
        }
      }
    };

    grid.onCurrentRowChanged = function (gridSel, oldRow, newRow) {

      let rowState = newRow > -1 ? provider.getRowState(newRow) : "";
      let editable =  (rowState === "created");
      // console.log("gridSel.getCurrent().column:"+gridSel.getCurrent().column);
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
      if(defectGridElement.current){
        grid.commit(true);
        provider.clearRows();
        grid.destroy();
        provider.destroy();
      }
    };
  }, [ ]);

  const handleFetchButtonClick = async () => {
    gridView .cancel(); // Cancel any ongoing edit before fetching new data
    setIsFetching(true);

    try {

      console.log("===========:::", JSON.stringify(formData));
      const response = await AxiosCustomInstance({}).post("http://localhost:10000/defect/defectInfomationList",formData);
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

    setGridRowCnt(dataProvider.getRowCount()); //데이타 카운트 처리
    gridView.setCurrent({dataRow: dataRow}); //추가된 행으로 포커스 이동
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
      let response = await AxiosCustomInstance({}).post("http://localhost:10000/defect/defactSaveProcess",jRowsData);
      let data = response.data;

      response = await AxiosCustomInstance({}).post("http://localhost:10000/defect/defectInfomationList",formData);
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

  function isValidateItem(item) {
    const defect = item.defect?.trim();
    const defectGroup = item.defectGroup?.trim();

    if (!defect) {
      return false;
    }else if (!defectGroup) {
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
    console.log("getPopUpData:::", retData);

    return retData;
  }

  useEffect(() => {
    let popUpProvider = null;
    let popUpGrid = null;

    const timer = setTimeout(() => {
      const savePopUpContainer = savePopUpGridElement.current;

      if (savePopUpContainer ) {
        popUpProvider = new LocalDataProvider(true);
        popUpGrid = new GridView(savePopUpContainer);

        popUpGrid.setDataSource(popUpProvider);
        popUpProvider.setFields(popUpFields);
        popUpGrid.setColumns(popUpColumns);
        popUpGrid.setOptions(popUpOptions);

        setSavePopUpDataProvider(popUpProvider);
        setSavePopUpGridView(popUpGrid);

        popUpGrid.setCheckBar({visible: false});
        popUpGrid.setStateBar({visible: false});
        popUpGrid.setEditOptions({editable: false});
      }
    }, 20); // 20ms 후 실행

    return () => {
      clearTimeout(timer);
      if (savePopUpGridElement.current ) {
        popUpGrid.commit(true);
        popUpProvider.clearRows();
        popUpGrid.destroy();
        popUpProvider.destroy();//
      }
    }
  }, [savePopUpGridElement]);

  const [isPopupVisible, setPopupVisibility] = useState(false);

  const openSaveModal = () => {
    const newData = getPopUpData();

    if(newData === 0){ //선택된 데이타 미 존재시 모달창 실행하지 않는다.
      alert("저장할 데이타를 선택해 주세요")
      return;
    }else if(newData === -1){ //선택된 데이타 미 존재시 모달창 실행하지 않는다.
      alert("불량코드는 필수입니다.")
      return;
    }

    setPopupVisibility(!isPopupVisible);

    console.log("openSaveModal:::", newData);

    setIsFetching(true);

    try {
      if (savePopUpDataProvider) {
        if (Array.isArray(newData)) {
          savePopUpDataProvider.setRows(newData);
        } else {
          savePopUpDataProvider.setRows([newData]); // 데이터를 배열로 감싸서 설정
        }
      }
    }catch (error) {
      console.error("Error fetching data:", error);
      setError(error)
    }finally {
      setIsFetching(false);
    }
  };

  function closeSaveModal() {
    setPopupVisibility(!isPopupVisible);
  };

  useEffect(() => {
    let popUpProvider = null;
    let popUpGrid = null;

    const timer = setTimeout(() => {
      const confirmPopUpContainer = confirmPopUpGridElement.current;

      if (confirmPopUpContainer ) {
        popUpProvider = new LocalDataProvider(true);
        popUpGrid = new GridView(confirmPopUpContainer);

        popUpGrid.setDataSource(popUpProvider);
        popUpProvider.setFields(popUpFields);
        popUpGrid.setColumns(popUpColumns);
        popUpGrid.setOptions(popUpOptions);

        setConfirmPopUpDataProvider(popUpProvider);
        setConfirmPopUpGridView(popUpGrid);

        popUpGrid.setCheckBar({visible: false});
        popUpGrid.setStateBar({visible: false});
        popUpGrid.setEditOptions({editable: false});
      }
    }, 20); // 20ms 후 실행

    return () => {
      clearTimeout(timer);
      if (confirmPopUpGridElement.current ) {
        popUpGrid.commit(true);
        popUpProvider.clearRows();
        popUpGrid.destroy();
        popUpProvider.destroy();//
      }
    }
  }, [confirmPopUpGridElement]);

  const togglePopup = () => {
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
      if (confirmPopUpDataProvider) {
        if (Array.isArray(newData)) {
          confirmPopUpDataProvider.setRows(newData);
        } else {
          confirmPopUpDataProvider.setRows([newData]); // 데이터를 배열로 감싸서 설정
        }
      }
    }catch (error) {
      console.error("Error fetching data:", error);
      setError(error)
    }finally {
      setIsFetching(false);
    }
  };

  function closeConfirmModal() {
    setPopupVisibility2(!isPopupVisible2);
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
      let response = await AxiosCustomInstance({}).post("http://localhost:10000/defect/defactConfirmProcess",jRowsData);
      let data = response.data;

      response = await AxiosCustomInstance({}).post("http://localhost:10000/defect/defectInfomationList",formData);
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

  const [isActive, setActive] = useState(false);

  const toggleFavorite = () => {
    setActive(!isActive);
  }

  const exSelect = ['All', 'EX']

  return (
    <Split initialPrimarySize='300px' minPrimarySize='20px' minSecondarySize='calc(100% - 300px)' splitterSize='5px' vertical>
      <div className="aside-section">
        <ASIDE_A0306010000 handleInputChange={handleInputChange} handleFetchButtonClick={handleFetchButtonClick}  />
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
            <NavLink to={'/reference/MDM_PRG_A0306010000'} className="grid-tab">불량코드</NavLink>
            <NavLink to={'/reference/MDM_PRG_A0306020000'} className="grid-tab">불량코드 그룹</NavLink>
          </div>

          <div className="grid-container">

            <div className="grid-section">

              <div className="grid-area">

                <div ref={defectGridElement} style={{ height: "500px", background: "#ddd" }}></div>

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
            <div className="modal-header">
              <h3 className="modal-tit">저장</h3>
              <span className="modal-subtit">{props.title}</span>
            </div>

            <div className="modal-body">
              <h5 className="mc-tit">
                <span className="mct-icon"></span>저장목록(총 {popUpData.length}개)
              </h5>

              <div className="grid-box" ref={savePopUpGridElement} />

              <p className="mc-ques">상기 항목을 저장 하시겠습니까?</p>
            </div>

            <div className="modal-footer">
              <Button className="cancle-btn" onClick={closeSaveModal}>취소</Button>
              <Button className="confirm-btn" onClick={handleSaveButtonClick}>확인</Button>
            </div>

          </Popup>
          {/* 저장 모달 --// */}


          {/* //-- 확정 모달 */}
          <Popup
            visible={isPopupVisible2}
            hideOnOutsideClick={true}
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

              <div ref={confirmPopUpGridElement} className="grid-box"/>

              <p className="mc-ques">상기 항목을 확정 하시겠습니까?</p>
            </div>

            <div className="modal-footer">
              <Button className="cancle-btn" onClick={closeConfirmModal}>취소</Button>
              <Button className="confirm-btn" onClick={handleConfirmButtonClick}>확인</Button>
            </div>

          </Popup>
          {/* 확정 모달 --// */}

        </div>
      </div>
    </Split>
  )
}
export {MDM_PRG_A0306010000};