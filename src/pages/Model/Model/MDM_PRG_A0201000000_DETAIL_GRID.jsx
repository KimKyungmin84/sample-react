import {Button} from "devextreme-react";
import React, {useEffect, useRef, useState} from "react";
import {GridView, LocalDataProvider} from "realgrid";
import {columns, fields, options} from "./MDM_PRG_A0201000000_DETAIL_GRID_DATA";

const MDM_PRG_A0201000000_DETAIL_GRID = (props) => {
    const modelDetailGridRef = useRef(null);
    const [, setGridView] = useState(null);
    const [dataProvider, setDataProvider] = useState(null);
    const [rowCount, setRowCount] = useState(0);

    useEffect(() => {
        const container = modelDetailGridRef.current;
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
            dataProvider.setRows(props.modelDetailGridData);
            setRowCount(dataProvider.getRowCount());
        }
    }, [props.modelDetailGridData])

    return (
        <div className="grid-area">

            <div className="grid-inner" style={{ background: "#ddd" }}>
                <div ref={modelDetailGridRef} style={{height: "100%", width: "100%"}}/>
            </div>

            <div className="grid-bottom">
                <div className="grid-total">
                    총 {rowCount}개
                    {/*(현재페이지 0/전체페이지 000000)*/}
                </div>

                <div className="grid-buttons">
                    <Button className="normal-button" onClick={props.togglePopup}>저장</Button>
                    <Button className="confirm-button" onClick={props.togglePopup2}>확정</Button>
                </div>
            </div>

        </div>
    )
}

export {MDM_PRG_A0201000000_DETAIL_GRID}