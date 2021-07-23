import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import ChefCardMobile from '../../components/ChefCard/ChefCardMobile.component';
import { listChefs } from '../../actions/chefPublicActions';
import PaginateAllChefs from '../../components/PaginateAllChefs/PaginateAllChefs.component';

import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import Message from '../../components/Message/Message.component';

import './AllChefsPage.styles.css';

const AllChefsPageMobile = ({ match }) => {

  const dispatch = useDispatch()

  const chefList = useSelector(state => state.chefList)
  const { loading, error, chefs, pages, page } = chefList

  // This is firing off the action to get products in state
  useEffect(() => {
    dispatch(listChefs())
  }, [dispatch])

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 3000)
  }


  return (
    <div style={{paddingBottom: '50px'}}>
      <Row style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}}>
        {chefs && chefs.map((chef) => (
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
