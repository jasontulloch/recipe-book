import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container style={{paddingLeft: '160px', marginBottom: '10px'}}>
      <Row>
        <Col className="text-left">
          Copyright &copy; RecipeBook 2021
        </Col>
      </Row>
    </Container>
  )
};

export default Footer;
