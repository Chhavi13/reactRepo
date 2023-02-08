
import httpService from "./httpService";


export const AllIndustry = () => {
    return httpService.get("industry/")
}

export const companyName = () => {
    return httpService.get("company/onboarding/")
}

export const companyCode = (data: any) => {
    return httpService.post("company/onboarding/code", data)
}
