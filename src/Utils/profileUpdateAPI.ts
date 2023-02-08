import { getUserProfileEdit } from "../Service/update_profile"
let userID: any = localStorage.getItem("Nurture_user_data");
userID = JSON.parse(userID)?.id;

const getUserProfileUpdateAPI = async () => {
    try {
        let res: any = await getUserProfileEdit({user_id:userID})
        return res?.data
    } catch (err) {
        console.log(err)
    }
}

export default getUserProfileUpdateAPI