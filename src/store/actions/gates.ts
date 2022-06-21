import { addGate, editGate, getGate, toggleGate } from "services/gates";
import {
  ADD_GATE_FAILURE,
  ADD_GATE_SUCCESS,
  EDIT_GATE_FAILURE,
  EDIT_GATE_SUCCESS,
  GET_GATE_FAILURE,
  GET_GATE_SUCCESS,
  TOGGLE_GATE_FAILURE,
  TOGGLE_GATE_SUCCESS,
} from "store/constants";

export const get_gate = () => async (dispatch: any) => {
  return await getGate().then(
    (res) =>
      dispatch({
        type: GET_GATE_SUCCESS,
        payload: res.data.results,
      }),
    (error) =>
      dispatch({
        type: GET_GATE_FAILURE,
        payload: error.data,
      })
  );
};

export const add_gate = (data: any) => async (dispatch: any) => {
  return await addGate(data).then(
    (res) =>
      dispatch({
        type: ADD_GATE_SUCCESS,
        payload: res.data.results,
      }),
    (error) =>
      dispatch({
        type: ADD_GATE_FAILURE,
        payload: error.data,
      })
  );
};
export const edit_gate = (data: any) => async (dispatch: any) => {
  return await editGate(data).then(
    (res) =>
      dispatch({
        type: EDIT_GATE_SUCCESS,
        payload: res.data.results,
      }),
    (error) =>
      dispatch({
        type: EDIT_GATE_FAILURE,
        payload: error.data,
      })
  );
};
export const toggle_gate = (data: any) => async (dispatch: any) => {
  return await toggleGate(data).then(
    (res) =>
      dispatch({
        type: TOGGLE_GATE_SUCCESS,
        payload: res.data.results,
      }),
    (error) =>
      dispatch({
        type: TOGGLE_GATE_FAILURE,
        payload: error.data,
      })
  );
};
