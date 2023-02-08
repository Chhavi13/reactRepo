import axios from "axios";


const Axios = axios.create({
    baseURL: "https://dev.nurturebynaps.com/api/"
})
Axios.interceptors.request.use(
    (config) => {
        const Token = localStorage.getItem("Nurture_user_token")
        let TokenType: any = localStorage.getItem("Nurture_user_data")
        TokenType = JSON.parse(TokenType)?.token_type
        if (Token) {
            config.
                headers = {
                Authorization: `${TokenType} ${Token}`,
                Accept: "application/json",
            }
        }
        return config;
    }
)
export default Axios;