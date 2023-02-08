import produce from "immer"
import { EventFavApi } from "../../Service/Events"


export const upDateFavEventRedux = (crrData: any, allData: any, dispatch: any, disFunc: any, isUpdate: boolean) => {

    let newData = produce(allData, (value: any) => {
        value.map((res: any) => {
            if (crrData.id === res.id) {
                if (!isUpdate) {
                    res.favourite = res.favourite
                } else {
                    res.favourite = !res.favourite
                }
            }
        })
    }
    )

    dispatch(disFunc(newData))
}


export const EventFavSetSate = (crrData: any, allData: any, setState: any) => {
    let newData = allData.map((res: any) => {
        if (crrData.id === res.id) {
            res.favourite = !res.favourite
        }
        return res;
    })

    setState(newData)
}
export const FavEventHandle = async (crrData: any) => {

    let userID: any = localStorage.getItem("Nurture_user_data");
    userID = JSON.parse(userID)?.id;
    try {
        let data: any = {
            user_id: userID,
            event_id: crrData?.id
        }
        let res: any = await EventFavApi(data)
        if (!res?.data?.success) {
            return false;
        }
        return true;
    } catch (error: any) {
        return false;
    }
}
