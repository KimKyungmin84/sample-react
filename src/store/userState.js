import { selector } from 'recoil';

// import { ACCESSTOKEN_KEY } from '../common/constants/user';

export const getUserIsLogin = selector({
	key: 'userLoginState',
	get: () => {
		// const accessToken = localStorage.getItem("ACCESSTOKEN_KEY");
		// return !!accessToken;
		console.log("()()()()()()()()()()()()()()()()()()(()(()()S")
		return true;
	},
});



// export const getUserIsLogin = selector({
// 	key: 'userLoginState',
// 	get: async ({ get }) => {
// 		// 액세스 토큰을 로컬 스토리지에서 가져오기
// 		const accessToken = localStorage.getItem("ACCESSTOKEN_KEY");
	
// 		if (accessToken) {
// 		  // 로컬 스토리지에 액세스 토큰이 존재하면 Azure AD와 로그인 상태 확인 (실제로는 Azure AD와 통합하여 확인)
// 		  try {
// 			const response = await fetch('https://graph.microsoft.com/v1.0/me', {
// 			  headers: {
// 				Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 사용하여 요청
// 			  },
// 			});
	
// 			if (response.status === 200) {
// 			  return true; // Azure AD에서 로그인되어 있는 경우
// 			} else {
// 			  return false; // Azure AD에서 로그인되어 있지 않은 경우
// 			}
// 		  } catch (error) {
// 			console.error('Azure AD와의 통합 중 오류 발생:', error);
// 			return false; // 오류 발생 시 로그인 상태를 false로 처리
// 		  }
// 		} else {
// 		  // 로컬 스토리지에 액세스 토큰이 없는 경우
// 		  return false; // 로그인 상태를 false로 처리
// 		}
// 	  },
// });

