import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserIsLogin } from './store/userState';
import PublicRouter from './router/PublicRouter';
import PrivateRouter from './router/PrivateRouter';
import { URL } from './common/constants/url';
import { Main, Notfound, Error } from "./pages";
import {
  MDM_PRG_A0101000000,
  MDM_PRG_A0105000000,
} from "./pages/Site";
import {
  MDM_PRG_A0302000000,
  MDM_PRG_A0306010000,
  MDM_PRG_A0306020000,
  MDM_PRG_A0308010000
} from "./pages/Reference";
import {
  MDM_PRG_A0204010000,
  MDM_PRG_A0204020000,
  MDM_PRG_A0203000000,
  MDM_PRG_A0201000000,
  MDM_PRG_A0202000000
} from "./pages/Model";
import LayoutProvider from "./Layout"

import Contact from  './components/pages/Contact';
import Login from './components/pages/login/Login';

function App() {

  const isLogin = useRecoilValue(getUserIsLogin);

  // ************ 아래 주석된 내용을 좀 수정해서 페이지이동시 로그인 처리 내용 수정해야 됨 ************
  // const location = useLocation();
  // const [isLogin, setIsLogin] = useRecoilState(getUserIsLogin);

  // // 페이지 이동 시마다 로그인 상태를 업데이트
  // useEffect(() => {
  //   const accessToken = localStorage.getItem("ACCESSTOKEN_KEY");
  //   const newIsLogin = !!accessToken;

  //   if (newIsLogin !== isLogin) {
  //     setIsLogin(newIsLogin);
  //   }
  // }, [location, isLogin, setIsLogin]);


  return (
      <Routes>
        <Route path="/" element={<LayoutProvider />}>
          <Route path="/" element={<Main title="Main" />} />
          <Route path="/site" element={<MDM_PRG_A0101000000 title="Company" />} />

          <Route path="/site/MDM_PRG_A010100000" element={<MDM_PRG_A0101000000
              title="Company"
              firstDepth="SITE"
              secondDepth="Company"
              firstDepthPath="/site"
          />} />
          <Route path="/site/MDM_PRG_A0105000000" element={<MDM_PRG_A0105000000
              title="Line"
              firstDepth="SITE"
              secondDepth="Line"
              firstDepthPath="/site"
          />} />
          <Route path="/reference" element={<MDM_PRG_A0306010000
              title="Part"
              firstDepth="Reference"
              secondDepth="part"
              firstDepthPath="/reference"
          />} />
          <Route path="/reference/MDM_PRG_A0302000000" element={<MDM_PRG_A0302000000
              title="Size"
              firstDepth="Reference"
              secondDepth="Size"
              firstDepthPath="/reference"
          />} />
          <Route path="/reference/MDM_PRG_A0306010000" element={<MDM_PRG_A0306010000
              title="Defect"
              firstDepth="Reference"
              secondDepth="Defect"
              firstDepthPath="/reference"
          />} />
          <Route path="/reference/MDM_PRG_A0306020000" element={<MDM_PRG_A0306020000
              title="Defect"
              firstDepth="Reference"
              secondDepth="Defect"
              firstDepthPath="/reference"
          />} />
          <Route path="/reference/MDM_PRG_A0308010000" element={<MDM_PRG_A0308010000
              title="Last"
              firstDepth="Reference"
              secondDepth="Last"
              firstDepthPath="/reference"
          />} />
          <Route path="/model" element={<MDM_PRG_A0201000000
              title="Model"
              firstDepth="Model"
              secondDepth="Model"
              firstDepthPath="/model"
          />} />
          <Route path="/model/MDM_PRG_A0204010000" element={<MDM_PRG_A0204010000
              title="BOM"
              firstDepth="Model"
              secondDepth="BOM"
              firstDepthPath="/model"
          />} />
          <Route path="/model/MDM_PRG_A0204020000" element={<MDM_PRG_A0204020000
              title="BOM Structure"
              firstDepth="Model"
              secondDepth="BOM Structure"
              firstDepthPath="/model"
          />} />
          <Route path="/model/MDM_PRG_A0203000000" element={<MDM_PRG_A0203000000
              title="Tact Time"
              firstDepth="Model"
              secondDepth="Tact Time"
              firstDepthPath="/model"
          />} />
          <Route path="/model/MDM_PRG_A0201000000" element={<MDM_PRG_A0201000000
              title="Model"
              firstDepth="Model"
              secondDepth="Model"
              firstDepthPath="/model"
          />} />
          <Route path="/model/MDM_PRG_A0202000000" element={<MDM_PRG_A0202000000
              title="Product"
              firstDepth="Model"
              secondDepth="Product"
              firstDepthPath="/model"
          />} />
          <Route path="/error" element={<Error />} />
          <Route path="/server-error" element={<Notfound />} />


          <Route element={<PrivateRouter isAuthenticated={isLogin} />}>
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route element={<PublicRouter isAuthenticated={isLogin} />}>
            <Route path={URL.LOGIN} element={<Login />} />
          </Route>
        </Route>

      </Routes>
  );
}

export default App;
