import { RadioGroup, TextBox } from "devextreme-react";
import "../../../assets/aside.css";
import { ReactComponent as Close } from "../../../image/close.svg";
import { Button } from "devextreme-react";
import {InputComponent, RadioComponent} from "../../../common/utils/commonFilter";

export const ASIDE_A0306020000 = ({handleInputChange, handleFetchButtonClick}) => {

  // const searchUse = ['All', 'Y', 'N']
  // const searchConfirm = ['All', 'P', 'Y', 'N']

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
            <div className="sc-cont">
              <InputComponent
                  id="tb_DefectGroupName"
                  name="Defect Group Name"
                  handleInputChange={handleInputChange}
              ></InputComponent>
              {/*<TextBox inputAttr="" className="dx-field-value" defaultValue="" />*/}
            </div>
          </div>

          <div className="sc-box">
            <div className="sc-cont">
              <InputComponent
                  id="tb_DefectType"
                  name="Defect Type"
                  handleInputChange={handleInputChange}
              ></InputComponent>
              {/*<TextBox inputAttr="" className="dx-field-value" defaultValue="" />*/}
            </div>
          </div>

          <div className="sc-box">
            <div className="sc-cont">
              <RadioComponent
                  id="rad_UseYn"
                  name="UseYn"
                  type="USE_TYPE"
                  handleInputChange={handleInputChange}
              ></RadioComponent>
              {/*<RadioGroup className="radio-group" items={searchUse} defaultValue={searchUse[0]} />*/}
            </div>
          </div>

          <div className="sc-box">
            <div className="sc-cont">
              <RadioComponent
                  id="rad_ConfirmYn"
                  name="ConfirmYn"
                  type="CONFIRM_TYPE"
                  handleInputChange={handleInputChange}
              ></RadioComponent>
              {/*<RadioGroup className="radio-group" items={searchConfirm} defaultValue={searchConfirm[0]} />*/}
            </div>
          </div>
        </div>

        <Button type="button" className="search-button" text="조회" onClick={handleFetchButtonClick} />
      </div>
    )
}