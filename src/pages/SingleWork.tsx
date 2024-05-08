import { useNavigate, useParams } from "react-router-dom";
import useGetDocument from "../hooks/useGetDocument";
import { Work } from "../interfaces/works.interfaces";
import { worksCol } from "../services/firebase";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

const SingleWork = () => {
  const { workId } = useParams();
  const selectedProductId = Array.isArray(workId) ? workId[0] : workId;
  const { data: workData } = useGetDocument<Work>(worksCol, selectedProductId);
  const navigate = useNavigate();

  return (
    <>
      {workData && (
        <div className="singleWork-page">
          <Container>
            <div className="goBack-btn">
              <Button onClick={() => navigate("/work")}>← Go back</Button>
            </div>

            <h1>{workData.title}</h1>
            <p>{workData.description}</p>
            <div>
              <Row xs={1} md={2} lg={3} className="g-4">
                {workData.images.map((image) => (
                  <Col key={image._id} className="col">
                    <Image src={image.src} fluid className="mb-3" />
                  </Col>
                ))}
              </Row>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default SingleWork;
