// commonFilter.js ->
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
} from "react";
import AxiosCustomInstance from "../api/AxiosCustomInstance";
import SelectBox from "devextreme-react/select-box";
import { TextBox, Button as TextBoxButton } from "devextreme-react/text-box";
import RadioGroup from "devextreme-react/radio-group";
import { Popup } from "devextreme-react/popup";
import ModelProductContent from "../../components/pages/PopupTest/ModelProductContent";
import { useTranslation } from "react-i18next";
import DropDownBox from "devextreme-react/drop-down-box";
import DataGrid, { Selection, Scrolling } from "devextreme-react/data-grid";

/**
   [ select component ]
   셀렉트 박스의 공통화
  
   properties(props 항목, *는 필수 값)
 * 1.  id                   (String) 셀렉트 박스의 ID
 * 2.  name                 (String) 셀렉트 박스 상단의 라벨과 셀렉트 박스에 지정될 name.
 * 3.  url                  (String) 셀렉트 박스 조회 시 사용 될 URL.
 * 4.  handleInputChange    (Function) 부모 단에서 정의한 함수이며, Onchange 이벤트에 걸릴 함수.
   5.  paramValue           (String) 셀렉트 박스 value 값 (MultiSelect가 아닐 경우 필수 값 !)
   6.  codeName             (Object) 셀렉트 박스 조회 시 사용 될 Value/Label (default: Code/Code)  ex) { value: Code, lable: Code}, { value: Code, label: Name }
   7.  isSelect             (Boolean) 초기값 변경. 지정 값 false: "ALL", true: "Select".
   8.  isMultiSelect        (Boolean) multiSelect/singleSelect. 지정 값 true/false

  <!-- Hierarchy Param (하위 컴포넌트만 적용) Begin >
   9.  ref                  (Ref) 자식 컴포넌트와 부모 컴포넌트를 연결하기 위한 파라미터
  10.  hierarchyParam       (Object) 부모 값 파라미터 ex) {param01: formData.Company, param02: formData.Factory ...}
  11.  fetchDataList        (Array) fetchData를 자식에서 받는 파라미터 (DB 조회를 한번만 하기 위함)
  12.  handleDataFetch      (Function) fetchData를 부모로 넘겨주는 이벤트
  <!-- Hierarchy Param End >
 */
export const SelectComponent = forwardRef((props, ref) => {
  const [options, setOptions] = useState([]);
  const [paramValue, setParamValue] = useState();

  let dataList;

  // 다국어 처리
  const { t } = useTranslation();

  // codeName 관련 변수 선언
  let codeName =
    props.codeName === undefined
      ? { value: "Code", label: "Code" }
      : props.codeName;
  let valueName = codeName.value === "Code" ? props.name : codeName.value;
  let labelName = codeName.label === "Code" ? props.name : codeName.label;

  // multiSelect
  const [arrayList, setArrayList] = useState([]);
  const [comboValue, setComboValue] = useState(null);

  // MultiSelect 시 DropDown에 들어갈 Grid 처리 (DropDown안에 Grid가 들어감)
  const dataGridRender = () => {
    const dataGridOnSelectionChanged = (e) => {
      // MultiSelect에서 Item 선택 시 해당 Value 값을 배열로 담아놓음
      let arr = (e.selectedRowKeys.length && e.selectedRowKeys) || [];
      let newArr = [];

      arr.forEach((element) => {
        newArr.push(element.value);
      });
      setComboValue(newArr);
      props.handleInputChange(e);
    };
    const dataCellClick = (e) => {
      if (e.rowType === "header") {
        let dataGrid = e.component;
        dataGrid.clearSelection();
      }
    };
    return (
      <DataGrid
        id={props.id}
        dataSource={arrayList}
        columns={["ALL"]}
        height={345}
        hoverStateEnabled={true}
        onSelectionChanged={(e) => {
          dataGridOnSelectionChanged(e);
        }}
        onCellClick={dataCellClick}
      >
        <Selection mode={props.isMultiSelect ? "multiple" : "single"} />
        <Scrolling mode="virtual" />
      </DataGrid>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosCustomInstance({}).get(props.url);
        dataList = response.data; // dataList

        const dataObj = { [props.name]: dataList };
        if (props.handleDataFetch !== undefined) {
          props.handleDataFetch(dataObj);
        }
        // Defalut Value 처리
        let newFirstElement;

        if (props.isSelect) {
          newFirstElement = {
            value: "Select",
            label: t("Select"),
            name: props.name,
          };
        } else {
          newFirstElement = {
            value: "",
            label: t("ALL"),
            name: props.name,
          };
        }

        if (dataList && dataList.length > 0) {
          let newOptions = dataList.map((item) => ({
            value: item[valueName],
            label: item[labelName],
            name: props.name,
            ALL: item[valueName],
          }));

          let newArray = [newFirstElement].concat(newOptions);
          setOptions(newArray);

          // multiSelect 일 경우 defalut value 필요없음
          if (props.isMultiSelect !== undefined) {
            // value 프로퍼티를 ALL 프로퍼티에 할당
            newOptions.value = newOptions.ALL;

            // 기존 value 프로퍼티 제거
            delete newOptions.value;
            setArrayList(newOptions);
          }
        } else {
          // dataList가 없을 경우 Select/ALL만 바인딩
          setOptions([newFirstElement]);
        }
      } catch (error) {
        console.error("Error fetching " + props.name + ":", error);
      }
    };
    fetchData();
  }, []);

  // Hierarchy 처리
  useEffect(() => {
    if (
      props.hierarchyParam !== undefined &&
      props.fetchDataList !== undefined
    ) {
      dataList = props.fetchDataList;

      for (const key in props.hierarchyParam) {
        let result = dataList.filter((data) =>
          props.hierarchyParam[key] === undefined
            ? 1 === 1
            : data[key].includes(props.hierarchyParam[key])
        );
        dataList = result;
      }
    }
    // Defalut Value 처리
    let newFirstElement;

    if (props.isSelect) {
      newFirstElement = {
        value: "Select",
        label: t("Select"),
        name: props.name,
      };
    } else {
      newFirstElement = { value: "", label: t("ALL"), name: props.name };
    }

    if (dataList && dataList.length > 0) {
      let newOptions = dataList.map((item) => ({
        value: item[valueName],
        label: item[labelName],
        name: props.name,
      }));

      let newArray = [newFirstElement].concat(newOptions);
      setOptions(newArray);
    } else {
      // dataList가 없을 경우 Select/ALL만 바인딩
      setOptions([newFirstElement]);
    }
  }, [props.hierarchyParam]);

  useEffect(() => {
    setParamValue(props.paramValue);
  }, [props.paramValue]);

  if (props.isMultiSelect !== undefined) {
    return (
      <>
        <h5 className="sc-tit">
          {props.name}
        </h5>
        <div className="sc-cont">
          <DropDownBox
            id={props.id}
            // Grid에서 선택한 Value값(comboValue)을 value로 담아줌 (useState 활용)
            value={comboValue}
            dataSource={options}
            displayExpr="label"
            valueExpr="value"
            defaultValue={props.isSelect ? "Select" : ""}
            ref={ref}
            contentRender={dataGridRender}
            placeholder="ALL"
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <h5 className="sc-tit">
          {props.name}
        </h5>
        <div className="sc-cont">
          <SelectBox
            id={props.id}
            name={props.name}
            className="sc-select"
            selectedItem={props.isSelect ? "Select" : ""}
            dataSource={options}
            displayExpr="label"
            valueExpr="value"
            onItemClick={props.handleInputChange}
            defaultValue={props.isSelect ? "Select" : ""}
            ref={ref}
            value={
              paramValue === undefined
                ? props.isSelect
                  ? "Select"
                  : ""
                : paramValue
            }
          />
        </div>
      </>
    );
  }
});

/**
   [ input component ]
   인풋 박스의 공통화
  
   prameters(*는 필수 값)
 * 1.  handleInputChange    (Function) 부모 단에서 정의한 함수이며, Onchange 이벤트에 걸릴 함수.
 * 2.  id                   (String) 인풋 박스의 ID     ex) tb_Textbox1
 * 3.  name                 (String) 인풋 박스 상단의 라벨과 인풋 박스에 지정될 name.
   4.  ref                  (Ref) 자식 컴포넌트와 부모 컴포넌트를 연결하기 위한 파라미터 (초기 값 지정)
   5.  defaultValue         (String) 인풋 박스 default value (수정 필요)
 */
export const InputComponent = forwardRef((props, ref) => {
  const { t } = useTranslation();
  return (
    <>
      <h5 className="sc-tit">
        {props.name}
      </h5>
      <div className="sc-cont">
        <TextBox
          showClearButton={true}
          id={props.id}
          name={props.name}
          onValueChanged={props.handleInputChange}
          defaultValue={props.defaultValue}
          ref={ref}
        />
      </div>
    </>
  );
});

/**
   [ radio component ]
   라디오 박스의 공통화
  
   prameters(*는 필수 값)
 * 1.  id                   (String) 라디오 박스의 ID   ex) rad_UseYn
 * 2.  name                 (String) 라디오 박스 상단의 라벨과 라디오 박스에 지정될 name.
 * 3.  type                 (String) CodeType   ex) USE_TYPE, CONFIRM_TYPE ...
 * 4.  handleInputChange    (Function) 부모 단에서 정의한 함수이며, Onchange 이벤트에 걸릴 함수.
   6.  ref                  (Ref) 자식 컴포넌트와 부모 컴포넌트를 연결하기 위한 파라미터 (초기 값 지정)
   5.  defalutValue                (String) 라디오 박스 default value (수정 필요)
 */
export const RadioComponent = forwardRef((props, ref) => {
  const [options, setOptions] = useState([]);
  const [defaultVal, setDefalutVal] = useState("");
  var defVal = props.defaultValue === undefined ? "" : props.defaultValue;
  const { t } = useTranslation();
  let dataList;
  // radio filter 기본 url
  let url = "http://localhost:10000/filter/filterRadio";

  // parameter
  let paramType = {};
  paramType.Type = props.type;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosCustomInstance({}).post(url, paramType);
        dataList = response.data;

        if (dataList && dataList.length > 0) {
          let newOptions = dataList.map((item) => ({
            value: item.value,
            label: item.label,
            name: props.name,
          }));

          // defaultValue 처리
          let flag = false;

          newOptions.forEach((obj) => {
            if (obj.value === defVal) {
              flag = true;
            }
          });

          if (!flag) {
            defVal =
              newOptions[0].value === undefined ? null : newOptions[0].value;
          }

          setOptions(newOptions);
        }
      } catch (error) {
        console.error("Error fetching " + props.name + ":", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h5 className="sc-tit">
        {props.name}
      </h5>
      <div className="sc-cont">
        <RadioGroup
          id={props.id}
          name={props.name}
          accessKey={props.name}
          items={options}
          defaultValue={defVal}
          valueExpr="value"
          displayExpr="label"
          layout="horizontal"
          ref={ref}
          onValueChanged={props.handleInputChange}
        />
      </div>
    </>
  );
});

/* 팝업 컴포넌트 */
export const ModelNamePopup = (props) => {
  const { t } = useTranslation();
  const [hidestate, sethidestate] = useState(false); // popup 화면 숨김 여부 컨트롤
  const [ModelNM, setModelNM] = useState();
  const [ProductCD, setProductCD] = useState();
  // 부모 func. 에서 자식 func. 함수 호출 위한 ref
  const ModelProductRef = useRef();

  // popup 화면 숨김 여부 컨트롤 func.
  const visiblecontrol = useCallback(() => {
    sethidestate(false);
  });

  const modelvaluechangeevent = (e) => {
    setModelNM(e.value);
    props.setModelName(e.value);
  };

  const Productvaluechangeevent = (e) => {
    setProductCD(e.value);
    props.setProductCode(e.value);
  };

  // 자식인 ModelProductContent Data 에 있는
  // handleFetchButtonClick() 함수 사용하여
  // '돋보기' 버튼 클릭 시에 ModelNM에 있는 데이터 사용 하여 1차 fetch
  function ModelProductEvent() {
    ModelProductRef.current.handleFetchButtonClick();
  }

  return (
    <>
      {/* <form method="post" onSubmit={handleSubmit}> */}
      <div>
        {t("ModelNM")}:
        <>
          <TextBox
            showClearButton={true}
            name="ModelNM"
            value={ModelNM || ""}
            onValueChanged={modelvaluechangeevent}
          >
            <TextBoxButton name="clear" />
            <TextBoxButton
              name="password"
              location="after"
              options={{
                icon: "find",
                type: "default",
                onClick: () => {
                  sethidestate(true);
                  ModelProductEvent();
                },
              }}
            />
          </TextBox>
        </>
      </div>
      <p />
      {t("ProductCode")}:
      <>
        <TextBox
          showClearButton={true}
          name="ProductCode"
          onValueChanged={Productvaluechangeevent}
          value={ProductCD || ""}
        />
      </>
      <p />
      {/* </form> */}
      <Popup
        visible={hidestate}
        showCloseButton={true}
        onHiding={visiblecontrol}
        hideOnOutsideClick={true}
        showTitle={true}
        title={t("Model/Product")}
        width={700}
        height={480}
      >
        {/* <ScrollView width="100%" height="100%" direction="both"> */}
        <ModelProductContent
          ModelNM={ModelNM}
          ProductCD={ProductCD}
          setModelNM={setModelNM}
          setProductCD={setProductCD}
          sethidestate={sethidestate}
          ref={ModelProductRef}
        />
        {/* </ScrollView> */}
      </Popup>
    </>
  );
};
