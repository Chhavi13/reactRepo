import httpService from "./http.service"


export const getTitleTag = () => {
  return httpService.get("offer/tag/");
};

export const createOffer = (payload: any) => {
  return httpService.post("offer/manager/", payload);
};

export const getTitletagList = () => {
  return httpService.get("offer/tag/");
}
export const getOfferList = () => {
  return httpService.get("offer/list/");
};
export const getOfferListSingle = (id: any) => {
  return httpService.get(`offer/public/view/${id}/`);
};
export const createTransaction = (payload: any) => {
  return httpService.post(`offer/transaction/`, payload);
};

export const getCreatedOfferDetail = (id: number) => {
  return httpService.delete(`offer/manager/${id}/`)
};
export const getOfferDetail = (id: number) => {
  return httpService.get(`offer/manage/store/${id}/`)
}
export const getFanGroups = () => {
  return httpService.get("profile/manager/fangroup/")
}
export const getFanList = (id: any) => {
  return httpService.get(`profile/manager/audience/?group=${id}`)
}
export const createInvestor = (data: any) => {
  return httpService.post("profile/manager/investor/", data)
}
export const getInvestor = () => {
  return httpService.get(`profile/manager/investor/`)
}

export const getInvestorById = (id:any) =>{
  return httpService.get(`auth/user/profile/view/${id}/`)
}

export const likeOfferById = (id:number, data:any) => {
  return httpService.patch(`offer/like/${id}/`, data)
}

export const addFollowUp = (data:any) => {
  return httpService.post("offer/followup/", data)
}

export const getFollowUp = (id: any) => {
  return httpService.get(`offer/public/followup/list/?id=${id}`)
}

export const addComments = (data:any) => {
  return httpService.post("offer/comments/", data)
}

export const getComments = (id:number) => {
  return httpService.get(`offer/public/comment/list/?id=${id}`)
}

export const getOfferReplies = (id:number) => {
  return httpService.get(`/offer/public/comment/replies/list/?id=${id}`)
}

export const fetchPostSearchResults = (query: any) => {
  return httpService.get(`auth/global/search/?q=${query}`).then((res: any) => {
    const result: any = [];
    let name: any, displayName: any;
    try {
      res.data.forEach((element: any) => {
        if(element?.hasOwnProperty('username')) {
          name = element.username;
        } else if(element?.hasOwnProperty('name')) {
          name = element.name;
        }
        if(element?.hasOwnProperty('first_name')) {
          displayName = element.first_name;
        } else if(element?.hasOwnProperty('full_form')) {
          displayName = `${element.short_form}: ${element.full_form}`;
        }
        result.push({id: element.id, name: name, display_name: displayName});
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  });
}

/* Get @user $tag on create post */
export const fetchUserList = (query: any) => {
  return httpService.get(`auth/global/search/?q=${query}`).then((res: any) => {
    const result: any = [];
    let displayName: any, name: any;
    try {
      res.data.forEach((element: any) => {
        if(element?.hasOwnProperty('first_name')) {
          name = element.first_name || element.username;
        } else if(element?.hasOwnProperty('name')) {
          name = element.name;
        }
        if(element?.hasOwnProperty('full_form')) {
          displayName = `${element.short_form}: ${element.full_form}`;
        }
        result.push({ id: element.id, display: name, name: displayName });
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  });
}

/* Get @$tag on create post */
export const fetchCreatedPost = (query: any) => {
  return httpService.get(`offer/list/?q=${query}`).then((res: any) => res?.data?.data);
}
