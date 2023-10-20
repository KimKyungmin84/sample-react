import React from "react";
import {Link, NavLink} from "react-router-dom";
import "../../assets/gnb.css";
import { MainNavItems } from "../Resources/MainNavItems";

const Gnb = ({ gnbFolding }) => {
  const navItems = MainNavItems;

  return (
    <div className="gnb-wrapper">
      <div className="gnb-headline">

        <h1><img src={`${process.env.PUBLIC_URL}/assets/img-tkg-logo.png`} width="66" alt="TKG - Taekwang" /></h1>

        <div className="gnb-line">

          <div className="gnb-language">

            <div className="gl-box">
              <img src={`${process.env.PUBLIC_URL}/assets/lang-korea.png`} alt="korea" />

              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path d="M5.5293 6.66675L8.86263 10.1667L12.196 6.66675" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="gl-hover">
              <div className="gl-lang active">
                <img src={`${process.env.PUBLIC_URL}/assets/lang-korea.png`} alt="korea" />
              </div>
              <div className="gl-lang">
                <img src={`${process.env.PUBLIC_URL}/assets/lang-korea.png`} alt="korea" />
              </div>
            </div>

          </div>

          <div className="gnb-user">
            <img src={`${process.env.PUBLIC_URL}/assets/user-icon.png`} alt="user-icon" className="user-icon" />
            <p className="user-name">홍길동형 이사</p>

            <div className="personal-menu">
              <ul>
                <li><Link to="">즐겨찾기</Link></li>
                <li><Link to="">계정관리</Link></li>
              </ul>
            </div>
          </div>

          <div className="gnb-button">
            <button type="button" className="gnb-fold" onClick={gnbFolding}><img src={`${process.env.PUBLIC_URL}/assets/gnb-btn.png`} alt="gnb-btn" width="36" /></button>
          </div>
        </div>
      </div>

      <div className="main-navigation">
        <div
          className="nav"
        >

          {navItems && navItems.map((firstDepth, index) => (
            <div className="nav-item" key={`depth1-${index}`}>
              <NavLink to={firstDepth.path} className="nav-link">{firstDepth.title}</NavLink>
              <div className="sub-depth-nav">
                {firstDepth.child_depth && firstDepth.child_depth.map((secondDepth, index) => (
                  <div className="sub-depth2" key={`depth2-${index}`}>
                    <h5 className="sd-tit">
                      <NavLink to={secondDepth.path}>{secondDepth.title}</NavLink>
                    </h5>

                    {secondDepth.child_depth.length !== 0
                      ?
                      <ul className="sub-depth3">
                        {secondDepth.child_depth && secondDepth.child_depth.map((thirdDepth, index) => (
                          <li key={`depth3-${index}`}>
                            <NavLink to={thirdDepth.path} className="sub-link">{thirdDepth.title}</NavLink>
                          </li>
                        ))}
                      </ul>
                      : null
                    }
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { Gnb }