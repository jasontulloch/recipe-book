import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, Form, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMyFollowedChefs,
  unfollowChef
} from '../../actions/chefActions';
import { CHEF_UNFOLLOW_RESET } from '../../constants/chefConstants';
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

  const chefUnfollow = useSelector(state => state.chefUnfollow)
  const {
    success: successChefUnfollow,
    error: errorChefUnfollow
  } = chefUnfollow

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

    if(successChefUnfollow) {
      alert('Chef unfollowed')
      setUnfollow('')
      dispatch({ type: CHEF_UNFOLLOW_RESET })
    }

    dispatch(listMyFollowedChefs(match.params.id))

  }, [
    dispatch,
    history,
    match,
    chefInfo,
    successChefUnfollow
  ])

  // Recipe Carousel
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
      <div>
        {initialLoader ? (
          <PancakeLoader>Finding the chefs you already love...</PancakeLoader>
        ) : (chefInfo) ? (
          <div>
            {following.myFollowedChefsId.map(chefId => (
              <div>
                <Carousel responsive={responsive}>
                  {following.recipes && following.recipes.filter(allRecipes => chefId.toString() === allRecipes.chef.toString()).map(recipe => (
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

//{following.myFollowedChefsId.map(chefId => (
//  <div>
//    <Carousel responsive={responsive}>
//      {following.recipes && following.recipes.map(recipe => (
//        <div>
//          {chefId.toString() === recipe.chef.toString() && (
//            <RecipeCard recipe={recipe} />
//          )}
//        </div>
//      ))}
//    </Carousel>
//  </div>
//))}
