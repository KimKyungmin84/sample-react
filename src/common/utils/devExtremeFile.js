import React, { useState, useEffect } from "react";
import AxiosCustomInstance from "../api/AxiosCustomInstance";
import { treeData } from "./treeData";
import 'devextreme/dist/css/dx.light.css';
import SelectBox from 'devextreme-react/select-box';
import RadioGroup from 'devextreme-react/radio-group';
import DateRangeBox from 'devextreme-react/date-range-box';
import Form, { SimpleItem } from 'devextreme-react/form';
import CheckBox from 'devextreme-react/check-box';
import { TextBox } from 'devextreme-react/text-box';
import { TreeList, Selection, Column } from 'devextreme-react/tree-list';

export const CompanyComponent2 = ({handleInputChange}) => {
    const [options, setOptions] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosCustomInstance({}).get("http://localhost:10000/member/comCodeList");
                const comData = response.data; // 콤보 데이터

                if (comData && comData.length > 0) {
                    const newOptions = comData.map(item => ({
                        value: item.comCode,
                        label: item.comCode
                    }));
                    setOptions(newOptions);
                }
            } catch (error) {
                console.error("Error fetching companyData:", error);
            }
        };

        fetchData();
    }, []);

    return(
        <div className="search-cate">
            <div className="sc-box">
                <h5 className="sc-tit">Company</h5>
                <div className="sc-cont">
                    <SelectBox 
                        id="comCode"
                        placeholder="선택"
                        showClearButton={true}
                        dataSource={options}
                        displayExpr="label"
                        valueExpr="value"
                        onValueChanged={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export const PoIdComponent = ({handleInputChange}) => {
    const [options, setOptions] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosCustomInstance({}).get("http://localhost:10000/member/comCodeList");
                const comData = response.data; // 콤보 데이터

                if (comData && comData.length > 0) {
                    const newOptions = comData.map(item => ({
                        value: item.comCode,
                        label: item.comCode
                    }));
                    setOptions(newOptions);
                }
            } catch (error) {
                console.error("Error fetching companyData:", error);
            }
        };

        fetchData();
    }, []);

    const [options2, setOptions2] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosCustomInstance({}).get("http://localhost:10000/member/cityList");
                const comData = response.data; // 콤보 데이터

                if (comData && comData.length > 0) {
                    const newOptions2 = comData.map(item => ({
                        value: item.cityCode,
                        label: item.cityNm
                    }));
                    setOptions2(newOptions2);
                }
            } catch (error) {
                console.error("Error fetching companyData:", error);
            }
        };

        fetchData();
    }, []);

    return(
        <div className="search-cate">
            <div className="sc-box">
                <h5 className="sc-tit">PO ID</h5>
                <div className="sc-cont">
                    <SelectBox 
                        id="poId1"
                        placeholder="ALL"
                        showClearButton={true}
                        dataSource={options}
                        displayExpr="label"
                        valueExpr="value"
                        onValueChanged={handleInputChange}
                    />
                    <SelectBox 
                        id="poId2"
                        placeholder="ALL"
                        showClearButton={true}
                        dataSource={options2}
                        displayExpr="label"
                        valueExpr="value"
                        onValueChanged={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export const LastComponent = ({handleInputChange}) => {
    const [options, setOptions] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosCustomInstance({}).get("http://localhost:10000/member/cityList");
                const comData = response.data; // 콤보 데이터

                if (comData && comData.length > 0) {
                    const newOptions = comData.map(item => ({
                        value: item.cityCode,
                        label: item.cityNm
                    }));
                    setOptions(newOptions);
                }
            } catch (error) {
                console.error("Error fetching companyData:", error);
            }
        };

        fetchData();
    }, []);

    return(
        <div className="search-cate">
            <div className="sc-box">
                <h5 className="sc-tit">LAST</h5>
                <div className="sc-cont">
                    <SelectBox 
                        id="last"
                        placeholder="ALL"
                        showClearButton={true}
                        dataSource={options}
                        displayExpr="label"
                        valueExpr="value"
                        onValueChanged={handleInputChange}
                    />
                    <CheckBox 
                        id="lastCheck"
                        defaultValue={false} 
                        text="Exists In Order Only" 
                        onValueChanged={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export const ToolingComponent = ({handleInputChange}) => {
    return(
        <div className="search-cate">
            <div className="sc-box">
                <div className="options">
                    <h5 className="sc-tit">
                        <div className="caption">TOOLING</div>
                    </h5>
                    <div className="option">
                        <CheckBox id="tooling1" defaultValue={false} text="Nike" onValueChanged={handleInputChange} />
                        <CheckBox id="tooling2" defaultValue={false} text="Factory" onValueChanged={handleInputChange} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const LineComponent = ({handleInputChange}) => {
    
    return(
        <div className="search-cate">
            <div className="sc-box">
                <h5 className="sc-tit">Line</h5>
                <div className="sc-cont">
                    <TextBox id="line" placeholder="입력" showClearButton={true} onValueChanged={handleInputChange} />
                </div>
            </div>
        </div>
    );
};

export const UseYnComponent2 = ({handleInputChange}) => {
    const useYn = ['All', 'Y', 'N'];
    
    return(
        <div className="search-cate">
            <div className="sc-box">
                <h5 className="sc-tit">사용여부</h5>
                <div className="sc-cont">
                    <RadioGroup 
                        id="useYn" 
                        items={useYn} 
                        defaultValue={useYn[0]} 
                        layout="horizontal" 
                        onValueChanged={handleInputChange} 
                    />
                </div>
            </div>
        </div>
    );
};

export const ConfirmComponent2 = ({handleInputChange}) => {
    const confirmYn = ['All', 'P', 'Y', 'N'];

    return(
        <div className="search-cate">
            <div className="sc-box">
                <h5 className="sc-tit">확정여부</h5>
                <div className="sc-cont">
                    <RadioGroup 
                        id="confirmYn" 
                        items={confirmYn} 
                        defaultValue={confirmYn[0]} 
                        layout="horizontal" 
                        onValueChanged={handleInputChange} 
                    />
                </div>
            </div>
        </div>
    );
};

export const PeriodComponent = ({handleInputChange}) => {
    const msInDay = 1000 * 60 * 60 * 24;
    const now = new Date();
    const initialValue = [
        new Date(now.getTime() - msInDay * 3),
        new Date(now.getTime()),
    ];

    return(
        <div className="search-cate">
            <div className="sc-box">
                <h5 className="sc-tit">Period</h5>
                <div className="sc-cont">
                    <DateRangeBox defaultValue={initialValue} showClearButton />
                </div> 
            </div>
        </div>
    );
};

export const PeriodComponent2 = ({handleInputChange}) => {
    const Period = ['PLAN DATE', 'OGAC'];
    const periodOptions = { width: '100%', value: new Date() };

    return(
        <div className="search-cate">
            <div className="sc-box">
                <h5 className="sc-tit">Period2</h5>
                <div className="sc-cont">
                    <RadioGroup 
                        id="period2Yn" 
                        items={Period} 
                        defaultValue={Period[0]} 
                        layout="horizontal" 
                        onValueChanged={handleInputChange} 
                    />
                    <Form>
                        <SimpleItem editorType="dxDateBox" editorOptions={periodOptions} />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export const TreeComponent = ({handleInputChange}) => {
    const expandedRowKeys = [1, 2, 5, 7, 8];

    return(
        <div>
            <TreeList
                id="treeData"
                dataSource={treeData}
                allowColumnReordering={true}
                allowColumnResizing={true}
                showBorders={true}
                defaultExpandedRowKeys={expandedRowKeys}
                keyExpr="ID"
                parentIdExpr="Head_ID"
                onSelectionChanged={handleInputChange}
            >
                <Selection recursive={true} mode="multiple" />
                <Column dataField="Company" />
            </TreeList>
        </div>
    );
};