import httpService from "./httpService"

export const userProfileApi = (id: any) => {
    return httpService.post("user/profile/show/" + id)
}