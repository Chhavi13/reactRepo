import React from 'react'
import { Container, Row, Col, Button, Image, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./Tab1.scss";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import unlike from "../../Assets/img/icons/like.svg"
import Liked from "../../Assets/img/icons/liked.svg"

import { FAQLIST } from '../../Routes/RouteConstent';
import { questionLikeApi } from '../../Service/ask_a_nurse';
import MemberWrapper from './MemberWrapper';

const Tab1 = (props: any) => {

    const Navigate = useNavigate();
    let { data, setData } = props;
    console.log('repeat_data',data)
    let userID: any = localStorage.getItem("Nurture_user_data");
    userID = JSON.parse(userID)?.id;
    const questionLike = async (resData: any) => {
        try {

            let newValue = data.map(((res: any) => {
                if (res.id === resData.id) {
                    res.like = !res.like
                    res.like_count = res.like ? res.like_count + 1 : res.like_count - 1
                }
                return res
            }))
            setData(newValue)

            let obj = {
                user_id: userID,
                ask_nurse_question_id: resData?.id
            }
            let res: any = await questionLikeApi(obj)
            let isSuccess = res.data.success;
            if (!isSuccess) {
                let newValue = data.map(((res: any) => {
                    if (res.id === resData.id) {
                        res.like = !res.like
                        res.like_count = res.like ? res.like_count + 1 : res.like_count - 1
                    }
                    return res
                }))
                setData(newValue)
            }
        } catch (error) {
            let newValue = data.map(((res: any) => {
                if (res.id === resData.id) {
                    res.like = !res.like
                    res.like_count = res.like ? res.like_count + 1 : res.like_count - 1
                }
                return res
            }))
            setData(newValue)
            console.log("Error", error)
        }
    }
    return (
        <div className='container-fluid p-0'>
            <Row>
                <div className='col-lg-12 col-md-12 pale-yellow-bg'>
                    <Container className=''>
                        <Row>
                            <div className='col-lg-12 category-section'>
                                <ListGroup variant="flush">
                                    <MemberWrapper data={data}>
                                        {data.map((res: any) => (
                                            <ListGroup.Item className='ps-0'>
                                                <div className='d-flex justify-content-between align-items-start list-inner w-100'>
                                                    <div className='d-flex flex-column w-100'>
                                                        <div className='tags-row d-flex flex-wrap'>
                                                            {res?.tag?.map((tag: any) => (<div className='tag1 tags'
                                                                style={{ backgroundColor: tag?.color_code }}
                                                            >{tag?.name}</div>))}
                                                        </div>
                                                        <div className='askN-questions mb-3'><p>{res?.question}</p></div>
                                                        {/* <div className='askN-description'><p>{res?.answer}</p></div> */}
                                                        <div className='d-flex justify-content-between'>
                                                            <div className='askN-likes d-flex align-items-center' onClick={() => questionLike(res)}>{res?.like ? <img src={Liked} alt="like" /> : <img src={unlike} alt="unlike" />}
                                                                <span className="like-count">{res?.like_count}</span>
                                                            </div>

                                                            <div className='faq-readmore-container'>
                                                                {
                                                                    res?.answer?<button className="btn faq-readmore" onClick={() => Navigate(`${FAQLIST}${res?.id}`)}>Read more</button>:""
                                                                }
                                                                {/* <button className="btn faq-readmore" onClick={() => Navigate(`${FAQLIST}${res?.id}`)}>Read more</button> */}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </MemberWrapper>
                                </ListGroup>
                            </div>
                        </Row>
                    </Container>
                </div>
            </Row>
        </div>
    )
}

export default Tab1