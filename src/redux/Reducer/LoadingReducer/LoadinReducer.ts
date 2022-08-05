import { LOADING } from "../../action/actionTypes/actionTypes";


let iState = {
  loading: false,
};

export const loadingReducer = (state = iState, action: any) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.status };
    default:
      return state;
  }
};
