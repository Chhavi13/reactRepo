import httpService from "./httpService"

export const getCourseApi = (data: any) => {
    return httpService.post("course", data)
}

export const LikeApi = (id: any) => {
    return httpService.post("user/like/course/store", id)
}

export const FavoriteApi = (id: any) => {
    return httpService.post("user/favourite/course/store  ", id)
}

export const getFavriteApi = (id: any) => {
    return httpService.post("user/favourite/course ", id)
}

export const getCourseDetailApi = (id: any) => {
    return httpService.post("course/show", id)
}

export const upDateVideoProgress = (time: any) => {
    return httpService.post("user/course/play/progress/store", time)
}
export const buyCourseApi = (data: any) => {
    return httpService.post("user/course/payment", data)
}

export const FilterApi = () => {
    return httpService.get("tag/filter/course");
}
export const videoProgresApi=(id:any)=>{
    return httpService.post("user/course/play/progress/store",id)
}