import React, { ChangeEvent, useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as images from '../images'
import * as alertService from '../../services/AlertService';
import * as authService from '../../services/auth.service';
import * as offer from "../../services/offer.service";
import { isLogin } from '../../utils';
import { Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import location from "../../assets/images/mobileimages/location1.svg";
import "./buyNow.scss";
import moment from 'moment';
import { SignIn } from '../signin/signin';
import { Header } from '../../components/header/header';
import { getItemLocalStorage } from '../../utils/Utils';


class transactionVM {
  user: any;
  event_offer: any;
  delivery_address: any;
  transation_number: any;
  transaction_status: any;
  transaction_type: any;
  transaction_cost: any;
  creator: any;
}

interface IProps { }
export const BuyNow: React.FC<IProps> = (props: any) => {
  const [selectedAddress, setAddress] = useState<any>();
  const history = useHistory()
  // loin and signup states binding start
  const [isSubmittingTransaction, setIsSubmittingTransaction] = useState<boolean>(false);
  const [transationData, setTransationData] = useState<transactionVM>(new transactionVM());
  const [data, setData] = useState<any>({})
  const [userIsLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [transationNumberError, setTransationNumberError] = useState<string>();

  // get data using api
  let getOffer = async () => {
    try {
      let response: any = await offer.getOfferListSingle(props.match.params.id)
      setData(response?.data?.data)
      // console.log(response)
    } catch (error) {
      console.log("error from error", error)
    }
  }
  // get data using api
  // get data using Redux
  const getOfferState = useSelector((state: any) => {
    return state?.getOfferReducer?.offerList?.data?.data?.results
  });
  // get data using Redux compleate

  const getCurrentUser = () => {
    let authData: any = localStorage.getItem('authData')
    authData = JSON.parse(authData)
    return authData ? authData : false
  }

  const addressRedux = useSelector((state: any) => {
    return state.addressReducer?.addressList;
  });
  let id = useSelector((id: any) => {
    return id?.authReducer?.loginData?.data?.data?.id
  })
  const address = addressRedux && addressRedux.find((x: any) => x.is_selected);
  useEffect(() => {
    if (address) {
      setAddress(address);
      const transactionDetail: transactionVM = {
        'event_offer': Number(props.match.params.id),
        'user': getCurrentUser().id,
        delivery_address: address.id,
        transation_number: 1,
        transaction_status: 'New',
        transaction_type: 'Offer',
        transaction_cost: data?.cost,
        creator: data?.user_id
      }

      setTransationData({ ...transationData, ...transactionDetail });
    }
    if (getOfferState) {
      let dataFind = getOfferState?.find((x: any) => {
        return x.id == props.match.params.id;

      })
      setData(dataFind)

    } else {
      getOffer();
    }

  }, []);

  let saveTransaction = async () => {
    try {
      if (data?.is_virtual_delivery && !transationData.transation_number) {
        setTransationNumberError('Add FPS Account ID')
        return
      }
      const payload = {
        'event_offer': Number(props.match.params.id),
        'user': getCurrentUser().id,
        delivery_address: address.id,
        transation_number: 1525444454,
        transaction_status: 'New',
        transaction_type: 'Offer',
        transaction_cost: Number(data?.cost),
        creator:data?.user_id
      }
      setIsSubmittingTransaction(true);

      const response: any = await offer.createTransaction(payload);
      setIsSubmittingTransaction(false);
      history.push({ pathname: `/thank-you/${props.match.params.id}/`, state: data });
      // alertService.success(response.data.message);
    } catch (err) {
      setIsSubmittingTransaction(false);
    }
  }

  const addAddress = () => {
    history.push("/address");
  }

  const transactionAccountId = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    setTransationData({ ...transationData, [name]: e.target.value });
  }

  const userLoggedInSuccessFullyHandler = (login: boolean) => {
    setIsUserLoggedIn(login)
  }
  console.log("data from buynow", data)
  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container signupmobcontainer">
        <div className="sabrinamainscroll">
          <div className="border_small">
            <div className="session_small">
              <div style={{ marginTop: '-16px', marginLeft: '-16px', height: '70px' }}>
                <Header
                  back={true}
                  enableback={() => history.goBack()}
                  next={
                    (isLogin() && ((!data?.is_virtual_delivery && selectedAddress) || data?.is_virtual_delivery)) &&
                    (isSubmittingTransaction ?
                      <Spinner className="spinner-offer" animation="grow" variant="primary" /> :
                      'Finish')
                  }
                  enablenext={saveTransaction}
                />
              </div>
              {/* <img src={images.mobleftarrow} className="leftarrowimg" alt="" onClick={() => history.goBack()} /> */}
              <div className="session_smallcontainer">
                <div className="small_group smallsessiongroup">
                  <p>{data?.offer_title}</p>
                </div>
                <div className="date_session">
                  <p>date: {moment(data?.expires_at).format('Do MMMM, YYYY')}</p>
                  <p>time: {moment(data?.expires_at).format('hh:mm A')}</p>
                  <p>place: {data?.offer_location}</p>
                  <p>cost: {data?.cost}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="loginformtab mobileloginform">
            {!isLogin() && <SignIn isBuyNow={false} userLoggedInSuccessFullyHandler={userLoggedInSuccessFullyHandler} />}

            {/* common section */}
            <div className="pay_type mt-4">
              <div className="common_payment">
                <Row>
                  <Col md={6} sm={6} xs={6} className="text-left">
                    <p className="payment">payment</p>
                  </Col>

                  <Col md={6} sm={6} xs={6} className="text-right">
                    <p className="payment_div">
                      <sup className="dollar-sup"> $HK </sup>
                      <span>{data?.units}</span>
                      <sup className="pay_amount">00</sup>
                    </p>
                  </Col>
                </Row>
              </div>

              <Row className="mt-3 justify-content-md-center payment-widtharea">
                <Col className="p-0">
                  <div className="pay_img">
                    <img src={images.pay1} alt="" />
                  </div>
                </Col>
                <Col className="p-0">
                  <div className="pay_img">
                    <img src={images.pay2} alt="" />
                  </div>
                </Col>
                <Col className="p-0">
                  <div className="pay_img">
                    <img src={images.pay3} alt="" />
                  </div>
                </Col>

                <Col xs={12} md={12} className="mt-3">
                  <p className="pay_para"> Once you pay, Please enter reference below</p>
                </Col>
              </Row>


              <div className="pay_form">
                <Row>
                  <Col md={12} sm={12} xs={12}>
                    <div className="input-wrapper mt-2">
                      <input type="text"
                        placeholder="Your FPS Account ID"
                        required
                        name="transation_number"
                        onChange={(event: any) => { transactionAccountId(event) }}
                      />
                      <span className="error-msg">{transationNumberError}</span>
                    </div>
                  </Col>
                </Row>

                <p className="text-center option_para mt-4 mb-4">
                  You will get a confirmation message via <br />
                  <span> Whatsapp/Email/Wechat </span>
                </p>


                {isLogin() && !data?.is_virtual_delivery && !selectedAddress &&
                  <Row>
                    <Col md={10} sm={10} xs={10}>
                      <h4>Select your delivery address</h4>
                    </Col>
                    <Col md={2} sm={2} xs={2}>
                      <AddCircleOutlineIcon onClick={addAddress} />
                    </Col>
                  </Row>
                }
                {
                  !data?.is_virtual_delivery && selectedAddress &&
                  <>
                    <Row>
                      <Col md={10} sm={10} xs={10}>
                        <Link to={"/address"}>Click to change delivery address</Link>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12} sm={12} xs={12} className="current-address">
                        {<span>
                          <img src={location} className="address-pin" alt="" />
                          {`${selectedAddress?.address_line_1}, ${selectedAddress?.address_line_2},
                          ${selectedAddress?.country}, ${selectedAddress?.state},
                          ${selectedAddress?.city}, ${selectedAddress?.zip_code}
                        `}
                        </span>}
                      </Col>
                    </Row>

                    {/* <Row>
                      <Col md={12} sm={12} xs={12}>
                        <div className="mobile_continuebtn mt-4">
                          <button type='submit'
                            onClick={saveTransaction}
                            disabled={isSubmittingTransaction}
                            className={`finish-btn ${isSubmittingTransaction ? 'add-opacity' : ''}`}>
                            {isSubmittingTransaction ?
                              <Spinner animation="border" variant="dark" /> :
                              <span>Finish</span>
                            }
                          </button>
                        </div>
                      </Col>
                    </Row> */}
                  </>
                }

                {/* {data?.is_virtual_delivery &&
                  <Row>
                    <Col md={12} sm={12} xs={12}>
                      <div className="mobile_continuebtn mt-4">
                        <button type='submit'
                          onClick={saveTransaction}
                          disabled={isSubmittingTransaction}
                          className={`finish-btn ${isSubmittingTransaction ? 'add-opacity' : ''}`}>
                          {isSubmittingTransaction ?
                            <Spinner animation="border" variant="dark" /> :
                            <span>Finish</span>
                          }
                        </button>
                      </div>
                    </Col>
                  </Row>
                } */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}