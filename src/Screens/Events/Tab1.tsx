import React from 'react'
import { Container, Row } from 'react-bootstrap';
import "./Tab1.scss";
import { eventLikeUpdRedux } from '../../Utils/Events/Like';
import { useDispatch } from 'react-redux';
import { getFavEvent, upDateLiveEventsData } from '../../Redux/Events/EventsReducer';
import { upDateFavEventRedux } from '../../Utils/Events/Fav';
import EventCard from '../../Common/EventCard/EventCard';
import { UpdateFunType } from '../../Types/Course/updateFunction';
import { CircularProgress } from '@mui/material';

const Tab1 = ({ data, setData,loading }: any) => {
 
  let dispatch = useDispatch()
  console.log(data)
  const likeFavHandle = (type: string, crrdata: UpdateFunType, isUpdate: boolean, isSuccess: UpdateFunType) => {
    if (isSuccess) {
      dispatch(getFavEvent())
      return;
    }
    if (type === "fav") {
      upDateFavEventRedux(crrdata, data, dispatch, upDateLiveEventsData, isUpdate)
    } else if (type === "like") eventLikeUpdRedux(crrdata, data, dispatch, upDateLiveEventsData, isUpdate)


  }
  return (
    <div className=''>
      <Container fluid className='p-0'>
        <Row>
          <div className='col-lg-12 live-course-main py-5'>
            <Container>
              <Row>
                <div className='col-lg-12 text-left'><h2>Upcoming Live Events</h2></div>
              </Row>
              {
                loading ?
                <CircularProgress />
                :
                <EventCard data={data} upDateData={likeFavHandle} tab="1" />
              }
              {/* <EventCard data={data} upDateData={likeFavHandle} tab="1" /> */}
            </Container>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default Tab1