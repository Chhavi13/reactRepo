import {
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_FAIL,
  GET_ADDRESS_REQUEST_BY_ID,
  GET_ADDRESS_SUCCESS_BY_ID,
  GET_ADDRESS_FAIL_BY_ID,
} from "../../action/actionTypes/addressActionTypes";

export const addressReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case GET_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addressList: action.payload,
      };
    case GET_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case GET_ADDRESS_REQUEST_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case GET_ADDRESS_SUCCESS_BY_ID:
      return {
        ...state,
        loading: false,
        addressListByID: action.payload,
      };
    case GET_ADDRESS_FAIL_BY_ID:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
