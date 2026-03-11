import React, { useState } from "react";
import "./navbar.css";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const TempleCard = ({ imageSrc, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      style={{ cursor: "pointer", overflow: "hidden", position: "relative" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="shadow-sm"
    >
      <Card.Img
        variant="top"
        src={imageSrc}
        style={{
          height: "200px",
          objectFit: "cover",
          filter: isHovered ? "brightness(50%)" : "brightness(100%)",
          transition: "0.3s"
        }}
      />

      {isHovered && (
        <Card.Body
          style={{
            position: "absolute",
            top: "0",
            color: "white",
            textAlign: "center",
            width: "100%",
            paddingTop: "40px"
          }}
        >
          <strong style={{ color: "orange" }}>Advance Darshan</strong>
          <br />
          <br />
          <strong>{title}</strong>
          <br />
          <br />
          {description}
        </Card.Body>
      )}
    </Card>
  );
};

const Temples = () => {
  return (
    <div id="temples" style={{ backgroundColor: "whitesmoke", padding: "40px 0" }}>
      <Container>
        <h1 className="text-center mb-5">Temples</h1>

        <Row className="g-4">

          <Col lg={4} md={6} sm={12}>
            <Link to="/ulogin" style={{ textDecoration: "none" }}>
              <TempleCard
                imageSrc="https://d3k1i85mml78tf.cloudfront.net/Blogs/1677258515580_post_image_1.jpg"
                title="Banke Bihari Mandir"
                description="Register for Banke Bihari Mandir Online Darshan Booking"
              />
            </Link>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <Link to="/ulogin" style={{ textDecoration: "none" }}>
              <TempleCard
                imageSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Shiv_khori_2.jpg/1200px-Shiv_khori_2.jpg"
                title="Shiv Khori Mandir"
                description="Register for Shiv Khori Mandir Online Darshan Booking"
              />
            </Link>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <Link to="/ulogin" style={{ textDecoration: "none" }}>
              <TempleCard
                imageSrc="https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg"
                title="Tirupati Tirumala Temple"
                description="Register for Tirupati Online Darshan Booking"
              />
            </Link>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <Link to="/ulogin" style={{ textDecoration: "none" }}>
              <TempleCard
                imageSrc="https://imageio.forbes.com/blogs-images/jimdobson/files/2016/05/Sree_Padmanabhaswamy_Temple.jpg"
                title="Padmanabaswamy Temple"
                description="Register for Padmanabaswamy Temple Online Darshan Booking"
              />
            </Link>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <Link to="/ulogin" style={{ textDecoration: "none" }}>
              <TempleCard
                imageSrc="https://upload.wikimedia.org/wikipedia/commons/e/e4/Sai_baba_samadhi_mandir_.jpg"
                title="Shirdi Sai Baba Mandir"
                description="Register for Shirdi Sai Baba Darshan Booking"
              />
            </Link>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <Link to="/ulogin" style={{ textDecoration: "none" }}>
              <TempleCard
                imageSrc="https://upload.wikimedia.org/wikipedia/commons/9/94/The_Golden_Temple_of_Amrithsar_7.jpg"
                title="Golden Temple"
                description="Register for Golden Temple Darshan Booking"
              />
            </Link>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Temples;