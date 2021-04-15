import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { GiCook } from 'react-icons/gi';

const EmptyRecipeCard = ({ chef }) => {

  return (
    <div style={{paddingBottom: '40px'}}>
      <Card className="text-light mb-4 text-center" style={{ border: 'none', height: '136px', width: '175px' }}>
        <Card.Header style={{padding: '5px', backgroundColor: '#71881B', borderTopRightRadius: '50px', borderTopLeftRadius: '50px', border: 'none' }}>
          <span>
            &nbsp;
          </span>
        </Card.Header>
        <Link to={`/recipe/${chef.id}`} style={{zIndex: '2', textDecoration: 'none'}}>
          <Card.Body style={{height: '136px', width: '175px', backgroundColor: '#71881B', color: 'white' }}>
            <div style={{paddingBottom: '5px', height: '50%'}}>View all recipes created by...</div>
            <div><GiCook /> {chef.username}</div>
          </Card.Body>
        </Link>
        <Card.Footer style={{paddingTop: '2px', paddingBottom: '2px', backgroundColor: '#71881B', borderBottomRightRadius: '50px', borderBottomLeftRadius: '50px', border: 'none' }}>
          <Row>
            <Col>
              <span style={{color: '#71881B'}}>&nbsp;</span>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default EmptyRecipeCard;
