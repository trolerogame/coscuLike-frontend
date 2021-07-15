/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Modal, Button,Spinner } from "react-bootstrap";
import ModalDialog from 'react-bootstrap/ModalDialog'
import FormSubmitImage from "./forms/formSubmitImage";
import { connect } from "react-redux";
import { createPost } from "../redux/reducers/PostDuck";
const modalImage = ({ createPost}: any) => {
  const [show, setShow] = useState(false);
  const [imagePreview, setImagePreview] = useState({
    height: 0,
    width: 0,
    src: "",
  });
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState<boolean>(false);
  const [coscunt, setcoscunt] = useState<boolean>(false);
  const [Descripction, setDescription] = useState("");
  const [Loading, setLoading] = useState(false);
  const [DescripctionError, setDescriptionError] = useState<boolean>(false);

  //* reinicia los hooks
  const handleClose = () => {
    setShow(false);
    reset()
  };
  const reset = () => {
    setDescription("");
    setDescriptionError(false);
    setImage("");
    setcoscunt(false)
    setLoading(false)
    setImagePreview({
      height: 0,
      width: 0,
      src: "",
    });
  };
  const handleShow = () => setShow(true);
  //? accede a la funcion createPost ,dandole como parametro la imagen y la descripcion  si devuleve true redirreicona al home y reinicia todos los hooks
  const SubmitImage = async (e: any): Promise<void> => {
    e.preventDefault();
    if (Descripction.length < 520 && !imageError && !Loading) {
      setLoading(true)
      createPost(image, Descripction).then((validate: boolean) => {
        if (validate) {
          document.location.href = "/"
          reset()
          return
        }
        setcoscunt(true)
        setLoading(false)
      });
      return;
    }
    setDescriptionError(true)
  };
  return (
    <>
      <Button variant="success" onClick={handleShow} className="mx-3">
        Subir Imagen
      </Button>
        <Modal show={show} onHide={handleClose}>
          <form
            encType="multipart/form-data"
            className="px-3"
            onSubmit={SubmitImage}
          >
            <Modal.Header>
                <Modal.Title className="my-2">CREACION DEL POST</Modal.Title>
              </Modal.Header>
            <Modal.Body>
                <FormSubmitImage
                  imagePreview={imagePreview}
                  coscunt={coscunt}
                  setImagePreview={setImagePreview}
                  Descripction={Descripction}
                  setDescription={setDescription}
                  image={image}
                  setImage={setImage}
                  setImageError={setImageError}
                />
                <div className="text-center">
                  {DescripctionError && (
                    <p className="text-danger m-2">
                      la descripcion no debe pasar de los 520 caracteres
                    </p>
                  )}
                  {imageError && (
                    <p className="text-danger m-2">
                      solo pude subirse formato jpg, png y jfif
                    </p>
                  )}
                  {Loading && <Spinner animation="border" variant="primary" />}
                </div>
              </Modal.Body>
            <Modal.Footer>
                {!Loading && (
                <>
                  <Button variant="danger" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </>
                )}
              </Modal.Footer>
          </form>
        </Modal>
    </>
  );
};
const mapStateToProps = () => { return {}}
export default connect(mapStateToProps, { createPost })(modalImage);