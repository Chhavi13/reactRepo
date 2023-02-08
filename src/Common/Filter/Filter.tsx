import React, { useState } from 'react'
import FilterImg from "../../Assets/img/icons/filter.png";
import Search from "../../Assets/img/icons/search.png";
import Cross from "../../Assets/img/icons/cross.svg";
import { getCourseApi } from "../../Service/Course";
import { CircularProgress } from '@mui/material';
import "./Filter.scss"

let stage: any = []
let category: any = []
const Filter = ({ setHide, item, value, setValue, submitHandler, dissablebtn, submitReset }: any) => {
    let userID: any = localStorage.getItem("Nurture_user_data");
    userID = JSON.parse(userID)?.id;
    const [filterItem, setFilterItem] = useState<any>({
        user_id: userID,
        stages_id: stage,
        category_id: category
    });
    const [resetLoading, setResetLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "stages_id") {
            if (e.target.checked) {
                stage.push(e.target.value);
            } else {
                let index = stage.indexOf(e.target.value)
                stage.splice(index, 1)
            }
            setFilterItem({
                ...filterItem,
                [e.target.name]: stage
            })
            return
        }
        if (e.target.name === "category_id") {

            if (e.target.checked) {
                category.push(e.target.value);
            } else {
                let index = category.indexOf(e.target.value)
                category.splice(index, 1)
            }
            setFilterItem({
                ...filterItem,
                [e.target.name]: category
            })
            return
        }
        // setFilterItem({
        //     ...filterItem,
        //     [e.target.name]: e.target.value
        // })
    }

    // const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         let filterResponse: any = await getCourseApi(filterItem);
    //         setValue(filterResponse?.data?.data);
    //         setHide(false)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    const resetHandler = () => {
        setResetLoading(true)
        submitReset()
        stage = []
        category = []
        setHide(false)
        setResetLoading(true)

    }
    console.log('filterItem', filterItem)
    return (
        <div>

            <div className="filter_content p-4">
                <h3 >Filter</h3>
                <div onClick={() => setHide(false)}>
                    <span className="cross">
                        <img src={Cross} alt="cross" />
                    </span>
                </div>
                <div className="filter_type">
                    <form onSubmit={(e) => submitHandler(e, filterItem, stage, category)}>
                        <div className="radio-area p-0 mt-3">
                            <h4>Stages</h4>
                            {
                                item?.stage?.map((stagedata: any, index: any) => {
                                    return (
                                        <div className="custom-radio" key={index}>
                                            <input
                                                type="checkbox"
                                                id={stagedata?.name}
                                                name="stages_id"
                                                className="custom-control-input form-check-input"
                                                onChange={handleChange}
                                                value={stagedata?.id}
                                                checked={stage.some((value: any) => value == stagedata?.id)}
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor={stagedata?.name}
                                            >
                                                {stagedata?.name}
                                            </label>
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>

                        <div className="radio-area p-0 mt-3">
                            <h4>Category</h4>
                            {
                                item?.category?.map((categorydata: any, catindex: any) => {
                                    return (
                                        <div className="custom-radio" key={catindex}>
                                            <input
                                                type="checkbox"
                                                id={categorydata?.name}
                                                name="category_id"
                                                className="custom-control-input form-check-input"
                                                onChange={handleChange}
                                                value={categorydata?.id}
                                                checked={category.some((value: any) => value == categorydata?.id)}
                                            //checked={filterItem?.category === categorydata?.name}
                                            // checked={filterItem?.id}

                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor={categorydata?.name}
                                            >
                                                {categorydata?.name}
                                            </label>
                                        </div>

                                    )
                                })
                            }
                        </div>

                        {/* {item?.progress && <div className="radio-area p-0 mt-3">
                            <h4>Progress</h4>
                            {
                                item?.progress?.map((progressdata: any, proindex: any) => {
                                    return (
                                        <div className="custom-radio" key={proindex}>
                                            <input
                                                type="radio"
                                                id={progressdata?.id}
                                                name="progress"
                                                className="custom-control-input form-check-input"
                                                onChange={handleChange}
                                                value={progressdata?.id}
                                                //checked={filterItem?.progress === progressdata?.name}
                                                // checked={filterItem?.id}
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor={progressdata?.id}
                                            >
                                                {progressdata?.name}
                                            </label>
                                        </div>
                                    )

                                })
                            }
                        </div>} */}

                        <div className="row mt-4 mb-3">
                            <div className="col-md-12">
                                <button type='reset' disabled={resetLoading} className="primary-outline-btn me-3" onClick={resetHandler}>
                                    {resetLoading ? <CircularProgress /> : "Reset"}
                                </button>

                                <button type="submit" disabled={dissablebtn} className="btn primary-blue-small-btn">
                                    {/* Apply */}
                                    {dissablebtn ? <CircularProgress /> : "Apply"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    )
}

export default Filter
