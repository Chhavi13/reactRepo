import produce from "immer"
import { EventLikeApi } from "../../Service/Events"

let userID: any = localStorage.getItem("Nurture_user_data");
userID = JSON.parse(userID)?.id;

export const eventLikeUpdRedux = (crrData: any, allData: any, dispatch: any, disFunc: any, isUpdate: boolean) => {
    let newData = produce(allData, (value: any) => {
        value.map((res: any) => {
            if (crrData.id === res.id) {
                if (!isUpdate) {
                    res.like_count = res.like_count
                    res.like = res.like
                } else {

                    if (!res?.like) {
                        res.like_count = res.like_count + 1
                        res.like = true
                    } else {
                        res.like_count = res.like_count - 1
                        res.like = false
                    }
                }
            }

        })
    })
    dispatch(disFunc(newData))

}

export const EventLikeSetState = (crrData: any, allData: any, setUpdate: any, isUpdate: boolean) => {
    let newData = allData.map((res: any) => {

        if (crrData.id === res.id) {
            if (!res?.like) {
                res.like_count = res.like_count + 1
                res.like = true
            } else {
                res.like_count = res.like_count - 1
                res.like = false
            }
        }
        return res;
    })
    setUpdate(newData)
}

export const EventLikeHandler = async (crrData: any) => {
    try {
        let data: any = {
            user_id: userID,
            event_id: crrData?.id
        }
        let res: any = await EventLikeApi(data)
        if (!res?.data?.success) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}
