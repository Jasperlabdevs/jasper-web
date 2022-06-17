import axios from "axios";
import URL from "helpers/URLs";

export const addCommunity =(data:any) => {
    return axios.post(URL.community, {...data})
}