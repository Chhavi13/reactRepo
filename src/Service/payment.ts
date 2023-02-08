import httpService from "./httpService"

export let StripePayment = (data:any) =>{
    return httpService.post("https://dev.nurturebynaps.com/api/stripe",data)
}