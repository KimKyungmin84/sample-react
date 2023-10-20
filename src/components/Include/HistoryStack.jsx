import React from "react";
import {Link, NavLink} from "react-router-dom";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "../../assets/history.css";
import 'swiper/css';
import 'swiper/css/navigation';

const HistoryStack = () => {

  const historyStackData = [
    {
      title: "Company",
      path: "/site/MDM_PRG_A0101000000"
    },
    {
      title: "Mold Change Time",
      path: ""
    },
    {
      title: "Data Interface Report",
      path: ""
    },
    {
      title: "Part",
      path: ""
    },
    {
      title: "Part2",
      path: ""
    },
    {
      title: "Part3",
      path: ""
    },
    {
      title: "Part4",
      path: ""
    },
    {
      title: "Part5",
      path: ""
    },
    {
      title: "Part6",
      path: ""
    },
    {
      title: "Part7",
      path: ""
    },

  ];

  const hisdelete = (e) => {
    e.target.parentNode.remove();
  }

  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  return (

    <div className="history-stack">

      <Swiper
        navigation
        modules={[Navigation]}
        slidesPerView={"auto"}
        className="history-swiper"
      >
        {historyStackData && historyStackData.map((stack, index) => (
          <SwiperSlide className="hs-cont" key={index}>
            <NavLink to={stack.path} className="hs-link">
              {stack.title}
            </NavLink>
            <span className="hs-delete" onClick={e => hisdelete(e)}></span>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>

  )
}

export { HistoryStack }