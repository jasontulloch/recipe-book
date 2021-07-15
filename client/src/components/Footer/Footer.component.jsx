import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container style={{paddingLeft: '200px'}}>
      <Row>
        <Col className="text-center py-3">
          Copyright &copy; RecipeBook 2021
        </Col>
      </Row>
    </Container>
  )
};

export default Footer;
