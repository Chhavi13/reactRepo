import { GET_CLIENT$SALES_FAIL, GET_CLIENT$SALES_REQUEST, GET_CLIENT$SALES_SUCCESS, GET_ORDERS_FAIL, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS } from "../../action/actionTypes/manageStoreActionTypes";

export const manageStoreReducer = (state={},action:any) =>{
    switch (action.type) {
        case GET_CLIENT$SALES_REQUEST: return{
            ...state,
            loading:true
        }
        case GET_CLIENT$SALES_SUCCESS: return{
            ...state,
            loading:false,
            data:action.payload
        }
        case GET_CLIENT$SALES_FAIL: return{
            ...state,
            loading:false,
            error:action.payload
        }
        case GET_ORDERS_REQUEST:return{
            ...state,
            loading:true
        }
        case GET_ORDERS_SUCCESS:return{
            ...state,
            loading:false,
            orders:action.payload,
            
        }

        case GET_ORDERS_FAIL:return{
            ...state,
            loading:false,
            error:action.payload
        }
        default:
            return state;
    }
} 