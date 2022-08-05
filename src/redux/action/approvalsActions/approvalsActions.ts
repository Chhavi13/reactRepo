import { loadingAction } from "../LoadingAction";
import { GET_APPROVAL_DATA } from "../actionTypes/ApprovalsActionsTypes";
import * as authService from "../../../services/auth.service"

export let getApprovalsDataAction = () => (dispatch: any) => {
    dispatch(loadingAction(true))
    return authService.approvalData().then((response: any) => {
        dispatch(loadingAction(false))
        return dispatch({ type: GET_APPROVAL_DATA, payload: response })
    }).catch((error: Error) => {
        dispatch(loadingAction(false))
        throw error;
    })
}
