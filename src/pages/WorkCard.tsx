import { useNavigate } from "react-router-dom";
import { Work } from "../interfaces/works.interfaces";
import { Image } from "react-bootstrap";

interface Props {
  work: Work;
}
const WorkCard: React.FC<Props> = ({ work }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/work/${work._id}`);
  };

  return (
    <>
      {work.frontImage && (
        <>
          <Image
            key={work.frontImage._id}
            src={work.frontImage.src}
            fluid
            className="mb-3"
            style={{ height: "100%" }}
            onClick={handleCardClick}
          />
          <span className="image-title">{work.title}</span>
        </>
      )}
    </>
  );
};

export default WorkCard;
