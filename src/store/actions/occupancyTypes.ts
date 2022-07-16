import { getOccupancyTypes } from "services/helperServices";
import { getSelectedOccupancyTypes } from "services/Occupancy";
import {
  GET_OCCUPANCY_TYPES,
  GET_OCCUPANCY_TYPES_FAILURE,
  GET_OCCUPANCY_TYPES_SUCCESS,
} from "store/constants";

export const get_occupancy_types = () => async (dispatch: any) => {
  dispatch({ type: GET_OCCUPANCY_TYPES });

  return await getOccupancyTypes().then(
    (res) =>
      dispatch({
        type: GET_OCCUPANCY_TYPES_SUCCESS,
        payload: res.data?.results,
      }),
    (error) =>
      dispatch({
        type: GET_OCCUPANCY_TYPES_FAILURE,
        payload: error.data,
      })
  );
};


export const get_selected_occupancy_type = () => async (dispatch: any) => {
  dispatch({ type: GET_OCCUPANCY_TYPES });

  return await getSelectedOccupancyTypes().then(
    (res) =>
      dispatch({
        type: GET_OCCUPANCY_TYPES_SUCCESS,
        payload: res.data?.results,
      }),
    (error) =>
      dispatch({
        type: GET_OCCUPANCY_TYPES_FAILURE,
        payload: error.data,
      })
  );
};
