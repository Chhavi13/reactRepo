export const setItemLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const get = (key: string) => {
  const data = key ? localStorage.getItem(key) : false;
  return data;
};

export const removeItemLocalStorage= (key: string) => {
  localStorage.removeItem(key)
};

/**** Get access token ****/
export const getShopifyUserDetails = () => {
  let data: any = get('access_token');
  data = JSON.parse(data);
  return data ? data : false;
}

/**** Get store link ****/
export const getStoreLink = () => {
  return get('store_url');
}

// export default {get}