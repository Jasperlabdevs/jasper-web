import { SET_MESSAGE } from "store/constants";

const messageReducer = ( state:any= "", action:any ) => {
    const { type, payload } = action

    switch( type ) {
        case SET_MESSAGE:
            return payload
        default:
            return state

    }
}

export default messageReducer