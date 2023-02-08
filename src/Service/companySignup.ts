
import httpService from "./httpService";


export let Basic = async (data: any) => {
    return httpService.post("company/onboarding/basic", data)
}

export let aboutUs = async (data: any) => {
    return httpService.post("company/onboarding/about", data)
}

export let getMembership = async () => {
    return httpService.get("company/membership/",)
}

export let subscription = (data: any) => {
    return httpService.post("company/onboarding/membership", data)
}
export let aboutUsFamily = (data: any) => {
    return httpService.post("company/onboarding/family", data)
}

export let aboutBaby = (data: any) => {
    return httpService.post("company/onboarding/baby", data)
}

//company_code