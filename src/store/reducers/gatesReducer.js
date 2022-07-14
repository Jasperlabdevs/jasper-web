import {
  ADD_GATE_SUCCESS,
  EDIT_GATE_SUCCESS,
  GET_GATE_SUCCESS,
  TOGGLE_GATE_SUCCESS,
} from "store/constants";

const gatesReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_GATE_SUCCESS:
      return [...state, payload];
    case GET_GATE_SUCCESS:
      return [ ...payload];
    case EDIT_GATE_SUCCESS:
      let id = payload.id;
      const tempState = [...state];
      const temp = tempState.filter((el) => el.id === id);
      const indxOf = tempState.indexOf(temp[0]);
      tempState.splice(indxOf, 1, payload);
      return [...tempState];
    case TOGGLE_GATE_SUCCESS:
      let update_id = payload.id;
      const tempoState = [...state];
      const tempo = tempoState.filter((el) => el.id === update_id);
      const indxOfT = tempoState.indexOf(tempo[0]);
      tempoState.splice(indxOfT, 1, payload);
      return [...tempoState];
    default:
      return state;
  }
};

export default gatesReducer;
