import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { Button, Form } from 'react-bootstrap';



function MyVerticallyCenteredModal(props: any) {
    let ReportAcc = () => {

        props.setIsReport(true)
        props.onHide(false)
    }
    return (
        <Modal
            className="subscribe_invest_modal popup"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>
                <span className="text-danger">Block Account </span>
                <hr />
                <span className="text-danger" onClick={ReportAcc}>Report Account </span>
                <hr />
                Add to Groups

            </Modal.Body>
            {/* <Modal.Footer>
        
      </Modal.Footer> */}
        </Modal>
    );
}

function Report(props: any) {
    const [value, setValue] = React.useState('female');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <Modal
            className="subscribe_invest_modal popup"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>
                {/* <FormControl component="fieldset"  >
                    <FormLabel >Gender</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                       
                    </RadioGroup>
                </FormControl> */}
                <Form.Check
                    inline
                    label="This content is offensive or violates Tokuten Term of Service"
                    name="group1"
                    type="radio"

                />
                <hr />
                <Form.Check
                    inline
                    label="This Content Contains stolen material [DCMA]"
                    name="group1"
                    type="radio"

                />
                <hr />
                <Form.Check
                    inline
                    label="This Content is spam"
                    name="group1"
                    type="radio"

                />
                <hr />
                <Form.Check
                    inline
                    label="Report Abuse"
                    name="group1"
                    type="radio"

                />
                <br />
                <div className="report-btn">
                    <Button >Report</Button>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
          
        </Modal.Footer> */}
        </Modal>
    );
}
export const Popup = ({ isPopup, setIsPopup, isReport, setIsReport }: any) => {

    return (
        <>
            <MyVerticallyCenteredModal
                show={isPopup}
                onHide={() => setIsPopup(false)}
                isReport={isReport}
                setIsReport={setIsReport}


            />
            <Report
                show={isReport}
                onHide={() => setIsReport(false)}
            />
        </>
    );
}
