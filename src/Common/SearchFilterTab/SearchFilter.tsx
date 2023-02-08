import React from 'react';
import FilterImg from "../../Assets/img/icons/filter.svg";
import SearchImg from "../../Assets/img/icons/Search.svg";
import '../SearchFilter/SearchFilter.scss';
const SearchFilter = ({
    isFilter, isSearch,
    setIsFilter, setIsSearch,tab,isMember
}: any) => {
    const onClose = (type: any) => {
        if (type === "search") {
            setIsSearch(!isSearch)
            isFilter && setIsFilter(false)
        }
        if (type === "filter") {    
            setIsFilter(!isFilter)
            isSearch && setIsSearch(false)
        }
        if(tab == 2 && !isMember){  
            setIsSearch(false)
        }
    }
    React.useEffect(()=>{
        if(tab == 2 && !isMember){
            setIsSearch(false)
        }
    },[tab])
    return (
        <div className=''>
            <p className="d-inline-block filter_para mb-0 text-left" onClick={()=>onClose("filter")}>
                <img src={FilterImg} className="mr-2" alt="filter" />{" "}
                Filter
            </p>

            <div className="d-inline-block text-right search_total_div">
                {/* <p className="total_item d-inline-block mb-0 mr-4">
                    20 Items
                </p> */}

                <span className="d-inline-block text-right search_div_items" onClick={()=>onClose("search")}>
                    <img src={SearchImg} alt="search icon" />
                </span>
            </div>
            {/* filter start */}
        </div>
    )
}

export default SearchFilter