import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Calender } from '../../../components/calender/calender'
import { Header } from '../../../components/header/header'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import './createrEventList.scss'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

interface IProps { }
export const CreaterEventList: React.FC<IProps> = () => {
    const history = useHistory()

    const enableback = () => { history.goBack() }
    const enablenext = () => {
        history.push('/create/slot')
    }
    return (
        <div className="mobilemaincontainer">
            <div className="mobile_container time_container">
                <Header
                    back={true}
                    enableback={enableback}
                    next={<AddCircleOutlineOutlinedIcon />}
                    enablenext={enablenext}
                />
                <Calender />
            
            <div className="calendar_container">
                <Row className="pt-2 mt-2 mb-2 pb-2">
                    <Col md={1} xs={1} className="ml-4">
                        <ArrowBackIosIcon fontSize={'small'} />
                    </Col>
                    <Col  md={8} xs={8}>
                        <p style={{textAlign:'center'}}> Monday, 15 March 2021 </p>
                    </Col>
                    <Col md={2} xs={2}>
                        <KeyboardArrowRightIcon fontSize={'large'} />
                    </Col>
                </Row>
            </div>
            <div>
                <div className="">
                    {
                        [1, 2, 3, 4].map((x, i) => (
                            <div className="event-container"> 
                                <Row>
                                    <Col md={3} sm={3} xs={3}>
                                        <div className="event-time">
                                            10:00 
                                        </div>
                                    </Col>
                                    <Col md={9} sm={9} xs={9} className="event_right" style={{ background: x % 2 && '#F1EFF7' }}>
                                        <p className=" event-name">
                                            Ash/Supreet/Aditiya
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        ))
                    }

                </div>

            </div>
            </div>
        </div>
    )
}