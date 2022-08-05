import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { blockedUser } from '../../services/auth.service';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom"



function MyVerticallyCenteredModal(props: any) {
    const history = useHistory();
    const [show, setShow] = React.useState(false)

    let ReportAcc = () => {

        props.setIsReport(true)
        props.onHide(false)
    }
    const blockAcc = () => {
            setShow(true)
            props.onHide(false)
            
    }

    const BlockUser = async () => {
        try {
            const payload = { user_is_blocked: props?.id }
            const res = await blockedUser(payload)
            if (res.status === 200) {
                history.push("/dashboard")
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Block show={show}
                handleClose={() => setShow(false)}
                data={props.data}
                BlockUser={BlockUser}
            />
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
                    <span className="text-danger" onClick={blockAcc}>Block Account </span>
                    <hr />
                    <span className="text-danger" onClick={ReportAcc}>Report Account </span>
                    <hr />
                    <span onClick={() => { history.push(`/fan/${props?.id}`) }}>Add to Groups</span>

                </Modal.Body>
                {/* <Modal.Footer>
        
      </Modal.Footer> */}
            </Modal>
        </div>
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

const Block = ({ show, handleClose, data, BlockUser }: any) => {
    // const [show, setShow] = useState(true);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {/* <Modal.Title>Modal heading</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>Are you sure you want to block {data?.first_name} </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={BlockUser}>
                        Block
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export const Popup = ({ isPopup, setIsPopup, isReport, setIsReport, id, data }: any) => {

    return (
        <>
            <MyVerticallyCenteredModal
                show={isPopup}
                onHide={() => setIsPopup(false)}
                isReport={isReport}
                setIsReport={setIsReport}
                id={id}
                data={data}

            />
            <Report
                show={isReport}
                onHide={() => setIsReport(false)}
            />

        </>
    );
}
