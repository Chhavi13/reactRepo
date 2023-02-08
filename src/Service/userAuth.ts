import api from "./axios";

export const userSignup = (data: any) => {
    return api.post("signup", data)
}

export const verifyOtp = (data: any) => {
    return api.post("verify/otp", data)
}

export const UserLogin = (data: any) => {
    return api.post("login", data)
}
export const UserForgotPassword = (email: any) => {
    return api.post("password/email", email)
}

export const ResetPassword = (data: any) => {
    return api.post("password/reset", data)
}

export const ResendEmailVerify =(data:any)=>{
    return api.post("resend/otp",data)
}