//customHooks.tsx
import { useCallback, useEffect } from "react";
import axios,{AxiosError, AxiosResponse} from "axios";
import { useMutation } from 'react-query';
import useThrowCustomError from '../common/components/error/hooks/useThrowCustomError';
import AxiosCustomInstance from "../common/api/AxiosCustomInstance"

export const useShowSnackBar = () => {
  const showSnackBar = (message) => {
    console.log("Showing snackbar:", message);
    // Snackbar 표시 로직 추가
  };

  return showSnackBar;
};

export const useCustomNavigate = () => {
  const navigate = useCallback((path) => {
    console.log("Navigating to:", path);
    // 페이지 이동 로직 추가
    window.location.href = path
  }, []);

  return navigate;
};


// http://api.example.com
export const deleteRefreshToken = () =>
	// axios.delete("https://jsonplaceholder.typicode.com/posts/3", {
	// 	headers: {
	// 		'Access-Control-Allow-Origin': '*',
	// 		'Access-Control-Allow-Credentials': true,
	// 	},
	// 	withCredentials: true,
	// });

  AxiosCustomInstance({}).delete("https://jsonplaceholder.typicode.com/postsg/3");



export const useMutateDeleteRefreshToken =  () => {
  const { isSuccess, isError, error, mutate, mutateAsync} = useMutation('refresh-delete', deleteRefreshToken, { 
    retry: false, // 실패 시 재실행을 하지 않음
  });

  useEffect(()=>{
    if (isError && error) {
      console.log("useMutateDeleteRefreshToken Error 발생");
			// useThrowCustomError(isError, error);
      throw new Error("dfdfdfd")
    }  
	},[error]);

	return { isSuccess,mutate,mutateAsync };
  };



  