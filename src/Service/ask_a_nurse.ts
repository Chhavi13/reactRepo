import httpService from "./httpService"

export const getQuestionList = (data?: any) => {
    return httpService.post("ask/nurse/question", data)
}
export const getMyMsgApi = (data: any) => {
    return httpService.post("ask/nurse/my-question", data)
}
export const getTagList = () => {
    return httpService.get("stage")
}
export const postQuestion = (data: any) => {
    return httpService.post("ask/nurse/question/store", data)
}

export const questionLikeApi = (data: any) => {
    return httpService.post("user/like/ask/nurse/question/store", data)
}
export const tagFilterCourse = () => {
    return httpService.get("tag/filter/course")
}
export const getChatDetailApi = (data: any) => {
    return httpService.post("ask/nurse/question/answer/history", data)
}

export const particChatHis = (data: any) => {
    return httpService.post("ask/nurse/question/chat", data)
}

export const getChatDataApi = (data:any) => {
    return httpService.post("ask/nurse/question/chat", data)
}
export const deleteUserMsgApi = (data:any) => {
    return httpService.post("ask/nurse/question/destroy", data)
}