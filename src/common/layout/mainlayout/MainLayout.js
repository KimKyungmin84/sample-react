import React, { ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Left from "./Left";

function MainLayout() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
            <Left />
          </div>
          <div className="col-sm-8 justify-content-center">
          <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
