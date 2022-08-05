import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import LocalGroceryStoreOutlinedIcon from '@material-ui/icons/LocalGroceryStoreOutlined';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import "./manageStore.scss";
import Download from "../../assets/images/mobileimages/download.svg";

import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Header } from '../../components/header/header';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { client_salse } from '../../redux/action/manageStoreAction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import * as store from "../../services/store.service"; 


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    listRoot: {
      width: "100%",
      maxWidth: "36ch",
    },
    paper: {
      height: 100,
      width: 120,
      border: 'none',
      boxShadow: '0px 2px 1px -1px rgb(255 247 247 / 20%), 0px 1px 1px 0px rgb(255 245 245 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
    },
    control: {
      padding: theme.spacing(2),
    },
    grid: {
      justifyContent: 'center'
    },
    textAlignCenter: {
      textAlign: 'center',
      marginTop: 15
    }
  }),
);

interface IProps { }

export const ManageStore: React.FC<IProps> = () => {
  const classes = useStyles();
  const history = useHistory()
  const [activeTab, setActiveTab] = useState<string>('clients')
  const [client, setClient] = useState<any>([])
  const [sales, setSales] = useState<any>([])
  let dispatch = useDispatch()

  const date = new Date()
  var stDate = new Date(date.getFullYear(), date.getMonth(), 1);
  var edDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [newOrders, setNewOrders] = useState<number>()
  const [pendingAction, setPendingAction] = useState<number>()
  const [newSales, setNewSales] = useState<any>()

  const getStoreDataRedux = useSelector((state:any)=>{
    return state.manageStoreReducer?.data
  })


  const handleDate = (start: any, end: any, label: any) => {
    setStartDate(start._d)
    setEndDate(end._d)
    // console.log(startClientDate,endClientDate)
  }


  const onPageBack = () => {
    history.goBack()
  }

  const getStore = (data: any) => {
    // console.log('store', data)
    setNewSales(data?.Sales)
    setNewOrders(data?.total_new_order)
    setPendingAction(data?.total_pending_order)
  }

  let getStoreData = async () => {
    try {
      const SDate = moment(stDate).format('YYYY-MM-DD')
      const EDate = moment(edDate).format('YYYY-MM-DD')
      let res: any = await dispatch(client_salse(SDate, EDate))
      let data: any = res?.payload
      manageData(data)
    } catch (error) {
      console.log("error from get Store data", error)
    }
  }

  const manageData = (data:any)=>{
    // console.log(data)
    if (data) {
      let clintData: any = data?.data?.data[0];
      let salesData: any = data?.data?.data[1][0];
      getStore(salesData)
      // console.log('ClintData->',clintData)
      setSales(clintData)
      clintData?.map((value: any, i: any) => {
        value?.event_offer_transaction.length != 0
          &&
          value?.event_offer_transaction.map((value: any, i: number) => {
            setClient((oldClient: any) => [...oldClient, value])
            // console.log("Saless", value)
          })
      })
    }
    // console.log('bj', client)
  
  }

  useEffect(() => {
    setStartDate(stDate)
    setEndDate(edDate)
    getStoreDataRedux ? manageData(getStoreDataRedux) : getStoreData()
  }, [])

  const getDataonDateChange = async () => {
    try {
      const SDate = moment(startDate).format('YYYY-MM-DD')
      const EDate = moment(endDate).format('YYYY-MM-DD')
      const res: any = await store.get_clients_sales(SDate, EDate)
      // console.log('res', res)
      setClient([])
      manageData(res)
    } catch (error) {
      console.log("error from get data", error)
    }
  }


  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container dash_tabs store_box">
        {/* <div className="sabrinamainscroll create_page list_page_head">
          <img src={blackarrow} className="cursor-pointer pr-3 list_preview_back" />
          <h1 className="pl-0 pt-3 pb-3 text-center">manage store</h1>
        </div> */}
          <Header title="manage store" back={true} enableback={onPageBack} />


        {/* <Container maxWidth="xs" style={{ height: '100vh' }} className={classes.root}> */}

        <div className="total_order">
          <Grid container spacing={0} className={clsx(classes.textAlignCenter)} xs={12}>
            <Grid item xs={12}>
              <Grid container spacing={4} className={classes.grid}>
                {/* {[0, 1].map((value) => ( */}
                <Grid item>
                  <Paper className={classes.paper}>
                    <div className="icon_section_box" onClick={() => { history.push('/manage/order') }}>
                      <LocalGroceryStoreOutlinedIcon />
                      <p>Order</p>
                    </div>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.paper}>
                    <div className="icon_section_box">
                      <SettingsOutlinedIcon />
                      <p>Settings</p>
                    </div>
                  </Paper>
                </Grid>
                {/* ))} */}
              </Grid>
            </Grid>
          </Grid>


          <div className="mt-5 content_section">
            <Grid container xs={12} className={`${classes.textAlignCenter}`}>
              <Grid item xs={4}>
                <h3>{newOrders}</h3>
                <p>New orders</p>
              </Grid>
              <Grid item xs={4}>
                <h3>{pendingAction}</h3>
                <p>pending action</p>
              </Grid>
              <Grid item xs={4}>
                <h3><sup>$ </sup>{newSales}</h3>
                <p>new sales</p>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className="tabs-div tabs-div-select mt-4">
          <Tabs activeKey={activeTab}
            onSelect={(k: any) => { setActiveTab(k) }} id="uncontrolled-tab-example">

            <Tab eventKey="clients" title="Clients">
              <div className="date_search mt-3">
                <Row>
                  <Col md={10} xs={10} className="pr-0">
                    {/* <Form.Group>
                      <Form.Control type="date" placeholder="Enter date" />
                    </Form.Group> */}
                    <DateRangePicker
                      initialSettings={{ startDate: startDate, endDate: endDate }}
                      onCallback={(start, end, label) => handleDate(start, end, label)}
                    >
                      <input type="text" className="form-control" />
                    </DateRangePicker>
                  </Col>

                  <Col md={2} xs={2} className="text-right">
                    <div className="download_img" onClick={getDataonDateChange}>
                      <img src={Download} alt="Iamge" />
                    </div>
                  </Col>
                </Row>

              </div>

              <div className="name_search mt-3">
                <Row>
                  <Col md={10} xs={10} className="pr-0">
                    <h4 className="pt-2">recent clients</h4>
                  </Col>

                  <Col md={2} xs={2} className="text-right">
                    <SearchOutlinedIcon />
                  </Col>
                </Row>

              </div>

              <div className="list_detail">
                <List className={classes.listRoot}>
                  {client.map((value: any, i: number) => (
                    <div key={i}>
                      {/* { console.log('vvv',value)} */}
                      <ListItem alignItems="flex-start" >
                        <ListItemAvatar>
                          <Avatar variant="rounded" src={value?.profile_image} />
                        </ListItemAvatar>
                        {/* {console.log('data',value)} */}
                        <ListItemText
                          className="text_span"
                          primary={value?.username}
                          secondary={<React.Fragment>{moment(value?.starts_at).format('DD MMMM YYYY')}</React.Fragment>}
                        />
                        <ListItemSecondaryAction className="units-ListItemSecondaryAction">
                          {value?.cost}
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </div>
                  )
                  )
                  }

                </List>
              </div>
            </Tab>

            <Tab eventKey="sales" title="Sales">
              <div className="date_search mt-3">
                <Row>
                  <Col md={10} xs={10} className="pr-0">
                    {/* <Form.Group>
                      <Form.Control type="date" placeholder="Enter date" />
                    </Form.Group> */}
                    <DateRangePicker
                      initialSettings={{ startDate: startDate, endDate: endDate }}
                      onCallback={(start, end, label) => handleDate(start, end, label)}
                    >
                      <input type="text" className="form-control" />
                    </DateRangePicker>
                  </Col>

                  <Col md={2} xs={2} className="text-right">
                    <div className="download_img" onClick={getDataonDateChange}>
                      <img src={Download} alt="Iamge" />
                    </div>
                  </Col>
                </Row>

              </div>

              <div className="name_search mt-3 mb-3">
                <Row>
                  <Col md={10} xs={10} className="pr-0">
                    <h4 className="pt-2">Sales History</h4>
                  </Col>

                  <Col md={2} xs={2} className="text-right">
                    <SearchOutlinedIcon />
                  </Col>
                </Row>

              </div>

              <div className="sale_content">
                {sales?.map((value: any, i: any) => (
                  <div key={i}>
                    <Row>
                      <Col xs={4}>
                        <span className="amount">${value?.cost}</span>
                      </Col>
                      <Col xs={4}>
                        <p>{moment(value?.starts_at).format('DD MMMM YYYY')}</p>
                      </Col>
                      <Col xs={4} className="text-right">
                        <span className="btn_spantext1 bg_blue">New</span>
                      </Col>
                    </Row>
                    <Divider variant="middle" />
                  </div>
                ))}

                {/* <Row>
                  <Col xs={4}>
                    <span className="amount">$600.00</span>
                  </Col>
                  <Col xs={4}>
                    <p>29 may 2021</p>
                  </Col>
                  <Col xs={4} className="text-right">
                    <span className="btn_spantext1 bg_pink">Pending</span>
                  </Col>
                </Row>
                <Divider variant="middle" />

                <Row>
                  <Col xs={4}>
                    <span className="amount">$600.00</span>
                  </Col>
                  <Col xs={4}>
                    <p>29 may 2021</p>
                  </Col>
                  <Col xs={4} className="text-right">
                    <span className="btn_spantext1 bg_purple">fullfillment</span>
                  </Col>
                </Row>
                <Divider variant="middle" />

                <Row>
                  <Col xs={4}>
                    <span className="amount">$600.00</span>
                  </Col>
                  <Col xs={4}>
                    <p>29 may 2021</p>
                  </Col>
                  <Col xs={4} className="text-right">
                    <span className="btn_spantext1 bg_green">fullfilled</span>
                  </Col>
                </Row>
                <Divider variant="middle" />

                <Row>
                  <Col xs={4}>
                    <span className="amount">$600.00</span>
                  </Col>
                  <Col xs={4}>
                    <p>29 may 2021</p>DATA bg_blue">new</span>
                  </Col>
                </Row>
                <Divider variant="middle" /> */}
              </div>


            </Tab>
          </Tabs>
        </div>


        {/* </Container> */}
      </div>
    </div>
  )
}