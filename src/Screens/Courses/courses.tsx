import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Filter from "../../Common/Filter/Filter";
import Search from "../../Common/Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { getCourse, getFavCourse } from "../../Redux/Course/CourseReducer";
import { useNavigate } from "react-router-dom";
import { COURSEVIEW } from "../../Routes/RouteConstent";
import DetailPopup from "./detailPopup";
import { FilterApi, getCourseApi } from "../../Service/Course";
import SearchFilter from "../../Common/SearchFilterTab/SearchFilter";
import Header from "./Header/Header";
import AllCourse from "./AllCourseTab/AllCourse";
import Favourate from "./FavourateTab/Favourate";
import "./courses.scss";

const Courses = () => {
  //state declaration
  const [value, setValue] = React.useState("1");
  const [isFilter, setIsFilter] = React.useState(false)
  const [isSearch, setIsSearch] = React.useState(false)
  const [modalShow, setModalShow] = React.useState(false);
  let [courseData, setCourseData] = useState<any>([])
  let [favData, setFavData] = useState<any>([])
  let [searchData, setSearchData] = useState<any>()
  let [searchFavData, setSearchFavData] = useState<any>()
  let [modelData, setModelData] = useState<any>([])
  let [filterdata, setFilterdata] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchFav, setSearchFav] = useState<any>("")
  //variable declaration 
  let userID: any = localStorage.getItem("Nurture_user_data");
  userID = JSON.parse(userID)?.id;
  let selector: any = useSelector((data: any) => data)
  const Navigate = useNavigate()
  let dispatch = useDispatch();


  // get and update course data
  const dispatchCourseData = async () => {
    try {
      await dispatch(getCourse({ user_id: userID }))
    } catch (error) {
      console.log('error', error)
    }

  }
  const dispatchFavCourse = async () => {
    try {
      await dispatch(getFavCourse({ user_id: userID }))
    } catch (error) {
    }
  }
  const getCourseData = () => {
    if (selector?.courseData?.data?.length === 0) dispatchCourseData()
    if (selector.courseData.data === undefined) {
      setCourseData([])
      return
    }
    setCourseData(selector.courseData.data)
  }

  const getFilterData = async () => {
    try {
      let FilterRes: any = await FilterApi();
      setFilterdata(FilterRes?.data);
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    getFilterData()
  }, [])

  let getFavCourseData = () => {
    if (!selector?.courseData?.favCourse) {
      if (selector?.courseData?.favCourse?.length === 0) {
        dispatchFavCourse()
      }
    }
    setFavData(selector?.courseData.favCourse)
  }
  useEffect(() => {
    if (selector?.courseData?.data?.length === 0) {
      dispatchCourseData()
    }

    if (!selector?.courseData?.favCourse) {
      dispatchFavCourse()
    }
    getCourseData()
    getFavCourseData()
  }, [selector, dispatch])
  // end get and update course data

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  // handle on like 

  const paymentDetail = (data: any) => {
    Navigate(COURSEVIEW + data?.id)
  }

  const handleSearch = async (e: any) => {
    try {
      if (value === "1") {
        setSearchInput(e.target.value)
        let res: any = await getCourseApi({ user_id: userID, search: e.target.value })
        if (res?.data?.success) {
          setSearchData(res?.data?.data)
          setCourseData(res?.data?.data)
        }
      }
      if (value === "2") {
        setSearchFav(e.target.value)
        let res: any = await getCourseApi({ user_id: userID, search: e.target.value })
        let favdata = res?.data?.data.filter((val: any, i: any) => val.favourite === true)
        if (res?.data?.success) {
          setSearchFavData(favdata)
          setFavData(favdata)
        }
      }
      if (!e.target.value) {
        setCourseData(selector.courseData.data)
        setFavData(selector?.courseData.favCourse)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const filterHandler = async (e: any, filterItem: any, stage: any, category: any) => {
    try {
      e.preventDefault();
      setIsLoading(true)
      filterItem.stages_id = filterItem.stages_id.join(",")
      filterItem.category_id = filterItem.category_id.join(",")
      let filterResponse: any = await getCourseApi(filterItem);
      if (filterResponse?.data?.success) {
        setCourseData(filterResponse?.data?.data);
      }
      setIsLoading(false)
      setIsFilter(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }
  let resetCourseData = (e: any) => {

    if (value === "1") {
      if (isSearch) {
        setSearchInput("")
        setSearchData(undefined)
      }
      setCourseData(selector?.courseData?.data)
    }
    if (value === "2") {
      setFavData(selector?.courseData?.favCourse)
      if (isSearch) {
        setSearchFav("")
        setSearchFavData(undefined)
      }
    }
    if (isSearch) setIsSearch(false)
    if (isFilter) setIsFilter(false)
  }

  return (
    <div>
      <DetailPopup
        show={modalShow}
        data={modelData}
        setData={setModelData}
        onHide={() => setModalShow(false)}
      />

      <div className="container-fluid course_content_page mt-5 mb-4">
        <div className="course_page">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <Header />
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderColor: "divider" }} className="course-tabs-main">
                      <div className='d-flex justify-content-center'>
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                        >
                          <Tab label="All Courses" value="1" />
                          <Tab label="Favorites" value="2" />
                        </TabList>
                      </div>
                    </Box>
                    <div className="container search-main-container padding-lt-rt">
                      <div className="Row">
                        <div className="col-lg-12 col-md-12">
                          <div className="search-container">
                            <SearchFilter
                              isSearch={isSearch} isFilter={isFilter}
                              setIsFilter={setIsFilter} setIsSearch={setIsSearch}
                            />

                            {isFilter && <Filter setHide={setIsFilter} submitHandler={filterHandler}
                              submitReset={resetCourseData} item={filterdata}
                              value={courseData} setValue={setCourseData} dissablebtn={isLoading}
                            />}
                            {isSearch && <Search resultHandler={paymentDetail} handleReset={resetCourseData} search={value === "1" ? searchInput : searchFav} setHide={setIsSearch} handleChange={handleSearch} value={value === "1" ? searchData : searchFavData} setValue={setSearchData} />}
                          </div>
                        </div>
                      </div>
                    </div>

                    <TabPanel value="1" className="all-course-container">
                      <div className="tab_course_content">

                        <AllCourse courseData={courseData} />
                      </div>
                    </TabPanel>
                    <TabPanel value="2" className="fav-course-container">
                      <div className="tab_course_content">
                        <Favourate
                          favData={favData} />
                      </div>
                    </TabPanel>
                  </TabContext>
                </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
