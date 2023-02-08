import httpService from "./httpService";
export let Basic = async (data: any) => {
    return httpService.post("onboarding/basic", data)
}

export let aboutUs = async (data: any) => {
    return httpService.post("onboarding/about", data)
}

export let getMembership = async () => {
    return httpService.get("membership/",)
}

export let subscription = (data: any) => {
    return httpService.post("onboarding/membership", data)
}
export let aboutUsFamily = (data: any) => {
    return httpService.post("onboarding/family", data)
}

export let aboutBaby = (data: any) => {
    return httpService.post("onboarding/baby", data)
}