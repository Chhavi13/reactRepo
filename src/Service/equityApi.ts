import httpService from "./httpService";

export const eventBookingStore = (data:any)=>{
    return httpService.post("event/booking/store",data)
}