//WithHooksHOC.tsx
import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import { useShowSnackBar, useMutateDeleteRefreshToken } from "./hooks/customHooks";
function WithHooksHOC(Component) {
  // console.log("WithHooksHOC");
  return function Hoc(props) {
    const showSnackBar = useShowSnackBar();
    const navigate = useNavigate();
    // const mutateDeleteRefreshToken = useMutateDeleteRefreshToken();

    return (
      <Component
        {...props}
        showSnackBar={showSnackBar}
        navigate={navigate}
        // mutateDeleteRefreshToken={mutateDeleteRefreshToken}
      />
    );
  };
}

export default WithHooksHOC;
