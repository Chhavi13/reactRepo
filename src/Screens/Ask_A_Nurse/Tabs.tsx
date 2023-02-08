import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import Search from './Search';
import "./Tabs.scss";
import Tab1 from './Tab1';
import Search from './Search';
import { deleteUserMsgApi, getQuestionList } from '../../Service/ask_a_nurse';
import LockScreen from '../../Common/LockScreen/LockScreen';

export default function TabsButton({ Tab2 }: any) {
  const [value, setValue] = React.useState('1');
  const [askMsg, setAskMsg] = React.useState([]);
  const [askMsgBoard, setAskMsgBoard] = React.useState<any>([])
  const [isSearch, setIsSearch] = React.useState(false)

  let userID: any = localStorage.getItem("Nurture_user_data");
  userID = JSON.parse(userID)
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const upDateData = (data: any) => {
    if (value === "1") {
      setAskMsg(data)
    } else {
      setAskMsgBoard(data)
    }
  }
  const getAskMsg = async () => {
    try {

      let res: any = await getQuestionList({ user_id: userID?.id })
      if (res?.data?.success) {
        setAskMsg(res?.data?.data)
      }
    } catch (error) {
      console.log("frequently ask message error", error)
    }
  }
  React.useEffect(() => {
    getAskMsg()
  }, [])
  const submitReset = () => {
    getAskMsg()
  }
  const scrollHandler = () => {
    let tabPostion: any = document.getElementById("tab-postion")
    // let fixNum = tabPostion.getBoundingClientRect()
    
    
    if (window.pageYOffset > 330) {
      tabPostion.classList.remove("normal")
      tabPostion.classList.add("stick")
    } else {
      tabPostion.classList.remove("stick")
      tabPostion.classList.add("normal")

    }

  }
  React.useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
  }, [])
  const DeleteUserMsg = async (value: any, i: number) => {
    try {
      
      const newData: any = askMsgBoard.filter((item: any) => {
        return item.id !== value.id
      })
      await setAskMsgBoard(newData)

      let userMsg = {
        user_id: value.user.id,
        ask_nurse_question_id: value.id
      }
      let res: any = await deleteUserMsgApi("")
      console.log("res from delete api", res)
      if (!res?.data?.success) {
        
        askMsgBoard.splice(i, 0, value)
        setAskMsgBoard(askMsgBoard)
        
        // setData(res)
      }
    } catch (error) {
      //debugger
      console.log(error)
    }

  }
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box
          // sx={{ borderBottom: 1, borderColor: 'divider' }}
          className="askN-tabs-main w-100"  id="tab-postion"
        >
          <div className='d-flex justify-content-center'>
            <TabList onChange={handleChange} id="tab-postion2" aria-label="lab API tabs example" className='askN-tabs' >
              <Tab
                label="Most Popular" value="1"
                sx={{ border: 1, paddingLeft: 10, paddingRight: 10, borderTopLeftRadius: 50, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 50 }}
              />
              <Tab label="Message Board" value="2"
                sx={{ border: 1, paddingLeft: 10, paddingRight: 10, borderTopLeftRadius: 0, borderTopRightRadius: 50, borderBottomRightRadius: 50, borderBottomLeftRadius: 0 }}
              />

            </TabList>
          </div>
        </Box>
        {
          // @ts-ignore
          (value == 1 || value == 2) && <Search
            upDateData={upDateData}
            isSearch={isSearch}
            setIsSearch={setIsSearch}
            submitReset={submitReset}
            tab={value}            
          />}
        <TabPanel value="1" className='faq-main-container'>
          {/* <Tab1 /> */}
          <Tab1 data={askMsg} setData={setAskMsg} />

        </TabPanel>
        <TabPanel value="2" className='messageboard-main-container'>
          {userID?.is_membership ? <Tab2 data={askMsgBoard} setData={setAskMsgBoard} DeleteUserMsg={DeleteUserMsg} /> : <LockScreen />}
        </TabPanel>

      </TabContext>
    </Box>

  );
}
