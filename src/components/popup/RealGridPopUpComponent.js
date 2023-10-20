import React, { useEffect, useRef, useState } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import "realgrid/dist/realgrid-style.css"; 

const RealGridPopUpComponent = ({ initialColumns, data, closeModal , handleSaveButtonClick}) => {
  const [columns, setColumns] = useState(initialColumns);
  const [recData, setRecData] = useState(data);

  
  
  // const data = [
  //   { id: 1, name: 'Alice', age: 25 },
  //   { id: 2, name: 'Bob', age: 30 },
  // ];

  // const data = [];
  console.log("###########" + JSON.stringify(data));

  const containerRef = React.useRef(null);

  useEffect(() => {
    const provider = new LocalDataProvider(true);
    const gridView = new GridView(containerRef.current);

    gridView.setDataSource(provider);
    provider.setFields(initialColumns);
    gridView.setColumns(columns);
    provider.setRows(data);

    gridView.setCheckBar({
      visible: false,
    }); 


    gridView.setStateBar({visible: false});   
    gridView.setEditOptions({editable: false}); 



    return () => {
      provider.clearRows();
      gridView.destroy();
      provider.destroy();
    };
  }, [columns]);

  return (
    <>
      <div id="pop2" className="layer-pop-wrap" style={{visibility: "visible", opacity: "1"}}>   {/* <!-- 화면보여주기 위해 style 넣어두었음, 개발 시 style 삭제 --> */}
      <div className="bg"></div>
      <div className="layer-pop-cont" tabindex="0">          
        <div className="pop-cont">
          <div className="pop_title">
            <h1>저장 <p className="t2">Company</p></h1>
          </div>

          {/* <!-- 그리드 영역 --> */}
          <div className="gridwrap">
            {/* <!-- 리얼그리드 소타이틀--> */}
            <div className="flex">
              <div className="col-2">
                
                <div className="w-p-50">
                  <h2 className="tit-h2"><strong className="guide-line">저장 목록</strong></h2>
                  <p className="inlin-block">(총 <span>{recData.length}</span>개)</p>
                </div>
              </div>
            </div>

          
            {/* <!--리얼그리드 영역--> */}
            <div id="realgrid" ref={containerRef} className="readgridwrap"></div>

            <p className="mt-10">상기 항목을 저장 하시겠습니까?</p>
            <div className="flex mt-16">
              <div className="ml-a mr-a">
                <a href="#" className="button line gridbtn gray" onClick={closeModal}>취소</a>
                <a href="#" className="button gridbtn gray-box" onClick={handleSaveButtonClick}>확인</a>
              </div>
            </div>

                        
          </div>
        </div>
      
      </div>
    </div>
    
    
    
    
    </>






    // <div>
    //   <div ref={containerRef} style={{ height: '500px', width: '80%' }}></div>
    // </div>
  );
};

export default RealGridPopUpComponent;
