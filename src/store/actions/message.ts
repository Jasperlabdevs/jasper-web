import { SET_MESSAGE } from "store/constants"

export const message =() => (dispatch:any) => {
    dispatch({
        type: SET_MESSAGE,
        payload: 'message set'
    })
}