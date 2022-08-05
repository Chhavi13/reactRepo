import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PermMediaOutlinedIcon from '@material-ui/icons/PermMediaOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import TextFieldsOutlinedIcon from '@material-ui/icons/TextFieldsOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import "./offerMediaPopup.scss";
import { useHistory } from 'react-router';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
//   }),
// );

interface IProps {
  hiddenFileInput: any;
  handleFileChange: any;
  fileUpload: any;
  setShowEditor: any;
}

export const OfferMediaPopup: React.FC<IProps> = ({ hiddenFileInput, handleFileChange, fileUpload, setShowEditor }) => {
  // const classes = useStyles();
  const history = useHistory();



  return (
    <div className="modal_offer_icon">

      {/* <span className="border_next_back"></span> */}
      <Row className="mt-4">
        <Col md={3} xs={3}>
          <div className="icon_box">
            <div className="icon_content" onClick={fileUpload}  >
              <input type="file"
                multiple
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <PermMediaOutlinedIcon />
            </div>
            <h4>
              Media
            </h4>
          </div>
        </Col>

        <Col md={3} xs={3}>
          <div className="icon_box">
            <div className="icon_content">
              <VideocamOutlinedIcon />
            </div>
            <h4>
              Live
            </h4>
          </div>
        </Col>

        <Col md={3} xs={3}>
          <div className="icon_box">
            <div className="icon_content" onClick={() => { setShowEditor(true) }} >
              <TextFieldsOutlinedIcon />
            </div>
            <h4>
              Format
            </h4>
          </div>
        </Col>

        <Col md={3} xs={3}>
          <div className="icon_box">
            <div className="icon_content" onClick={() => history.push('/create/offer/detail')} >
              <AttachMoneyOutlinedIcon />
            </div>
            <h4>
              Advance
            </h4>
          </div>
        </Col>
      </Row>
    </div>
  )
}