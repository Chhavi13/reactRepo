import React, { useState } from 'react'
import { Header } from '../../components/header/header'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chip from "@material-ui/core/Chip";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';

import "./createIndex.scss";

interface IProps { }

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

export const CreateIndex: React.FC<IProps> = () => {
    const classes = useStyles();

    const [stocks, setStocks] = useState<any>([1, 2, 3, 4, 5]);
    const [frequency, setFrequency] = useState<any>("Daily")

    const deleteStocks = (item: number) => {
        if (stocks.length > 5) {
            setStocks(stocks.filter((i) => i != item))
        }
    }

    const addStocks = () => {
        setStocks(stocks.concat(stocks.length + 1))
    }



    return (
        <>
            <div className="mobilemaincontainer">
                <div className="mobile_container">
                    <Header title="Create Index" next="next" />
                    <div className="sabrinamainscroll create_page ml-3 mr-3 mt-3">
                        <Row>
                            <Col md={5} sm={5}>
                                <p>Index Symbol</p>
                            </Col>
                            <Col>
                                $
                            </Col>
                            <Col md={6} sm={6}>
                                <TextField defaultValue="" />
                            </Col>
                        </Row>

                        <Row className="index_name mt-2 mb-2 ">
                            <Col md={6} sm={6}>
                                <p>Index Name</p>
                            </Col>
                            <Col md={6} sm={6}>
                                <TextField
                                    id="outlined-basic"
                                    // label="Outlined"
                                    variant="outlined"
                                />

                            </Col>
                        </Row>

                        <Row className="mt-2 mb-2">
                            <Col>
                                <span>Number of index in your Index - 5 + </span>
                            </Col>
                        </Row>

                        <div className="mt-2 mb-2">
                            <Row>
                                <Col md={6} sm={6}>
                                </Col>
                                <Col md={6} sm={6}>
                                    <span>Weight in Index%</span>
                                </Col>
                            </Row>
                            {
                                stocks?.map((item: any, index: number) => (
                                    <Row className="index_name stoks_data" key={index} >
                                        <Col md={6} sm={6}>
                                            {
                                                stocks.length > 5 
                                                ?
                                                <Chip
                                                className="chips chip_avatar"
                                                label={` + stock ${index + 1} `}
                                                onDelete={() => deleteStocks(item)}
                                            />
                                            :
                                            <Chip
                                                className="chips chip_avatar"
                                                label={` + stock ${index + 1} `}
                                            />
                                            }
                                        </Col>
                                        <Col md={6} sm={6}>
                                            <TextField
                                                // required id="standard-required"
                                                // label="Required"
                                                variant="outlined"
                                                defaultValue=""
                                            />
                                        </Col>
                                    </Row>
                                ))
                            }
                            <Row>
                                <Col md={6} sm={6}>
                                    <Chip
                                        className="chips chip_avatar"
                                        label={` + Add `}
                                        onClick={addStocks}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <Row className="rebalance_frequency mt-2 mb-2 ">
                            <Col md={6} sm={6}>
                                <p>Rebalance frequency</p>
                            </Col>
                            <Col md={6} sm={6}>
                                <FormControl variant="outlined" className={classes.formControl}>

                                    <InputLabel id="demo-simple-select-outlined-label">
                                        frequency
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={frequency}
                                        onChange={(e: any) => setFrequency(e.target.value)}
                                        label="frequency"
                                    >

                                        <MenuItem value={"Daily"}>Daily</MenuItem>
                                        <MenuItem value={"Weekly"}>Weekly</MenuItem>
                                        <MenuItem value={"Monthly"}>Monthly</MenuItem>
                                    </Select>
                                </FormControl>
                            </Col>
                        </Row>
                        
                        <TextField
                            className="about_index mt-2 mb-2"
                            id="outlined-textarea"
                            // id="outlined-multiline-static"
                            // label="Multiline Placeholder"
                            placeholder="About the Index :"
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                        <Row className="mt-2 mb-2">
                            <Col md={10} sm={10}>
                                <p>Advanced</p>
                            </Col>
                            <Col>
                                <KeyboardArrowRightOutlinedIcon />
                            </Col>
                        </Row>

                    </div>
                </div>
            </div>
        </>
    )
}
