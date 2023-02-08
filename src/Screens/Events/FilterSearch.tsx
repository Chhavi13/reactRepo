import React, { useEffect, useState } from 'react'
import Filter from '../../Common/Filter/Filter'
import Search from '../../Common/Search/Search'
import SearchFilter from '../../Common/SearchFilterTab/SearchFilter'
import "./FilterSearch.tsx";
import { getEventsData, FavEventApi } from '../../Service/Events';
import { FilterApi, getCourseApi } from '../../Service/Course';
import { useSelector } from 'react-redux';
import { EVENTSDETAIL } from '../../Routes/RouteConstent';
import { useNavigate } from 'react-router-dom';

const FilterSearch = (props: any) => {
    let { value, upcomingEvent, setUpcomingEvent, pastEvent, setPastEvent, favEvent, setFavEvent } = props;
    const [isFilter, setIsFilter] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [searchData, setSearchData] = useState<any>()
    const [searchPastData, setSearchPastData] = useState<any>()
    const [searchFavData, setSearchFavData] = useState<any>()
    const [filterData, setFilterdata] = useState({})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>("")
    const [searchPast, setSearchPast] = useState<any>("")
    const [searchFav, setSearchFav] = useState<any>("")

    const navigator = useNavigate()
    let userID: any = localStorage.getItem("Nurture_user_data");
    let user = JSON.parse(userID)
    userID = JSON.parse(userID)?.id;

    const selector = useSelector((res: any) => res?.events)
    const filterApiData = async () => {
        try {
            let resFilterData: any = await FilterApi();
            setFilterdata(resFilterData?.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        filterApiData()
    }, [])

    const HandleSearch = async (e: any) => {
        try {

            let type;
            if (value === "1") {
                type = 'live'
                setSearchValue(e.target.value);
            }
            if (value === '2') {
                type = 'past'
                setSearchPast(e.target.value);
            }
            let data: any = {
                user_id: userID,
                type: type,
                search: e.target.value
            }
            if (type) {
                let res: any = await getEventsData(data)
                if (res?.data?.success) {
                    if (value === "1") {
                        setSearchData(res?.data?.data)
                        setUpcomingEvent(res?.data?.data)
                    } else {
                        setSearchPastData(res?.data?.data)
                        setPastEvent(res?.data?.data)
                    }
                }
                if (!e.target.value) {
                    setUpcomingEvent(selector.upComingEvents)
                    setPastEvent(selector.pastEvents)
                }
            }
            if (value === "3") {
                setSearchFav(e.target.value);
                let res: any = await FavEventApi({ user_id: userID, search: e.target.value })
                // debugger
                if (res?.data?.success) {
                    setSearchFavData(res?.data?.data)
                    setFavEvent(res?.data?.data)
                }
                if (!e.target.value) {
                    setFavEvent(selector?.favEvent)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    const filterHandler = async (e: any, filterItem: any) => {
        try {
            e.preventDefault();
            let type;
            // if(value === "1"){
            //     type = "live"
            // }
            // if(value === "2"){
            //     type = "past"
            // }
            // let data:any = {
            //     category_id :filterItem?.category_id,
            //     progress:filterItem?.progress,
            //     stages_id:filterItem?.stages_id,
            //     user_id:userID,
            //     type:type
            // }
            // let filterResponse: any = await getEventsData(data);
            // setEventData(filterResponse?.data?.data);
            if (value === "1") {
                type = "live";
                let data: any = {
                    category_id: filterItem?.category_id.join(","),
                    progress: filterItem?.progress,
                    stages_id: filterItem?.stages_id.join(","),
                    user_id: userID,
                    type: type
                }
                setIsLoading(true)
                let filterResponse: any = await getEventsData(data);
                if (filterResponse?.data?.success) {
                    setUpcomingEvent(filterResponse?.data?.data);
                }
                setIsLoading(false)
            }
            if (value === "2") {
                type = "past";
                let data: any = {
                    category_id: filterItem?.category_id.join(","),
                    progress: filterItem?.progress,
                    stages_id: filterItem?.stages_id.join(","),
                    user_id: userID,
                    type: type
                }
                setIsLoading(true)
                let filterResponse: any = await getEventsData(data);
                if (filterResponse?.data?.success) {
                    setPastEvent(filterResponse?.data?.data);
                }
                setIsLoading(false)
            }
            if (value === "3") {
                let data: any = {
                    category_id: filterItem?.category_id.join(","),
                    progress: filterItem?.progress,
                    stages_id: filterItem?.stages_id.join(","),
                    user_id: userID
                }
                setIsLoading(true)
                let filterResponse: any = await FavEventApi(data);
                if (filterResponse?.data?.success) {
                    setFavEvent(filterResponse?.data?.data);
                }
                setIsLoading(false)
            }
            setIsFilter(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }
    let resetEventData = (e: any) => {
        if (value === "1") {
            setUpcomingEvent(selector.upComingEvents)
            if (isSearch) {
                setSearchValue("")
                setSearchData(undefined)
            }
        }
        if (value === "2") {
            setPastEvent(selector.pastEvents)
            if (isSearch) {
                setSearchPast("")
                setSearchPastData(undefined)
            }
        }
        if (value === "3") {
            setFavEvent(selector?.favEvent)
            if (isSearch) {
                setSearchFav("")
                setSearchFavData(undefined)
            }
        }

        if (isFilter) setIsFilter(false)
        if (isSearch) setIsSearch(false)
    }
    const eventDetail = (res:any) => {
        navigator(`${EVENTSDETAIL}${res?.id}`)
    }
    return (
        <div className='search-container container'>
            <SearchFilter
                isFilter={isFilter}
                isSearch={isSearch}
                setIsFilter={setIsFilter}
                setIsSearch={setIsSearch}
                // tab={value === "2" && !user?.is_membership}
                tab={value}
                isMember={user?.is_membership}
            />
            {isSearch && <Search resultHandler={eventDetail} setHide={setIsSearch} handleReset={resetEventData} search={value === "1" ? searchValue : value === "2" ? searchPast : value === "3" ? searchFav : ""} handleChange={HandleSearch} value={value === "1" ? searchData : value === "2" ? searchPastData : searchFavData} setValue={setSearchData} disabled={!user?.is_membership && value === "2" ? true : false} />}
            {isFilter && <Filter setHide={setIsFilter} submitHandler={filterHandler} submitReset={resetEventData} item={filterData} value={upcomingEvent} setValue={setUpcomingEvent} dissablebtn={isLoading} />}
        </div>
    )
}

export default FilterSearch