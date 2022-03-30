import React, { useState } from 'react';
import { Button , Modal } from 'react-bootstrap'

import "./style.css";

const ModalComponent = (props) => {

  const {
    buttonLabel,
  } = props;

  const {
    title,
    overview,
    vote_average
  } = props.movieModal;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-danger" onClick={handleShow}>
        {buttonLabel}
      </Button>

      <Modal 
      show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Description: {overview != null ? <p>{overview}</p> : "UNDEFINED"}
          <p className="mt-3 mb-3">Avaliação:
            {vote_average}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;