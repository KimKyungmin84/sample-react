import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation  } from "react-i18next";
import i18next from "../../lang/i18n";

function Header() {
  const { i18n, t } = useTranslation();

  const key = "hello";
  const translation = i18n.t("COMPANY#1");
  console.log("translation:::::::::::" , translation);
  
  // 번역데이타가 존재하지 않을시 에러페이지 이동부분 추가해야됨
  // 번역 키와 번역 결과가 동일한 경우에는 번역 데이터가 없다고 간주합니다.
  if (translation === key) {
    // return false; // 번역 데이터 없음
    console.log("번역데이타 없음")
  }else{
    // return true; // 번역 데이터 있음
    console.log("번역데이타 있음")
  }
  // 번역데이타가 존재하지 않을시 에러페이지 이동부분 추가해야됨

  const handleChangeLng = (lng) => {
		i18n.changeLanguage(lng);
		localStorage.setItem("lng", lng);
	};

  return (
    <header className="bg-primary text-white py-3">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1>Header</h1>
          </div>
          <div className="col-md-6 text-md-end">
            <button onClick={() => handleChangeLng("EN")}>English</button>
            <button onClick={() => handleChangeLng("KO")}>korean</button>
            <Link to="/login" className="btn btn-light me-2 float-right">
              Login
            </Link>
            <Link to="/" className="btn btn-light me-2 float-right">
              HOME
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
