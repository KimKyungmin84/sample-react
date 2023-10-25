import React, {useEffect, useRef, useState} from "react";
import { Button } from "devextreme-react";
import {GridView, LocalDataProvider} from "realgrid";
import { fields, columns, options } from "./MDM_PRG_A0105000000_SAVE_DATA";

const MDM_PRG_A0105000000_SAVE_GRID = (props) => {
  const [dataProvider, setDataProvider] = useState(null);
  const [gridView, setGridView] = useState(null);
  const gridElement = useRef(null);
  const [gridRowCnt, setGridRowCnt] = useState(0); //그리드카운트 표시용

  useEffect(() => {
    const container = gridElement.current;
    const provider = new LocalDataProvider(false);
    const grid = new GridView(container);

    grid.setDataSource(provider);
    provider.setFields(fields);
    grid.setColumns(columns);
    grid.setOptions(options);

    setDataProvider(provider);
    setGridView(grid);

    return () => {
      grid.commit(true);
      provider.clearRows();
      grid.destroy();
      provider.destroy();
    };
  }, []);

  useEffect(() => {
    if(dataProvider){
      if(dataProvider.getRowCount() > 0 ){
        dataProvider.clearRows();
      }
      if (Array.isArray(props.popUpGridData)) {
        dataProvider.setRows(props.popUpGridData);
      } else {
        dataProvider.setRows([props.popUpGridData]); // 데이터를 배열로 감싸서 설정
      }
      setGridRowCnt(dataProvider.getRowCount());
    }
  },[props.popUpGridData])

  return (
    <>
      <div className="modal-header">
        <h3 className="modal-tit">저장</h3>
        <span className="modal-subtit">{props.title}</span>
      </div>

      <div className="modal-body">
        <h5 className="mc-tit">
          <span className="mct-icon"></span>저장목록(총 {gridRowCnt}개)
        </h5>

        <div className="grid-box">
          <div id="realgrid" ref={gridElement} style={{ height: "100%", width: "100%" }} />
        </div>

        <p className="mc-ques">상기 항목을 저장 하시겠습니까?</p>
      </div>

      <div className="modal-footer">
        <Button className="cancle-btn" onClick={props.closeSaveModal}>취소</Button>
        <Button className="confirm-btn" onClick={props.handleSaveButtonClick}>확인</Button>
      </div>
    </>
  )
}
export {MDM_PRG_A0105000000_SAVE_GRID};