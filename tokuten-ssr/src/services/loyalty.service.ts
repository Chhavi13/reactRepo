import httpService from "./http.service";

export const createLoayalty = (payload: any) => {
    return httpService.post("profile/manager/loyalty/", payload);
};
export const loyalityData = (onUploadProgress?: any) => {
    return httpService.get("/profile/manager/loyalty/")
}
export const getLoyaltyById = (id:number|any) =>{
    return httpService.get(`/profile/manager/user/Loyalty/view/${id}/`)
}