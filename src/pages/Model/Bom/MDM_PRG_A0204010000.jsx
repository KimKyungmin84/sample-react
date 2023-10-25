import React, {useEffect, useRef, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {ReactComponent as Favorite} from "../../../image/favorite.svg";
import {Split} from "@geoffcox/react-splitter";
import {ASIDE_A0204010000} from "../../../components/Include/AsideMenus";
import TreeView from 'devextreme-react/tree-view';
import {
  getBOMChildTreeData,
  getBOMGridData,
  getBOMRoutingGridData,
  useBOMTopTreeData
} from "../../../common/hooks/useTreeApi";
import {MDM_PRG_A0204010000_BOM_GRID} from "./MDM_PRG_A0204010000_BOM_GRID";
import {MDM_PRG_A0204010000_BOM_ROUTING_GRID} from "./MDM_PRG_A0204010000_BOM_ROUTING_GRID";

const MDM_PRG_A0204010000 = (props) => {
  const treeViewRef = useRef(null);
  // 첫번째 그리드 데이터
  const [bomGridData, setBomGridData] = useState([]);
  const [bomRoutingGridData, setBomRoutingGridData] = useState([]);
  //초기 검색 하지 않기 위한 플래그
  const [init, setInit] = useState(false);
  //검색 조건
  const [formData, setFormData] = useState({
    StyleNo : '',
    Size : '',
    Part : '',
    IncludeItem : 'PH',
    UseYn : '',
    ConfirmYn : '',
    ParentItemCode :'',
    parentId : '',
  });

  const {refetch, remove, isSuccess} = useBOMTopTreeData(formData, init);
  const [isActive, setActive] = useState(false);

  const toggleFavorite = () => {
    setActive(!isActive);
  }

  //탭메뉴
  const tabActive = () => {

    const tabItem = document.querySelectorAll('.grid-tab');

    tabItem.forEach((tab, idx)=> {    
      tab.addEventListener('click', function(){        
          tabItem.forEach((item)=> {
              item.classList.remove('active');
          });
  
          tabItem[idx].classList.add('active');  
      });      
    });
  }

  //ASIDE 영역 변경시 반영 함수
  const handleInputChange = (e) => {
    const name = (e.component.NAME === 'dxRadioGroup') ? e.element.accessKey : (e.component.NAME === 'dxSelectBox') ? e.itemData.name : e.event.target.name;
    const value = (e.component.NAME === 'dxRadioGroup') ? e.value : (e.component.NAME === 'dxSelectBox') ? e.itemData.value : e.event.target.value;

    setFormData((prevState) => {
      return {
        ...prevState,
        [name] : value
      }
    })
  }

  //ASIDE 조회 버튼 클릭 시 실행 함수
  const handleFetchButtonClick = () => {
    setInit(true);
    //조회시 초기화 처리
    setBomGridData([]);

    refetch().then(result => {
      treeViewRef.current.instance.option('items', result.data);
    }).catch(e => console.log(e));
  }

  // Tree 클릭 시 실행 이벤트
  const handlerItemClick = (e) => {
    //TODO : 특정 컬럼 클릭시 동작 처리는 여기서 수정 하자
    const searchKey = e.itemData.searchParentKey;
    if(isSuccess){
      getBOMGridData(searchKey).then(result => {
        setBomGridData(result);
      }).catch(e => console.log(e));
    }
  }

  const handlerBomGridCellClick = (Company, Site, ItemCode) => {
    getBOMRoutingGridData(Company, Site, ItemCode).then(result => {
      setBomRoutingGridData(result);
    }).catch(e => console.log(e));
  }

  //Tree 영역 펼칠 시 하위 조회 처리
  const createChildren = (parent) => {
    const parentId = parent ? parent.itemData.id : '';
    const ParentItemCode = parent ? parent.itemData.searchParentKey :'';
    //TODO : 해당 처리는 devExtreme 제공 하는 형식이 useQuery 와 맞지 않아 미사용.
    return getBOMChildTreeData({ParentItemCode : ParentItemCode, parentId : parentId}, init).then().catch(e => console.log(e));
  }

  useEffect(() => {
    tabActive();

    return () => {
      remove();
    }
  }, []);

  return (
    <Split initialPrimarySize='300px' minPrimarySize='20px' minSecondarySize='calc(100% - 300px)' splitterSize='5px' vertical>
      <div className="aside-section">
        <ASIDE_A0204010000 handleInputChange={handleInputChange} handleFetchButtonClick={handleFetchButtonClick} />
      </div>

      <div className="contents-section">
        <div className="contents">

          <div className="page-header">
            <h2 className="ph-tit">
              <span className="favorite-icon">
                <Favorite width={24} height={24} className={isActive ? "active" : "inactive"} onClick={toggleFavorite}/>
              </span>
              {props.title}
            </h2>

            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={props.firstDepthPath}>{props.firstDepth}</Link>
              </li>
              <li className="breadcrumb-item active">
                {props.secondDepth}
              </li>
            </ul>
          </div>

          <div className="grid-tab-box">
            <NavLink to={'/model/MDM_PRG_A0204010000'} className="grid-tab">BOM</NavLink>
            <NavLink to={'/model/MDM_PRG_A0204020000'} className="grid-tab">BOM Structure</NavLink>
          </div>

          <div className="grid-container gird-flex">

            <div className="grid-tree">
              <div style={{ height: "100%", width:"320px", borderRadius:"8px", background: "", border:'1px solid black' }}>
                <TreeView
                    id="simple-treeview"
                    ref={treeViewRef}
                    height={'900px'}
                    dataStructure="plain"
                    scrollDirection={''}
                    noDataText={'<span style="width:100%; text-align: center; margin-top: 10px; position: absolute;">조회된 데이터가 없습니다.</span>'}
                    rootValue=""
                    expandNodesRecursive={false}
                    createChildren={createChildren}
                    onItemClick={handlerItemClick}
                />
              </div>
            </div>


            <div className="grid-wrap">
              <MDM_PRG_A0204010000_BOM_GRID bomGridData={bomGridData} handlerBomGridCellClick={handlerBomGridCellClick} />
              <MDM_PRG_A0204010000_BOM_ROUTING_GRID bomRoutingGridData={bomRoutingGridData} />
            </div>

          </div>
        </div>
      </div>
    </Split>
  )
}
export {MDM_PRG_A0204010000};