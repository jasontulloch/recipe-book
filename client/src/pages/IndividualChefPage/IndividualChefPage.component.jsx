import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  Button,
  Form,
  Badge,
  Table,
  Card
} from 'react-bootstrap';
import {
  getChefPublicDetails,
} from '../../actions/chefPublicActions';
import {
  followChef,
  unfollowChef,
  getChefDetails
} from '../../actions/chefActions';
import { CHEF_FOLLOW_RESET } from '../../constants/chefConstants';
import { CHEF_UNFOLLOW_RESET } from '../../constants/chefConstants';
import RecipeCard from '../../components/RecipeCard/RecipeCard.component';
import Message from '../../components/Message/Message.component';
import PaginateIndividualChef from '../../components/PaginateIndividualChef/PaginateIndividualChef.component';
import ClickableBadge from '../../components/ClickableBadge/ClickableBadge.component';

import 'react-multi-carousel/lib/styles.css';
import { isBrowser } from 'react-device-detect';

import './IndividualChefPage.styles.css';

const IndividualChefPage = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1
  const chefId = match.params.id

  // Keep for now, need to figure out how to prevent refresh
  const [followed, setFollowed] = useState('')
  const [unfollowed, setUnfollowed] = useState('')

  const [viewChefRecipes, setViewChefRecipes] = useState(true)
  const [viewChefCookbooks, setViewChefCookbooks] = useState(false)

  const browserHistory = useHistory();
  const dispatch = useDispatch()

  // Pulling in logged in chefs info to save recipes and if you are on your own page you will get a message
  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const chefPublicDetails = useSelector(state => state.chefPublicDetails)
  const {
    loading,
    chef,
    recipes,
    pages,
    page
  } = chefPublicDetails

  const chefDetails = useSelector(state => state.chefDetails)
  const {
    success: successChefPrivate,
    chef: chefChefPrivate
  } = chefDetails

  const chefFollow = useSelector(state => state.chefFollow)
  const {
    success: successChefFollow
  } = chefFollow

  const chefUnfollow = useSelector(state => state.chefUnfollow)
  const {
    success: successChefUnfollow
  } = chefUnfollow

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 2000)
  }

  // needed to get the chef details on page initialization
  const [initializeChefProfile, setInitializeChefProfile] = useState(true)

  useEffect(() => {
    if (initializeChefProfile === true) {
      setInitializeChefProfile(false)
      dispatch(getChefDetails('profile'))
      dispatch(getChefPublicDetails(chefId, pageNumber))
    }
    if(successChefFollow) {
      //setFollowed('')
      dispatch({ type: CHEF_FOLLOW_RESET })
      dispatch(getChefDetails('profile'))
    }
    if(successChefUnfollow) {
      //setUnfollowed('')
      dispatch({ type: CHEF_UNFOLLOW_RESET })
      dispatch(getChefDetails('profile'))
    }
    dispatch(getChefPublicDetails(chefId, pageNumber))
  }, [
    dispatch,
    match,
    successChefFollow,
    successChefUnfollow,
    chefChefPrivate,
    successChefPrivate,
    initialLoader,
    initializeChefProfile,
    pageNumber,
    chefId
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

const viewChefCookbooksHandler = () => {
  setViewChefRecipes(false)
  setViewChefCookbooks(true)
}

const viewChefRecipesHandler = () => {
  setViewChefRecipes(true)
  setViewChefCookbooks(false)
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

  return (
    <div className="individualChefPageMobile" style={{paddingLeft: '220px'}}>
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
        {chef && (chef.isVisible === true) && (
        <div>
          <Row>
            <Col xs={12} md={7}>
              {chefInfo && chefChefPrivate && chefChefPrivate.following && chefChefPrivate.following.some(function(chefId){ return chefId.chef === chef._id}) ? (
                <Form onSubmit={unfollowHandler}>
                  <Form.Group as={Row} style={{marginBottom: '0px'}} className='justify-content-center'>
                    <Form.Label>
                      <h3 style={{ marginLeft: '10px', marginRight: '10px', fontSize: '1.5rem' }}>{chef.username}</h3>
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
                  <Form.Group as={Row} style={{marginBottom: '0px'}} className='justify-content-center'>
                    <Form.Label className="individualChefPageNameMobile">
                      <h3 style={{ marginLeft: '10px', marginRight: '10px', fontSize: '1.25rem' }}>{chef.username}</h3>
                    </Form.Label>
                    {chefInfo && (
                      <Button
                        variant='link'
                        style={{ padding: 0, height: '25px'}}
                        type='submit'
                        onClick={(e) => setFollowed('')}
                        disabled={(chefInfo == null) ? true : false}
                      >
                        <Badge pill variant='primary' style={{marginLeft: '0px'}}>Follow</Badge>
                      </Button>
                    )}
                  </Form.Group>
                </Form>
              )}
              <h6 style={{textAlign: 'center'}}>
                {Diets.length > 0 && Diets.map((diet) => (
                  <ClickableBadge diet={diet} style={{marginRight: '5px', marginTop: '5px'}}>{diet}</ClickableBadge>
                ))}
              </h6>
              <h6 style={{paddingBottom: '10px', borderBottom: 'dotted 3px', textAlign: 'center'}}>
                {Allergins.length > 0 && Allergins.map((allergin) => (
                  <ClickableBadge allergin={allergin} style={{marginRight: '5px', marginTop: '5px'}}></ClickableBadge>
                ))}
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
            <Row style={{display: 'flex', justifyContent: 'center'}}>
              {recipes && recipes.map((recipe) => (
                <Col key={recipe._id} style={{maxWidth: '190px', minWidth: '190px'}}>
                  <RecipeCard recipe={recipe}/>
                </Col>
              ))}
            </Row>
          ) : (
            <div style={{marginBottom: '100px', marginTop: '15px'}}>
                <div style={{overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap', paddingLeft: '15px', height: '35px', textAlign: 'center'}}>
                  <Badge 
                    pill variant={(viewChefRecipes) ? 'success' : 'primary' }
                    style={{marginRight: '5px', marginTop: '5px'}}
                    onClick={viewChefRecipesHandler}
                  >
                    Chef Recipes
                  </Badge>
                  <Badge 
                    pill variant={(viewChefCookbooks) ? 'success' : 'primary' }
                    style={{marginRight: '5px', marginTop: '5px'}}
                    onClick={viewChefCookbooksHandler}
                  >
                    Chef Cookbooks
                  </Badge>
                </div>
                <Col xs={12}>
                    <Table hover responsive borderless className='table-sm'>
                        {viewChefRecipes && recipes && recipes.map((recipe) => (         
                            <tr key={recipe.id}>
                                <Link
                                    to={`/recipe/${recipe._id}`}
                                    style={recipe.isPublished === false ? {pointerEvents: "none", textDecoration: 'none'} : {}}
                                >
                                <td style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                    <Card style={{border: 'none'}}>
                                        <Card.Img src={recipe.recipe_cover_image} alt={recipe.recipe_name} style={{height: '77px', width: '100px', borderRadius: '25px'}} />
                                    </Card>
                                </td>
                                <td style={{paddingTop: '20.5px'}}>
                                    {recipe.recipe_name.length > 20 ? (
                                        <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                                            {recipe.recipe_name.slice(0, 40) + (recipe.recipe_name.length > 40 ? "..." : "")}
                                        </div>
                                    ) : (
                                        <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                                            {recipe.recipe_name}
                                        </div>
                                    )}
                                    {chef.username > 15 ? (
                                    <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                                        {chef.username.slice(0, 15) + (chef.username > 15 ? "..." : "")}
                                    </div>
                                    ) : (
                                    <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                                        {chef.username}
                                    </div>
                                    )}
                                </td>
                                </Link>
                            </tr>
                        ))}
                      </Table>
                    </Col>
            </div>
          )}
          {(recipes && recipes.length < 1) && (
            <div style={{marginRight: '15px', marginTop: '50px', textAlign: 'center'}}>
              <Message>Bummer... it looks like {chef.username} does not have any recipes yet.</Message>
            </div>
          )}
          <Row className="allChefsPageMobilePaginate">
            <Col xs={12}>
              <PaginateIndividualChef
                pages={pages}
                page={page}
                id={chefId}
              />
            </Col>
          </Row>
        </div>
        )}
      </div>
    </div>
  )
}

export default IndividualChefPage;
