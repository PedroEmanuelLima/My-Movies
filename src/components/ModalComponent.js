import React, { useState } from 'react';
import { Button , Modal } from 'react-bootstrap'

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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  // return (
  //   <div>
  //     <Button color="danger" onClick={handleShow} className={className}>{buttonLabel}</Button>
  //     <Modal.Dialog show={show} onHide={handleClose}>
  //       <Modal.Header closeButton>{title}</Modal.Header>
  //       <Modal.Body>
  //       <p>Description: {overview != null ? <p>{overview}</p> : "UNDEFINED"}</p>
  //         <p className="mt-3 mb-3">Avaliação:
  //           {vote_average}
  //         </p>
  //       </Modal.Body>
  //       <Modal.Footer className="d-flex justify-content-between">
  //         <span className="btn btn-outline-danger" onClick={handleClose}>Close</span>
  //       </Modal.Footer>
  //     </Modal.Dialog>}
  //   </div>
  // );
}

export default ModalComponent;