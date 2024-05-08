import { Button, Container, Form } from "react-bootstrap";
import FrontImageUpload from "../components/FrontImageUpload";
import { useEffect, useState } from "react";
import { Image } from "../../interfaces/works.interfaces";
import { About } from "../../interfaces/about.interface";
import { aboutCol, db } from "../../services/firebase";
import useGetDocument from "../../hooks/useGetDocument";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const EditAboutPage = () => {
  const [aboutText, setAboutText] = useState("");
  const [image, setImage] = useState<Image | null>(null);
  const aboutId = "QiNDFQis6tYGYCyW4FCk";
  const { data: about } = useGetDocument<About>(aboutCol, aboutId);

  useEffect(() => {
    if (about) {
      setAboutText(about.aboutText || "");
      setImage(about.image || null);
    }
  }, [about]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (aboutId) {
      const aboutRef = doc(db, "about", aboutId);

      try {
        await updateDoc(aboutRef, {
          aboutText,
          image,
        });
        console.log("updated");
        toast.success("About-sidan är uppdaterad!");
      } catch (error) {
        console.error("Error updating project: ", error);
        toast.error("Error. Det gick inte att uppdatera.");
      }
    } else {
      toast.error("Kontrollera att alla fält är korrekt ifyllda.");
      console.error("Kontrollera att alla fält är korrekt ifyllda.");
    }
  };

  return (
    <div className="admin-aboutPage">
      <Container>
        <h1>Ändra about-sidan</h1>
        <p>
          Lägg till <strong>/n/</strong> där du vill dela upp texten i en ny
          paragraf.
        </p>
        <Form onSubmit={handleSubmit}>
          <div className="edit-form">
            <div className="left">
              <Form.Group className="mb-3" controlId="aboutText">
                <Form.Label>Text</Form.Label>
                <Form.Control
                  value={aboutText}
                  as="textarea"
                  rows={10}
                  onChange={(e) => setAboutText(e.target.value)}
                />
              </Form.Group>
            </div>

            <div className="right">
              <div className="uploadImage">
                <Form.Group className="mb-3" controlId="imageUpload">
                  <Form.Label>Bild</Form.Label>
                  <FrontImageUpload
                    frontImage={image}
                    setFrontImage={setImage}
                  />
                </Form.Group>
              </div>
            </div>
          </div>

          <div className="save-btn">
            <Button className="submit-btn" type="submit">
              Uppdatera about-sidan
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default EditAboutPage;
