//userDataManagement.js
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import AxiosCustomInstance from "../api/AxiosCustomInstance";
import { ErrorMessage } from "../components/error/constants/ErrorMessage";

export const useFetchData = (urls, config = {}) => {
    const fetchData = async () => {
        try {
          // 페이지 흐리게 처리 로직 추가
          // document.body.style.opacity = '0.5';
  
          const promises = Object.entries(urls).map(([key, url]) =>
          AxiosCustomInstance(config).get(url)
              .then((response) => {
                return response.data;
              })
              .catch((error) => {
                throw error
              })
          );
  
          const results = await Promise.all(promises);
          const data = Object.fromEntries(results.map((data, index) => [Object.keys(urls)[index], data]));
  
          // 페이지 정상적으로 보이게 처리 로직 추가
        //   document.body.style.opacity = '1';
          return data;
        } catch (error) {
            throw error;
        } finally {
          // 페이지 정상적으로 보이게 처리 로직 추가
          // document.body.style.opacity = '1';
        }
    };
  
    

  return  useQuery('fetchData', fetchData , {
    retry: 0,
    enabled: false, // 초기 렌더링 시 데이터 자동 가져오기 비활성화
}); //fetchData as () => Promise<any>
};

//  export default useFetchData;

