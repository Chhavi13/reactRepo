import React from 'react'
import { useHistory } from 'react-router'
import { Header } from '../../components/header/header';
// import './createSlot.scss';
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import { OfferDetail } from '../../components/offerDetail/offerDetail';
import "./activity.scss"
import { ActivitySubscription } from './activitySubscription';
import { ActivityLoyalityMembership } from './activityLoyalityMembership';
import { ActivityHistory } from './activityHistory';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
}));
interface IProps { }

export const Activty: React.FC<IProps> = () => {
    const history = useHistory()

    const offerData: any = {
        additional_notes: null,
        cost: null,
        event_offer_images: [
            { file: "https://admin.tokuten.ai/media/offer_upload/f5c60a86-2d5a-4249-adac-093aa08a0cb0.IMG-20210725-WA0003_resize_90.jpg" },
            { file: "https://admin.tokuten.ai/media/offer_upload/b2efb12e-942e-4790-bf57-47df0114c402.IMG-20210725-WA0001_resize_58.jpg" },
            { file: "https://admin.tokuten.ai/media/offer_upload/449e748c-d97a-450e-b197-32f16a0b5604.IMG-20210725-WA0000_resize_79.jpg" },
            { file: "https://admin.tokuten.ai/media/offer_upload/6e0e0723-b0b9-4325-8b0d-1fed84e35195.IMG-20210725-WA0002_resize_27.jpg" }
        ],
        expires_at: "2021-08-05T17:11:59.948063Z",
        first_name: "Ishtiyaq Khan",
        id: 228,
        is_allow_manage_store: false,
        is_allow_tips: false,
        is_physical_delivery: false,
        is_private: false,
        is_subscribed: false,
        is_virtual_delivery: false,
        offer_bio: "bi",
        offer_location: null,
        offer_title: "tittle",
        profile_image: "https://admin.tokuten.ai/media/profiles/e447ad98-35f3-498b-8b44-9a36eb85236b.unnamed_1.jpg",
        starts_at: "2021-08-05T17:11:59.948081Z",
        thanku_note: null,
        units: 0,
        user_id: 7,
        username: "ishtiyaq",
    }


    const enableback = () => { history.goBack() }
    const enablenext = () => { }

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="mobilemaincontainer">
            <div className="mobile_container">
                <Header
                    title='Create Slot'
                    back={true}
                    enableback={enableback}
                    next='Save'
                    enablenext={enablenext}
                />
                <div className="four_tabs_member four_border_tab create-slot three_tabs_member pb-3">
                    <div className={classes.root}>
                        <AppBar position="static">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="simple tabs example"
                            >
                                <Tab icon={<BookmarkBorderIcon />} {...a11yProps(0)} />
                                <Tab icon={<NotificationsNoneOutlinedIcon />} {...a11yProps(1)} />
                                <Tab icon={<StarOutlineOutlinedIcon />} {...a11yProps(2)} />
                                <Tab icon={<HistoryOutlinedIcon />} {...a11yProps(3)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <h2 className="title"> BookMarks </h2>
                            <OfferDetail item={offerData} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <ActivitySubscription />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <ActivityLoyalityMembership />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <ActivityHistory />
                        </TabPanel>
                    </div>
                </div>
            </div>
        </div>
    )
}