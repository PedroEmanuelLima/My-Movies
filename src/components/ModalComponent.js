import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalComponent = (props) => {

  const {
    buttonLabel,
    className,
  } = props;

  const {
    title,
    overview,
    vote_average
  } = props.movieModal;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle} className={className}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <p className="mt-3 mb-3">Avaliação:
            {vote_average}
          </p>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <span className="btn btn-outline-danger" onClick={toggle}>Close</span>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalComponent;