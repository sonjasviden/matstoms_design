import { Button, Container, Form } from "react-bootstrap";
import FrontImageUpload from "../components/FrontImageUpload";
import { useEffect, useState } from "react";
import { Image } from "../../interfaces/works.interfaces";
import { db, homeCol } from "../../services/firebase";
import useGetDocument from "../../hooks/useGetDocument";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Home } from "../../interfaces/home.interface";

const EditHomePage = () => {
  const [homeText, setHomeText] = useState("");
  const [image, setImage] = useState<Image | null>(null);
  const homeId = "nGSFVWzv7tnZFoLZ0iy9";
  const { data: home } = useGetDocument<Home>(homeCol, homeId);

  useEffect(() => {
    if (home) {
      setHomeText(home.homeText || "");
      setImage(home.image || null);
    }
  }, [home]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (homeId) {
      const homeRef = doc(db, "home", homeId);

      try {
        await updateDoc(homeRef, {
          homeText,
          image,
        });
        console.log("updated");
        toast.success("Startsidan är uppdaterad!");
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
    <div className="admin-homePage">
      <Container>
        <h1>Ändra startsidan</h1>
        <p>
          Lägg till <strong>/n/</strong> där du vill dela upp texten i en ny
          paragraf.
        </p>
        <Form onSubmit={handleSubmit}>
          <div className="edit-form">
            <div className="left">
              <Form.Group className="mb-3" controlId="homeText">
                <Form.Label>Text</Form.Label>
                <Form.Control
                  value={homeText}
                  as="textarea"
                  rows={10}
                  onChange={(e) => setHomeText(e.target.value)}
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
              Uppdatera startsidan
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default EditHomePage;
