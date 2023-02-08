import httpService from "./httpService";

export const getMembershipPlan = () => {
    return httpService.get("membership/")
}

export const onBoardingFamily = (data: any) => {
    return httpService.post("onboarding/family", data)
}

export const getCoupenData = (data:any) => {
    return httpService.post("coupon/check", data)
}