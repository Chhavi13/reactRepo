import React, { useEffect, useState } from "react";
import Cross from "../../Assets/img/icons/cross.svg";
import Searchicon from "../../Assets/img/icons/blueSearch.svg";
import { getCourseApi } from "../../Service/Course";
import "./Search.scss"

const Search = ({ setHide, handleChange, value, search, disabled, handleReset, resultHandler }: any) => {
  console.log('reset_data', value?.length)

  const submitSearch = (e: any) => {
    e.preventDefault()
    setHide(false)
  }
  return (
    <div className="">
      <div className="filter_content p-4">
        <h3>Search</h3>
        <div onClick={() => setHide(false)}>
          <span className="cross">
            <img src={Cross} alt="cross" />
          </span>
        </div>
        <div className="filter_type search_content mt-4">
          <form onSubmit={submitSearch} className="w-100 d-flex flex-column flex-md-row align-items-md-center align-itmes-start">
            <div className="form-group d-md-inline-block d-block">
              <img src={Searchicon} alt="search" className="ms-md-2" />
              <input
                type="text"
                name="search"
                className="form-control search"
                placeholder="Female"
                value={search}
                onChange={handleChange}
              // disabled={disabled}
              />
            </div>
            <div className="reset-search ms-0 ms-md-3 mt-md-0 mt-1 mb-md-0 mb-3" onClick={handleReset}>Reset</div>
            <div className="d-md-inline-block d-block search_result me-0 ms-auto">
              {/* <p>{value ? `${value.length} results found` : 'no result found'}</p> */}
              <p>{value?.length >= 0 ? `${value.length} results found` : ""}</p>
            </div>
          </form>

          <div className="mt-4 search-overflow">
            {
              value?.map((cval: any, i: any) => {
                return (
                  <div key={i} onClick={() => resultHandler(cval)} className='result-name-container'>
                    <div className="search_result_content d-flex align-items-center">
                      <div className="search_img">
                        <img src={cval?.image} alt="Result" />
                      </div>
                      <div className="search_right_detail">
                        <p>{cval?.title || cval?.question}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
