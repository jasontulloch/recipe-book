import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Tooltip,
  OverlayTrigger,
  Badge
} from 'react-bootstrap';
import {
  getChefPublicDetails,
} from '../../actions/chefPublicActions';
import {
  followChef,
  unfollowChef,
  getChefDetails
} from '../../actions/chefActions';
import { CHEF_UPDATE_PROFILE_RESET } from '../../constants/chefConstants';
import { CHEF_FOLLOW_RESET } from '../../constants/chefConstants';
import { CHEF_UNFOLLOW_RESET } from '../../constants/chefConstants';
import { RiUserFollowFill, RiUserUnfollowFill } from 'react-icons/ri';
import { GiCook } from 'react-icons/gi';
//import { RECIPE_CREATE_UPVOTE_RESET } from '../../constants/recipeConstants';
//import { FaThumbsUp, FaThumbsDown, FaBookMedical, FaTimes, FaFileDownload } from 'react-icons/fa';
//import RecipeImagesModal from '../../components/RecipeImagesModal/RecipeImagesModal.component';
import RecipeCard from '../../components/RecipeCard/RecipeCard.component';
import EmptyRecipeCard from '../../components/EmptyRecipeCard/EmptyRecipeCard.component';
import Message from '../../components/Message/Message.component';
import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { isBrowser } from 'react-device-detect';

import './IndividualChefPage.styles.scss';

const IndividualChefPage = ({ history, match }) => {
  const chefId = match.params.id

  const [followed, setFollowed] = useState('')
  const [unfollowed, setUnfollowed] = useState('')
  const [warningMessage, setWarningMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const browserHistory = useHistory();
  const dispatch = useDispatch()

  // Pulling in logged in chefs info to save recipes and if you are on your own page you will get a message
  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const chefPublicDetails = useSelector(state => state.chefPublicDetails)
  const {
    loading,
    error,
    chef,
  } = chefPublicDetails

  const chefDetails = useSelector(state => state.chefDetails)
  const {
    loading: loadingChefPrivate,
    error: errorChefPrivate,
    chef: chefChefPrivate
  } = chefDetails

  const chefFollow = useSelector(state => state.chefFollow)
  const {
    success: successChefFollow,
    error: errorChefFollow
  } = chefFollow

  const chefUnfollow = useSelector(state => state.chefUnfollow)
  const {
    success: successChefUnfollow,
    error: errorChefUnfollow
  } = chefUnfollow

  //const doesFollowExist = chefInfo.following.some(function(chef){ return chef.chef === chefId})
  const [isChefFollowed, setIsChefFollowed] = useState(false)

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 2000)
  }

  useEffect(() => {
    if(initialLoader) {
      dispatch(getChefDetails('profile'))
      if (chefChefPrivate && chefChefPrivate.following) {
        setIsChefFollowed(chefChefPrivate.following.some(function(chefId){ return chefId.chef === chef.id}))
      }
    }
    if(successChefFollow) {
      setFollowed('')
      dispatch({ type: CHEF_FOLLOW_RESET })
      setIsChefFollowed(true)
    }
    if(successChefUnfollow) {
      setUnfollowed('')
      dispatch({ type: CHEF_UNFOLLOW_RESET })
      setIsChefFollowed(false)
    }
    dispatch(getChefPublicDetails(match.params.id))
  }, [
    dispatch,
    match,
    successChefFollow,
    successChefUnfollow,
    chefChefPrivate,
    initialLoader
  ])

  const followHandler = (e) => {
    e.preventDefault()
    dispatch(followChef(match.params.id, {
      chef
    }))
  }

  const unfollowHandler = (e) => {
    e.preventDefault()
    dispatch(unfollowChef(match.params.id, {
      chef
    }))
  }

  const Diets = []
  if (chef.isVegan === true) {
    Diets.push('Vegan')
  }
  if (chef.isVegetarian === true) {
    Diets.push('Vegetarian')
  }
  if (chef.isGlutenFree === true) {
    Diets.push('Gluten Free')
  }
  if (chef.isKetogenic === true) {
    Diets.push('Ketogenic')
  }
  if (chef.isPescatarian === true) {
    Diets.push('Pescatarian')
  }

  const Allergins = []
  if (chef.isDairy === true) {
    Allergins.push('Dairy')
  }
  if (chef.isEgg === true) {
    Allergins.push('Egg')
  }
  if (chef.isNuts === true) {
    Allergins.push('Nuts')
  }
  if (chef.isShellfish === true) {
    Allergins.push('Shellfish')
  }
  if (chef.isSoy === true) {
    Allergins.push('Soy')
  }
  if (chef.isWheat === true) {
    Allergins.push('Wheat')
  }

  // Recipe Carousel - required but overridden in css file
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    // min: 1024
    desktop: {
      breakpoint: { max: 3000, min: 1300 },
      items: 5
    },
    // max: 1024
    tablet: {
      breakpoint: { max: 1300, min: 975 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 975, min: 0 },
      items: 2
    }
  }

  return (
    <div className="individualChefPageMobile" style={{paddingLeft: '50px'}}>
      {initialLoader ? (
        <PancakeLoader>Gathering chef details...</PancakeLoader>
      ) : (
        <div>
        {(chefInfo && chef && (chef.id === chefInfo._id)) ? (
          <Col xs={12} style={{textAlign:'center'}}>
            <Message variant='warning'>
              <Form.Text className='muted'>
                Looks like you found your public profile! Want to make a change?
                <Link to='/profile' style={{ paddingLeft: '5px' }}>
                  Edit you profile
                </Link>
                .
              </Form.Text>
            </Message>
          </Col>
        ) : (chefInfo == null) ? (
          <Col xs={12} style={{textAlign:'center'}}>
            <Message variant='warning'>
              <Form.Text className='muted'>
                <Link to='/login' style={{ paddingRight: '5px' }}>
                  Sign in
                </Link>
                to follow a chef
              </Form.Text>
            </Message>
          </Col>
        ) : (
          <div></div>
        )}
        {chef && (chef.isVisible === true) ? (
        <div>
          <Row style={{paddingBottom: '10px', paddingLeft: '10px'}}>
            <Col xs={12} md={7}>
              {chefInfo && isChefFollowed === true ? (
                <Form onSubmit={unfollowHandler}>
                  <Form.Group as={Row} style={{marginBottom: '0px'}}>
                    <Form.Label>
                      <h3 style={{ marginLeft: '10px' }}>{chef.username}</h3>
                    </Form.Label>
                    {chefInfo && (
                      <Button
                        variant='link'
                        style={{ padding: 0, height: '25px'}}
                        type='submit'
                        onClick={(e) => setFollowed('')}
                        disabled={(chefInfo == null) ? true : false}
                      >
                        <Badge pill variant='primary' style={{marginLeft: '5px'}}>Unfollow</Badge>
                      </Button>
                    )}
                  </Form.Group>
                </Form>
              ) : (
                <Form onSubmit={followHandler}>
                  <Form.Group as={Row} style={{marginBottom: '0px'}}>
                    <Form.Label>
                      <h3 style={{ marginLeft: '10px' }}>{chef.username}</h3>
                    </Form.Label>
                    {chefInfo && (
                      <Button
                        variant='link'
                        style={{ padding: 0, height: '25px'}}
                        type='submit'
                        onClick={(e) => setFollowed('')}
                        disabled={(chefInfo == null) ? true : false}
                      >
                        <Badge pill variant='primary' style={{marginLeft: '5px'}}>Follow</Badge>
                      </Button>
                    )}
                  </Form.Group>
                </Form>
              )}
              <h6>
                {Diets.length > 0 && 'Typical Recipe Diets: '}
                {new Intl.ListFormat().format(Diets)}
              </h6>
              <h6 style={{paddingBottom: '10px', borderBottom: 'dotted 3px'}}>
                {Allergins.length > 0 && 'Common Allergens Avoided: '}
                {Allergins}
              </h6>
              <p>{chef.bio}</p>
            </Col>
            <Col xs={12} md={5} style={{ textAlign:'center'}}>
              <Image
                style={{width: '300px', height: '300px'}}
                src={chef.chefPicture}
                rounded
              />
            </Col>
          </Row>
          {(isBrowser) ? (
            <Carousel
              responsive={responsive}
              centerMode={true}
              infinite={true}
            >
              {chef.recipes && chef.recipes.map((recipe) => (
                <div>
                  <RecipeCard recipe={recipe}/>
                </div>
              ))}
              {chef.count > 5 && (
                <EmptyRecipeCard chef={chef}/>
              )}
            </Carousel>
          ) : (
            <div className="individualChefPageRecipeCardMobile">
              {chef.recipes && chef.recipes.map((recipe) => (
                <div>
                  <RecipeCard recipe={recipe}/>
                </div>
              ))}
              {chef.count > 5 && (
                <EmptyRecipeCard chef={chef}/>
              )}
            </div>
          )}
        </div>
        ) : (
        <div>
          <h1>Oops this is you!</h1>
        </div>
        )}
      </div>
      )}
    </div>
  )
}

export default IndividualChefPage;
