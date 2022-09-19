import { GET_COMMUNITY_MEMBERS, GET_COMMUNITY_MEMBERS_FAILURE } from "store/constants";

const communityMembersReducer = ( state:any = {}, action:any ) => {
    const { type, payload } = action

    switch(type){
        case GET_COMMUNITY_MEMBERS: 
            return payload
        case GET_COMMUNITY_MEMBERS_FAILURE: 
            return payload

        default: return state
    }
}

export default communityMembersReducer