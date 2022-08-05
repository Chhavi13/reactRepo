import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import "./portfolio.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const PortFolio = (props: any) => {
  const classes = useStyles();
  let [searchTextList, setSearchTextList] = useState([]);


  return (
    <div className="mobilemaincontainer">
      <div className="mobile_container dash_tabs thank_page pb-5">
        {/* <div className="search_haeder_top">
          <Row>
            <Col md={1} xs={1} className='search-arrow'>
              <ArrowBackIcon 
              // onClick={() => history.goBack()} 
              />
            </Col>

            <Col md={11} xs={11}>
              
            </Col>
          </Row>
        </div> */}

        <div className="sabrinamainscroll portfolio-container">
          <h4>PORTFOLIO</h4>
          <br />
          <div style={{ width: '100%' }}>
            <Autocomplete
              fullWidth={true}
              // onChange={(event, newValue) => {
              //   onChangeInputText(newValue);
              // }}
              // onInputChange={(e, newInputValue) => setInputSearchText(newInputValue)}
              id="free-solo-demo"
              freeSolo
              options={searchTextList?.map((option: any) => option.name)}
              renderInput={(params) => (
                <TextField  {...params} variant="outlined" placeholder="Search" className="search-data" />
              )}
            />
          </div>

          <div className="currency-div">
            <Row>
              <Col md={6} xs={6} className="btc-val">BTC</Col>
              <Col md={6} xs={6} className="high-low-val">442.11</Col>
            </Row>
            <Row>
              <Col md={6} xs={6} className="btc-val-full">Bitcoin</Col>
              <Col md={6} xs={6} className="high-low-val">
                <Button className="positive" variant="contained" color="primary">
                  +114.4
                </Button>
              </Col>
            </Row>
          </div>
          
          <Divider />

          <div className="currency-div">
            <Row>
              <Col md={6} xs={6} className="btc-val">BTC</Col>
              <Col md={6} xs={6} className="high-low-val">442.11</Col>
            </Row>
            <Row>
              <Col md={6} xs={6} className="btc-val-full">Bitcoin</Col>
              <Col md={6} xs={6} className="high-low-val">
                <Button className="positive" variant="contained" color="primary">
                  +114.4
                </Button>
              </Col>
            </Row>
          </div>
          
          <Divider />
          
          <div className="currency-div">
            <Row>
              <Col md={6} xs={6} className="btc-val">BTC</Col>
              <Col md={6} xs={6} className="high-low-val">442.11</Col>
            </Row>
            <Row>
              <Col md={6} xs={6} className="btc-val-full">Bitcoin</Col>
              <Col md={6} xs={6} className="high-low-val">
                <Button className="negitive" variant="contained" color="primary">
                  -114.4
                </Button>
              </Col>
            </Row>
          </div>

          <Divider />

          {/* <List className={classes.root}>
            <ListItem>
              <ListItemText primary="BTC" secondary="Bitcoin" />
              <ListItemSecondaryAction>
                <ListItemText primary="492.33" secondary="+333" />
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              <ListItemSecondaryAction>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItemSecondaryAction>
            </ListItem>
          </List> */}
        </div>
      </div>
    </div>
  )

}