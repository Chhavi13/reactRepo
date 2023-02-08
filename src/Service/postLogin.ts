import { getUserID } from "./getLocalStorage"
import httpService from "./httpService"

export const getPostLoginDataApi = () => {
    
    return httpService.post("/home", { user_id: getUserID() })
} 