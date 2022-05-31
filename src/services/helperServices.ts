import axios from 'axios'
import URL from 'helpers/URLs'

export const getCommunityTypes = () => {
    return axios.get(URL.communityTypes)
}