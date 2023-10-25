import React, {useEffect, useRef, useState} from "react";
import { Button } from "devextreme-react";
import {GridView, LocalDataProvider} from "realgrid";
import { fields, columns, options } from "./MDM_PRG_A0302000000_DETAIL_DATA";

const MDM_PRG_A0302000000_DETAIL_GRID = (props) => {
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
      if (Array.isArray(props.detailGridData)) {
        dataProvider.setRows(props.detailGridData);
      } else {
        dataProvider.setRows([props.detailGridData]); // 데이터를 배열로 감싸서 설정
      }
      setGridRowCnt(dataProvider.getRowCount());
    }
  },[props.detailGridData])

  return (
    <>
      <div className="grid-section">

        <div className="grid-headline">

          <div className="result-info">
            <span className="tit-icon"></span>
            <span className="title">Detail</span>
          </div>

        </div>

        <div className="grid-area">

          <div style={{ height: "600px", background: "#ddd" }}>
            <div ref={gridElement} style={{ height: "100%", width: "100%" }}></div>
          </div>

        </div>

        <div className="grid-bottom">
          <div className="grid-total">
            총 {gridRowCnt}개(현재페이지 0/전체페이지 000000)
          </div>

          <div className="grid-buttons">
            <Button className="normal-button">등록</Button>
            <Button className="normal-button">삭제</Button>
          </div>
        </div>
      </div>

    </>
  )
}
export {MDM_PRG_A0302000000_DETAIL_GRID};