import { ErrorMessage } from '../constants/ErrorMessage';

class CustomError extends Error {

	constructor(code, message) {
		super(message);
		this.name = 'CustomError';
		this.errorCode = code;
	}
}

export default CustomError;