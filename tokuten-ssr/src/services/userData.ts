 const data = () =>{
    const data:any = localStorage.getItem("authData")
    const userData = JSON.parse(data)
    return userData
}
const user = data(); 
export default user;