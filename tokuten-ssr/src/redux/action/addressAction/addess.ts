import * as authService from "../../../services/auth.service";
import {
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAIL,
  GET_ADDRESS_REQUEST_BY_ID,
  GET_ADDRESS_SUCCESS_BY_ID,
  GET_ADDRESS_FAIL_BY_ID,
} from "../actionTypes/addressActionTypes";
import * as address from "../../../services/adress.service"

export const getAddressData = () => (dispatch: any) => {
  dispatch({ type: GET_ADDRESS_REQUEST });
  return address.getAddress()
    .then((res: any) => {
      return dispatch({ type: GET_ADDRESS_SUCCESS, payload: res.data.data});
    })
    .catch((err: Error) => {
      dispatch({ type: GET_ADDRESS_FAIL, payload: err });
      throw err;
    });
};

export const getAddressDataByID = (id:number) => (dispatch: any) => {
  dispatch({ type: GET_ADDRESS_REQUEST_BY_ID });
  return address.getAddressByID(id)
    .then((res: any) => {
      return dispatch({ type: GET_ADDRESS_SUCCESS_BY_ID, payload: res.data});
    })
    .catch((err: Error) => {
      dispatch({ type: GET_ADDRESS_FAIL_BY_ID, payload: err });
      throw err;
    });
};
