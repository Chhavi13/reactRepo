import {
    GET_OFFER_FAIL, GET_OFFER_REQUEST, GET_OFFER_SUCCESS,
    CREATE_OFFER_OBJECT,
    CREATE_OFFER_IMAGES,
    CREATE_OFFER_APIIMAGES,
    GET_FAN_GROUP_REQUEST,
    GET_FAN_GROUP_SUCCESS,
    GET_FAN_GROUP_FAIL
} from "../../action/actionTypes/getOfferActionsTypes";




export const getOfferReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case GET_OFFER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_OFFER_SUCCESS:
            return {
                ...state,
                loading: false,
                offerList: action.payload
            }
        case GET_OFFER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CREATE_OFFER_OBJECT:
            return {
                ...state,
                data: action.payload,
            }

        case CREATE_OFFER_IMAGES:
            return {
                ...state,
                images: action.payload
            }

        case CREATE_OFFER_APIIMAGES:
            return {
                ...state,
                APIImages: action.payload
            }
        case GET_FAN_GROUP_REQUEST:
            return{
                ...state,
                loading:true
            }
        case GET_FAN_GROUP_SUCCESS:
            return{
                ...state,
                loading:false,
                fan:action.payload
            }
        case GET_FAN_GROUP_FAIL:
            return{
                ...state,
                loading:false,
                fanError:action.payload
            }
        default:
            return state;
    }
};