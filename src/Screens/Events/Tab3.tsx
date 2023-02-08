import React from 'react'
import { Container, Row } from 'react-bootstrap';
import "./Tab3.scss";
import { useDispatch } from 'react-redux';
import { getUpComingEvent, updateEventFav } from '../../Redux/Events/EventsReducer';
import { eventLikeUpdRedux } from '../../Utils/Events/Like';
import EventCard from '../../Common/EventCard/EventCard';

const Tab3 = ({ data }: any) => {
  const dispatch = useDispatch()


  const likeFavHandle = (type: string, crrdata: any, isUpdate: boolean, isSuccess: boolean) => {
    if (isSuccess) {
      dispatch(getUpComingEvent())
      return;
    }
    if (type === "fav") {
      if (isUpdate) {
        let newFavValue = data.filter((res: any) => res.id !== crrdata.id)
        dispatch(updateEventFav(newFavValue))
      } else {
        dispatch(updateEventFav(data))
      }
    } else if (type === "like") eventLikeUpdRedux(crrdata, data, dispatch, updateEventFav, isUpdate)

  }

  return (
    <div>
      <Container fluid className='p-0'>
        <Row>
          <div className='col-lg-12 favourite-event-main py-5'>
            <Container>
              <Row>
                <div className='col-lg-12 text-left'><h2>Favorites Events</h2></div>
              </Row>
              <EventCard data={data} upDateData={likeFavHandle} tab="3" />
            </Container>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default Tab3