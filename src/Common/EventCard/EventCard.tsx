import moment from 'moment';
import React from 'react';
import { Card, Image, Row } from 'react-bootstrap';
import "./EventCard.scss";
import parse from "html-react-parser";
import Like from "../../Assets/img/icons/like.svg";
import Liked from "../../Assets/img/icons/liked.svg";
import heart_outline from "../../Assets/img/course/heart-outline.svg";
import heart_fill from "../../Assets/img/course/heart-fill.svg";
import { EVENTSDETAIL } from '../../Routes/RouteConstent';
import { useNavigate } from 'react-router-dom';
import { FavEventHandle } from '../../Utils/Events/Fav';
import { EventLikeHandler } from '../../Utils/Events/Like';

interface Props {
    data: any,
    upDateData?: any,
    tab?: string
}

const EventCard = (props: Props) => {

    let { data, upDateData, tab } = props;
    const Navigate = useNavigate();

    const EventFavHandle = async (res: any) => {
        upDateData("fav", res, true, false)
        let isFav = await FavEventHandle(res)
        upDateData("fav", res, isFav, isFav)
    }

    const EventLikeHandle = async (res: any) => {
        upDateData("like", res, true, false)
        let isLike = await EventLikeHandler(res)
        upDateData("like", res, isLike, isLike)
    }

    const handleJoin = (res: any) => {
        Navigate(`${EVENTSDETAIL}${res?.id}`, { state: { tab: tab && tab } })
    }
    return (
        <>
            <Row>
                {data.map((res: any) => (<div className='col-lg-4 col-md-6 mb-4 event-card'>
                    <Card className='video-container-main'>
                        <div className='video-container-inner'>
                            <Image fluid src={res?.image} className='image-fluid' />
                            <div className='tags-likes d-flex justify-content-between'>
                                <div className='tags-row'><span className='tag2 tags'>{res?.type}</span>
                                    {
                                        res?.tag && !Array.isArray(res.tag) ? res.tag.split(",").map((res: any) => (

                                            <span className="tag1 tags">{res}</span>
                                        )) :
                                            res?.map((res: any) => (
                                                <span className="tag1 tags">{res}</span>
                                            ))

                                    }
                                </div>
                                {res?.type !== 'Past' && <div className='fav-container'>
                                    <img onClick={() => EventFavHandle(res)} src={res?.favourite ? heart_fill : heart_outline} className='img-responsive' />
                                </div>}
                            </div>
                        </div>
                        <Card.Body>
                            <div className='d-flex align-items-start justify-content-between mb-2'>
                                <Card.Title>{res?.title}</Card.Title>
                                <div className='like'><img src={res?.like ? Liked : Like} onClick={() => EventLikeHandle(res)} /> {res?.like_count}</div>

                            </div>
                            <Card.Text>
                                {parse(String(res?.description))}
                            </Card.Text>
                            <div className='event-time pt-2'>
                                {moment(res?.event_date_time).format("LLLL")}
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <div className='live-class-card-footer d-flex justify-content-between'>
                                <button className="btn primary-blue-small-btn-40" onClick={() => handleJoin(res)}>{res?.is_book ? "Registered" : "Join"}</button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>))}

            </Row>
        </>
    )
}

export default EventCard