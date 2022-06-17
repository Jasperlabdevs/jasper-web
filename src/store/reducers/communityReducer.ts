import {
    ADD_COMMUNITY_SUCCESS,
    ADD_COMMUNITY_FAILURE,
  } from "../constants";
  
  const communityTypesReducer = (state = {}, action: any) => {
    const { type, payload } = action;
    
    switch (type) {
      case ADD_COMMUNITY_SUCCESS:
        return {...state, ...payload};
      case ADD_COMMUNITY_FAILURE:
        return {...state, ...payload};
      default:
        return state;
    }
  };
  
  export default communityTypesReducer;
  