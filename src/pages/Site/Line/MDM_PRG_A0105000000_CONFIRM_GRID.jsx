import React, {useEffect, useRef, useState} from "react";
import { Button } from "devextreme-react";
import {GridView, LocalDataProvider} from "realgrid";
import { fields, columns, options } from "./MDM_PRG_A0105000000_CONFIRM_DATA";

const MDM_PRG_A0105000000_CONFIRM_GRID = (props) => {
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

    grid.setCheckBar({visible: false});
    grid.setStateBar({visible: false});
    grid.setEditOptions({editable: false});

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
      if (Array.isArray(props.confirmGridData)) {
        dataProvider.setRows(props.confirmGridData);
      } else {
        dataProvider.setRows([props.confirmGridData]); // 데이터를 배열로 감싸서 설정
      }
      setGridRowCnt(dataProvider.getRowCount());
    }
  },[props.confirmGridData])

  return (
    <>
      <div className="modal-header">
        <h3 className="modal-tit">확정</h3>
        <span className="modal-subtit">{props.title}</span>
      </div>

      <div className="modal-body">
        <h5 className="mc-tit">
          <span className="mct-icon"></span>확정목록(총 {setGridRowCnt}개)
        </h5>

        <div className="grid-box">
          <div id="realgrid" ref={gridElement} style={{ height: "100%", width: "100%" }} />
        </div>

        <p className="mc-ques">상기 항목을 확정 하시겠습니까?</p>
      </div>

      <div className="modal-footer">
        <Button className="cancle-btn" onClick={props.closeConfirmModal}>취소</Button>
        <Button className="confirm-btn" onClick={props.handleConfirmButtonClick}>확인</Button>
      </div>
    </>
  )
}
export {MDM_PRG_A0105000000_CONFIRM_GRID};