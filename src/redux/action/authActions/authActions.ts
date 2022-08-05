
import { GET_PERSONAL_DATA, CHANGE_PASSWORD, GET_USER_IMAGE, FORGOT_RESET_PASSWORD, AUTH_IMAGE, FORGOT_PASSWORD, UPDATE_PERSONAL_DATA, UPDATE_PERSONAL_IMAGE, USER_LOGIN_SUCCESS, LOGOUT_SUCCESS, USER_REGISTRATION_SUCCESS, CHECK_USENAME_UNIQUE, GET_PROFILE_MEDIA } from "../actionTypes/actionTypes";
import { loadingAction } from "../LoadingAction";
import * as authService from "../../../services/auth.service";
import { removeItemLocalStorage } from "../../../utils/Utils";
// import * as offer from "../../../services/offer.service"
import { useHistory } from "react-router-dom";
export const registerAction = (data: any) => {
  return (dispatch: any) => {
    dispatch(loadingAction(true));
    return authService.joinWaitList(data)
      .then((response: any) => {
        dispatch(loadingAction(false));
        return dispatch({ type: USER_REGISTRATION_SUCCESS, payload: response })
      })
      .catch((err: Error) => {
        dispatch(loadingAction(false));
        throw err;
      });
  };

}
export const loginAction = (data: any) => {
  
  return (dispatch: any) => {
    dispatch(loadingAction(true));
    return authService.login(data).then((response: any) => {
        console.log("response form redux",response)
        dispatch(loadingAction(false));
        return dispatch({ type: USER_LOGIN_SUCCESS, payload: response });
      }).catch((err: Error) => {
        dispatch(loadingAction(false));
        throw err;
      });
  };
};

export const logoutAction = () => {
  return (dispatch: any) => {
    dispatch(loadingAction(true));
    return authService.logout()
      .then((response: any) => {
        //console.log("response form logout",response)
        removeItemLocalStorage('auth_token')
        removeItemLocalStorage('persist:root');
        dispatch(loadingAction(false));
        return dispatch({ type: LOGOUT_SUCCESS, payload: response }); 
      })
      .catch((err: Error) => {
        removeItemLocalStorage('auth_token')
        // localStorage.clear();
        dispatch(loadingAction(false));
        throw err;
      });
  }
}

export const resetPasswordAction = (data: any) => (dispatch: any) => {
  dispatch(loadingAction(true))
  return authService.changePassword(data).then((response: any) => {
    dispatch(loadingAction(false))
    return dispatch({ type: CHANGE_PASSWORD, payload: response })
  }).catch((err: Error) => {
    dispatch(loadingAction(false));
    throw err;
  })
}

export const getPersonalDetailAction = () => (dispatch: any) => {
  dispatch(loadingAction(true))
  return authService.getProfile().then((response: any) => {
    dispatch(loadingAction(false))
    return dispatch({ type: GET_PERSONAL_DATA, payload: response })
  }).catch((err: Error) => {
    dispatch(loadingAction(false))
    throw err;
  })
}

export const updatePersonalDetailAction = (data: any) => (dispatch: any) => {
  dispatch(loadingAction(true))
  return authService.updatePersonalDetail(data).then((response: any) => {
    dispatch(loadingAction(false))
    return dispatch({ type: UPDATE_PERSONAL_DATA, payload: response })
  }).catch((err: Error) => {
    dispatch(loadingAction(false))
    throw err;
  })
}

export const updatePersonalImageAction = (data: any) => (dispatch: any) => {
  dispatch(loadingAction(true))
  return authService.updateProfileImage(data).then((response: any) => {
    dispatch(loadingAction(false))
    return dispatch({ type: UPDATE_PERSONAL_IMAGE, payload: response })
  }).catch((err: Error) => {
    dispatch(loadingAction(false))
    throw err;
  })
}

export const getPersonalImageAction = () => (dispatch: any) => {
  dispatch(loadingAction(true))
  return authService.profileImage().then((response: any) => {
    dispatch(loadingAction(false))
    return dispatch({ type: GET_USER_IMAGE, payload: response })
  }).catch((err: Error) => {
    dispatch(loadingAction(false))
    throw err;
  })
}

export const forgotPasswordAction = (data: any) => (dispatch: any) => {
  dispatch(loadingAction(true))
  return authService.forgotPassword(data).then((response: any) => {
    dispatch(loadingAction(false))
    return dispatch({ type: FORGOT_PASSWORD, payload: response })
  }).catch((err: Error) => {
    dispatch(loadingAction(false))
    throw err;
  })
}

export const resetForgotPasswordAction = (data: any) => (dispatch: any) => {
  dispatch(loadingAction(true))
  return authService.forgotResetPassword(data).then((response: any) => {
    dispatch(loadingAction(false))
    return dispatch({ type: FORGOT_RESET_PASSWORD, payload: response })
  }).catch((err: Error) => {
    dispatch(loadingAction(false))
    throw err;
  })
}
export const checkUserNameUnique = (data: any) => (dispatch: any) => {
  dispatch(loadingAction(true))
  return authService.checkUserUnique(data).then((response: any) => {
    dispatch(loadingAction(false))
    return dispatch({ type: CHECK_USENAME_UNIQUE, payload: response })
  }).catch((err: Error) => {
    dispatch(loadingAction(false))
    throw err;
  })
}

export const authImage = () => (dispatch: any) => {
  dispatch(loadingAction(false))
  return authService.authImage().then((response: any) => {
    dispatch(loadingAction(false))
    return dispatch({ type: AUTH_IMAGE, payload: response })
  }).catch((err: Error) => {
    dispatch(loadingAction(false))
    throw err;
  })
}

export const getUserProfileMediaAction = () => (dispatch: any) => {
  dispatch(loadingAction(true))
  return authService.getUserProfileMedia().then((respone: any) => {
    dispatch(loadingAction(false))
    return dispatch({ type: GET_PROFILE_MEDIA, payload: respone })
  }).catch((err: Error) => {
    dispatch(loadingAction(false))
    throw err;
  })
}