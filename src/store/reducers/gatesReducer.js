
import { ADD_GATE_SUCCESS, EDIT_GATE_SUCCESS, GET_GATE_SUCCESS, TOGGLE_GATE_SUCCESS } from "store/constants"

const gatesReducer = ( state = [], action) => {

    const { type, payload } = action

    switch(type){
        case ADD_GATE_SUCCESS:
            return [...state, payload]
        case GET_GATE_SUCCESS:
            return [...state, ...payload]
        case EDIT_GATE_SUCCESS:
            let id = payload.id
            const tempState = [ ...state ]
            const temp = tempState.filter((el) =>el.id === id)
            const indxOf = tempState.indexOf(temp[0])
            tempState.splice(indxOf ,1, payload)
            return [ ...tempState ]
        case TOGGLE_GATE_SUCCESS:
            return [ ...state, ...payload ]
        default: 
            return state
    }

}

export default gatesReducer