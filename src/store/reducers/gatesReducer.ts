
import { ADD_GATE_SUCCESS, EDIT_GATE_SUCCESS, TOGGLE_GATE_SUCCESS } from "store/constants"

const gatesReducer = ( state = {}, action:any) => {

    const { type, payload } = action

    switch(type){
        case ADD_GATE_SUCCESS:
            return {...state, ...payload}
        case EDIT_GATE_SUCCESS:
            return { ...state, ...payload }
        case TOGGLE_GATE_SUCCESS:
            return { ...state, ...payload }
        default: 
            return state
    }

}

export default gatesReducer