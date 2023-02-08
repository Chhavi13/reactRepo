import httpService from "./httpService";

export const profileAboutUpdate = (data: any) => {
    return httpService.post('user/profile/about/update', data)
}
export const getUserProfileEdit = (id: any) => {
    return httpService.post('user/profile/edit', id)
}
export const getProfileBabyAPI = (id: any) => {
    return httpService.post('user/profile/baby', id)
}
export const profilebabyUpdate = (data: any) => {
    return httpService.post('user/profile/baby/update', data)
}
export const getprofileFamilyAPI = (id: any) => {
    return httpService.post('user/profile/family', id)
}
export const profileFamilyUpdate = (data: any) => {
    return httpService.post('user/profile/family/update', data)
}
export const accountSettingAPI = (data: any) => {
    return httpService.post('user/profile/change/password', data)
}
export const getUserBillingAPI = (id: any) => {
    return httpService.post('user/billing', id)
}
export const inviteFriendUpdateAPI = (data: any) => {
    return httpService.post('user/invite/friend/store', data)
}