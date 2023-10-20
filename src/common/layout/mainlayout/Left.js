import { useState } from "react";
import { Link } from "react-router-dom";
function Left() {
  
  return (
    <div className="col-md-2 bg-light">
      <nav className="mt-2">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              SpreadJS 샘플
            </Link>
            <Link to="/devExtremeComponent" className="nav-link">
              DevExtreme 샘플
            </Link>
            <Link to="/commonFilterSample" className="nav-link">
              공통필터 샘플
            </Link>
            <Link to="/companySample" className="nav-link">
              CompanySample
            </Link>
            <Link to="/companySample2" className="nav-link">
              CompanySample2
            </Link>
            <Link to="/lineInformation" className="nav-link">
              TKG(1번) 샘플
            </Link>
            <Link to="/operation" className="nav-link">
              TKG(2번) 샘플
            </Link>
            <li className="nav-link">
              -------------------
            </li>
            <Link to="/site/MDM_PRG_A0105000000" className="nav-link">
              Grid-MDM_PRG_A0105000000
            </Link>
            <li className="nav-link">
              -------------------
            </li>
          </li>
          <li className="nav-item">
            <Link to="/menuSlider" className="nav-link">
              비동기처리후 페이지이동
            </Link>
            <Link to="/testComponent" className="nav-link">
            사용자훅 사용
            </Link>
            <Link to="/testComponent2" className="nav-link">
            화면로드시 셋팅
            </Link>
            <Link to="/testComponent3" className="nav-link">
            검색조건 조회
            </Link>
            <Link to="/realgridComponent" className="nav-link">
            리얼그리드
            </Link>
            <Link to="/realgridComponent2" className="nav-link">
            리얼그리드2
            </Link>
            <Link to="/multiLangComponent" className="nav-link">
            다국어
            </Link>
            <Link to="/loggingComponent" className="nav-link">
            로깅시간
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Left;
