import httpService from "./httpService"

// getConsult (get service list)
export const getConsultApi = () => {
    return httpService.post("service")
}

//gethost api
export const gethostNameApi = (data: any) => {
    return httpService.post("host", data)
}

export const getCalenderTimeApi = (data: any) => {
    return httpService.post("calendar", data)
}

//book a consult 
export const bookConsultApi = (data: any) => {
    return httpService.post("service/booking", data)
}

// get form fields
export const getFormFieldApi = (data: any) => {
    return httpService.post("form", data)
}
// get group consults api
export const getGroupConsultApi = (data: any) => {
    return httpService.post("service/group/class", data)
}

// get multiple class
export const getMultipleClassApi = (service_name: string, prefix: any) => {
    return httpService.post(`service/${service_name}`, prefix)
}

// get multiple class
export const multipleClassBookingApi = (data: any) => {
    return httpService.post("service/virtual/group/slots/booking", data)
}
export const multipleGroupClassBooking = (data: any) => {
    return httpService.post("service/group/slots/booking", data)
}

export const getAvilableDatesApi = (data: any) => {
    return httpService.post("calendar/availability/date", data)
}

export const getVirtualClassDateApi = (service_name: string, prefix: any) => {
    return httpService.post(`service/${service_name}`, prefix)
}
export const getAddonClassApi = (data: any) => {
    return httpService.post("service/addon/class", data)
}
export const privateBookingApi = (data: any) => {
    return httpService.post("service/private/form/booking", data)
}

export const getPreBabyBootcampApi = (service_name: string, prefix: any) => {
    return httpService.post(`service/${service_name}`, prefix)
}

export const getAddonForPreBabyApi = (data: any) => {
    return httpService.post("service/single/addon/class", data)
}

export const serviceBookingUpdate = (data: any) => {
    return httpService.post("service/booking/update", data)
}
export const groupSlotBookingUpdateAPI = (data: any) => {
    return httpService.post("service/group/slots/booking/update", data)
}