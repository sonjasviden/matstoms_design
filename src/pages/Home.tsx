import { Button, Container, Image } from "react-bootstrap";
import useResponsiveView from "../hooks/useResponsiveView";
import { useNavigate } from "react-router-dom";
import useGetCollection from "../hooks/useGetCollection";
import { homeCol } from "../services/firebase";
import { Home as HomeType } from "../interfaces/home.interface";

const Home = () => {
  const isMobileView = useResponsiveView();
  const navigate = useNavigate();
  const { data: homeData } = useGetCollection<HomeType>(homeCol);

  const paragraph = homeData?.map((home) =>
    home.homeText
      .split("/n/")
      .map((paragraph, index) => <p key={index}>{paragraph.trim()}</p>)
  );

  return (
    <div className="homePage">
      <Container>
        {isMobileView ? (
          <>
            <div className="logo">
              <Image src="/images/logo.png" />
            </div>
            {homeData?.map((home) => (
              <div className="right">
                <Image className="front-img" src={home.image.src} />
              </div>
            ))}
            <p>{paragraph}</p>
            <div className="goTo-btn">
              <Button onClick={() => navigate("/work")}>See my work ⇀</Button>
            </div>{" "}
          </>
        ) : (
          <>
            <div className="left">
              <div className="logo">
                <Image src="/images/logo.png" />
              </div>
              <p>{paragraph}</p>
              <div className="goTo-btn">
                <Button onClick={() => navigate("/work")}>See my work ⇀</Button>
              </div>
            </div>
            {homeData?.map((home) => (
              <div className="right">
                <Image className="front-img" src={home.image.src} />
              </div>
            ))}
          </>
        )}
      </Container>
    </div>
  );
};

export default Home;
