import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import ChefCard from '../../components/ChefCard/ChefCard.component';
import { listChefs } from '../../actions/chefPublicActions';
import Paginate from '../../components/Paginate/Paginate.component';

import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import Message from '../../components/Message/Message.component';

const AllChefsPage = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1
  const urlBaseChefs = true

  // Sorting variables
  const [netVotesSort, setNetVotesSort] = useState('')
  const [createdAtSort, setCreatedAtSort] = useState(-1)
  const [sortButtonLabel, setSortButtonLabel] = useState('Newest')

  const dispatch = useDispatch()

  const chefList = useSelector(state => state.chefList)
  const { loading, error, chefs, pages, page } = chefList

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  // This is firing off the action to get products in state
  useEffect(() => {
    dispatch(listChefs(createdAtSort, netVotesSort, pageNumber))
  }, [dispatch, createdAtSort, netVotesSort, pageNumber])

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 3000)
  }

  const handleNewest = (e) => {
    e.preventDefault()
    setCreatedAtSort(-1)
    setNetVotesSort('')
    setSortButtonLabel('Newest')
  }

  const handleHighestRanking = (e) => {
    e.preventDefault()
    setNetVotesSort(-1)
    setCreatedAtSort('')
    setSortButtonLabel('Highest Ranking')
  }

  const handleLowestRanking = (e) => {
    e.preventDefault()
    setNetVotesSort(1)
    setCreatedAtSort('')
    setSortButtonLabel('Lowest Ranking')
  }

  return (
    <div>
      {initialLoader ?  (
        <PancakeLoader>Finding great chefs...</PancakeLoader>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div>
          <Row style={{textAlign:'center'}}>
            <Col xs={12} md={9}>
              <h1>{sortButtonLabel} Chefs</h1>
            </Col>
            <Col xs={12} md={3} style={{paddingBottom: '10px'}}>
              <DropdownButton id="dropdown-item-button" title={sortButtonLabel}>
                <Dropdown.Item as="button" onClick={handleNewest}>Newest</Dropdown.Item>
                <Dropdown.Item as="button" onClick={handleHighestRanking}>Highest Rated</Dropdown.Item>
                <Dropdown.Item as="button" onClick={handleLowestRanking}>Lowest Rated</Dropdown.Item>
              </DropdownButton>
            </Col>
            {chefs && chefs.map((chef) => (
              <Col key={chef._id} xs={6} md={4} lg={3}>
                <ChefCard chef={chef} />
              </Col>
            ))}
            {(chefs.length == 0 && loading !== true) && (
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
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Paginate
                pages={pages}
                page={page}
                urlBaseChefs={urlBaseChefs}
              />
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default AllChefsPage;
