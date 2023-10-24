import React, {useEffect, useRef, useState} from "react";
import {GridView, LocalDataProvider} from "realgrid";
import {columns, fields, options} from "./MDM_PRG_A0204010000_BOM_GRID_DATA";

const MDM_PRG_A0204010000_BOM_GRID = (props) => {
    const bomGridRef = useRef(null);
    const [gridView, setGridView] = useState(null);
    const [dataProvider, setDataProvider] = useState(null);
    const [rowCount, setRowCount] = useState(0);

    useEffect(() => {
        const container = bomGridRef.current;
        const provider = new LocalDataProvider(false);
        const grid = new GridView(container);

        grid.setDataSource(provider);
        provider.setFields(fields);
        grid.setColumns(columns);
        grid.setOptions(options);

        setDataProvider(provider);
        setGridView(grid);

        //에디터 수정 여부
        grid.editOptions.editable = false;
        //에디터 업데이트 여부
        grid.editOptions.updatable = false;
        //체크바 표기 여부
        grid.setCheckBar({visible: false});
        //수정 상태 표기 여부
        grid.setStateBar({visible: false});

        //컬럼 크기 변경 여부 설정
        grid.setDisplayOptions({columnResizable: false});
        grid.onCellClicked = function (grid) {
            //TODO : 라우팅 그리드 조회시 모코드에 대해서 확실히 파악 필요.

            // const ItemCode = provider.getValue(grid.getCurrent().dataRow, 'ParentItemCode');
            const ItemCode = provider.getValue(grid.getCurrent().dataRow, 'ChildItemCode');
            const Company = provider.getValue(grid.getCurrent().dataRow, 'Company');
            const Site = provider.getValue(grid.getCurrent().dataRow, 'Site');

            props.handlerBomGridCellClick(Company, Site, ItemCode);
        };

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
            dataProvider.setRows(props.bomGridData);
            setRowCount(dataProvider.getRowCount());
        }

    },[props.bomGridData])

    return (
        <>
            <div className="grid-section">
                <div className="grid-area">
                    <div style={{height: "400px", background: "#ddd"}}>
                        <div ref={bomGridRef} style={{height: "100%", width: "100%"}}/>
                    </div>
                </div>
                <div className="grid-bottom">
                    <div className="grid-total">
                        총 {rowCount}개
                        {/*(현재페이지 0/전체페이지 000000)*/}
                    </div>
                </div>
            </div>
        </>

    )
}

export {MDM_PRG_A0204010000_BOM_GRID}