import { useState, forwardRef, useImperativeHandle } from "react";
import AxiosCustomInstance from "../../../common/api/AxiosCustomInstance";
import DataGrid, { Scrolling, Column } from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.light.css";
import { InputComponent } from "../../../common/utils/commonFilter";

const ModelProductContent = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({});
  const [gridData, setGridData] = useState();
  const [remoteDataSource, setRemoteDateSource] = useState();

  // 부모 폼에서 자식 function 쓰게 하는 문법.
  useImperativeHandle(ref, () => ({
    handleFetchButtonClick,
  }));

  const handleFetchButtonClick = async (event) => {
    try {
      const response = await AxiosCustomInstance({}).post(
        "http://localhost:10000/filter/ModelProductPopup",
        formData
      );
      const data = response.data;
      // console.log(data);
      setGridData(data);
      setRemoteDateSource(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const rowclickevent = (e) => {
    // parent form 에 value 값 보내주기
    props.setModelNM(e.values[0]);
    props.setProductCD(e.values[1]);
  };

  // Server: ModelName
  const modelvaluechangeevent = (e) => {
    props.setModelNM(e.value);
    formData.ModelName = e.value;
  };

  // Server: ProductCode
  const Productvaluechangeevent = (e) => {
    props.setProductCD(e.value);
    formData.ProductCode = e.value;
  };

  return (
    <>
      <InputComponent
        name="Model"
        // handleInputChange={handleInputChange}
        value={props.ModelNM}
        handleInputChange={modelvaluechangeevent}
      ></InputComponent>
      <InputComponent
        name="Product"
        // handleInputChange={handleInputChange}
        value={props.ProductCD}
        handleInputChange={Productvaluechangeevent}
      ></InputComponent>
      <button onClick={handleFetchButtonClick}>Search</button>
      <DataGrid
        height={300}
        dataSource={remoteDataSource}
        onRowClick={rowclickevent}
        showBorders={true}
        remoteOperations={true}
        wordWrapEnabled={true}
      >
        <Scrolling mode="virtual" rowRenderingMode="virtual" />
        <Column dataField="ModelNM" />
        <Column dataField="ProductCD" />
      </DataGrid>
      <button onClick={() => props.sethidestate(false)}>confirm</button>
    </>
  );
});

export default ModelProductContent;
