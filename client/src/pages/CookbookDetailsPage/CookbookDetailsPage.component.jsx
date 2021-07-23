import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, OverlayTrigger, Tooltip, Card, Form, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listCookbookDetails,
  updateCookbook,
  listMyCookbooks
} from '../../actions/cookbookActions';
import {
  removeRecipeFromCookbook,
} from '../../actions/recipeActions';
import Message from '../../components/Message/Message.component';
import ClickableBadgeBooleans from '../../components/ClickableBadgeBooleans/ClickableBadgeBooleans.component';
import { IoLocationOutline } from 'react-icons/io5'
import { IoMdCreate } from 'react-icons/io'
import { BiInfoCircle } from 'react-icons/bi'
import { GiBookmark, GiRank3, GiFoodTruck } from 'react-icons/gi'
import { MdTimer, MdFormatListNumbered, MdLocalGroceryStore, MdDelete } from 'react-icons/md'

import { RECIPE_REMOVE_FROM_COOKBOOK_RESET } from '../../constants/recipeConstants';
import { COOKBOOK_UPDATE_RESET, COOKBOOK_DETAILS_RESET } from '../../constants/cookbookConstants';

import { isBrowser } from 'react-device-detect';

import './CookbookDetailsPage.styles.css';

const CookbookDetailsPage = ({ match , history }) => {

  const cookbookId = match.params.id
  const [removeFromCookbook, setRemoveFromCookbook] = useState('')
  const [cookbook_name, setCookbookName] = useState('')
  const [description, setDescription] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [cookbook_cover_image, setCookbookCoverImage] = useState('')

  const [warningMessage, setWarningMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [editCookbookDetails, setEditCookbookDetails] = useState(false)

  const dispatch = useDispatch()

  const cookbookDetails = useSelector(state => state.cookbookDetails)
  const { loading, error, success, cookbook, myCookbookRecipes, chefNames } = cookbookDetails

  const recipeRemoveFromCookbook = useSelector(state => state.recipeRemoveFromCookbook)
  const {
    success: successRecipeRemoveFromCookbook
  } = recipeRemoveFromCookbook

  const cookbookUpdate = useSelector(state => state.cookbookUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = cookbookUpdate

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 2000)
  }

  useEffect(() => {
    if(successRecipeRemoveFromCookbook) {
      setRemoveFromCookbook('')
      dispatch({ type: RECIPE_REMOVE_FROM_COOKBOOK_RESET })
    }
    if(successUpdate) {
      dispatch({ type: COOKBOOK_UPDATE_RESET })
      dispatch({ type: COOKBOOK_DETAILS_RESET })
      dispatch(listMyCookbooks())
    } else {
      // this check makes sure the FE updates if we look at a different cookbook
      if(!cookbook.cookbook_name || cookbook._id !== cookbookId) {
        dispatch(listCookbookDetails(cookbookId))
      } else {
        setCookbookName(cookbook.cookbook_name)
        setDescription(cookbook.description)
        setIsPrivate(cookbook.isPrivate)
        setIsPremium(cookbook.isPremium)
        setCookbookCoverImage(cookbook.cookbook_cover_image)
      }
    }
  }, [
    dispatch,
    history,
    chefInfo,
    cookbookId,
    successUpdate,
    successRecipeRemoveFromCookbook,
    cookbook.cookbook_name,
    cookbook.description,
    cookbook.isPrivate,
    cookbook.setIsPremium,
    cookbook.cookbook_cover_image
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    setEditCookbookDetails(false)
    dispatch(
      updateCookbook({
        _id: cookbookId,
        cookbook_name,
        description,
        isPrivate,
        isPremium,
        cookbook_cover_image,
      })
    )
  }

  const [recipeId, setRecipeId] = useState('')
  const removeRecipeFromCookbookHandler = (id) => {
    // console.log(match.params.id) This is currently the cookbook ID
    // console.log(recipeId) This is the correct recipeID
    if(window.confirm('Are you sure? You can not undo this action.')) {
      dispatch(removeRecipeFromCookbook(id, { 
        removeFromCookbook,
        cookbookId
      }))
    }
  }

  return (
      <div className="cookbookDetailsPageMobile" style={{paddingLeft: '200px', paddingRight: '30px'}}>
        <Row>
          {warningMessage !== '' && (
            <Message variant='danger'>{warningMessage}</Message>
          )}
          {successMessage !== '' && (
            <Message variant='success'>{successMessage}</Message>
          )}
          {(myCookbookRecipes === undefined || myCookbookRecipes.length == 0 && chefInfo._id === cookbook.chef) && (
            <div style={{marginLeft: '30px', width: '100%', textAlign: 'center'}}>
              <Message variant='warning'>Looks like your cookbook does not have any recipes yet. Go to any recipe page to add it to this cookbook...</Message>
            </div>
          )}
          {(isBrowser) ? (
            <div>
            {editCookbookDetails === false ? (
              <div style={{marginLeft: '30px'}}>
                <Form>
                  <Form.Label>
                    <h3>
                      {cookbook.cookbook_name}
                    </h3>
                  </Form.Label>
                  <Form.Check
                    className="align-middle"
                    inline
                    style={{paddingBottom: '10px', marginLeft: '10px'}}
                    type="switch"
                    id="custom-switch"
                    label="Edit"
                    onChange={(e) => setEditCookbookDetails(true)}
                  />
                </Form>
                <p>{cookbook.description}</p>
              </div>
            ) : (
              <div style={{marginLeft: '30px', maxWidth: '50%'}}>
                <Form inline onSubmit={submitHandler}>
                  <h3>
                    <Form.Control
                      style={{width: '25vw'}}
                      inline
                      type='text'
                      placeholder={cookbook.cookbook_name}
                      value={cookbook_name}
                      maxLength={40}
                      minLength={5}
                      onChange={(e) => setCookbookName(e.target.value)}
                    >
                    </Form.Control>
                  </h3>
                  <Button
                    type='submit'
                    variant='primary'
                    className="align-middle"
                    style={{marginBottom: '10px', marginLeft: '10px'}}
                    onChange={(e) => setEditCookbookDetails(false)}
                  >
                    Save Changes
                  </Button>
                  <p>
                    <Form.Control
                      style={{width: '80vw'}}
                      inline
                      as='textarea'
                      rows={3}
                      placeholder={cookbook.description}
                      value={description}
                      maxLength={300}
                      minLength={0}
                      onChange={(e) => setDescription(e.target.value)}
                    >
                    </Form.Control>
                  </p>

                </Form>
                <Row>
                  <Form.Check
                    className="align-middle"
                    inline
                    style={{paddingBottom: '10px', marginLeft: '10px'}}
                    label="Share?"
                    type="switch"
                    id="custom-switch"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                  />
                </Row>
              </div>
            )}
            
            <Table hover responsive borderless className='table-sm' style={{marginLeft: '20px'}}>
              <thead style={{borderBottom: 'solid 1px #dedede'}}>
                <tr style={{paddingTop: '2px', paddingBottom: '2px'}}>
                  <th style={{paddingRight: '0px', width: '115px'}}><GiBookmark style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'left', paddingRight: '0px', width: '115px'}}></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center', paddingRight: '0px', width: '10px'}}></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><IoLocationOutline style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdTimer style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><GiFoodTruck style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><GiRank3 style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdFormatListNumbered style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdLocalGroceryStore style={{width: '20px', height: '20px'}}/></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(myCookbookRecipes === undefined || myCookbookRecipes.length == 0) ? (
                  <div></div>
                ) : (
                  myCookbookRecipes.map(recipe => (
                    <tr key={recipe.id}>
                      <td className="align-middle" style={{paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px'}}>
                        <Card style={{border: 'none', maxWidth: '100px'}}>
                          <Card.Img src={recipe.recipe_cover_image} alt={recipe.recipe_name} style={{height: '77px', width: '100px'}} />
                        </Card>
                      </td>
                      <td className="align-middle" style={{maxWidth: '200px', paddingLeft: '0px'}}>
                        <Link
                          to={`/recipe/${recipe._id}`}
                          style={recipe.isPublished === false ? {pointerEvents: "none", textDecoration: 'none'} : {}}
                        >
                          {recipe.recipe_name.length > 60 ? (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                              {recipe.recipe_name.slice(0, 60) + (recipe.recipe_name.length > 60 ? "..." : "")}
                            </div>
                          ) : (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                              {recipe.recipe_name}
                            </div>
                          )}
                        </Link>
                        <Link to={`/chefs/${recipe.chef}/page/1`}>
                          {chefNames.find( ({ _id }) => _id === recipe.chef ).username > 15 ? (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                              {chefNames.find( ({ _id }) => _id === recipe.chef ).username.slice(0, 15) + (chefNames.find( ({ _id }) => _id === recipe.chef ).username > 15 ? "..." : "")}
                            </div>
                          ) : (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                              {chefNames.find( ({ _id }) => _id === recipe.chef ).username}
                            </div>
                          )}
                        </Link>
                      </td>
                      <td className="align-middle" style={{padding: '0px'}}>
                        {recipe.isPublished === false && (
                          <OverlayTrigger
                            placement='bottom'
                            overlay={
                              <Tooltip id={'tooltip-bottom'}>
                                The chef has unpublished this recipe and appears to be making some edits!
                              </Tooltip>
                            }
                          >
                            <span><BiInfoCircle /></span>
                          </OverlayTrigger>
                        )}
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '50px'}}>{recipe.country < 1 ? 'n/a' : recipe.country}</td>
                      <td className="align-middle" style={{textAlign: 'center', width: '35px'}}>{recipe.cook_time}</td>
                      <td className="align-middle" style={{width: '225px'}}>
                        {(recipe.isVegan === true && (
                          <ClickableBadgeBooleans isVegan={recipe.isVegan} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isVegetarian === true && (
                          <ClickableBadgeBooleans isVegetarian={recipe.isVegetarian} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isGlutenFree === true && (
                          <ClickableBadgeBooleans isGlutenFree={recipe.isGlutenFree} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isKetogenic === true && (
                          <ClickableBadgeBooleans isKetogenic={recipe.isKetogenic} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isPescatarian === true && (
                          <ClickableBadgeBooleans isPescatarian={recipe.isPescatarian} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isDairy === true && (
                          <ClickableBadgeBooleans isDairy={recipe.isDairy} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isEgg === true && (
                          <ClickableBadgeBooleans isEgg={recipe.isEgg} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isNuts === true && (
                          <ClickableBadgeBooleans isNuts={recipe.isNuts} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isShellfish === true && (
                          <ClickableBadgeBooleans isShellfish={recipe.isShellfish} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isSoy === true && (
                          <ClickableBadgeBooleans isSoy={recipe.isSoy} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isWheat === true && (
                          <ClickableBadgeBooleans isWheat={recipe.isWheat} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isAppetizer === true && (
                          <ClickableBadgeBooleans isAppetizer={recipe.isAppetizer} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isBreakfastBrunch === true && (
                          <ClickableBadgeBooleans isBreakfastBrunch={recipe.isBreakfastBrunch} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isDessert === true && (
                          <ClickableBadgeBooleans isDessert={recipe.isDessert} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isDrink === true && (
                          <ClickableBadgeBooleans isDrink={recipe.isDrink} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isMainDish === true && (
                          <ClickableBadgeBooleans isMainDish={recipe.isMainDish} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isSideSauce === true && (
                          <ClickableBadgeBooleans isSideSauce={recipe.isSideSauce} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                        {(recipe.isSnack === true && (
                          <ClickableBadgeBooleans isSnack={recipe.isSnack} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                        ))}
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '50px'}}>{recipe.netVotes}</td>
                      <td className="align-middle" style={{textAlign: 'center', width: '80px'}}>
                        {recipe.steps.length} Steps
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '120px'}}>
                        {recipe.ingredients.length} Ingredients
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '50px', padding: '0px'}}>
                        {(chefInfo && recipe.chef === chefInfo._id) && (
                          <LinkContainer to={`/myrecipes/${recipe._id}/edit`} style={{paddingLeft: '5px', paddingRight: '5px'}}>
                            <Button variant='light' className='btn-sm' style={{width: '30px', height: '30px'}}>
                              <IoMdCreate style={{width: '20px', height: '20px'}}/>
                            </Button>
                          </LinkContainer>
                        )}
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '50px', padding: '0px', paddingRight: '20px'}}>
                        {(chefInfo && cookbook.chef === chefInfo._id) && (
                          <Form 
                            onSubmit={removeRecipeFromCookbookHandler}
                            style={{paddingLeft: '5px', paddingRight: '5px'}}
                          >
                            <Button
                              variant='light'
                              type='submit'
                              className='btn-sm'
                              style={{width: '30px', height: '30px'}}
                              onClick={(e) => setRemoveFromCookbook('')}
                            >
                              <MdDelete style={{width: '20px', height: '20px'}}/>
                            </Button>
                          </Form>
                        )}
                      </td>
                    </tr>
                  ))
                )
              }
              </tbody>
            </Table>
            </div>
            ) : (
            <div>
              {editCookbookDetails === false ? (
                <div style={{marginLeft: '10px'}}>
                  <Form>
                    <Form.Label>
                      <h3 style={{textAlign: 'center'}}>
                        {cookbook.cookbook_name}
                      </h3>
                    </Form.Label>
                    <p>{cookbook.description}</p>
                    <Form.Check
                      className="align-middle"
                      inline
                      style={{paddingBottom: '10px'}}
                      type="switch"
                      id="custom-switch"
                      label="Edit"
                      onChange={(e) => setEditCookbookDetails(true)}
                    />
                  </Form>
                </div>
              ) : (
                <div style={{width: '100%'}}>
                  <Form inline onSubmit={submitHandler}>
                    <h3>
                      <Form.Control
                        style={{width: '95vw'}}
                        inline
                        type='text'
                        placeholder={cookbook.cookbook_name}
                        value={cookbook_name}
                        maxLength={40}
                        minLength={5}
                        onChange={(e) => setCookbookName(e.target.value)}
                      >
                      </Form.Control>
                    </h3>
                    <p>
                      <Form.Control
                        style={{width: '95vw'}}
                        inline
                        as='textarea'
                        rows={3}
                        placeholder={cookbook.description}
                        value={description}
                        maxLength={300}
                        minLength={0}
                        onChange={(e) => setDescription(e.target.value)}
                      >
                      </Form.Control>
                    </p>
                    <div style={{width: '95vw'}}>
                        <Form.Check
                          className="align-middle"
                          inline
                          style={{paddingBottom: '10px', marginLeft: '20px'}}
                          label="Share?"
                          type="switch"
                          id="custom-switch"
                          checked={isPrivate}
                          onChange={(e) => setIsPrivate(e.target.checked)}
                        />
                        <Button
                          type='submit'
                          variant='primary'
                          style={{marginBottom: '10px', width: '50vw', height: '25px', padding: '0px 6px 6px 6px'}}
                          onChange={(e) => setEditCookbookDetails(false)}
                        >
                          Save Changes
                        </Button>
                    </div>             
                  </Form>
                </div>
              )}
              
              <Table hover responsive borderless className='table-sm'>
                <thead style={{borderBottom: 'solid 1px #dedede'}}>
                  <tr style={{paddingTop: '2px', paddingBottom: '2px'}}>
                    <th style={{paddingRight: '0px'}}><GiBookmark style={{width: '20px', height: '20px'}}/></th>
                    <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'left', paddingRight: '0px'}}></th>
                  </tr>
                </thead>
                <tbody>
                  {(myCookbookRecipes === undefined || myCookbookRecipes.length == 0) ? (
                    <div></div>
                  ) : (
                    myCookbookRecipes.map(recipe => (
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
                            {chefNames.find( ({ _id }) => _id === recipe.chef ).username > 15 ? (
                              <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                                {chefNames.find( ({ _id }) => _id === recipe.chef ).username.slice(0, 15) + (chefNames.find( ({ _id }) => _id === recipe.chef ).username > 15 ? "..." : "")}
                              </div>
                            ) : (
                              <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                                {chefNames.find( ({ _id }) => _id === recipe.chef ).username}
                              </div>
                            )}
                          </td>
                        </Link>
                      </tr>
                    ))
                  )
                }
                </tbody>
              </Table>
            </div>
            )}
          </Row>
      </div>
  )
}

export default CookbookDetailsPage;
