import {LOADING} from '../actionTypes/actionTypes'

export const loadingAction = (status: any) => {
    return (dispatch: any) => {
      dispatch ({type: LOADING, status});
       
    };
  };