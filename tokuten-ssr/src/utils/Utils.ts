export const setItemLocalStorage = (key:any, value:any) => {
  localStorage.setItem(key, value);
};

export const getItemLocalStorage = (key:any) => {
  let token: any = key ? localStorage.getItem(key) : false;
  return token;
};

export const removeItemLocalStorage= (key:any) => {
  localStorage.removeItem(key)
};

/**** Get access token ****/
export const getShopifyUserDetails = () => {
  
  let data:any = getItemLocalStorage('access_token')
    
  data = JSON.parse(data)
  return data ? data : false;
}

/**** Get store link ****/
export const getStoreLink = () => {
  return getItemLocalStorage('store_url');
}

/**** Connect to shopify ****/
export const connectToShopify = (storeLink:any) => {
  const pathname = '/admin/oauth/authorize?client_id=';
  const client_id = 'ac56e8829685cf9c9883d360e8b5aa27';
  const scope = 'read_products,write_products,read_orders,write_orders,read_discounts,write_discounts,read_price_rules,write_price_rules';
  const ORIGIN = window.location.origin;
  const REDIRECT_URI = `${ORIGIN}/shopify/connect/`;
  const URL = `http://${storeLink}${pathname}${client_id}&scope=${scope}&redirect_uri=${REDIRECT_URI}`;
  console.log("Fine URL --->", URL);
  window.location.href = URL;
}