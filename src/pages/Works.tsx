import { Col, Container, Row } from "react-bootstrap";
import { Work } from "../interfaces/works.interfaces";
import { worksCol } from "../services/firebase";
import useGetCollection from "../hooks/useGetCollection";
import WorkCard from "./WorkCard";

const Works = () => {
  const { data: worksData } = useGetCollection<Work>(worksCol);

  const sortedWork = worksData?.sort(
    (a, b) => b.created.toDate().getTime() - a.created.toDate().getTime()
  );

  return (
    <div className="worksPage">
      <Container>
        <h1>My work</h1>
        <Row xs={1} md={2} lg={3} className="g-4">
          {sortedWork?.map((work) => (
            <Col key={work._id} className="col">
              <WorkCard work={work} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Works;
