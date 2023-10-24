import "../../../assets/aside.css";
import { ReactComponent as Close } from "../../../image/close.svg";
import { Button } from "devextreme-react";
import {
  InputComponent,
  RadioComponent,
  SelectComponent
} from "../../../common/utils/commonFilter";
import { useState } from "react";

export const ASIDE_A0105000000 = ({handleInputChange, handleFetchButtonClick}) => {
  const [formData, setFormData] = useState({});

  const closeAside = () => {
    document.querySelector('.split-container').style.cssText = '--react-split-min-primary: 20px; --react-split-min-secondary: calc(100% - 300px); --react-split-primary: 0px; --react-split-splitter: 5px';
  }

  return (
    <div className="aside-scroll">
      <div className="search-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
          <rect x="8.98926" y="9.90332" width="2" height="7" transform="rotate(-45 8.98926 9.90332)" fill="white"/>
          <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="2"/>
        </svg>
        <span className="search-tit">Search</span>
      </div>

      <span className="as-close" onClick={closeAside}>
        <Close/>
      </span>

      <div className="search-cate">

        <div className="sc-box">
          <SelectComponent
            id="cbo_Company"
            name="Company"
            url="http://localhost:10000/filter/filterCompany"
            handleInputChange={handleInputChange}
            paramValue={formData.Company}
          ></SelectComponent>
        </div>

        <div className="sc-box">
          <SelectComponent
            id="cbo_Factory"
            name="Factory"
            url="http://localhost:10000/filter/filterFactory"
            handleInputChange={handleInputChange}
            paramValue={formData.Factory}
          ></SelectComponent>
        </div>

        <div className="sc-box">
          <SelectComponent
            id="cbo_Plant"
            name="Plant"
            url="http://localhost:10000/filter/filterPlant"
            handleInputChange={handleInputChange}
            paramValue={formData.Plant}
          ></SelectComponent>
        </div>

        <div className="sc-box">
          <SelectComponent
            id="cbo_Oper"
            name="Oper"
            url="http://localhost:10000/filter/filterOper"
            handleInputChange={handleInputChange}
            paramValue={formData.Oper}
          ></SelectComponent>
        </div>

        <div className="sc-box">
          <InputComponent
            id="tb_Line"
            name="Line"
            handleInputChange={handleInputChange}
          ></InputComponent>
        </div>

        <div className="sc-box">
          <InputComponent
            id="tb_LineName"
            name="LineName"
            handleInputChange={handleInputChange}
          ></InputComponent>
        </div>

        <div className="sc-box">
          <RadioComponent
              id="rad_VirtualYn"
              name="VirtualYn"
              type="VIRTUAL_TYPE"
              handleInputChange={handleInputChange}
          ></RadioComponent>
        </div>

        <div className="sc-box">
          <RadioComponent
            id="rad_UseYn"
            name="UseYn"
            type="USE_TYPE"
            handleInputChange={handleInputChange}
          ></RadioComponent>
        </div>

        <div className="sc-box">
          <RadioComponent
            id="rad_ConfirmYn"
            name="ConfirmYn"
            type="CONFIRM_TYPE"
            handleInputChange={handleInputChange}
          ></RadioComponent>
        </div>
      </div>
      <Button type="button" className="search-button" text="조회" onClick={handleFetchButtonClick} />
    </div>
  )
}