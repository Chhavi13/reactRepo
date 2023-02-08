export const getDataFromLocalStorage = () => {

    let user: any = localStorage.getItem("Nurture_user_data");
    user = JSON.parse(user)
    if (user) return user;
    return null;

}
export const getUserID = () => {
    let user: any = localStorage.getItem("Nurture_user_data");
    user = JSON.parse(user)?.id
    if (user) return user;
    return null;
}