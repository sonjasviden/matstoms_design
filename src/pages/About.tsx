import { Container, Image } from "react-bootstrap";
import useGetCollection from "../hooks/useGetCollection";
import { aboutCol } from "../services/firebase";
import { About as AboutType } from "../interfaces/about.interface";

const About = () => {
  const { data: aboutData } = useGetCollection<AboutType>(aboutCol);

  const paragraph = aboutData?.map((about) =>
    about.aboutText
      .split("/n/")
      .map((paragraph, index) => <p key={index}>{paragraph.trim()}</p>)
  );

  return (
    <div className="aboutPage">
      <Container>
        {aboutData?.map((about) => (
          <div className="about-flex" key={about._id}>
            <div className="left">
              <div className="square-container">
                <Image src={about.image.src} className="square-image" />
              </div>
            </div>

            <div className="right">
              <h1>Sara Matstoms</h1>
              <p>{paragraph}</p>
              <div className="contact">
                <div className="contact-flex">
                  <Image src="/images/email.png" />
                  <a target="_blank" href="mailto: sara.matstoms@gmail.com">
                    sara.matstoms@gmail.com
                  </a>
                </div>

                <div className="contact-flex">
                  <Image src="/images/phone.png" />
                  <a href="tel: 0737720776">(+46) 73 772 07 76</a>
                </div>

                <div className="contact-flex">
                  <Image src="/images/instagram.png" />
                  <a
                    target="_blank"
                    href="https://www.instagram.com/matstomsdesign/"
                  >
                    @matstomsdesign
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default About;
