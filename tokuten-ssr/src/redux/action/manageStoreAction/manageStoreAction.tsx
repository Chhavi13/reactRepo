import { GET_CLIENT$SALES_FAIL, GET_CLIENT$SALES_REQUEST, GET_CLIENT$SALES_SUCCESS, GET_ORDERS_FAIL, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS } from "../actionTypes/manageStoreActionTypes"
import * as store from "../../../services/store.service"
  

export const client_salse = (SDate:any,EDate:any) => (dispatch:any)=>{
    dispatch({type:GET_CLIENT$SALES_REQUEST})
    return store.get_clients_sales(SDate,EDate).then((res:any)=>{
        return dispatch({type:GET_CLIENT$SALES_SUCCESS,payload:res})
    }).catch((err:Error)=>{
        dispatch({type:GET_CLIENT$SALES_FAIL,payload:err})
        throw err
    })

}

export const orders = (data:any) =>(dispatch:any) =>{
    dispatch({type:GET_ORDERS_REQUEST})
    return store.get_orders(data).then((res:any)=>{
        const newData = {
            data: res.data,
            selected_tab: data
        }
        
        return dispatch({type:GET_ORDERS_SUCCESS, payload: newData})
    }).catch((err:Error)=>{
        dispatch({type:GET_ORDERS_FAIL,payload:err})
        throw err
    })
}