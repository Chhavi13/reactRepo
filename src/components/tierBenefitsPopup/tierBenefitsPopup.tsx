import React, { useState, useEffect } from 'react';
import "./tierBenefitsPopup.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Platinum from "../../assets/images/mobileimages/platinumround.svg";
import Cancel from "../../assets/images/mobileimages/cancel.svg";
import Right from "../../assets/images/mobileimages/righttick.svg";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as loyalty from "../../services/loyalty.service";
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';


interface IProps { }
export const TierBenefits = ({id}:any) => {

    const [data, setShowdata] = useState<any>([]);
    const [fetchData, setFetchData]=useState<Boolean>(false);
    React.useEffect(() => {
        const FetchData = async () => {
            try {
                if(id){
                 let response:any = await loyalty.getLoyaltyById(id) 
                 setShowdata(response?.data?.data);
                 response?.data?.data && setFetchData(true);

                }else{
                let response: any = await loyalty.loyalityData()
                setShowdata(response?.data?.data);
                response?.data?.data && setFetchData(true);
            }
                //let data:any= JSON.stringify(response)
                // const data:any = response.data.data.basic.name
            } catch (error) {
                console.log('result22');
            }
        };
        FetchData();
    }, []);

    const skeleton = () => {
        return (
            <>
                <div className="skelton-div">
                    <Box display="flex" alignItems="center">
                        <Box flex="2" margin={1}>
                            <Skeleton animation="wave" variant="circle" width={50} height={50} />
                        </Box>
                        <Box flex="3" width="50%">
                            <Skeleton animation="wave" height={40} width="80%" />
                            <Skeleton animation="wave" height={20} width="80%" />
                        </Box>
                        <Box flex="5" width="50%">
                            <Skeleton animation="wave" height={30} width="80%" />
                            <Skeleton animation="wave" height={10} width="80%" />
                            <Skeleton animation="wave" height={10} width="80%" />
                        </Box>
                    </Box>
                    {/* <Skeleton variant="rect" width="100%">
                        <div style={{ paddingTop: '57%' }} />
                    </Skeleton> */}
                    {/* <Skeleton animation="wave" height={20} style={{ marginBottom: 6, marginTop: 6 }} />
                    <Skeleton animation="wave" height={20} width="80%" /> */}
                </div>
                <Divider />
            </>
        )
    }

    
    return (

        <div className="popup_benefit">
            <div className="popup_head">
                <h1 className="mt-2 mb-2">Loyality Benefits</h1>
                <img src={Cancel} alt="Image" />
            </div>

            <div className="section_border"></div>

            <div className="pb-1 mb-1" >
            {
                !fetchData &&
                <Grid container spacing={8}>
                  <Grid item xs>
                    {
                      [1, 2, 3].map((x, i) => {
                        return (<div key={i}>{skeleton()}</div>);
                      })
                    }
                  </Grid>
                </Grid>
              }
                {data[0] && <div className="popup_section mb-0">
                    <Row>
                        <Col md={5} xs={5}>
                            <div className="left_section">
                                <img src={Platinum} alt="Image" />
                                <div className="head_content">
                                    <h5>
                                        {data[0]?.name}
                                    </h5>
                                    <span>
                                        ${data[0]?.min_points} spend
                                    </span>
                                </div>
                            </div>
                        </Col>

                        <Col md={7} xs={7} className="right_border">
                            <div className="right_section">
                                <h4 className="mb-1">
                                    {data[0]?.discount}% discount <span>
                                        {data[0]?.discount_offers}
                                    </span>
                                </h4>

                                <List>
                                    <ListItem>
                                        <b>{data[0]?.is_engagement === true && <img src={Right} className="mr-2" alt="Image" />}</b>
                                        {data[0]?.is_engagement}
                                        <ListItemText>
                                            {data[0]?.benefits_desc}
                                        </ListItemText>
                                    </ListItem>

                                    <ListItem>
                                        <b>{data[0]?.is_exclusive === true && <img src={Right} className="mr-2" alt="Image" />}</b>
                                        <ListItemText>
                                            {data[0]?.exclusive_desc}
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </div>
                        </Col>
                    </Row>
                </div>}

                {data[1] && <div className="popup_section mb-0">
                    <Row>
                        <Col md={5} xs={5}>
                            <div className="left_section">
                                <img src={Platinum} alt="Image" />
                                <div className="head_content">
                                    <h5>
                                        {data[1]?.name}
                                    </h5>
                                    <span>
                                        ${data[1]?.min_points} spend
                                    </span>
                                </div>
                            </div>
                        </Col>

                        <Col md={7} xs={7} className="right_border">
                            <div className="right_section">
                                <h4 className="mb-1">
                                    {data[1]?.discount}% discount <span>
                                        {data[1]?.discount_offers}
                                    </span>
                                </h4>

                                <List>
                                    <ListItem>
                                        <b>{data[1]?.is_engagement === true && <img src={Right} className="mr-2" alt="Image" />}</b>

                                        <ListItemText>
                                            {data[1]?.benefits_desc}
                                        </ListItemText>
                                    </ListItem>

                                    <ListItem>
                                        <b>{data[1]?.is_exclusive === true ? <img src={Right} className="mr-2" alt="Image" /> : ''}</b>
                                        <ListItemText>
                                            {data[1]?.exclusive_desc}
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </div>
                        </Col>
                    </Row>
                </div>}
                {data[2] && <div className="popup_section mb-0">
                    <Row>
                        <Col md={5} xs={5}>
                            <div className="left_section">
                                <img src={Platinum} alt="Image" />
                                <div className="head_content">
                                    <h5>
                                        {data[2]?.name}
                                    </h5>
                                    <span>
                                        ${data[2]?.min_points} spend
                                    </span>
                                </div>
                            </div>
                        </Col>

                        <Col md={7} xs={7} className="right_border">
                            <div className="right_section">
                                <h4 className="mb-1">
                                    {data[2]?.discount}% discount <span>
                                        {data[2]?.discount_offers}
                                    </span>
                                </h4>

                                <List>
                                    <ListItem>
                                        <b>{data[2]?.is_engagement === true ? <img src={Right} className="mr-2" alt="Image" /> : ''}</b>
                                        <ListItemText>
                                            {data[1]?.benefits_desc}
                                        </ListItemText>
                                    </ListItem>

                                    <ListItem>
                                        <b>{data[2]?.is_exclusive === true ? <img src={Right} className="mr-2" alt="Image" /> : ''}</b>
                                        <ListItemText>
                                            {data[2]?.exclusive_desc}
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </div>
                        </Col>
                    </Row>
                </div>}
            </div>

        </div>
    )
}