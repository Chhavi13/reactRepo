import React, { useState } from 'react';
import * as images from '../images'
import { Row, Col } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import "./orderDetail.scss";
import { useEffect } from 'react';
import * as offer from "../../services/offer.service"
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/header/header';



interface IProps { }

export const OrderDetail: React.FC<IProps> = (props: any) => {
  // const classes = useStyles();
  const history = useHistory()
  const [id, setID] = useState<number>(parseInt(props?.match?.params?.id))
  const [details, setDetails] = useState<any>()

  const onPageBack = () => {
    history.goBack()
  }

  const getDetails = async () => {
    try {
      const response: any = await offer.getOfferDetail(id)
      // console.log(response)
      response && setDetails(response?.data)
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetails();
  }, [])

  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container order-detail-page">
        {/* <div className="sabrinamainscroll create_page list_page_head">
          <img src={blackarrow} className="cursor-pointer pr-3 list_preview_back" />
          <h1 className="pl-0 pt-3 pb-3 text-center">Confirmation</h1>
        </div> */}
        <Header title="Confirmation" back={true} enableback={onPageBack} />

        <Row>
          <Col md={12} xs={12}>
            <img src={images.trainerimg} className="order-img cursor-pointer" alt="" />
          </Col>
        </Row>
        <br />
        <Grid container >
          <Col md={12} xs={12}>
            <span className="title">Yoga sessioin small group</span><br />
            <span className="date-time-loc">
              {moment(details?.starts_at).format('DD MMMM YYYY')} | &nbsp;
              {moment(details?.starts_at).format('hh:mm A')}
            </span><br />
            <span className="date-time-loc">place: {details?.offer_location} </span>
          </Col>
        </Grid>
        <br />

        <Grid container >
          <Col md={12} xs={12}>
            <span className="user-name">{details?.first_name} </span><br />
            <span className="user-email-phn"> {details?.email} </span><br />
            <span className="user-email-phn">Phone: {details?.phone_number} </span><br />
            <span className="user-email-phn">Whatsapp: {details?.phone_number} </span>
          </Col>
        </Grid>

        <br />

        <Grid container >
          <Col md={4} xs={4}>
            <span className="payment-text">payment:</span><br />
          </Col>
          <Col md={8} xs={8}>
            <span className="payment-amt">hKD 600/PP</span><br />
          </Col>
        </Grid>
        <br />

        <Grid container >
          <Col md={4} xs={4}>
            <span className="payment-text">payment reference:</span><br />
          </Col>
          <Col md={8} xs={8}>
            <span className="payment-amt">payment by ashutosh goel</span><br />
          </Col>
        </Grid>

        <br />

        <Grid container >
          <Col md={4} xs={4}>
            <span className="payment-text">booking iD: </span><br />
          </Col>
          <Col md={8} xs={8}>
            <span className="payment-amt">ash-sessions-24-5</span><br />
          </Col>
        </Grid>



      </div>
    </div>

  )
}