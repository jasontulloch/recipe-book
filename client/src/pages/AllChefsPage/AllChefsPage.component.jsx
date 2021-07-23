import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import ChefCard from '../../components/ChefCard/ChefCard.component';
import { listChefs } from '../../actions/chefPublicActions';
import PaginateAllChefs from '../../components/PaginateAllChefs/PaginateAllChefs.component';

import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import Message from '../../components/Message/Message.component';

import { isBrowser } from 'react-device-detect';
import AllChefsPageMobile from './AllChefsPageMobile.component';

import './AllChefsPage.styles.css';

const AllChefsPage = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const chefList = useSelector(state => state.chefList)
  const { loading, error, chefs, pages, page } = chefList

  // This is firing off the action to get products in state
  useEffect(() => {
    dispatch(listChefs(pageNumber))
  }, [dispatch, pageNumber])

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 3000)
  }


  return (
    <div>
      {(isBrowser) ? (
        <div>
          {initialLoader ?  (
            <PancakeLoader>Finding great chefs...</PancakeLoader>
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            <div style={{paddingLeft: '30px', display: 'block', marginRight: 'auto', marginLeft: '20px'}} className="allChefsPageMobile2Div">
              <Row className="allChefsPageMobileRow">
                {chefs && chefs.map((chef) => (
                  <Col className="allChefsPageChefCardMobile" key={chef._id} style={{maxWidth: '190px', minWidth: '190px'}}>
                    <ChefCard chef={chef} />
                  </Col>
                ))}
                {(chefs.length === 0 && loading !== true) && (
                  <Col style={{textAlign: 'center', paddingTop: '100px'}}>
                    <p >Looks like we couldn't find any chefs, view the chefs you are following or find a new one!</p>
                    <LinkContainer to={`/mychefs`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-plus'>My Favorite Chefs</i>
                      </Button>
                    </LinkContainer>
                    <LinkContainer to={`/chefs/advanced-search`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-search'>New Chef Search</i>
                      </Button>
                    </LinkContainer>
                  </Col>
                )}
              </Row>
              <Row className="allChefsPageMobilePaginate">
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <PaginateAllChefs
                    pages={pages}
                    page={page}
                  />
                </Col>
              </Row>
            </div>
          )}
        </div>
      ) : (
        <AllChefsPageMobile />
      )}
    </div>
  )
}

export default AllChefsPage;
