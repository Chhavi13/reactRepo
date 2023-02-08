import httpService from "./httpService";

export const CourseStartedApi = (id: any) => {
    return httpService.post("user/started/course", id)
}

export const CourseCompletedAPI = (id: any) => {
    return httpService.post("user/completed/course", id)
}

export const CourseFavouriteAPI = (id: any) => {
    return httpService.post("user/favourite/course", id)
}

export const UpcomingEventAPI = (data: any) => {
    return httpService.post("user/upcoming/event", data)
}

export const PastEventAPI = (data: any) => {
    return httpService.post("user/past/event", data)
}

export const FavouriteEventAPI = (id: any) => {
    return httpService.post("user/favourite/event", id)
}

export const UpcomingServiceAPI = (id: any) => {
    return httpService.post("user/upcoming/service/booking", id)
}

export const PastServiceAPI = (id: any) => {
    return httpService.post("user/past/service/booking", id)
}
export const GiftCardRecieveAPI = (id: any) => {
    return httpService.post("user/gift/card/recieved", id)
}

export const AskNurseProfileAPI = (id: any) => {
    return httpService.post("ask/nurse/my-question", id)
}

export const GiftCardSendAPI = (id: any) => {
    return httpService.post("user/gift/card/send", id)
}
export const CoursePurchased = (id: any) => {
    return httpService.post("user/purchased/course", id)
}
export const deleteServiceAPI = (data: any) => {
    return httpService.post("user/service/booking/cancel", data)
}
export const deleteEventAPI = (data: any) => {
    return httpService.post("user/cancel/event", data)
}
