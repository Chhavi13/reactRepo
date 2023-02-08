import produce from "immer";
import { LikeApi } from "../../Service/Course";


let userID: any = localStorage.getItem("Nurture_user_data");
userID = JSON.parse(userID)?.id;
// let userID:any;
export const courseLikeRedux = (currData: any, allData: any, dispatch: any, upDateFunc: any, isUpadate: any) => {
    try {

        let newData = produce(allData, (value: any) => {
            value.map((res: any) => {
                if (res.id === currData.id) {
                    if (!isUpadate) {
                        res.like = res.like
                        res.like_count = res.like_count

                    } else {
                        if (res.like) {
                            res.like = !res.like
                            res.like_count = res.like_count - 1
                        } else {
                            res.like = !res.like
                            res.like_count = res.like_count + 1
                        }
                    }
                }
            })
        })
        dispatch(upDateFunc(newData))
    } catch (error) {
        console.log("error in updating like", error)
    }
}

export const likeCourseSetState = (currData: any, allData: any, setUpdate: any) => {
    let newData = allData.map((res: any) => {

        if (res.id === currData.id) {

            if (res.like) {
                res.like = !res.like
                res.like_count = res.like_count - 1
            } else {
                res.like = !res.like
                res.like_count = res.like_count + 1
            }
        }


        return res;
    })
    setUpdate(newData)
}

const courseLikeHandler = async (currData: any) => {
    try {
        let LikeRes: any = await LikeApi({ user_id: userID, course_id: currData.id })
        if (!LikeRes.data.success) {
            return false
        }
        return true
    } catch (error: any) {
        return false;
    }
}

export default courseLikeHandler;