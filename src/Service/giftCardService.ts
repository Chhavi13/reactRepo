import httpService from "./httpService";

export const buyGiftCard = (data: any) => {
    return httpService.post("gift/card/store", data)
}

export const getApiGiftCardService=()=>{
    return httpService.post("gift/card/membership-services")
}