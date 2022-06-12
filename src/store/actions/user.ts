import { SET_USER, CLEAR_USER } from "store/constants";

export const setUser = (user:any) => (dispatch: any) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const clearUser =() => (dispatch:any) => {
  dispatch({type: CLEAR_USER})
}
