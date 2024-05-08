import { useState } from "react";
import { Image } from "../../interfaces/works.interfaces";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import ImagesUpload from "../components/ImagesUpload";
import FrontImageUpload from "../components/FrontImageUpload";
import { toast } from "react-toastify";

const AddWork = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const [frontImage, setFrontImage] = useState<Image | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title && description && images.length >= 1) {
      try {
        await addDoc(collection(db, "works"), {
          title,
          images,
          frontImage,
          description,
          created: Timestamp.now(),
        });
        console.log("Success");
        toast.success("Projekt skapat!");
        navigate("/admin/all-works");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      alert("Kontrollera att alla fält är korrekt ifyllda.");
      toast.error("Kontrollera att alla fält är korrekt ifyllda.");
    }
  };

  return (
    <div className="admin-addWork-page">
      <Container>
        <h1>Skapa ny produkt</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="material">
            <Form.Label>Titel</Form.Label>
            <Form.Control
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="material">
            <Form.Label>Beskrivning</Form.Label>
            <Form.Control
              value={description}
              as="textarea"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <div className="uploadImage">
            <Form.Group className="mb-3" controlId="imageUpload">
              <Form.Label>Projektbilder</Form.Label>
              <ImagesUpload images={images} setImages={setImages} />
            </Form.Group>
          </div>

          <div className="uploadImage">
            <Form.Group className="mb-3" controlId="imageUpload">
              <Form.Label>Framsidabild</Form.Label>
              <FrontImageUpload
                frontImage={frontImage}
                setFrontImage={setFrontImage}
              />
            </Form.Group>
          </div>
          <div className="save-btn">
            <Button className="submit-btn" type="submit">
              Skapa projekt
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default AddWork;
