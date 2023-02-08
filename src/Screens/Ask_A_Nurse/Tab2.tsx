import React, { useEffect } from 'react'
import { Container, Row, Col, Button, Image, ListGroup, Form } from 'react-bootstrap';
import "./Tab2.scss";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { NURSECHAT } from '../../Routes/RouteConstent';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { deleteUserMsgApi } from '../../Service/ask_a_nurse';
import Delete_Popup_Ask_A_Nurse from './Delete_Popup_Ask_A_Nurse';
import FormHelperText from '@mui/material/FormHelperText';





const Tab2 = ({ data, setData, valueSelect, setValueSelect, socket, isDot, setIsDot }: any) => {
  let unseenMsg: any = localStorage.getItem("NapsUnseenMsg")
  unseenMsg = JSON.parse(unseenMsg)
  const [openPop, setOpenPop] = React.useState<boolean>(false)
  const [passData, setPassData] = React.useState<any>({});
  // const [isDot, setIsDot] = React.useState([])
  const Navigate = useNavigate()

  // useEffect(() => {
  //   setIsDot(unseenMsg)
  // }, [])
  const HandleChat = (res: any) => {
    
    if (unseenMsg && unseenMsg.some((id: any) => id == res.id)) {
      let getIndexNum = unseenMsg.indexOf(res.id)
      unseenMsg.splice(getIndexNum, 1)
      localStorage.setItem("NapsUnseenMsg", JSON.stringify(unseenMsg))

    }
    if (res?.dot) {
      let newValue = data.map((value: any) => {
        if (value.id === res.id) {
          res.dot = false;
        }
        return value;
      })
      setData(newValue)
    }
    Navigate(NURSECHAT, { state: { data: res } })
  }

  const FilterDate = async (e: any) => {
    let value = e?.target?.value
    setValueSelect(value)
    if (value === "") {
      // let newData:any = data.sort((a,b) =>  moment(b.created_at).format('YYYYMMDD') - moment(a.created_at).format('YYYYMMDD'))
      let newData = data.sort((a: any, b: any) => {
        var c: any = new Date(a.created_at);
        var d: any = new Date(b.created_at);
        return d - c;
      });
      setData([...newData])
    }
    if (value === "oldest") {
      let newData = data.sort((a: any, b: any) => {
        var c: any = new Date(a.created_at);
        var d: any = new Date(b.created_at);
        return c - d;
      });
      setData([...newData])
    }
  }
  const handleOpen = async (value: any, i: number) => {
    console.log(value)
    setPassData({ value, i })
    setOpenPop(true)
  }
  console.log("unseen message", unseenMsg)



  return (
    <div className='asN-message-main container-fluid mt-0'>
      <Container >
        <Row className='mb-2'>
          <div className='col-lg-12 filter-container'>
            {/* <Form.Select id="sort-message" className='select-noborder' aria-label="form-select" onChange={FilterDate}>
                <option value="new">Newest First</option>
                <option value="opt1">Oldest First</option>
              </Form.Select> */}

            {/* <Box sx={{ minWidth: 120, maxWidth: 140 }}>
              <FormControl fullWidth>
                <InputLabel id="msg-filter-select-label"></InputLabel>
                <Select
                  labelId="msg-filter-select-label"
                  id="msg-filter-select"
                  value={valueSelect}
                  label="Age"
                  onChange={FilterDate}
                >
                  <MenuItem value="newest">Newest first</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                </Select>
              </FormControl>
            </Box> */}

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={valueSelect}
                onChange={FilterDate}
                displayEmpty
                label="testing"

              >

                <MenuItem value="">Newest first</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>

              </Select>

            </FormControl>
          </div>
        </Row>
        <Row className="message-list mt-3">
          {data.map((res: any, i: number) => (
            <div className='col-lg-12' key={res?.id}>
              <div className='d-flex align-items-center justify-content-start message-list-item'>
                {res?.instructor && <div className='user-profile-main d-flex flex-column justify-content-center align-items-center pe-2'>
                  <div className='user-profile position-relative'>
                    {unseenMsg && isDot.length === 0 ? unseenMsg.some((id: any) => id == res.id) && <FiberManualRecordIcon />
                      : isDot.some((id: any) => id == res.id) && <FiberManualRecordIcon />}

                    <div className='user-nm' style={{ 'backgroundImage': `url(${res?.instructor?.photo})` }}>
                      {/* <img src={res?.instructor?.photo} className='img-responsive' /> */}
                    </div>
                  </div>
                  <span className='user-name'>{res?.instructor?.name} </span>
                </div>}
                <div className='last-message-details px-3'>
                  <div className='msg-time-stamp'>
                    {moment(res?.created_at).fromNow()}
                  </div>
                  <h3 className='msg-heading'>{res?.question}</h3>
                  {/* <span className='delete-msg' onClick={() => DeleteUserMsg(res, i)}>Delete</span> */}
                  <Delete_Popup_Ask_A_Nurse

                    open={openPop} setOpen={setOpenPop} data={data} setData={setData} passData={passData}
                  />
                  <span className='delete-msg' onClick={() => handleOpen(res, i)}>Delete</span>

                  {/* <p className='msg-details'>{res?.answer}</p> */}
                </div>
                <div className='btn-container mt-2 mt-md-0 me-0 ms-auto'>
                  {
                    res?.answer && <button className='btn message-readmore' onClick={() => HandleChat(res)}>Read more</button>
                  }
                  {/* <button className='btn message-readmore' onClick={() => HandleChat(res)}>Read more</button> */}
                </div>
              </div>
            </div>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default Tab2