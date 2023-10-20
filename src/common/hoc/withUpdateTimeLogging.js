
import React, { Component } from "react";

const withUpdateTimeLogging = (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                renderStartTime: 0,
                renderEndTime: 0,
            };
        }
        
    componentDidUpdate(prevProps, prevState) {
        // console.log("====================", prevState.renderEndTime,this.state.renderEndTime )
      if (prevState.renderEndTime !== this.state.renderEndTime) {
        // 상태가 변경될 때만 실행
        new Promise((resolve) => setTimeout(resolve, 2000)); // 임의의 대기 시간 (2초)
        const { param1Value, param2Value } = this.props;
        const renderTimeInMilliseconds = this.state.renderEndTime - this.state.renderStartTime;
        const renderTimeInSeconds = renderTimeInMilliseconds / 1000; // 밀리초를 초로 변환
        console.log(
          "MyComponent 렌더링 시간은",
          renderTimeInSeconds.toFixed(3), // 소수점 3자리까지 표시
          "seconds with params:",
          this.state.param1Value,
          this.state.param2Value
        );
      }
    }

    render() {
      return (
        <div>
          <WrappedComponent
            {...this.props}
            onStartRender={(param1, param2) => {
              this.setState({ renderStartTime: new Date().getTime() });
              this.setState({ param1Value: param1 });
              this.setState({ param2Value: param2 });
            }}
            onRenderComplete={() => {
              this.setState({ renderEndTime: new Date().getTime() });
              console.log("====================:::", "end" )
            }}
          />
        </div>
      );
    }
  };
};

export default withUpdateTimeLogging;
