import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Logo from "../../assets/images/chat/logo_icon.png";
import Plus from "../../assets/images/chat/plus.png";
import Direct from "../../assets/images/chat/direct.png";
import Iconplus from "../../assets/images/chat/icon_plus.png";
import "./chat-dashboard.scss";
import BottomPopup from "../../components/bottomPopup/bottomPopup";

interface IProps {}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

export const ChannelListNew: React.FC<IProps> = () => {
  const [isToggleSidebar, setIsToggleSidebar] = React.useState(false);

  return (
    <>
    <BottomPopup 
      isToggleSidebar={isToggleSidebar}
      setIsToggleSidebar={setIsToggleSidebar}
      isCreateChannel={true}/>
      <div className="chat_channel mt-5">
        <Row>
          <Col md={10} xs={10}>
            <h3 className="main_head">Channels</h3>
          </Col>

          <Col md={2} xs={2} className="text-right pr-0">
            <img src={Iconplus} alt="img" onClick={()=>setIsToggleSidebar(true)}/>
          </Col>
        </Row>

        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <Row>
              <Col md={10} xs={10}>
                <ListItemText primary="#ash" />
              </Col>
              <Col md={2} xs={2} className="text-right pr-0">
                {/* <span className="number_notify">2</span> */}
              </Col>
            </Row>
          </ListItem>
          <ListItem button className="channel_active">
            <Row>
              <Col md={10} xs={10}>
                <ListItemText primary="#subscribers" />
              </Col>
              <Col md={2} xs={2} className="text-right pr-0">
                <span className="number_notify">2</span>
              </Col>
            </Row>
          </ListItem>
          <ListItem button>
            <Row>
              <Col md={10} xs={10}>
                <ListItemText primary="#general" />
              </Col>
              <Col md={2} xs={2} className="text-right pr-0">
                {/* <span className="number_notify">2</span> */}
              </Col>
            </Row>
          </ListItem>
        </List>
      </div>
    </>
  );
};
