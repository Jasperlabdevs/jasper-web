import { SET_USER, CLEAR_USER } from "store/constants";

const userReducer = (state: any = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return { ...state, payload };
    case CLEAR_USER:
      return {};
    default:
      return state;
  }
};

export default userReducer;
