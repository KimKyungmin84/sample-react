import { useState } from "react";
import { Link } from "react-router-dom";
import {CompanyComponent, UseYnComponent, ConfirmComponent} from "../../utils/file"
import {
  CompanyComponent2,
  PoIdComponent, 
  LastComponent, 
  ToolingComponent, 
  LineComponent, 
  UseYnComponent2, 
  ConfirmComponent2, 
  PeriodComponent, 
  PeriodComponent2
} from "../../utils/devExtremeFile"
function Left() {
  
  return (
    <div className="col-md-2 bg-light">
      <nav className="mt-2">
        <ul className="nav flex-column">
          <li className="nav-item">
            <CompanyComponent/> 
          </li>
          <li className="nav-item">
            <UseYnComponent/>
          </li>
          <li className="nav-item">
            <ConfirmComponent/>
          </li>
          <li className="nav-item">
            <CompanyComponent2/>
          </li>
          <li className="nav-item">
            <PoIdComponent/>
          </li>
          <li className="nav-item">
            <LastComponent/>
          </li>
          <li className="nav-item">
            <ToolingComponent/>
          </li>
          <li className="nav-item">
            <LineComponent/>
          </li>
          <li className="nav-item">
            <UseYnComponent2/>
          </li>
          <li className="nav-item">
            <ConfirmComponent2/>
          </li>
          <li className="nav-item">
            <PeriodComponent/>
          </li>
          <li className="nav-item">
            <PeriodComponent2/>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Left;
