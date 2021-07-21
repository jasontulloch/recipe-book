import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './FormContainer.styles.css';

// Now we can pass forms into this container as children
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-center formContainerMobile' style={{}}>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer;
