import { useState, useEffect, useRef } from "react";
import {
  SelectComponent,
  InputComponent,
  RadioComponent,
  ModelNamePopup,
} from "../../../common/utils/commonFilter";

function CommonFilterTest() {
  const [formData, setFormData] = useState({});

  // model/product 팝업 사용시 추가
  const [modelname, setModelName] = useState();
  const [productcode, setProductCode] = useState();

  // Hierarchy 하위 컴포넌트, 초기 값 지정이 필요한 컴포넌트 Ref 선언
  const factoryRef = useRef("");
  const plantRef = useRef("");
  const text1Ref = useRef("");
  const confirmRef = useRef("");

  // formData 초기 값 지정
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      [text1Ref.current.props.name]: text1Ref.current.props.defaultValue,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [confirmRef.current.props.name]: confirmRef.current.props.defaultValue,
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
    // multiSelect
    else if (e.component.NAME === "dxDataGrid") {
      if (e.currentDeselectedRowKeys.length > 0) {
        name = e.currentDeselectedRowKeys[0].name;
      } else {
        name = e.selectedRowKeys[0].name;
      }
      let arr = (e.selectedRowKeys.length && e.selectedRowKeys) || [];
      let str = "";
      arr.forEach((element) => {
        const separator = ",";
        if (str.length === 0) {
          str = str + element.value;
        } else {
          str = str + separator + element.value;
        }
      });
      value = str;
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
  const handleFetchButtonClick = () => {
    // model/product 팝업 사용시 추가
    formData.ModelName = modelname;
    formData.ProductCode = productcode;

    console.log("formData", formData);
  };

  /** Start Hierarchy [최상위 SelectBox는 적용 X] **/
  // Company 변경 시 Factory, Plant 초기화
  useEffect(() => {
    if (factoryRef.current.props.dataSource[0] !== undefined) {
      setFormData((prevData) => ({
        ...prevData,
        ["Factory"]: factoryRef.current.props.dataSource[0].value,
      }));
    }
    if (plantRef.current.props.dataSource[0] !== undefined) {
      setFormData((prevData) => ({
        ...prevData,
        ["Plant"]: plantRef.current.props.dataSource[0].value,
      }));
    }
  }, [formData.Company]);

  // Factory 변경 시 Plant 초기화
  useEffect(() => {
    if (plantRef.current.props.dataSource[0] !== undefined) {
      setFormData((prevData) => ({
        ...prevData,
        ["Plant"]: plantRef.current.props.dataSource[0].value,
      }));
    }
  }, [formData.Factory]);

  // fetchData를 부모에 전달하기 위한 dataList (DB 조회를 한번만 하기 위함)
  const [formDataList, setFormDataList] = useState({});

  const handleDataFetch = (e) => {
    setFormDataList((prevData) => ({
      ...prevData,
      [Object.keys(e)[0]]: e[Object.keys(e)[0]],
    }));
  };
  /** End Hierarchy **/

  return (
    <>
      <div className="col-sm-4">
        <div className="">
          {/* col-md-2 bg-light */}
          <nav className="mt-2">
            <ul className="nav flex-column">
              <li className="nav-item">
                <SelectComponent
                  id="cbo_Company"
                  name="Company"
                  url="http://localhost:10000/filter/filterCompany"
                  handleInputChange={handleInputChange}
                  paramValue={formData.Company}
                ></SelectComponent>
              </li>
              <li className="nav-item">
                <SelectComponent
                  id="cbo_Factory"
                  name="Factory"
                  url="http://localhost:10000/filter/filterFactory"
                  handleInputChange={handleInputChange}
                  paramValue={formData.Factory}
                  ref={factoryRef}
                  hierarchyParam={{ param01: formData.Company }}
                  fetchDataList={formDataList.Factory}
                  handleDataFetch={handleDataFetch}
                ></SelectComponent>
              </li>
              <li className="nav-item">
                <SelectComponent
                  id="cbo_Plant"
                  name="Plant"
                  url="http://localhost:10000/filter/filterPlant"
                  handleInputChange={handleInputChange}
                  paramValue={formData.Plant}
                  isSelect={true}
                  ref={plantRef}
                  hierarchyParam={{
                    param01: formData.Company,
                    param02: formData.Factory,
                  }}
                  fetchDataList={formDataList.Plant}
                  handleDataFetch={handleDataFetch}
                ></SelectComponent>
              </li>
              <li className="nav-item">
                <SelectComponent
                  id="cbo_Oper"
                  name="Oper"
                  url="http://localhost:10000/filter/filterOper"
                  handleInputChange={handleInputChange}
                  codeName={{ value: "Code", label: "Code" }}
                  isMultiSelect={true}
                ></SelectComponent>
              </li>
              <li className="nav-item">
                <InputComponent
                  id="tb_Text1"
                  name="Text1"
                  handleInputChange={handleInputChange}
                  ref={text1Ref}
                  defaultValue="테스트입니다."
                ></InputComponent>
              </li>
              <li className="nav-item">
                <InputComponent
                  id="tb_Text2"
                  name="Text2"
                  handleInputChange={handleInputChange}
                ></InputComponent>
              </li>
              <li className="nav-item">
                <RadioComponent
                  id="rad_UseYn"
                  name="UseYn"
                  type="USE_TYPE"
                  handleInputChange={handleInputChange}
                ></RadioComponent>
              </li>
              <li className="nav-item">
                <RadioComponent
                  id="rad_ConfirmYn"
                  name="ConfirmYn"
                  type="CONFIRM_TYPE"
                  handleInputChange={handleInputChange}
                  ref={confirmRef}
                  defaultValue="P"
                ></RadioComponent>
              </li>
              <li className="nav-item">
                <ModelNamePopup
                  handleInputChange={handleInputChange}
                  setModelName={setModelName}
                  setProductCode={setProductCode}
                />
              </li>
              <li>
                <button onClick={handleFetchButtonClick}>조회</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default CommonFilterTest;
