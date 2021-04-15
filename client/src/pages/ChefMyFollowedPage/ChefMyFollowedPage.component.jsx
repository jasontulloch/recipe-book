import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, Form, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMyFollowedChefs
} from '../../actions/chefActions';
import { BiInfoCircle } from 'react-icons/bi'
import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import RecipeCard from '../../components/RecipeCard/RecipeCard.component';
import ChefCard from '../../components/ChefCard/ChefCard.component';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const ChefMyFollowedPage = ({ match , history }) => {

  const [unfollow, setUnfollow] = useState('')

  const dispatch = useDispatch()

  const chefMyFollowed = useSelector(state => state.chefMyFollowed)
  const { loading, error, following } = chefMyFollowed

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
    dispatch(listMyFollowedChefs(match.params.id))

  }, [
    dispatch,
    history,
    match,
    chefInfo
  ])

  // Recipe Carousel
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  return (
      <div>
        {initialLoader ? (
          <PancakeLoader>Finding the chefs you already love...</PancakeLoader>
        ) : (chefInfo) ? (
          <div>
            {following.chefs && following.chefs.map(chefId => (
              <div>
                <Carousel
                  responsive={responsive}
                  centerMode={true}
                >
                  <ChefCard chef={chefId} />
                  {following.recipes && following.recipes.filter(allRecipes => chefId._id.toString() === allRecipes.chef.toString()).map(recipe => (
                    <div>
                      <RecipeCard recipe={recipe} />
                    </div>
                  ))}
                </Carousel>
              </div>
            ))}
          </div>
        ) : (
          <h1></h1>
        )}
      </div>
  )
}

export default ChefMyFollowedPage;
