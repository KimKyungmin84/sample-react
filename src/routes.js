import React from "react";
import { useRoutes } from "react-router-dom";
import { Main, Notfound, Error } from "./pages";
import {
  MDM_PRG_A0101000000,
  MDM_PRG_A0105000000,
} from "./pages/Site";
import {
  MDM_PRG_A0302000000,
  MDM_PRG_A0306010000,
  MDM_PRG_A0308010000
} from "./pages/Reference";
import {
  MDM_PRG_A0204010000,
  MDM_PRG_A0203000000,
  MDM_PRG_A0201000000,
  MDM_PRG_A0202000000
} from "./pages/Model";
import LayoutProvider from "./Layout"

const AppRoutes = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <LayoutProvider />,
      children: [
        { path: "/", element: <Main title="Main" /> },
        { path: "/site", element: <MDM_PRG_A0101000000 title="Company" /> },
        {
          path: "/site/MDM_PRG_A0101000000",
          element:
            <MDM_PRG_A0101000000
              title="Company"
              firstDepth="SITE"
              secondDepth="Company"
              firstDepthPath="/site"
            />
        },
        {
          path: "/site/MDM_PRG_A0105000000",
          element:
            <MDM_PRG_A0105000000
              title="Line"
              firstDepth="SITE"
              secondDepth="Line"
              firstDepthPath="/site"
            />
        },
        {
          path: "/reference",
          element:
            <MDM_PRG_A0306010000
              title="Part"
              firstDepth="Reference"
              secondDepth="part"
              firstDepthPath="/reference"
            />
        },
        {
          path: "/reference/MDM_PRG_A0302000000",
          element:
            <MDM_PRG_A0302000000
              title="Size"
              firstDepth="Reference"
              secondDepth="Size"
              firstDepthPath="/reference"
            />
        },
        {
          path: "/reference/MDM_PRG_A0306010000",
          element:
            <MDM_PRG_A0306010000
              title="Defect"
              firstDepth="Reference"
              secondDepth="Defect"
              firstDepthPath="/reference"
            />
        },
        {
          path: "/reference/MDM_PRG_A0308010000",
          element:
            <MDM_PRG_A0308010000
              title="Last"
              firstDepth="Reference"
              secondDepth="Last"
              firstDepthPath="/reference"
            />
        },
        {
          path: "/model",
          element:
            <MDM_PRG_A0201000000
              title="Model"
              firstDepth="Model"
              secondDepth="Model"
              firstDepthPath="/model"
            />
        },
        {
          path: "/model/MDM_PRG_A0204010000",
          element:
            <MDM_PRG_A0204010000
              title="BOM"
              firstDepth="Model"
              secondDepth="BOM"
              firstDepthPath="/model"
            />
        },
        {
          path: "/model/MDM_PRG_A0203000000",
          element:
            <MDM_PRG_A0203000000
              title="Tact Time"
              firstDepth="Model"
              secondDepth="Tact Time"
              firstDepthPath="/model"
            />
        },
        {
          path: "/model/MDM_PRG_A0201000000",
          element:
            <MDM_PRG_A0201000000
              title="Model"
              firstDepth="Model"
              secondDepth="Model"
              firstDepthPath="/model"
            />
        },
        {
          path: "/model/MDM_PRG_A0202000000",
          element:
            <MDM_PRG_A0202000000
              title="Product"
              firstDepth="Model"
              secondDepth="Product"
              firstDepthPath="/model"
            />
        },
        {
          path: "/error",
          element:
            <Error/>
        },
      ]
    },
    { path: "*",  element: <Notfound title="Notfound" /> }
  ]);

  return element;
};

export default AppRoutes;