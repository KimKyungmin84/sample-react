import {useQuery} from "react-query";
import AxiosCustomInstance from "../api/AxiosCustomInstance";

export const useModelGridData = (formData, init) => {
    return useQuery(
        'ModelGridData',
        async () => {
            const { data } = await AxiosCustomInstance({}).post("http://localhost:10000/model/modelGridDataList", formData);
            return data;
        },
        { enabled: init },
    );
}

export const useModelTrackingGridData = async (ModelId, Category, SubCategory) => {
    const response = await AxiosCustomInstance({}).post("http://localhost:10000/model/modelTrackingGridDataList", {ModelId : ModelId, Category : Category, SubCategory : SubCategory});
    return response.data;
}

export const useModelDetailGridData = async (ModelId, Category, SubCategory) => {
    const response = await AxiosCustomInstance({}).post("http://localhost:10000/model/modelDetailGridDataList", {ModelId : ModelId, Category : Category, SubCategory : SubCategory});
    return response.data;
}