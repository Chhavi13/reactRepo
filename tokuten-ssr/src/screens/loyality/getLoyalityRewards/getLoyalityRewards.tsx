import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import "./getLoyalityRewards.scss";
import 'bootstrap/dist/css/bootstrap.css';
import { Header } from '../../../components/header/header';
import { useHistory } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { readFile } from '../../../utils/CropImageUtils/upload';
import MultilineTextFields from './materialUtility';
import * as alertService from '../../../services/AlertService';
import { createLoayalty } from '../../../services/loyalty.service';
import { Benifits } from "./Benifits";
import { Tier } from "./Tier"
import * as loyalty from "../../../services/loyalty.service";

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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);


interface IProps { }
export const GetLoyalityRewards: React.FC<IProps> = () => {
    const history = useHistory()

    const onPageBack = () => {
        history.goBack()
    }
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [isChecked, setIsChecked] = useState<any>({
        boost: true
    })
    const [isCheckedIntr, setIsCheckedIntr] = useState<any>({
        boost: true
    })
    const [isCheckedTop, setIsCheckedTop] = useState<any>({
        boost: true
    })
    let [image, setImage] = useState<any>({})
    const [images, setImages] = useState<any>("")
    const [image1, setImage1] = useState<any>("")
    const [image2, setImage2] = useState<any>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [basicData, setBasicData] = useState<any>({
        subs_point_booster: 1,
        private_cont_point_booster: 1,
        tips_point_booster: 1,
        investor_point_booster: 1,
        discount: 1,
        benefits_name: "basic",
        is_point_booster: true,
        discount_offers: "All"

    });


    console.log("image for backend", image)
    const [intermediate, setIntermediate] = React.useState<any>({
        subs_point_booster: 1,
        private_cont_point_booster: 1,
        tips_point_booster: 1,
        investor_point_booster: 1,
        discount: 1,
        benefits_name: "intermediate",
        is_point_booster: true,
        discount_offers: "All"
    })
    const [top, setTop] = React.useState<any>({
        subs_point_booster: 1,
        private_cont_point_booster: 1,
        tips_point_booster: 1,
        investor_point_booster: 1,
        discount: 1,
        benefits_name: "top",
        is_point_booster: true,
        discount_offers: "All"
    })
    let [selection, setSelection] = useState<any>({
        interM: false,
        topS: false
    })
    let getData = async () => {
        try {


            let res: any = await loyalty.loyalityData()
            const allData = res?.data?.data 
            const basicData = allData.find((data:any)=> { return data?.name === "Basic"}  )
            const interData = allData.find((data:any)=> { return data?.name === "Intermediate"}  )
            const topData = allData.find((data:any)=> { return data?.name === "Top"}  )
            if (res?.status) {
                console.log("for response image", res?.data?.data[0]?.image)
                if (res.data.data.length !== 0) {
                    if (res.data.data[0]) {
                        setBasicData(basicData)
                        setImages(basicData?.image)

                        image = { ...image, ["basic_image"]: basicData?.image };
                    }
                    if (res.data.data[1]) {
                        setIntermediate(interData)
                        setImage1(interData?.image)

                        image = { ...image, ["intermediate_image"]: interData?.image };

                    }
                    if (res.data.data[2]) {
                        setTop(topData)
                        setImage2(topData?.image)

                        image = { ...image, ["top_image"]: topData?.image };
                    }
                    setImage(image)

                }
            }
        } catch (error) {
            console.log("error from ", error)
        }

    }
    useEffect(() => {
        getData();
    }, [])

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        if (newValue === 1) {
            let errors: any = []
            if (!basicData.name || !image || !basicData.min_points || !basicData.renewal) {
                if (!basicData.name) {
                    errors.push("Name Is Required")
                } if (!image) {
                    errors.push("Images Is Required")
                } if (!basicData.min_points) {
                    errors.push("Minimum Points Is Required")
                }
                if (!basicData.renewal) errors.push("Please Set Renewal Plan")
                let msg: any = "";
                errors.forEach((elem: any, index: any) => {
                    msg += `${index + 1}. ${""} ${elem}  \n `

                })
                alertService.error(msg)
            } else if (basicData.is_engagement || basicData.is_exclusive) {
                if (basicData.is_engagement && !basicData.benefits_desc || basicData.is_exclusive && !basicData.exclusive_desc) {
                    let errors: any = []
                    if (basicData.is_engagement && !basicData.benefits_desc) {
                        errors.push("Benifits Description Is Required")
                    }
                    if (basicData.is_exclusive && !basicData.exclusive_desc) {
                        errors.push("Exclusive Description Is Required")
                    }
                    let msg: any = "";
                    errors.forEach((elem: any, index: any) => {
                        msg += `${index + 1}. ${""} ${elem}  \n`

                    })
                    alertService.error(msg)
                } else {
                    setValue(newValue);
                }
            }
            else {
                setValue(newValue);
            }

        }
        if (newValue === 2) {
            if (!basicData.name || !basicData.min_points || Number(basicData.min_points) > Number(intermediate.min_points) || intermediate.min_points === basicData.min_points ||
                !intermediate.name || !intermediate.min_points || !basicData.renewal || !intermediate.renewal) {
                if (!basicData.renewal) alertService.error("Please Set Renewal Plan")
                if (!intermediate.renewal) alertService.error("Please Set Renewal Plan")

                if (Number(basicData.min_points) > Number(intermediate.min_points) || intermediate.min_points === basicData.min_points) {
                    alertService.error(`Intermediate point must be grater than basic point`)
                }
                if (!basicData.name || !basicData.min_points) {
                    alertService.error("Please Fill All Basic Fields ")
                } else if (!intermediate.name || !intermediate.min_points) {
                    alertService.error("Please Fill All Intermidate Fields ")

                }
            } else if (intermediate.is_engagement || intermediate.is_exclusive || basicData.is_engagement || basicData.is_exclusive) {
                if (intermediate.is_engagement && !intermediate.benefits_desc || intermediate.is_exclusive && !intermediate.exclusive_desc
                    || basicData.is_engagement && !basicData.benefits_desc || basicData.is_exclusive && !basicData.exclusive_desc) {
                    let errors: any = []
                    if (basicData.is_engagement && !basicData.benefits_desc) {
                        errors.push("Basic Benifits Description Is Required")
                    }
                    if (basicData.is_exclusive && !basicData.exclusive_desc) {
                        errors.push("Basic Exclusive Description Is Required")
                    }
                    if (intermediate.is_engagement && !intermediate.benefits_desc) {
                        errors.push("Benifits Description Is Required")
                    }
                    if (intermediate.is_exclusive && !intermediate.exclusive_desc) {
                        errors.push("Exclusive Description Is Required")
                    }
                    let msg: any = "";
                    errors.forEach((elem: any, index: any) => {
                        msg += `${index + 1}. ${""} ${elem}  \n`

                    })
                    alertService.error(msg)

                } else {
                    setValue(newValue)
                }

            }
            else {

                setValue(newValue);
            }
        }

        if (newValue === 0) {

            setValue(newValue);
        }
    };


    // seting tab value
    useEffect(() => {

        if (value === 1) {
            setBasicData({
                ...basicData
            })
            setSelection({
                ...selection,
                ["topS"]: false,
                ["interM"]: true
            })
        } else if (value === 2) {
            setSelection({
                ...selection,
                ["topS"]: true,
                ["interM"]: true
            })
        } else {
            setSelection({
                topS: false,
                interM: false
            })
        }
    }, [value])

    // Upload file handleclick
    const hiddenFileInput = React.useRef<any>(null);
    const fileUpload = (e: any) => {
        hiddenFileInput.current.click();
    }

    const handleFileChange = async (e: any) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        let base64 = await readFile(file)
        if (value === 0) {
            setImage({
                ...image,
                ["basic_image"]: file
            })
            setImages(base64)
        }
        if (value === 1) {
            setImage({
                ...image,
                ["intermediate_image"]: file
            })
            setImage1(base64)
        }
        if (value === 2) {
            setImage({
                ...image,
                ["top_image"]: file
            })
            setImage2(base64)
        }

    }

    let onChangeData = (e: any) => {
        let name = e.target.name;
        let id = e.target.id;
        let values = e.target.value;
        let checked = e.target.checked;

        if (value === 0) {
            if (id?.includes('custom-switch')) {

                setBasicData({
                    ...basicData,
                    [name]: checked
                })
            } else{

                setBasicData({
                    ...basicData,
                    [name]: values
                })
            }


        } else if (value === 1) {
            if (id?.includes('custom-switch')) {
                setIntermediate({
                    ...intermediate,
                    [name]: checked
                })
            }
            else {
                setIntermediate({
                    ...intermediate,
                    [name]: values
                })
            }
        } else if (value === 2) {
            if (id?.includes('custom-switch')) {
                setTop({
                    ...top,
                    [name]: checked
                })
            }
            else {
                setTop({
                    ...top,
                    [name]: values
                })
            }
        }
    }


    const onDataSubmit = async (e: any) => {
        e.preventDefault();

        try {
            let formdata = new FormData();
            // if (!selection.interM || !selection.topS)
            if (value === 0) {
                if (!basicData.name || !image.basic_image || !basicData.min_points || !basicData.renewal) {
                    let errors: any = []

                    if (!(basicData.name)) {
                        errors.push("Name Is Required")
                    }
                    if (!basicData.renewal) {
                        errors.push("Please Set Renewal Plan")
                    }
                    if (!image.basic_image) {
                        errors.push("Images Is Required")
                    }
                    if (!basicData.min_points) {
                        errors.push("Minimum Points Is Required")
                    }



                    let msg: any = "";
                    errors.forEach((elem: any, index: any) => {
                        msg += `${index + 1}. ${""} ${elem}  \n`

                    })
                    alertService.error(msg)
                } else if (basicData.is_engagement || basicData.is_exclusive) {
                    if (basicData.is_engagement && !basicData.benefits_desc || basicData.is_exclusive && !basicData.exclusive_desc) {
                        let errors: any = []
                        if (basicData.is_engagement && !basicData.benefits_desc) {
                            errors.push("Benifits Description Is Required")
                        }

                        if (basicData.is_exclusive && !basicData.exclusive_desc) {
                            errors.push("Exclusive Description Is Required")
                        }
                        let msg: any = "";
                        errors.forEach((elem: any, index: any) => {
                            msg += `${index + 1}. ${""} ${elem}  \n`

                        })
                        alertService.error(msg)
                    }
                    else {
                        setLoading(true)

                        { typeof image.basic_image === "object" && formdata.append('basic_image', image.basic_image); }
                        formdata.append('basic', JSON.stringify(basicData));
                        let response = await createLoayalty(formdata);
                        if (response.data.status === 201) {
                            setLoading(false)
                        }
                    }

                } else {
                    setLoading(true)

                    { typeof image.basic_image === "object" && formdata.append('basic_image', image.basic_image); }
                    formdata.append('basic', JSON.stringify(basicData));
                    let response = await createLoayalty(formdata);
                    console.log(response);
                    if (response.data.status === 201) {
                        setLoading(false)
                    } else {
                        setLoading(false)

                    }
                }
            }
            // if (selection.interM)
            if (value === 1) {
                let errors: any = []
                if (Number(basicData.min_points) === Number(intermediate.min_points) || Number(basicData.min_points) > Number(intermediate.min_points) || !intermediate.name || !intermediate.renewal || !image.intermediate_image || !intermediate.min_points) {
                    if (Number(basicData.min_points) === Number(intermediate.min_points) || Number(basicData.min_points) > Number(intermediate.min_points)) {
                        errors.push(`Intermediate point must be grater than basic point`)
                    }
                    if (!intermediate.name) {
                        errors.push("Name Is Required")
                    }
                    if (!intermediate.renewal) {
                        errors.push("Please Set Renewal Plan")
                    }
                    if (!image.intermediate_image) {
                        errors.push("Images Is Required")
                    }
                    if (!intermediate.min_points) {
                        errors.push("Minimum Points Is Required")
                    }

                    let msg: any = ""
                    errors.forEach((elem: any, index: any) => {
                        msg += `${index + 1}. ${""} ${elem} \n `
                    })
                    alertService.error(msg)
                } else if (isCheckedIntr.is_engagement || isCheckedIntr.is_exclusive) {
                    if (isCheckedIntr.is_engagement && !intermediate.benefits_desc || isCheckedIntr.is_exclusive && !intermediate.exclusive_desc) {
                        let errors: any = []
                        if (isCheckedIntr.is_engagement && !intermediate.benefits_desc) {
                            errors.push("Benifits Description Is Required")
                        }
                        if (isCheckedIntr.is_exclusive && !intermediate.exclusive_desc) {
                            errors.push("Exclusive Description Is Required")
                        }
                        let msg: any = "";
                        errors.forEach((elem: any, index: any) => {
                            msg += `${index + 1}. ${""} ${elem}  \n`

                        })
                        alertService.error(msg)

                    } else {
                        setLoading(true)
                        { typeof image.basic_image === "object" && formdata.append('basic_image', image.basic_image); }
                        { typeof image.intermediate_image === "object" && formdata.append('intermediate_image', image.intermediate_image); }
                        formdata.append('basic', JSON.stringify(basicData));
                        formdata.append('intermediate', JSON.stringify(intermediate));
                        let response = await createLoayalty(formdata);
                        console.log(response);
                        if (response.data.status === 201) {
                            setLoading(false)
                        } else {
                            setLoading(false)
                        }
                    }

                }
                else {
                    { typeof image.basic_image === "object" && formdata.append('basic_image', image.basic_image); }
                    { typeof image.intermediate_image === "object" && formdata.append('intermediate_image', image.intermediate_image); }
                    formdata.append('basic', JSON.stringify(basicData));
                    formdata.append('intermediate', JSON.stringify(intermediate));
                    setLoading(true)
                    let response = await createLoayalty(formdata);
                    console.log(response);
                    if (response.data.status === 201) {
                        setLoading(false)
                    } else {
                        setLoading(false)
                    }
                }
            }
            // if (selection?.topS) 
            if (value === 2) {
                if (Number(intermediate.min_points) > Number(top.min_points) ||
                    intermediate.min_points === top.min_points || !top.renewal || !top.name || !image.top_image || !top.min_points) {

                    let errors: any = []
                    if (Number(intermediate.min_points) > Number(top.min_points) || intermediate.min_points === top.min_points) {
                        errors.push(`Top point must be grater than intermediate point`)
                    }
                    if (!top.renewal) {
                        errors.push("Please Set Renewal Plan")
                    }
                    if (!top.name) {
                        errors.push("Name Is Required")
                    }
                    if (!image.top_image) {
                        errors.push("Images Is Required")
                    }
                    if (!top.min_points) {
                        errors.push("Minimum Points Is Required")
                    }

                    let message: any = ""
                    errors.forEach((elem: any, index: any) => {
                        message += `${index + 1}. ${" "} ${elem}\n`
                    });
                    alertService.error(message)
                } else if (isCheckedTop.engagement || isCheckedTop.is_exclusive) {
                    if (isCheckedTop.engagement && !top.benefits_desc || isCheckedTop.is_exclusive && !top.exclusive_desc) {
                        let errors: any = []
                        if (isCheckedTop.engagement && !top.benefits_desc) {
                            errors.push("Benifits Description Is Required")
                        }
                        if (isCheckedTop.is_exclusive && !top.exclusive_desc) {
                            errors.push("Exclusive Description Is Required")
                        }
                        let msg: any = "";
                        errors.forEach((elem: any, index: any) => {
                            msg += `${index + 1}. ${""} ${elem}  \n`

                        })
                        alertService.error(msg)

                    } else {
                        typeof image.top_image === "object" && formdata.append('top_image', image.top_image);
                        typeof image.basic_image === "object" && formdata.append('basic_image', image.basic_image);
                        typeof image.intermediate_image === "object" && formdata.append('intermediate_image', image.intermediate_image);
                        formdata.append('basic', JSON.stringify(basicData));
                        formdata.append('intermediate', JSON.stringify(intermediate));
                        formdata.append('top', JSON.stringify(top));
                        setLoading(true)
                        let response = await createLoayalty(formdata);
                        console.log(response);

                        if (response.data.status === 201) {
                            setLoading(false)
                        } else {

                            setLoading(false)
                        }
                    }

                    setLoading(false)
                } else {
                    setLoading(true)
                    typeof image.top_image === "object" && formdata.append('top_image', image.top_image);
                    typeof image.basic_image === "object" && formdata.append('basic_image', image.basic_image);
                    typeof image.intermediate_image === "object" && formdata.append('intermediate_image', image.intermediate_image);
                    formdata.append('basic', JSON.stringify(basicData));
                    formdata.append('intermediate', JSON.stringify(intermediate));
                    formdata.append('top', JSON.stringify(top));
                    let response = await createLoayalty(formdata);

                    if (response.data.status === 201) {
                        setLoading(false)
                    } else {
                        setLoading(false)
                    }
                }
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
            alertService.error("Something went wrong")
        }
    }

    return (
        <div className="mobilemaincontainer">
            <div className="mobile_container bg_overflow">
                <Header title="setup loyalty rewards" back={true} enableback={onPageBack}
                    next={loading ? <Spinner className="spinner-offer" animation="grow" variant="primary" /> : "Save"} enablenext={!loading && onDataSubmit} />

                <div className="choose_section">
                    <Form>
                        <div className="no_tier">

                        </div>

                        <div className="no_tier">
                            <Row>
                                <Col md={5} xs={5}>
                                    <label className="tier_label pt-3">
                                        Renewal
                                    </label>
                                </Col>
                                <Col md={7} xs={7} className="text-right drop_select1">
                                    <MultilineTextFields
                                        values={value === 0 ? basicData.renewal : value === 1 ? intermediate.renewal : top.renewal}
                                        on_Change={onChangeData}
                                    />
                                   
                                </Col>
                            </Row>
                        </div>

                        <div className="section_border"></div>

                        <div className="main_content">
                            <h3>
                                tiers
                            </h3>

                            <div className="tab_loyal">
                                <div className={classes.root}>
                                    <AppBar position="static">
                                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                            <Tab label="basic" {...a11yProps(0)} />
                                            <Tab label="intermediate" {...a11yProps(1)} />
                                            <Tab label="top" {...a11yProps(2)} />
                                        </Tabs>
                                    </AppBar>

                                    <div className="tab_loyal_content">
                                        <TabPanel value={value} index={0}>
                                            <Tier hiddenFileInput={hiddenFileInput}
                                                data={basicData} onChangeData={onChangeData}
                                                handleFileChange={handleFileChange}
                                                image={images}
                                                fileUpload={fileUpload}

                                            />
                                        </TabPanel>
                                        <TabPanel value={value} index={1} >
                                            <Tier hiddenFileInput={hiddenFileInput}
                                                data={intermediate} onChangeData={onChangeData}
                                                handleFileChange={handleFileChange}
                                                image={image1} fileUpload={fileUpload}
                                            />
                                        </TabPanel>
                                        <TabPanel value={value} index={2}>
                                            <Tier hiddenFileInput={hiddenFileInput}
                                                data={top} onChangeData={onChangeData}
                                                handleFileChange={handleFileChange} image={image2}
                                                fileUpload={fileUpload}
                                            />
                                        </TabPanel>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="section_border"></div>

                        <div className="main_content pb-0">
                            <h3>
                                benefits
                            </h3>

                            <div className="tab_loyal">
                                <div className={classes.root}>
                                    <AppBar position="static">
                                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                            <Tab label="basic" {...a11yProps(0)} />
                                            <Tab label="intermediate" {...a11yProps(1)} />
                                            <Tab label="top" {...a11yProps(2)} />
                                        </Tabs>
                                    </AppBar>

                                    <div className="tab_loyal_content">

                                        <TabPanel value={value} index={0}>
                                            <Benifits isChecked={isChecked}

                                                setIsCheck={setIsChecked}
                                                data2={basicData}
                                                changeData={onChangeData}
                                                setData2={setBasicData}
                                            />
                                        </TabPanel>

                                        <TabPanel value={value} index={1}>
                                            <Benifits isChecked={isCheckedIntr}
                                                setIsCheck={setIsCheckedIntr}
                                                data2={intermediate}
                                                changeData={onChangeData}
                                                setData2={setIntermediate}

                                            />
                                        </TabPanel>
                                        <TabPanel value={value} index={2}>
                                            <Benifits
                                                isChecked={isCheckedTop}
                                                setIsCheck={setIsCheckedTop}
                                                data2={top}
                                                changeData={onChangeData}
                                                setData2={setTop}

                                            />
                                        </TabPanel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}