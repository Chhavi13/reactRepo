import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import LockScreen from '../../Common/LockScreen/LockScreen';
import { getFavEvent, getPastEventData, getUpComingEvent } from '../../Redux/Events/EventsReducer';
import FilterSearch from './FilterSearch';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import "./Tabs.scss";
import parse from "html-react-parser"
import { EVENTSDETAIL } from '../../Routes/RouteConstent';
import { useLocation, useNavigate } from 'react-router-dom';
const Tabs = () => {

    let dispatch = useDispatch()
    const Navigate = useNavigate()
    const { state }: any = useLocation()

    const [value, setValue] = React.useState(state?.tab ? state?.tab : "1");
    const [upcomingData, setUpComingData] = React.useState([])
    const [pastData, setPastData] = React.useState([])
    const [favData, setFavData] = React.useState([])
    const [isLoading,setIsLoading] = React.useState<boolean>(false)
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    let user: any = localStorage.getItem("Nurture_user_data");
    user = JSON.parse(user)

    const selector = useSelector((res: any) => res?.events)

    const upComingEventsDispatch = async () => {
        try {
            setIsLoading(true)
            await dispatch(getUpComingEvent())
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const pastEventsDispatch = async () => {
        try {
            await dispatch(getPastEventData())
        } catch (error) {
            console.log(error)
        }
    }

    const favEventDispatch = async () => {
        try {
            await dispatch(getFavEvent())
        } catch (error) {

        }
    }
    const getPastEvent = () => {
        selector?.pastEvents && setPastData(selector.pastEvents)
    }
    const getUpComingEventData = () => {
        selector?.upComingEvents && setUpComingData(selector.upComingEvents)
        // selector.upComingsEvents && setEventData(selector.upComingEvents)
    }
    const getFavEventData = () => {
        selector?.favEvent && setFavData(selector?.favEvent)
    }


    React.useEffect(() => {
        if (!selector?.pastLoading && !selector.pastEvents) {
            pastEventsDispatch()
        }
        if (!selector?.upcomingLoading && !selector.upComingEvents) {
            upComingEventsDispatch()
        }
        if (!selector.favEventLoading && !selector?.favEvent) {
            favEventDispatch()
        }
        getPastEvent()
        getUpComingEventData()
        getFavEventData()
    }, [selector])

    const handleNavigate = (res: any) => {
        Navigate(`${EVENTSDETAIL}${res?.id}`, { state: { tab: value } })
    }
    return (
        <div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box
                        // sx={{ borderBottom: 1, borderColor: 'divider' }}
                        className="event-tabs-main"
                    >
                        <div className='d-flex justify-content-center'>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" className='askN-tabs'>
                                <Tab
                                    label="Upcoming Live" value="1"
                                    sx={{ border: 1, paddingLeft: 10, paddingRight: 10, borderTopLeftRadius: 50, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 50 }}
                                />
                                <Tab label="Past Events" value="2"
                                    sx={{ border: 1, paddingLeft: 10, paddingRight: 10, borderTopLeftRadius: 0, borderTopRightRadius: 50, borderBottomRightRadius: 50, borderBottomLeftRadius: 0 }}
                                />
                                <Tab label="Favorites" value="3"
                                    sx={{ border: 1, paddingLeft: 10, paddingRight: 10, borderTopLeftRadius: 0, borderTopRightRadius: 50, borderBottomRightRadius: 50, borderBottomLeftRadius: 0 }}
                                />

                            </TabList>
                        </div>
                    </Box>
                    <FilterSearch value={value} upcomingEvent={upcomingData}
                        setUpcomingEvent={setUpComingData} pastEvent={pastData}
                        setPastEvent={setPastData} favEvent={favData} setFavEvent={setFavData} />
                    <TabPanel value="1" className='upcoming-live-event-container'>
                        <Tab1 data={upcomingData} setData={setUpComingData} navigate={handleNavigate} loading={isLoading} />
                    </TabPanel>
                    <TabPanel value="2" className='past-event-container'>
                        {
                            user?.is_membership ? <Tab2 data={pastData} navigate={handleNavigate} setData={setPastData} /> :
                                <LockScreen />
                        }
                    </TabPanel>
                    <TabPanel value="3" className='favourite-event-container'>
                        <Tab3 data={favData} />
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default Tabs