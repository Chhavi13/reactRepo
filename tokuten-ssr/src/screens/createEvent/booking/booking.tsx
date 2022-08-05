import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import { Calender } from '../../../components/calender/calender';
import { Header } from '../../../components/header/header';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  availableSlotContainer: {
    padding: '15px',
  },
  timeZone: {
    padding: '15px',
  },
  timeZoneText: {
    fontSize: '18px',
    fontFamily: 'Roboto-Regular'
  },
  gmtTimeZone: {
    fontSize: '14px',
    fontFamily: 'Roboto-Regular',
    lineHeight: 1
  },
  availableSlot: {
    fontFamily: 'Roboto-Regular',
  }
}));

interface IProps { }
export const Booking: React.FC<IProps> = () => {
  const classes = useStyles();
  const history = useHistory();

  const enableback = () => { history.goBack() }
  const enablenext = () => { }

  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container">

        <Header
          back={true}
          enableback={enableback}
          next='Next'
          title="Booking"
          enablenext={enablenext}
        />

      <div className={classes.timeZone}>
        <Row>
          <Col md={6}>
            <span className={classes.timeZoneText}>Your time zone</span>
            <p className={classes.gmtTimeZone}>(GMT + 8:00)</p>
          </Col>
          <Col md={6}>
            <Form.Control as="select" >
              <option value="1">HK Time</option>
              <option value="2">IST Time</option>
            </Form.Control>
          </Col>
        </Row>
      </div>

        <Calender />

        <div className={classes.availableSlotContainer}>
          <p className={classes.availableSlot}>Available Slots</p>

          <Row>
            <Col>
              <Button className="ml-4 mb-3" variant="outline-dark">08:00 - 08:30</Button>
              <Button className="ml-4 mb-3" variant="outline-dark">08:30 - 09:00</Button>
              <Button className="ml-4 mb-3" variant="outline-dark">08:30 - 09:00</Button>
              <Button className="ml-4 mb-3" variant="outline-dark">08:30 - 09:00</Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}