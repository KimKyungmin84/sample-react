import React, { useEffect, useRef, useState } from "react";
import { Button, Popup, SelectBox, TextBox } from "devextreme-react";
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
import {useTranslation} from "react-i18next";
import {getColumns, fields, options} from "./MDM_PRG_A0105000000_data";

const MDM_PRG_A0105000000 = (props) => {
  const [dataProvider, setDataProvider] = useState(null);
  const [gridView, setGridView] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const realgridElement = useRef(null);
  const [formData, setFormData] = useState({});
  const { setError } = useErrorHandling(); // 커스텀 훅스 에러 사용
  const { t } = useTranslation();
  const [columns, setColumns] = useState(getColumns(t)); // 상태로 columns를 관리
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

    grid.setDataSource(provider);
    provider.setFields(fields);
    grid.setColumns(columns);

    setDataProvider(provider);
    setGridView(grid);

    //삭제데이타 보이기
    // provider.softDeleting = true;
    // grid.hideDeletedRows = false;


    grid.setOptions(options);

    // grid.setCheckBar({
    //   headText: "선택",
    //   checkLocation: "bottom",
    //   width: 50,
    //   columns: [
    //     {
    //       fieldName: 'checkbar',
    //       header: '선택', // 열의 헤더 텍스트
    //       width: 50,
    //       renderer: { type: 'check' }, // 체크바 열로 설정
    //       styles: { textAlign: 'center' } // 열의 스타일 설정 (선택사항)
    //     },
    //     // 다른 컬럼들...
    //   ]
    // });

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
    //       regionColumn.values = ["", ...regionData.map(item => item.comCode)]; // 실제 값 설정
    //       regionColumn.labels = ["선택", ...regionData.map(item => item.codeName)]; // 표시되는 텍스트 설정
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

    // grid.onCellClicked = function (gridSel, clickData) {
    //   const currentRow = gridSel.getCurrent().dataRow;
    //
    //   if(currentRow == -1){
    //     return;
    //   }
    //
    //   const idColumn = gridSel.columnByName("comCode");
    //   const useYnColumn = gridSel.columnByName("useYn");
    //   const currState = provider.getRowState(currentRow);
    //
    //   if (currentRow >= 0 && idColumn) {
    //
    //     const rowState = provider.getRowState(currentRow);
    //     if (rowState === "created" && ( idColumn.name === gridSel.getCurrent().fieldName || useYnColumn.name === gridSel.getCurrent().fieldName)) {
    //       // idColumn.editor = { ...idColumn.editor, readOnly: false };
    //       grid.setColumnProperty("comCode", "readOnly", false);
    //       grid.setColumnProperty("useYn", "readOnly", false);
    //     }else{
    //       grid.setColumnProperty("comCode", "readOnly", true);
    //       grid.setColumnProperty("useYn", "readOnly", true);
    //     }
    //   }
    //
    //   return true; // 이벤트 처리를 계속 진행
    // };

    //현재 선택된 행자체를 가져오는 함수가 없는것 같음 그래서 이벤트를 설정하고 삭제시 컬럼을 수정불가로 설정
    //그리고 데이터가 삭제되는 경우 onCurrentRowChange가 발생하지 않게 때문에 이벤트를 실행하는 코드(dataProvider.onRowDeleted)를 추가해야 된다고 함 이게 무슨 툴이 이런가?
    //이것에 대해서 문의를 해야 될것
    // grid.onCurrentRowChanged = function (gridSel, oldRow, newRow) {
    //
    //   let rowState = newRow > -1 ? provider.getRowState(newRow) : "";
    //   //  alert("rowState::"+rowState + ":::newRow::"+newRow + ":::curr.itemIndex::"+curr.itemIndex)
    //   //그리드에 beginInsertRow(), beginAppendRow()로 행이 추가된 경우 || dataProvider에 새로 추가된 행인 경우
    //   let editable =  (rowState == "created");
    //
    //   if(rowState == "deleted"){
    //     editable = false
    //   }else{
    //     editable = true
    //   }
    //
    //   gridSel.setEditOptions({
    //     "editable": editable
    //   })
    //
    //   return true; // 이벤트 처리를 계속 진행
    // };

    //체커블 설정
    //  grid.setCheckBar({
    //   checkableExpression: "(state = 'c') or (state = 'u') or (state = 'd')"
    // });
    // grid.applyCheckables();

    //grid.setCheckableExpression("(state = 'c') or (state = 'u') or (state = 'd')", true);

    return () => {
      grid.commit(true);
      provider.clearRows();
      grid.destroy();
      provider.destroy();
    };
  }, []);

  const handleFetchButtonClick = async () => {
    gridView.cancel(); // Cancel any ongoing edit before fetching new data

    setIsFetching(true);

    console.log("===========:::", JSON.stringify(formData));

    try {
      const response = await AxiosCustomInstance({}).post("http://localhost:10000/filter/lineInformationList",formData);
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

  const [isPopupVisible, setPopupVisibility] = useState(false);

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };

  const [isPopupVisible2, setPopupVisibility2] = useState(false);

  const togglePopup2 = () => {
    setPopupVisibility2(!isPopupVisible2);
  };

  const [isPopupVisible3, setPopupVisibility3] = useState(false);

  const togglePopup3 = () => {
    setPopupVisibility3(!isPopupVisible3);
  };

  const [isActive, setActive] = useState(false);

  const toggleFavorite = () => {
    setActive(!isActive);
  }

  const searchSelect = ['All', 'EX']

  return (
    <Split initialPrimarySize='300px' minPrimarySize='20px' minSecondarySize='calc(100% - 300px)' splitterSize='5px' vertical>
      <div className="aside-section">
        <ASIDE_A0105000000 handleInputChange={handleInputChange} handleFetchButtonClick={handleFetchButtonClick}/>
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
                  <div ref={realgridElement} style={{ height: "500px", width: "100%" }}></div>
                </div>

              </div>

              <div className="grid-bottom">
                <div className="grid-total">
                  총 00개(현재페이지 0/전체페이지 000000)
                </div>

                <div className="grid-buttons">
                  <Button className="normal-button" onClick={togglePopup3}>등록</Button>
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

          {/* //-- 등록 모달 */}
          <Popup
            visible={isPopupVisible3}
            hideOnOutsideClick={true}
            onHiding={togglePopup3}
            width={1280}
            height={"auto"}
            dragEnabled={false}
            shadingColor="rgba(0, 0, 0, 0.5)"
          >
            <div className="modal-header">
              <h3 className="modal-tit">등록</h3>
              <span className="modal-subtit">{props.title}</span>
            </div>

            <div className="modal-body">

              <div className="md-table-box">
                <h5 className="mc-tit">
                  <span className="mct-icon"></span>정보 입력
                </h5>

                <table className="mc-table">
                  <tbody>
                  <tr>
                    <th>Factory</th>
                    <td>
                      <SelectBox
                        name=""
                        id=""
                        className="sc-select"
                        items={searchSelect}
                        placeholder="Factory Code 선택"
                      />
                    </td>
                    <th>Plant</th>
                    <td>
                      <SelectBox
                        name=""
                        id=""
                        className="sc-select"
                        items={searchSelect}
                        placeholder="Plant Code 선택"
                      />
                    </td>
                    <th>Operation</th>
                    <td>
                      <SelectBox
                        name=""
                        id=""
                        className="sc-select"
                        items={searchSelect}
                        placeholder="Operation Code 선택"
                      />
                    </td>
                  </tr>
                  </tbody>
                </table>

                <table className="mc-table">
                  <tbody>
                  <tr>
                    <th>Line Code</th>
                    <td><TextBox inputAttr="" className="dx-field-value" defaultValue="" placeholder="Line Code" /></td>
                    <th>Line Name</th>
                    <td><TextBox inputAttr="" className="dx-field-value" defaultValue="" placeholder="Line Name" /></td>
                  </tr>

                  <tr>
                    <th>Line Short Name</th>
                    <td><TextBox inputAttr="" className="dx-field-value" defaultValue="" placeholder="Line Short Name" /></td>
                    <th>Line Type</th>
                    <td><TextBox inputAttr="" className="dx-field-value" defaultValue="" placeholder="Line Type" /></td>
                  </tr>
                  </tbody>
                </table>

                <div className="mtb-button-wrap">
                  <Button className="confirm-btn">저장</Button>
                </div>
              </div>

              <div className="md-grid-box">
                <h5 className="mc-tit">
                  <span className="mct-icon"></span>등록 목록(총 4개)
                </h5>

                <div className="grid-box">그리드영역</div>
              </div>

            </div>

            <div className="modal-footer">
              <Button className="confirm-btn" onClick={togglePopup3}>닫기</Button>
            </div>

          </Popup>
          {/* 등록 모달 --// */}

        </div>
      </div>
    </Split>
  )
}
export {MDM_PRG_A0105000000};