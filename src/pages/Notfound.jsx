import React from "react";
import { ReactComponent as Alertimg } from "../image/alert.svg"

const Notfound = () => {
  return (
    <div className="error-page">
      <div className="ep-box">
        <Alertimg width={144} height={144}/>
        <h1>페이지를 찾을 수 없습니다.</h1>
      </div>
    </div>
  )
}

export { Notfound }