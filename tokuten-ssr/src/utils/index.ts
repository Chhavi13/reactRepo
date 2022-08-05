
export const isLogin = () => {
       let token: any = localStorage.getItem("auth_token")
        if(token){
            return true
        }else{
            return false
        }
}