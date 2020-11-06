import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Now we can pass forms into this container as children
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} lg={12} md={9} sm={9}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer;
