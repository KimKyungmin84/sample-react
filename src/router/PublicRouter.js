import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import useSnackBar from '@/hooks/common/useSnackBar';

const PublicRouter = ({ isAuthenticated }) => {
	// const { showSnackBar } = useSnackBar();
	useEffect(() => {
		if (isAuthenticated) {
			// showSnackBar('로그인 상태에서 이용할수 없는 서비스입니다');
			console.log("로그인 상태에서 이용할수 없는 서비스입니다")
		}
	}, []);

	return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRouter;