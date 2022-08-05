import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
function MyVerticallyCenteredModal(props: any) {

    return (
        <Modal
            className="subscribe_invest_modal"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header  className="unSubscriber-header" closeButton>
                <span className="unSubscriber-header-span" >
                Do you want to unsubscribe ?
                    
                </span>
            </Modal.Header>
            <Modal.Body>
                <div className="unSubscribe-body">
                    <div className="">
                   

                        <div className="">
                            <Button variant="contained" style={{backgroundColor:'red',width:80,marginRight:10}} className="" >
                                OK
                            </Button>

                            <Button variant="contained" style={{border:"1px solid black"}} color="secondary" onClick={()=> props.onHide(false)}>
                                
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
        </Modal>
    );
}
const UnSubscribePopup = ({ unSubscribe, setUnSubscribe }: any) => {
    return (

        <>
            <MyVerticallyCenteredModal
                show={unSubscribe}
                onHide={() => setUnSubscribe(false)}

            />
        </>

    )
}

export default UnSubscribePopup
