import httpService from "./httpService"

interface events {
    user_id: string;
    type: string;
    search?: string
}

interface EventLike {
    user_id: string | number | any,
    event_id: string
}

export const getEventsData = (data: events) => {
    return httpService.post("event", data)
}
export const EventLikeApi = (data: EventLike) => {
    return httpService.post("user/like/event/store", data)
}
export const EventFavApi = (data: EventLike) => {
    return httpService.post("user/favourite/event/store", data)
}

export const EventDetailApi = (data: any) => {
    return httpService.post("event/show", data)
}

export const FavEventApi = (data: any) => {
    return httpService.post("user/favourite/event", data)
}

export const EventVideoProgressApi = (data: any) => {
    return httpService.post("user/event/play/progress/store", data)
}