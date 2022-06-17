import { addCommunity } from "services/community"
import { ADD_COMMUNITY,ADD_COMMUNITY_FAILURE } from "store/constants"

export const add_community = (data:any, errorhandler:any) => async (dispatch:any) => {
    return await addCommunity(data).then(
        res => 
            dispatch({
                type: ADD_COMMUNITY,
                payload: res.data?.results,
              }),
            (error) =>{
                dispatch({
                  type: ADD_COMMUNITY_FAILURE,
                  payload: error.data,
                })
                errorhandler({hasError: true, errorMessage: error.data?.detail})
            }
    )
}