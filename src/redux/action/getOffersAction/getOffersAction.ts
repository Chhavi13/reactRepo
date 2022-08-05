import { GET_OFFER_FAIL, GET_OFFER_REQUEST,GET_FAN_GROUP_FAIL,
   GET_OFFER_SUCCESS,
   GET_FAN_GROUP_SUCCESS,GET_FAN_GROUP_REQUEST } from "../actionTypes/getOfferActionsTypes"
import * as offer from "../../../services/offer.service"


export const getOfferData = () =>(dispatch:any) =>{
    dispatch({type:GET_OFFER_REQUEST})
    return offer.getOfferList().then((res:any)=>{
      return  dispatch({type:GET_OFFER_SUCCESS,payload:res})
    }).catch((err:Error)=>{
        dispatch({type:GET_OFFER_FAIL,payload:err});
        throw err;
    })
}

export const getFanGroup = () =>(dispatch:any) =>{
  dispatch({type:GET_FAN_GROUP_REQUEST})
  return offer.getFanGroups().then((res:any)=>{
    return dispatch({type:GET_FAN_GROUP_SUCCESS,payload:res})
  }).catch((err:Error)=>{
    dispatch({type:GET_FAN_GROUP_FAIL,payload:err})
    throw err;
  })
}

