import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, Form, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMyFollowedChefs
} from '../../actions/chefActions';
import { BiInfoCircle } from 'react-icons/bi'
import { GoSignIn } from 'react-icons/go'
import { IoMdCreate } from 'react-icons/io'
import { GiCook } from 'react-icons/gi';
import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import RecipeCard from '../../components/RecipeCard/RecipeCard.component';
import ChefCard from '../../components/ChefCard/ChefCard.component';
import EmptyRecipeCard from '../../components/EmptyRecipeCard/EmptyRecipeCard.component';
import PaginateMyChefs from '../../components/PaginateMyChefs/PaginateMyChefs.component';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './ChefMyFollowedPage.styles.scss';

const ChefMyFollowedPage = ({ match , history }) => {

  const [unfollow, setUnfollow] = useState('')
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const chefMyFollowed = useSelector(state => state.chefMyFollowed)
  const { loading, error, chefs, finalRecipes, pages, page } = chefMyFollowed

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 2000)
  }

  useEffect(() => {
    if(!chefInfo) {
      history.push('/login')
    }
    dispatch(listMyFollowedChefs(match.params.id, pageNumber))

  }, [
    dispatch,
    history,
    match,
    chefInfo,
    pageNumber
  ])

  // Recipe Carousel - required but overridden in css file
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    // min: 1024
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 5
    },
    // max: 1024
    tablet: {
      breakpoint: { max: 1200, min: 975 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 975, min: 0 },
      items: 1
    }
  };

  return (
      <div>
        {initialLoader ? (
          <PancakeLoader>Finding the chefs you already love...</PancakeLoader>
        ) : (chefInfo && chefs && chefs.length > 0) ? (
          <div style={{marginLeft: '30px'}}>
            {chefs.map(chefId => (
              <div>
                <Carousel
                  responsive={responsive}
                  centerMode={true}
                >
                  <ChefCard chef={chefId} />
                  {finalRecipes && finalRecipes.filter(allRecipes => chefId._id.toString() === allRecipes.chef.toString()).map(recipe => (
                    <div>
                      <RecipeCard recipe={recipe} />
                    </div>
                  ))}
                  {chefId.myRecipes.length > 10 && (
                    <div>
                      <EmptyRecipeCard chef={chefId}/>
                    </div>
                  )}
                </Carousel>
              </div>
            ))}
            <Row>
              <Col xs={12}>
                <PaginateMyChefs
                  pages={pages}
                  page={page}
                />
              </Col>
            </Row>
          </div>
        ) : (chefInfo) ? (
          <Col style={{textAlign: 'center', paddingTop: '100px'}}>
            <p>It does not look like you are following any chefs yet... let us find you some!</p>
            <LinkContainer to={`/chefs`}>
              <Button>
                <GiCook style={{fontSize: '25px'}}/>All Chefs
              </Button>
            </LinkContainer>
          </Col>
        ) : (
          <Col style={{textAlign: 'center', paddingTop: '100px'}}>
            <p>Log into your account to see the chefs you love or create an account to start following our amazing chefs!</p>
            <LinkContainer to={`/login`}>
              <Button>
                <GoSignIn style={{paddingRight: '5px', fontSize: '25px'}}/>Login
              </Button>
            </LinkContainer>
            <LinkContainer to={`/register`} style={{marginLeft: '10px'}}>
              <Button>
                <IoMdCreate style={{paddingRight: '5px', fontSize: '25px'}}/>Register
              </Button>
            </LinkContainer>
          </Col>
        )}
      </div>
  )
}

export default ChefMyFollowedPage;
