import {
  GET_OCCUPANCY_TYPES_SUCCESS,
  GET_OCCUPANCY_TYPES_FAILURE,
} from "../constants";

const occupancyTypesReducer = (state = [], action: any) => {
  const { type, payload } = action;

  switch (type) {
    case GET_OCCUPANCY_TYPES_SUCCESS:
      return [...state, ...payload];
    case GET_OCCUPANCY_TYPES_FAILURE:
      return [...state, ...payload];
    default:
      return state;
  }
};

export default occupancyTypesReducer;
