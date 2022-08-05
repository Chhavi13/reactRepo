import { GET_APPROVAL_DATA } from "../../action/actionTypes/ApprovalsActionsTypes";


export let approvalsReducer = (state = {}, action: any) => {
    switch (action.type) {
        case GET_APPROVAL_DATA: return {
            ...state,
            data: action.payload
        }
        default: return state
    }
}