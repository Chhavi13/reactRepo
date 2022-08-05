import React from 'react'
import Form from 'react-bootstrap/Form';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router'
import { Header } from '../../../components/header/header';
import './createSlot.scss';

interface IProps { }

export const CreateSlot: React.FC<IProps> = () => {
    const history = useHistory()

    const enableback = () => { history.goBack() }
    const enablenext = () => { }

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
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
                <div className="create-slot-container">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Row>
                            <Col>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="From"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Col>

                            <Col>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="At"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </Col>
                        </Row>
                        <br />

                        <Row>
                            <Col>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="To"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Col>

                            <Col>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="At"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </Col>
                        </Row>
                    </MuiPickersUtilsProvider>
                    
                    <br />

                    <span>Break my slot in intervals of</span>
                    <Form.Control as="select" >
                        <option value="1">5 Min</option>
                        <option value="2">10 Min</option>
                    </Form.Control>

                    <br />
                    <span>Break interval between each slot</span>
                    <Form.Control as="select" >
                        <option value="1">2 Min</option>
                        <option value="2">10 Min</option>
                    </Form.Control>

                    <br />
                    <span>Number of parallel slots</span>
                    <Form.Control as="select" >
                        <option value="1">2</option>
                        <option value="2">10</option>
                    </Form.Control>

                    <br />
                    <span>Repeats</span>
                    <Form.Control as="select" >
                        <option value="1">Daily</option>
                        <option value="2">In 10 days</option>
                    </Form.Control>

                </div>

            </div>
        </div>
    )
}