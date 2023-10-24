import React, {useEffect, useRef, useState} from "react";
import {GridView, LocalDataProvider} from "realgrid";
import {columns, fields, options} from "./MDM_PRG_A0204010000_BOM_GRID_DATA";

const MDM_PRG_A0204010000_BOM_GRID = (props) => {
    const bomGridRef = useRef(null);
    const [gridView, setGridView] = useState(null);
    const [dataProvider, setDataProvider] = useState(null);

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


        grid.onCellClicked = function (grid) {
            // console.log('VALUE : ', provider.getValue(grid.getCurrent().dataRow, 'ParentItemCode'));
            // props.setRoutingFormData(provider.getValue(grid.getCurrent().dataRow, 'ParentItemCode'));
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
                        총 00개(현재페이지 0/전체페이지 000000)
                    </div>
                </div>
            </div>
        </>

    )
}

export {MDM_PRG_A0204010000_BOM_GRID}