import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Work } from "../../interfaces/works.interfaces";
import useGetDocument from "../../hooks/useGetDocument";
import { db, worksCol } from "../../services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Button, Container, Form } from "react-bootstrap";
import FrontImageUpload from "../components/FrontImageUpload";
import ImagesUpload from "../components/ImagesUpload";
import { toast } from "react-toastify";

const EditWork = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const [frontImage, setFrontImage] = useState<Image | null>(null);
  const navigate = useNavigate();
  const { workId } = useParams();
  const { data: work } = useGetDocument<Work>(worksCol, workId!);

  useEffect(() => {
    if (work) {
      setTitle(work.title || "");
      setDescription(work.description || "");
      setImages(work.images || []);
      setFrontImage(work.frontImage || null);
    }
  }, [work]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (workId) {
      const workRef = doc(db, "works", workId);

      try {
        await updateDoc(workRef, {
          title,
          description,
          frontImage,
          images,
        });
        toast.success("Projekt uppdaterat!");
        navigate("/admin/all-works");
      } catch (error) {
        console.error("Error updating project: ", error);
      }
    } else {
      console.error("Kontrollera att alla fält är korrekt ifyllda.");
      toast.error("Kontrollera att alla fält är korrekt ifyllda.");
    }
  };

  return (
    <div className="admin-editWork-page">
      <Container>
        <h1>Redigera projekt</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Titel</Form.Label>
            <Form.Control
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
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
              Uppdatera projekt
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default EditWork;
