import httpService from "./http.service";
const progress = (onUploadProgress?: any) => {
  return {
    onUploadProgress,
  }
}
export const uploadUserProfiles = (data: any, onUploadProgress?: any) => {
  return httpService.put('/auth/profile/', data, progress(onUploadProgress))
}

export const approvalData = () => {
  return httpService.get( "auth/get/image/" )
}
export const updateProfileImage = (data: any, onUploadProgress?: any) => {
  return httpService.put("auth/get/image/", data, progress(onUploadProgress))
}
export const uploadMedia = (data: any, onUploadProgress?: any) => {
  return httpService.post('auth/image/', data, progress(onUploadProgress))
}
export const updateProfile = (data: any) => {
  return httpService.put("auth/profile/", data);
};
export const getUserProfileMedia = () => {
  return httpService.get("auth/image/");
};
export const getProfile = () => {
  return httpService.get('auth/profile/')
}
export const getUserProfileDetail = (id: number) => {
  return httpService.get(`auth/user/profile/view/${id}/`).then(res => res?.data);
};
export const login = (data: any) => {
  return httpService.post('auth/login/', data);
}
export const joinWaitList = (data: any) => {
  return httpService.post('auth/register/', data)
}
export const unlockAccess = (data: any) => {
  return httpService.put('auth/activate/account/', data)
}
export const logout = () => {
  return httpService.get('auth/logout/')
}
export const changePassword = (data: any) => {
  return httpService.put('auth/', data)
}
export const loginUser = (data: any) => {
  return httpService.post('auth/login/', data);
}
export const updatePersonalDetail = (data: any) => {
  return httpService.put("auth/profile/", data)
}
export const profileImage = () => {
  return httpService.get("auth/get/image/")
}
export const checkUserUnique = (data:any) => {       
  return httpService.post('auth/check/user/exists/',data)
}
export const authImage = ()=>{
  return httpService.get("auth/image/")
}
export const confirmEmail = (payload: any)=>{
  return httpService.put('auth/activate/account/',payload)
}
export const getProfileImage = () => {
  return httpService.get('auth/get/image/')
}
export const forgotPassword = (data: any) => {
  return httpService.post("password/reset/", data)
}

export const forgotResetPassword = (data: any) => {
  return httpService.post("password/reset/confirm/", data)
}

export const getToken = (username: string) => {
  return httpService.get(`chat/token/generate?identity=${username}`).then((res: any) => res.data.data.token);
}

export const blockedUser = (id:any) =>{
  return httpService.post("auth/block/user/",id)
}