import { CHANGE_PASSWORD,  GET_DATA_SUCCESS,FORGOT_PASSWORD,FORGOT_RESET_PASSWORD, GET_USER_IMAGE,UPDATE_PERSONAL_IMAGE, GET_PERSONAL_DATA, LOGOUT_SUCCESS, UPDATE_PERSONAL_DATA, USER_LOGIN_SUCCESS, USER_REGISTRATION_FAIL, USER_REGISTRATION_SUCCESS, CHECK_USENAME_UNIQUE, AUTH_IMAGE, GET_PROFILE_MEDIA } from "../../action/actionTypes/actionTypes";


export const authReducer = (state = {}, action: any) => {
  switch (action.type) {
    case USER_REGISTRATION_SUCCESS: return {
      ...state,
      Data: action.payload
    }
    case USER_REGISTRATION_FAIL: return {

      signupErr: action.payload
    }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginData: action.payload
      }
    case GET_DATA_SUCCESS:
      return {
        ...state,
        getPersonalDetailData: action.payload
      }
    case CHANGE_PASSWORD:
      return {
        ...state,
        changePassword: action.payload
      }
    case GET_PERSONAL_DATA:
      return{
        ...state,
        personalData:action.payload
      }
    case UPDATE_PERSONAL_DATA:
        return{
          ...state,
          updateData:action.payload
      }
    case UPDATE_PERSONAL_IMAGE:
        return{
          ...state,
          image:action.payload
        }
      case GET_USER_IMAGE:
        return{
        ...state,
        image:action.payload
      }
      case FORGOT_PASSWORD :
        return{
          ...state,
          data:action.payload
        }
      case FORGOT_RESET_PASSWORD:
        return{
          ...state,
          password:action.payload
        }
      case CHECK_USENAME_UNIQUE:
        return{
          data:action.payload
        }
      case AUTH_IMAGE:
        return{
          ...state,
          image:action.payload
        }
      case GET_PROFILE_MEDIA:
        return{
          ...state,
          media:action.payload
        }
    default: return state
  }

}
export const logoutReducer = (state = {}, action: any) => {
  switch (action.type) {
    case LOGOUT_SUCCESS: return {
      data: action.payload
    }
    default: return state
  }
}
