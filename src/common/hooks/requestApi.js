import AxiosCustomInstance from "../api/AxiosCustomInstance";
import {useQuery} from "react-query";

/**
 * 최상위 트리 조회
 * @param formData
 * @param init
 */
export const useBOMTopTreeData = (formData, init) => {
    return useQuery(
        'getBOMTreeData',
        async () => {
            const { data } = await AxiosCustomInstance({}).post("http://localhost:10000/tree/bomTopTreeList", formData);
            return data;
        },
        { enabled: init },
    );
}

/**
 * 트리 열기 처리시 하위 조회
 * @param formData
 * @param init
 */
export const getBOMChildTreeData = async (formData, init) => {
    if(init){
        const response = await AxiosCustomInstance({}).post("http://localhost:10000/tree/bomChildTreeList", formData);
        return response.data;
    }
}

/**
 * BOM Grid 조회
 * @param searchKey
 */
export const getBOMGridData = async (searchKey) => {
    const response = await AxiosCustomInstance({}).post("http://localhost:10000/tree/bomGridList", {ParentItemCode : searchKey, });
    return response.data;
}

/**
 * BOM Routing 조회
 * @param Company
 * @param Site
 * @param ItemCode
 */
export const getBOMRoutingGridData = async (Company, Site, ItemCode) => {
    const response = await AxiosCustomInstance({}).post("http://localhost:10000/tree/bomRoutingGridList", {Company : Company, Site : Site, ItemCode : ItemCode});
    return response.data;
}