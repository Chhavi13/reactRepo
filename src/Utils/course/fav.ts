import produce from "immer";
import { useEffect } from "react";
import { FavoriteApi } from "../../Service/Course";

export const FavCourseRedux = (currData: any, allData: any, setState: any, callBack: any, isUpdate: any) => {

    let newData = produce(allData, (value: any) => {
        value.map((res: any) => {
            if (res.id === currData.id) {
                if (isUpdate) {
                    res.favourite = !res.favourite;
                } else {
                    res.favourite = res.favourite;
                }

            }
        })
    })
    setState(callBack(newData))

}



export const favCoursesetState = (currData: any, allData: any, setState: any) => {

    let newData = allData.map((res: any) => {
        if (res.id === currData.id) {
            res.favourite = !res.favourite;
        }
        return res;
    })

    setState(newData)
}


async function FavouriteHandler(currData: any) {
    try {
        let userID: any = localStorage.getItem("Nurture_user_data");
        userID = JSON.parse(userID)?.id;

        let FaveRes: any = await FavoriteApi({
            user_id: userID, course_id: currData.id
        })

        if (FaveRes?.data?.success) return true
        if (!FaveRes?.data?.success) {
            return false
        }
    } catch (error) {
        return false
    }
}

export default FavouriteHandler;