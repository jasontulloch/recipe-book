import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import ChefCardMobile from '../../components/ChefCard/ChefCardMobile.component';
import { listChefs } from '../../actions/chefPublicActions';

import Message from '../../components/Message/Message.component';

import './AllChefsPage.styles.css';

const AllChefsPageMobile = ({ currentChefList }) => {

  return (
    <div>
      <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
        {currentChefList && currentChefList.map((chef) => (
          <Col xs={6} key={chef._id} style={{padding: '5px'}}>
            <div>
              <ChefCardMobile chef={chef} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default AllChefsPageMobile;
