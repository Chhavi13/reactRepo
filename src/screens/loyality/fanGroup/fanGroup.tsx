import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import "./fanGroup.scss";
import 'bootstrap/dist/css/bootstrap.css';
import { Header } from '../../../components/header/header';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Plus from "../../../assets/images/mobileimages/plus-circle.svg";
import Radio from "../../../assets/images/mobileimages/radio.svg";
import Right from "../../../assets/images/mobileimages/chevron-right.svg";
import Fan1 from "../../../assets/images/mobileimages/fanpeople1.svg";
import Fan2 from "../../../assets/images/mobileimages/face.svg";
import Fan3 from "../../../assets/images/mobileimages/fanpeople2.svg";
import { useSelector, useDispatch } from "react-redux"
import { CREATE_OFFER_OBJECT } from '../../../redux/action/actionTypes/getOfferActionsTypes';
import { getFanGroup } from '../../../redux/action/getOffersAction';
import { responsiveFontSizes } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

interface IProps { }

export const FanGroup: React.FC<IProps> = () => {
  const history = useHistory();
  const location: any = useLocation();

  const dispatch = useDispatch();
  const [fanData, setFanData] = useState([]);
  const createOfferStoreData = useSelector((state: any) => {
    return state?.getOfferReducer?.data;
  });

  const onPageBack = () => {
    history.goBack();
  }

  // get data from reducer
  let getDataFromReducer = useSelector((res: any) => {
    return res?.getOfferReducer?.fan?.data
  })

  const handleChange = (value: any) => {
    dispatch({ type: CREATE_OFFER_OBJECT, payload: { ...createOfferStoreData, ['audience']: value.id } });
    // console.log(createOfferStoreData)
    history.push({ pathname: '/create/offer', state: { name: value.group, id: value.id } })
  }
  let getFanGroupData = async () => {
    let res: any = await dispatch(getFanGroup())
    let data: any = await res?.payload?.data;
    setFanData(data)
  }

  useEffect(() => {
    getDataFromReducer ? setFanData(getDataFromReducer) : getFanGroupData();
  }, [])

  let listView = (data: any) => {
    let newData: any = { ...data, ...location.state };
    console.log(newData);
    if (location?.state?.isChat) { /* This is for chat */
      history.push({ pathname: "/chat/invite/user", state: newData });
      return;
    }
    location.state === "audience" ? handleChange(data) : history.push({ pathname: "/fans/group", state: data });
  }
  return (
    <div className={location?.state?.isChat ? '' : 'mobilemaincontainer'}>
      <div className={location?.state?.isChat ? 'bg_overflow pb-5' : 'mobile_container bg_overflow pb-5'}>
        {!location?.state?.isChat &&
          <>
            <Header title="fan groups" back={true} enableback={onPageBack} />
            <img src={Plus} className="plus_icon" alt="" />
          </>
        }
        {location?.state?.isChat && <h2>Invite member</h2>}
        <div className="fan_section mt-3 pb-3">
          {/* <div className="fan_content" onClick={() => handleChange('all')}>
            <Row>
              <Col md={1} sm={1} xs={1} className="pr-0">
                <img src={Radio} alt="" />
              </Col>

              <Col md={4} sm={4} xs={4}>
                <h4>
                  all
                </h4>
              </Col>

              <Col md={3} sm={3} xs={3}>
                <span className="d-block fan_image">
                  <img src={Fan1} alt="" />
                  <img src={Fan2} alt="" />
                  <img src={Fan3} alt="" />
                </span>
              </Col>

              <Col md={3} sm={3} xs={3}>
                <p>
                  + 42 people
                </p>
              </Col>

              <Col md={1} sm={1} xs={1} className="pl-0">
                <img src={Right} alt="" />
              </Col>
            </Row>
          </div>

          <div className="fan_content" onClick={() => handleChange('susbcribers')}>
            <Row>
              <Col md={1} sm={1} xs={1} className="pr-0">
                <img src={Radio} alt="" />
              </Col>

              <Col md={4} sm={4} xs={4}>
                <h4>
                  susbcribers
                </h4>
              </Col>

              <Col md={3} sm={3} xs={3}>
                <span className="d-block fan_image">
                  <img src={Fan1} alt="" />
                  <img src={Fan2} alt="" />
                  <img src={Fan3} alt="" />
                </span>
              </Col>

              <Col md={3} sm={3} xs={3}>
                <p>
                  + 48 people
                </p>
              </Col>

              <Col md={1} sm={1} xs={1} className="pl-0">
                <img src={Right} alt="" />
              </Col>
            </Row>
          </div> */}
          {fanData?.map((res: any, index: number) => (
            // console.log("res from fan group in map function",res.group != "ALL" && res.group) 
            <div key={index}>
              {(location.state == "audience" ? res.group : res.group != "ALL") && <div className="fan_content" onClick={() => listView(res)}>
                <Row>
                  <Col md={1} sm={1} xs={1} className="pr-0">
                    <img src={Radio} alt="" />
                  </Col>

                  <Col md={5} sm={5} xs={5}>
                    <h4>
                      {res?.group} {res?.name}
                    </h4>
                  </Col>
                  <Col md={5} sm={5} xs={5}>
                    {location.state === "audience" || location?.state?.isChat ? null :
                      <span className="d-block fan_image">
                        <AvatarGroup max={4}>
                        {res?.users.map((img:any)=>(
                        <Avatar alt="Remy Sharp" src={img.profile_image} />
                        ))}
                        </AvatarGroup>
                      </span>
                    }
                  </Col>

                  {/* <Col md={3} sm={3} xs={3}>
                    {location.state == "audience" ? null : <p>
                      + {res.user_count} people
                    </p>}
                  </Col> */}

                  <Col md={1} sm={1} xs={1} className="pl-0">
                    <img src={Right} alt="" />
                  </Col>
                </Row>
              </div>}
            </div>
          ))}
          
        </div>




      </div>
    </div>
  )
}