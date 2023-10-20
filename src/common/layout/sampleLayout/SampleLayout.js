import React, { ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Left from "./Left";

function SampleLayout() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SampleLayout;
