import {Button} from "devextreme-react";
import "../../../assets/aside.css";
import {ReactComponent as Close} from "../../../image/close.svg";
import {InputComponent, RadioComponent, SelectComponent} from "../../../common/utils/commonFilter";

export const ASIDE_A0201000000 = ({handleInputChange, handleFetchButtonClick}) => {

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
              id="cbo_Category"
              name="Category"
              url={'http://localhost:10000/filter/category'}
              handleInputChange={handleInputChange}
          ></SelectComponent>
        </div>

        <div className="sc-box">
          <SelectComponent
              id="cbo_SubCategory"
              name="SubCategory"
              url={'http://localhost:10000/filter/subCategory'}
              handleInputChange={handleInputChange}
          ></SelectComponent>
        </div>

        <div className="sc-box">
          <InputComponent
              id="ModelId"
              name="ModelId"
              handleInputChange={handleInputChange}
          ></InputComponent>
        </div>

        <div className="sc-box">
          <InputComponent
              id="ModelName"
              name="ModelName"
              handleInputChange={handleInputChange}
          ></InputComponent>
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