import httpService from "./http.service"

export const get_clients_sales = (SDate:any,EDate:any) =>{
    return httpService.get(`offer/dashboard/?start_date=${SDate}&end_date=${EDate}`)
}
export const get_orders = (data:any)=>{
    return httpService.get(`offer/manage/store/?transaction_status=${data}`)
}
export const update_orders = (id:number,data:any)=>{
    return httpService.put(`offer/manage/store/${id}/`,data)
}