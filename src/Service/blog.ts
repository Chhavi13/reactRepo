import httpService from "./httpService";

export const podCastSubmissionData = (data: any) => {
    return httpService.post("user/podcast/store", data)
}