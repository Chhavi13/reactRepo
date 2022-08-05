import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import { FileIcon, defaultStyles } from 'react-file-icon';
import Col from "react-bootstrap/Col";
import _orderBy from 'lodash/orderBy';
import { Button, Modal, Image } from "react-bootstrap";

export const ChatImageUploadModal = ({show, handleClose, base64String, uploadChatImage, attachmentData}: any) => {
  console.log(attachmentData);
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Image upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={12}>
              { attachmentData?.name === 'image' ? <Image width="322" height="360" src={base64String} rounded /> :
                <FileIcon extension={attachmentData?.extension} {...defaultStyles[attachmentData?.extension]} />
              }
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={uploadChatImage}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
