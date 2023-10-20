// LogicErrorBoundary.tsx
import React, { Component, PropsWithChildren } from "react";
import CommonErrorBoundary from './CommonErrorBoundary';
import CustomError from "./CustomError";
import ServerErrorPage from './ServerErrorPage';

import { AxiosError } from "axios";
import WithHooksHOC from "../../../../WithHooksHOC";


class CatchedErrorBoundary extends CommonErrorBoundary {
    constructor(props) {
      console.log("CatchedErrorBoundaryProps 생성자 진입");
      super(props);
    }

  

  componentDidUpdate(_, prevState) {
    console.log("CatchedErrorBoundary componentDidUpdate 진입", this.state.error);

    if (prevState.error === this.state.error || !this.state.error) {
      return;
    }

    console.log("CatchedErrorBoundary componentDidUpdate 에러처리가능 ");

    const { showSnackBar, navigate, mutateDeleteRefreshToken } = this.props;

    // if (showSnackBar) {
    //   showSnackBar("An error occurred"); // 에러 스낵바 표시
    // }

    // if (navigate) {
    //   navigate("/error"); // 에러 페이지로 이동
    // }

    
  }

  render() {
    // return this.props.children;
    // const { children, serverErrorFallback, NotFoundErrorFallback } = this.props;
    const { children} = this.props;

    const isAxiosError = (error) => error.isAxiosError === true;
    const isErrorObject = (error) => error instanceof Error;

   


    if (this.state.error) {
      console.log("CatchedErrorBoundary error 존재",this.state.error);

      if (isAxiosError(this.state.error)) { //axios 에러처리
        if (String(this.state.error.errorCode) === '0000') {
          // console.log("CatchedErrorBoundary errorCode 0000")
          // return serverErrorFallback;
          return <ServerErrorPage errorMessage="잠시 후 다시 진행해 주세요." />;
        }else{
          return <ServerErrorPage errorMessage="서버에서 에러가 발생이 되었습니다." />;
        }
      } else if (isErrorObject(this.state.error)) { //error.message !== undefined
        console.log('This is a regular Error object:', this.state.error);
        return <ServerErrorPage errorMessage="화면처리시 에러 발생입니다." />;
        // 일반 에러 객체 처리
      } else {
        console.log('Unknown error:', this.state.error);
        return <ServerErrorPage errorMessage="관리자에 문의해 주세요" />;
        // 그 외의 에러 처리
      }  

      
    }

    return children;

  }
}

export default WithHooksHOC(CatchedErrorBoundary);
