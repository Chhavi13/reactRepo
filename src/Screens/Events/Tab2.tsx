import React from 'react'
import { Container, Row, } from 'react-bootstrap';
import "./Tab2.scss";
import { eventLikeUpdRedux } from '../../Utils/Events/Like';
import { useDispatch } from 'react-redux';
import { upDatePastEventsData } from '../../Redux/Events/EventsReducer';
import EventCard from '../../Common/EventCard/EventCard';
import { UpdateFunType } from '../../Types/Course/updateFunction';

const Tab2 = ({ data }: any) => {
  const dispatch = useDispatch()

  const likeHandle = (type: string, crrdata: UpdateFunType, isUpdate: boolean, isSuccess: UpdateFunType) => {
    if (isSuccess) return;
    eventLikeUpdRedux(crrdata, data, dispatch, upDatePastEventsData, isUpdate)

  }

  return (
    <div>
      <Container fluid className='p-0'>
        <Row>
          <div className='col-lg-12 past-event-main py-5'>
            <Container>
              <Row>
                <div className='col-lg-12 text-left'><h2>Past Events</h2></div>
              </Row>
              <EventCard data={data} upDateData={likeHandle} tab="2" />
            </Container>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default Tab2