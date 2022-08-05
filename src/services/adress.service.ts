import httpService from "./http.service";


export const addAddress = (data: any) => {
    return httpService.post('offer/delivery/address/', data)
};

export const getAddress = () => {
    return httpService.get('offer/delivery/address/')
};

export const getAddressByID = (id: number) => {
    return httpService.get(`offer/delivery/address/${id}/`)
};

export const updateAddress = (id: number, data: any) => {
    return httpService.put(`offer/delivery/address/${id}/`, data)
};
export const deleteAddress = (id: number) => {
    return httpService.delete(`offer/delivery/address/${id}/`)
};
