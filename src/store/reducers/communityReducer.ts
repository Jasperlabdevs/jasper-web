import {
  ADD_COMMUNITY_SUCCESS,
  EDIT_COMMUNITY,
  GET_COMMUNITY_SUCCESS,
  SET_COMMUNITY_SUCCESS,
} from "../constants";

const communityReducer = (state: any = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_COMMUNITY_SUCCESS:
      return payload;
    case SET_COMMUNITY_SUCCESS:
      return payload;
    case GET_COMMUNITY_SUCCESS:
      return payload;
    case EDIT_COMMUNITY:
      let temp = { ...state };
      temp.account_name = payload.account_name;
      temp.bank_account_number = payload.bank_account_number;
      temp.bank_name = payload.bank_name;

      return temp;
    default:
      return state;
  }
};

export default communityReducer;
