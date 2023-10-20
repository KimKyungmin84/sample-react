import { AxiosError } from 'axios';
import { Dispatch, SetStateAction, useEffect } from 'react';

import CustomError from '../components/CustomError';
import { ErrorMessage } from '../constants/ErrorMessage';

const useThrowCustomError = (
	isError,
	error,
	blockThrowError,
	setBlockThrowError,
) => {
	console.log("useThrowCustomError 실행 :::",(isError))
	// useEffect(() => {

		if (blockThrowError && setBlockThrowError) {
			setBlockThrowError(false);
			return;
		}

		if (isError && error) {
			if (!error.response || typeof error.response.data === 'undefined' || typeof error.response.data.errorCode === 'undefined' ) {
				console.log("useThrowCustomError 정의되지 않은 에러코드 ")
				throw new CustomError('0000', '네트워크에 문제가 발생하였습니다.');
				// throw new Error('네트워크 에러 발생');
			}
			throw new CustomError(
				error.response.data.errorCode,
				ErrorMessage[error.response.data.errorCode],
			);
		}
	// }, []);
};

export default useThrowCustomError;