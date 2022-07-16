import {
  GET_COMMUNITY_TYPES_SUCCESS,
  GET_COMMUNITY_TYPES_FAILURE,
} from "../constants";

const communityTypesReducer = (state = [], action: any) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COMMUNITY_TYPES_SUCCESS:
      return [ ...payload];
    case GET_COMMUNITY_TYPES_FAILURE:
      return [...state, ...payload];
    default:
      return state;
  }
};

export default communityTypesReducer;
