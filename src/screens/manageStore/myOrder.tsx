import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Row, Col, Spinner } from 'react-bootstrap';
import Tabs from '@material-ui/core/Tabs';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tab from '@material-ui/core/Tab';
import "./myOrder.scss";
import Image1 from "../../assets/images/mobileimages/1.svg";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Header } from '../../components/header/header';
import { useEffect } from 'react';
import { getOfferData } from '../../redux/action/getOffersAction';
import { useDispatch, useSelector } from 'react-redux';
import { orders } from '../../redux/action/manageStoreAction/manageStoreAction';
import moment from 'moment';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import * as store from "../../services/store.service" 
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  root1: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  }
}));
let Lists = ({ ordersData, buttons, status, fullfilment, Index, state }: any) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className="order_main_list">
      <List className={classes.root1}>
        {ordersData && ordersData?.map((value: any, i: any) => (
          <div key={i} >
            <Row>
              <Col md={10} xs={10} >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Images" src={Image1} />
                  </ListItemAvatar>
                  <ListItemText className="head_spantext"
                    primary={value?.offer_title}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className="text_paradiv"
                          color="textPrimary"
                        >
                          iD: ash-sessions-24-5
                        </Typography>
                        <span className="address_text">
                          {moment(value?.starts_at).format("DD-MMMM-YYYY")} | {moment(value?.starts_at).format('hh:mm A')} | place: {value?.offer_location}
                        </span>
                        {buttons && <Grid container xs={12}>
                          <Grid xs={6}>
                            <Button variant="contained"
                              size="small"
                              disabled={Index === i && true}
                              className="accept-btn"
                              onClick={() => { status(fullfilment ? "Fullfillment" : "Accept", value, i) }}
                            >
                              {Index === i && (state === "Fullfillment" || state === "Accept") ? <Spinner animation="border" /> : fullfilment ? "Fullfilment" : "Accept"}
                            </Button>
                          </Grid>
                          <Grid xs={6}>
                            <Button variant="contained"
                              size="small" className="reject-btn"
                              onClick={() => status("Reject", value, i)}
                              disabled={Index === i && true}
                            >

                              {/* {
                                          index === i ? state.hasOwnProperty("Reject") ?<Spinner animation="border" />:"reject"
                                        } */}
                              {Index === i && state === "Reject" ? <Spinner animation="border" /> : "reject"}
                            </Button>
                          </Grid>
                        </Grid>}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </Col>

              <Col md={2} xs={2} className="text-right">
                <p className="text_right_amt text-right">
                  hK$ <br /> {value?.cost}
                </p>
              </Col>
            </Row>
            <Divider variant="inset" component="li" />

          </div>
        ))}
      </List>
    </div>
  )
}
function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

interface IProps { }
export const MyOrder: React.FC<IProps> = () => {
  const history = useHistory()
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(0);
  const [tabs, setTabs] = useState<any>()
  const [ordersData, setOrdersData] = useState<any>([])
  const [key, setKey] = useState<string>("New");
  const [Index, setIndex] = useState<any>(-1)
  const [state, setstate] = useState<any>()

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const onPageBack = () => {
    setValue(tabs)
    history.goBack()
  }

  const dispatch = useDispatch()
  const getOrders = async (activeTab: any) => {
    setOrdersData(null)
    try {
      let res: any = await dispatch(orders(activeTab))
      let payload: any = res?.payload

      if (payload) {
        setOrdersData(payload?.data)
      }
    } catch (error) {
      console.log("error from get orders", error)
    }
  }

  // get data from redux
  let getData = useSelector((state: any) => {
    return state?.manageStoreReducer?.orders
  })

  // get loading from redux
  const loading = useSelector((state: any) => {
    return state?.manageStoreReducer?.loading
  })

  useEffect(() => {
    if (getData?.selected_tab === key) {
      setOrdersData(getData?.data);
    } else {
      getOrders(key);
    }
  }, [key])



  let status = async (status: string, value: any, indexs: any) => {
    try {
      setstate(status)
      setIndex(indexs)
      let data = { transaction_status: status, user: value.user, event_offer: value.event_offer }
      let res = await store.update_orders(value.id, data)
      ordersData.splice(indexs, 1)
      setOrdersData([...ordersData])
      setIndex(-1)
      console.log("response from update data", res)
    } catch (error) {
    }
  }

  const loaderIcon: any = () => {
    return (
      <>
        {loading &&
          <div className="loader-tabs">
            <CircularProgress />
          </div>
        }
      </>
    )

  }

  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container dash_tabs store_box">
          <Header title="my orders" back={true} enableback={onPageBack} />
        <div className="tab_scroll">
          <div className={classes.root}>
            {loaderIcon()}
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example">
                <Tab onClick={() => { getOrders("New") }} label="new" {...a11yProps(0)} />
                <Tab onClick={() => { getOrders("Refund"); setKey("Refund") }} label="refunds" {...a11yProps(1)} />
                <Tab onClick={() => { setKey("Accept"); getOrders("Accept"); }} label="confirmations" {...a11yProps(2)} />
                <Tab onClick={() => { setKey("Fullfillment"); getOrders("Fullfillment"); }} label="fullfilment" {...a11yProps(3)} />
                <Tab onClick={() => { setKey("history"); getOrders("history"); }} label="history" {...a11yProps(4)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Lists ordersData={ordersData}
                buttons={true} status={status}
                Index={Index}
                state={state} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Lists ordersData={ordersData} />
            </TabPanel>
            <TabPanel value={value} index={2}  >
              <Lists ordersData={ordersData}
                buttons={true} fullfilment={true}
                status={status} Index={Index}
                state={state} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Lists ordersData={ordersData} />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Lists ordersData={ordersData} />
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  )
}
