import AxiosCustomInstance from "../api/AxiosCustomInstance";

export const getBOMTreeData = async (formData, init) => {
    if(init){
        const response = await AxiosCustomInstance({}).post("http://localhost:10000/filter/bomTreeList", formData);
        return response.data;
    }
}

export const getBOMGridData = async (searchKey) => {
    const response = await AxiosCustomInstance({}).post("http://localhost:10000/filter/bomGridList", {ParentItemCode : searchKey, });
    return response.data;
}

export const getBOMRoutingGridData = async (Company, Site, ItemCode) => {
    const response = await AxiosCustomInstance({}).post("http://localhost:10000/filter/bomRoutingGridList", {Company : Company, Site : Site, ItemCode : ItemCode});
    return response.data;
}