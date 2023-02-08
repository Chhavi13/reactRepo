// import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { Container, Row, Form } from 'react-bootstrap';
import SearchFilter from '../../Common/SearchFilterTab/SearchFilter';
import Filter from '../../Common/Filter/Filter';
// import "./Search.scss";
import SearchResult from '../../Common/Search/Search';
import { getMyMsgApi, getQuestionList } from '../../Service/ask_a_nurse';
// import { FilterApi } from '../../Service/Course';
import { tagFilterCourse } from '../../Service/ask_a_nurse';
import "../../global.css";
import "../../global-componant.css";
import { useNavigate } from 'react-router-dom';
import { FAQLIST } from '../../Routes/RouteConstent';


const Search = ({ upDateData, submitReset, isSearch, setIsSearch, tab }: any) => {
  const [isFilter, setIsFilter] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState<any>("")
  const [searchMsg, setSearchMsg] = React.useState<any>("")
  // const [isSearch, setIsSearch] = React.useState(false)
  let [filterData, setFilterdata] = React.useState([])
  let [value, setValue] = React.useState()
  let [msgValue, setMsgValue] = React.useState()
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  let userID: any = localStorage?.getItem("Nurture_user_data");
  userID = JSON?.parse(userID)?.id;

  const Navigate = useNavigate()

  const getFilterData = async () => {
    try {
      let FilterRes: any = await tagFilterCourse();
      let { progress, ...rest } = FilterRes?.data;
      setFilterdata(rest);
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    getFilterData()
  }, [])

  const filterHandler = async (e: any, filterItem: any, stage: any, category: any) => {
    try {

      e.preventDefault();
      setIsLoading(true)
      filterItem.stages_id = stage.join(",")
      filterItem.category_id = category.join(",")
      let filterResponse: any = await getQuestionList(filterItem);
      // setCourseData(filterResponse?.data?.data);
      if (filterResponse?.data?.success) {
        upDateData(filterResponse?.data?.data)
      }
      setIsLoading(false)
      setIsFilter(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }
  const handleSearch = async (e: any) => {
    // setSearchValue(e.target.value)
    // let res: any = await getQuestionList({ user_id: userID, search: e.target.value })
    // if (res?.data?.success) {
    //   setValue(res?.data?.data)
    //   upDateData(res?.data?.data)

    // }
    if (tab == 1) {
      setSearchValue(e.target.value)
      let res: any = await getQuestionList({ user_id: userID, search: e.target.value })
      if (res?.data?.success) {
        setValue(res?.data?.data)
        upDateData(res?.data?.data)
      }
    }
    if (tab == 2) {
      setSearchMsg(e.target.value)
      let res: any = await getQuestionList({ user_id: userID, search: e.target.value })
      if (res?.data?.success) {
        setMsgValue(res?.data?.data)
        upDateData(res?.data?.data)
      }
    }
  }
  const paymentDetail = (data: any) => {
    Navigate(FAQLIST + data?.id)
  }

  const getApiData = async () => {
    try {
      if (tab == 1) {
        let res: any = await getQuestionList({ user_id: userID })
        if (res?.data?.success) {
          upDateData(res?.data?.data)
        }
      }
      if (tab == 2) {
        let res: any = await getQuestionList({ user_id: userID })
        if (res?.data?.success) {
          upDateData(res?.data?.data)
        }
      }
    } catch (error) {
      console.log("frequently ask message error", error)
    }
  }
  
  let resetMsgData = () => {
    if (tab == 1) {
      getApiData()
      if (isSearch) {
        setSearchValue("")
        setValue(undefined)
      }      
    }
    if (tab == 2) {
      getApiData()
      if (isSearch) {
        setSearchMsg("")
        setMsgValue(undefined)
      }      
    }
    if (isSearch) setIsSearch(false)
    if (isFilter) setIsFilter(false)
  }
  return (
    <div className="container search-main-container padding-lt-rt">
      <div className="Row">
        <div className="col-lg-12">
          <div className='search-container'>
            <SearchFilter
              isFilter={isFilter}
              isSearch={isSearch}
              setIsFilter={setIsFilter}
              setIsSearch={setIsSearch}
            />
            {isSearch && <SearchResult setHide={setIsSearch} search={tab == 1 ? searchValue : searchMsg}
              handleChange={handleSearch}
              resultHandler={paymentDetail} handleReset={resetMsgData}
              value={tab == 1 ? value : msgValue} />}
            {isFilter && <Filter submitHandler={filterHandler} setHide={setIsFilter} item={filterData} dissablebtn={isLoading} submitReset={submitReset} />}
            {/* {isFilter && <Filter setHide={setIsFilter} item={filterdata} value={courseData} setValue={setCourseData} />} */}

            {/* <Row>
          <div className='col-lg-12'>
          <Form>
              <div className='searchbarS position-relative'>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="search" placeholder="search.."/>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C15.5228 0 20 4.47715 20 10C20 12.4013 19.1536 14.6049 17.7429 16.3287L21.7071 20.2929L20.2929 21.7071L16.3287 17.7429C14.6049 19.1536 12.4013 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z" fill="#50CCB8"/>
                </svg>
              </div>
            </Form>
          </div>
        </Row> */}
          </div>
        </div>
      </div>
    </div>

  )
}

export default Search