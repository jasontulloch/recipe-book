import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { GiCook } from 'react-icons/gi';

import './EmptyRecipeCard.styles.css';

const EmptyRecipeCard = ({ chef }) => {

  return (
    <div className="emptyRecipeCardMobile" style={{paddingBottom: '40px'}}>
      <Card className="text-light mb-4 text-center emptyRecipeCardMobile" style={{ border: 'none', height: '136px', width: '175px' }}>
        <Card.Header style={{padding: '3px', backgroundColor: '#71881B', borderTopRightRadius: '50px', borderTopLeftRadius: '50px', border: 'none' }}>
          <span>
            &nbsp;
          </span>
        </Card.Header>
        <Link to={`/recipes/advanced-search-results/keywordCookTimeMin=0/keywordCookTimeMax=999/keywordChefName=${chef.username}/page/1/`} style={{zIndex: '2', textDecoration: 'none'}}>
          <Card.Body className="emptyRecipeCardBodyMobile" style={{height: '136px', width: '175px', backgroundColor: '#71881B', color: 'white' }}>
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
