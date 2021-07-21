import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Tabs, Tab, Table, Image, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer/FormContainer.component';
import Message from '../../components/Message/Message.component';
import { listRecipeDetails, updateRecipe, deleteRecipe } from '../../actions/recipeActions';
import { RECIPE_UPDATE_RESET, RECIPE_DETAILS_RESET } from '../../constants/recipeConstants';

import './ChefRecipeEditPage.styles.css';
import Countries from '../../lists/countries';
import Measurements from '../../lists/measurements';

import { FaPlus, FaTrash } from 'react-icons/fa';
import { BiInfoCircle } from 'react-icons/bi'

import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';

const ChefRecipeEditPage = ({ match, history }) => {
  const recipeId = match.params.id

  const [recipe_name, setRecipeName] = useState('')
  const [country, setCountry] = useState('')
  const [cook_time, setCookTime] = useState(30)
  const [serving_size, setServingSize] = useState(4)
  const [steps, setSteps] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [isVegan, setIsVegan] = useState(false)
  const [isVegetarian, setIsVegetarian] = useState(false)
  const [isGlutenFree, setIsGlutenFree] = useState(false)
  const [isKetogenic, setIsKetogenic] = useState(false)
  const [isPescatarian, setIsPescatarian] = useState(false)
  const [isDairy, setIsDairy] = useState(false)
  const [isEgg, setIsEgg] = useState(false)
  const [isNuts, setIsNuts] = useState(false)
  const [isShellfish, setIsShellfish] = useState(false)
  const [isSoy, setIsSoy] = useState(false)
  const [isWheat, setIsWheat] = useState(false)
  const [isBreakfastBrunch, setIsBreakfastBrunch] = useState(false)
  const [isMainDish, setIsMainDish] = useState(false)
  const [isSideSauce, setIsSideSauce] = useState(false)
  const [isDessert, setIsDessert] = useState(false)
  const [isSnack, setIsSnack] = useState(false)
  const [isAppetizer, setIsAppetizer] = useState(false)
  const [isDrink, setIsDrink] = useState(false)
  const [notes, setNotes] = useState('')
  const [recipe_cover_image, setRecipeCoverImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [isPublished, setIsPublished] = useState(false)

  const [warningMessage, setWarningMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [cookTimeMessage, setCookTimeMessage] = useState('')
  const [servingSizeMessage, setServingSizeMessage] = useState('')
  const [ingredientsMessage, setIngredientsMessage] = useState('')

  const [saveBeforeUploadImage, setSaveBeforeUploadImage] = useState(false)

  const dispatch = useDispatch()

  const recipeDetails = useSelector(state => state.recipeDetails)
  const { loading, recipe } = recipeDetails

  const recipeUpdate = useSelector(state => state.recipeUpdate)
  const {
    success: successUpdate
  } = recipeUpdate

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 2000)
  }

  useEffect(() => {
    //if (recipe.chef !== chefInfo._id) {
    //  history.push('/myrecipes')
    //}
    if(successUpdate) {
      dispatch({ type: RECIPE_UPDATE_RESET })
      dispatch({ type: RECIPE_DETAILS_RESET })
    } else {
      if(!recipe.recipe_name || recipe._id !== recipeId) {
        dispatch(listRecipeDetails(recipeId))
      } else {
        setRecipeName(recipe.recipe_name)
        setCountry(recipe.country)
        setCookTime(recipe.cook_time)
        setServingSize(recipe.serving_size)
        setSteps(recipe.steps)
        setIngredients(recipe.ingredients)
        setIsVegan(recipe.isVegan)
        setIsVegetarian(recipe.isVegetarian)
        setIsGlutenFree(recipe.isGlutenFree)
        setIsKetogenic(recipe.isKetogenic)
        setIsPescatarian(recipe.isPescatarian)
        setIsDairy(recipe.isDairy)
        setIsEgg(recipe.isEgg)
        setIsNuts(recipe.isNuts)
        setIsShellfish(recipe.isShellfish)
        setIsSoy(recipe.isSoy)
        setIsWheat(recipe.isWheat)
        setIsBreakfastBrunch(recipe.isBreakfastBrunch)
        setIsMainDish(recipe.isMainDish)
        setIsSideSauce(recipe.isSideSauce)
        setIsDessert(recipe.isDessert)
        setIsSnack(recipe.isSnack)
        setIsAppetizer(recipe.isAppetizer)
        setIsDrink(recipe.isDrink)
        setNotes(recipe.notes)
        setRecipeCoverImage(recipe.recipe_cover_image)
        setIsPublished(recipe.isPublished)
      }
    }
  }, [dispatch, history, recipeId, recipe, successUpdate])

  const uploadFileHandler = async(e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('recipe_cover_image', file)
    setUploading(true)
    setRecipeCoverImage('')

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.put(`/api/uploadAWS/${match.params.id}`, formData, config)

      setRecipeCoverImage(data)
      console.log(data)
      setSuccessMessage('Recipe cover photo successfully uploaded!')
      setTimeout(function() {
        setSuccessMessage('')
      }, 3000)
      setUploading(false)
      dispatch(listRecipeDetails(recipeId))
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setSuccessMessage('Recipe has successfully updated!')
    setTimeout(function() {
      setSuccessMessage('')
    }, 3000)
    dispatch(
      updateRecipe({
        _id: recipeId,
        recipe_name,
        country,
        cook_time,
        serving_size,
        steps,
        ingredients,
        isVegan,
        isVegetarian,
        isGlutenFree,
        isKetogenic,
        isPescatarian,
        isDairy,
        isEgg,
        isNuts,
        isShellfish,
        isSoy,
        isWheat,
        isBreakfastBrunch,
        isMainDish,
        isSideSauce,
        isDessert,
        isSnack,
        isAppetizer,
        isDrink,
        notes,
        recipe_cover_image,
        isPublished
      })
    )
  }

  const [key, setKey] = useState('recipeDetails')

  const addStep = (e) => {
    if (e.which === 13) {
      e.preventDefault()
      setSteps([...steps, e.target.value])
      document.getElementById('newStep').value = ''
    }
  }

  const addIngredient = (e) => {
    if (e.which === 13) {
      e.preventDefault()
      setIngredients([...ingredients, ['', '', e.target.value, '']])
      document.getElementById('newIngredient').value = ''
    }
  }

  const addStepBetween = (e) => {
    e.preventDefault()
    let currentArrayItem = e.currentTarget.value
    console.log(currentArrayItem)
    let indexPosition = steps.indexOf(currentArrayItem)
    console.log(indexPosition)
    if (indexPosition === undefined || indexPosition === -1) {
      setWarningMessage('Oops, looks like our server is still loading. Try again or wait a few seconds, we just want to make sure the recipe is designed exactly how you want it.')
      setTimeout(function() {
        setWarningMessage('')
      }, 3000)
    } else {
      let newSteps = steps.splice(indexPosition, 0, 'Step placeholder')
      setSteps([...steps])
    }

  }

  const addIngredientBetween = (e) => {
    e.preventDefault()
    let currentArrayItem = e.currentTarget.value
    if (currentArrayItem !== undefined) {
      let newIngredients = ingredients.splice(currentArrayItem, 0, ['', '', '', ''])
      setIngredients([...ingredients])
    } else {
      setWarningMessage('Oops, looks like our server is still loading. Try again or wait a few seconds, we just want to make sure the recipe is designed exactly how you want it.')
      setTimeout(function() {
        setWarningMessage('')
      }, 3000)
    }

  }

  const removeStepHandler = (e) => {
    e.preventDefault()
    let arrayItem = e.currentTarget.value
    console.log(arrayItem)
    let indexPosition = steps.indexOf(arrayItem)
    console.log(indexPosition)
    if (indexPosition === -1 || indexPosition === undefined) {
      setWarningMessage('Trouble deleting a step? Try again (or wait a few seconds), our server just needs to update!')
      setTimeout(function() {
        setWarningMessage('')
      }, 3000)
      arrayItem = e.currentTarget.value
      indexPosition = steps.indexOf(arrayItem)
    } else {
      let newSteps = steps.splice(indexPosition, 1)
      setSteps([...steps])
    }
  }

  const removeIngredientHandler = (e) => {
    e.preventDefault()
    let arrayItem = e.currentTarget.value
    if (arrayItem === -1 || arrayItem === undefined) {
      setWarningMessage('Trouble deleting an ingredient? Try again (or wait a few seconds), our server just needs to update!')
      setTimeout(function() {
        setWarningMessage('')
      }, 3000)
      arrayItem = e.currentTarget.value
    } else {
      let newIngredients = ingredients.splice(arrayItem, 1)
      setIngredients([...ingredients])
    }
  }

  const isVeganHandler = (e) => {
    if (isVegan === false) {
      setIsVegan(e.target.checked)
      setIsVegetarian(e.target.checked)
      setIsPescatarian(e.target.checked)
    } else {
      setIsVegan(e.target.checked)
    }
  }

  const isVegetarianHandler = (e) => {
    if (isVegetarian === false) {
      setIsVegetarian(e.target.checked)
      setIsPescatarian(e.target.checked)
    } else {
      setIsVegetarian(e.target.checked)
    }
  }

  // Function disables all key presses

  //function handleKeypress (e) {
  //  const characterCode = e.key
  //  if (characterCode) {
  //    e.preventDefault()
  //    setCookTimeMessage('Use the increment and decrement arrows to modify the serve size.')
  //    setTimeout(function() {
  //      setCookTimeMessage('')
  //    }, 3000)
  //  }
  //}

  // '^' - matches any character that starts with
  // '\d' - matches a single character that is a digit
  // '*' - followed by zero or more

  function handleKeypressCookTime (e) {
    const characterCode = e.keyCode
    if ((characterCode > 31 && (characterCode < 48 || characterCode > 57) && !(characterCode === 46 || characterCode === 8)) || e.target.value > 999) {
      e.preventDefault()
      setCookTimeMessage('Cooking times must be between 1 and 999 minutes.')
      setTimeout(function() {
        setCookTimeMessage('')
      }, 3000)
    }
  }

  function handleKeypressServingSize (e) {
    const characterCode = e.keyCode
    if ((characterCode > 31 && (characterCode < 48 || characterCode > 57) && !(characterCode === 46 || characterCode === 8)) || e.target.value > 20) {
      e.preventDefault()
      setServingSizeMessage('Serving sizes must be between 1 and 20 servings.')
      setTimeout(function() {
        setServingSizeMessage('')
      }, 3000)
    }
  }

  // function handleKeypressIngredients (e) {
  //   const characterCode = e.keyCode
  //   if (characterCode > 31 && (characterCode < 48 || characterCode > 57) && !(characterCode === 46 || characterCode === 8)) {
  //     e.preventDefault()
  //     setIngredientsMessage('Sorry, the number you are trying to enter is invalid.')
  //     setTimeout(function() {
  //       setIngredientsMessage('')
  //     }, 3000)
  //   }
  // }

  const mealTypeRadioBB = (e) => {
    e.stopPropagation()
    if (isBreakfastBrunch === false) {
      setIsBreakfastBrunch(true)
      setIsMainDish(false)
      setIsSideSauce(false)
      setIsDessert(false)
      setIsSnack(false)
      setIsAppetizer(false)
      setIsDrink(false)
    }
  }

  const mealTypeRadioMD = (e) => {
    e.stopPropagation()
    if (isMainDish === false) {
       setIsMainDish(true)
      setIsBreakfastBrunch(false)
      setIsSideSauce(false)
      setIsDessert(false)
      setIsSnack(false)
      setIsAppetizer(false)
      setIsDrink(false)
    }
  }

  const mealTypeRadioSS = (e) => {
    e.stopPropagation()
    if (isSideSauce === false) {
      setIsSideSauce(true)
      setIsMainDish(false)
      setIsBreakfastBrunch(false)
      setIsDessert(false)
      setIsSnack(false)
      setIsAppetizer(false)
      setIsDrink(false)
    }
  }

  const mealTypeRadioDe = (e) => {
    e.stopPropagation()
    if (isDessert === false) {
      setIsDessert(true)
      setIsMainDish(false)
      setIsSideSauce(false)
      setIsBreakfastBrunch(false)
      setIsSnack(false)
      setIsAppetizer(false)
      setIsDrink(false)
    }
  }

  const mealTypeRadioS = (e) => {
    e.stopPropagation()
    if (isSnack === false) {
      setIsSnack(true)
      setIsMainDish(false)
      setIsSideSauce(false)
      setIsDessert(false)
      setIsBreakfastBrunch(false)
      setIsAppetizer(false)
      setIsDrink(false)
    }
  }

  const mealTypeRadioA = (e) => {
    e.stopPropagation()
    if (isAppetizer === false) {
      setIsAppetizer(true)
      setIsMainDish(false)
      setIsSideSauce(false)
      setIsDessert(false)
      setIsSnack(false)
      setIsBreakfastBrunch(false)
      setIsDrink(false)
    }
  }

  const mealTypeRadioDr = (e) => {
    e.stopPropagation()
    if (isDrink === false) {
      setIsDrink(true)
      setIsMainDish(false)
      setIsSideSauce(false)
      setIsDessert(false)
      setIsSnack(false)
      setIsAppetizer(false)
      setIsBreakfastBrunch(false)
    }
  }

  return (
    <div style={{paddingLeft: '200px', paddingRight: '30px'}} className="chefRecipeEditPageMobile">
      {initialLoader ?  (
        <PancakeLoader>Flipping to your recipe now...</PancakeLoader>
      ) : (
        <FormContainer>
          {warningMessage !== '' && (
            <Message variant='danger'>{warningMessage}</Message>
          )}
          {successMessage !== '' && (
            <Message variant='success'>{successMessage}</Message>
          )}
          <Row>
            <Col xs={12} style={{textAlign: 'center' }}>
              <h4 style={{marginBottom: '0px'}}>Edit Recipe: {recipe_name}</h4>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6} style={{paddingBottom: '10px', textAlign: 'left' }}>
              <Link to='/myrecipes' className='btn btn-dark' style={{ padding: '0px 5px 0px 5px' }}>
                Go Back
              </Link>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6} style={{paddingLeft: '0px', paddingBottom: '10px', textAlign: 'right' }}>
              <Form.Group controlId='publish' className='dietsAndAllerginsGroup'>
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Click here when you are ready to share your recipe with the world! Remember to hit save at the bottom of the page!
                    </Tooltip>
                  }
                >
                  <Form.Check
                    inline
                    label='Publish Recipe'
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                  />
                </OverlayTrigger>

              </Form.Group>
            </Col>
          </Row>
          <Form onSubmit={submitHandler}>
            <Tabs fill id="profileEditPageTabs" activeKey={key} onSelect={(k) => setKey(k)}>
              <Tab eventKey='recipeDetails' title="Recipe Overview">
                <Form.Group controlId='recipeName'>
                  <Form.Label>Recipe Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter recipe name'
                    value={recipe_name}
                    maxLength={40}
                    onChange={(e) => setRecipeName(e.target.value)}
                  >
                  </Form.Control>
                  <Form.Text>
                    {recipe_name.length > 25 && (
                      <Message variant='warning'>We only display the first 25 characters of a recipe name in the search results. However, chefs will be able to see the full recipe name when they hover over the recipe name. Currently, your recipe will display as "{recipe_name.slice(0, 25) + (recipe_name.length > 25 ? "..." : "")}"</Message>
                    )}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId='country'>
                  <Form.Label>Country of Origin</Form.Label>
                  <Form.Control
                    as='select'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {Countries.map((country) =>
                      <option key={country[0]}>
                        {country[1]}
                      </option>
                    )}
                  </Form.Control>
                  <Form.Text className='muted'>Help users find your recipe. Not certain? Leave blank.</Form.Text>
                </Form.Group>
                <Form.Group controlId='cookTime'>
                  <Form.Label>Cook Time (Minutes)</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder={60}
                    value={cook_time}
                    onChange={(e) => setCookTime(e.target.value)}
                    onKeyUp={handleKeypressCookTime}
                    min={1}
                    max={999}
                  >
                  </Form.Control>
                  <Form.Text style={{paddingTop: '5px'}}>
                    {cookTimeMessage !== '' && (
                      <Message variant='warning'>{cookTimeMessage}</Message>
                    )}
                  </Form.Text>
                  <Form.Text className='muted'>Enter between 1 and 999 minutes, we will take care of the rest.</Form.Text>
                </Form.Group>
                <Form.Group controlId='servingSize'>
                  <Form.Label>Serving Size</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='How many servings does your recipe have?'
                    value={serving_size}
                    onChange={(e) => setServingSize(e.target.value)}
                    onKeyUp={handleKeypressServingSize}
                    min={1}
                    max={20}
                  >
                  </Form.Control>
                  <Form.Text style={{paddingTop: '5px'}}>
                    {servingSizeMessage !== '' && (
                      <Message variant='warning'>{servingSizeMessage}</Message>
                    )}
                  </Form.Text>
                  <Form.Text className='muted'>Enter between 1 and 20 servings as chefs will be able to adjust as needed. All recipes will be presented as having 4 servings.</Form.Text>
                </Form.Group>
              </Tab>
              <Tab eventKey='recipeIngredients' title="Recipe Ingredients">
                <Form.Group controlId='recipeIngredients'>
                  <Message variant='warning'>
                    <Form.Text className='muted'>Quantity: Enter ingredient quantities up to 1000 as a decimal or whole number. Just leave blank if there is not a defined quantity. Hover over the info icon next to 'Quantity' for help!</Form.Text>
                    <Form.Text className='muted'>Measurement: Leave blank if the ingredient does not need a unit of measurement (e.g. 1 White Onion).</Form.Text>
                    <Form.Text className='muted'>Ingredient: Only enter the ingredient name (e.g. White Onion, Tumeric, etc.).</Form.Text>
                    <Form.Text className='muted'>Specific Notes (Optional): Leave blank if none. Preparation notes will be put in parentheses for you (e.g. enter diced, ground, optional, use for pasta sauce, etc.).</Form.Text>
                  </Message>
                  <Table className='ingredientTable'>
                    <thead style={{textAlign:'center' }} className='ingredientTableHeaders'>
                      <th style={{padding: '12px 0px 12px 0px', border: 'none'}}></th>
                      <th
                        style={{padding: '12px 12px 12px 12px', border: 'none'}}
                      >
                        Quantity
                        <OverlayTrigger
                          placement='bottom'
                          overlay={
                            <Tooltip id={'tooltip-bottom'}>
                              <thead>
                                <th style={{paddingRight: '5px'}}>Fraction</th>
                                <th>Decimal</th>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>1/16</td>
                                  <td>0.0625</td>
                                </tr>
                                <tr>
                                  <td>1/8</td>
                                  <td>0.125</td>
                                </tr>
                                <tr>
                                  <td>3/16</td>
                                  <td>0.1875</td>
                                </tr>
                                <tr>
                                  <td>1/4</td>
                                  <td>0.25</td>
                                </tr>
                                <tr>
                                  <td>5/16</td>
                                  <td>0.3125</td>
                                </tr>
                                <tr>
                                  <td>3/8</td>
                                  <td>0.375</td>
                                </tr>
                                <tr>
                                  <td>7/16</td>
                                  <td>0.4375</td>
                                </tr>
                                <tr>
                                  <td>1/2</td>
                                  <td>0.5</td>
                                </tr>
                                <tr>
                                  <td>9/16</td>
                                  <td>0.5625</td>
                                </tr>
                                <tr>
                                  <td>5/8</td>
                                  <td>0.625</td>
                                </tr>
                                <tr>
                                  <td>11/16</td>
                                  <td>0.6875</td>
                                </tr>
                                <tr>
                                  <td>3/4</td>
                                  <td>0.75</td>
                                </tr>
                                <tr>
                                  <td>13/16</td>
                                  <td>0.8125</td>
                                </tr>
                                <tr>
                                  <td>7/8</td>
                                  <td>0.875</td>
                                </tr>
                                <tr>
                                  <td>15/16</td>
                                  <td>0.9375</td>
                                </tr>
                              </tbody>
                            </Tooltip>
                          }
                        >
                          <span><BiInfoCircle /></span>
                        </OverlayTrigger>
                      </th>
                      <th style={{padding: '12px 12px 12px 12px', border: 'none'}}>Measurement</th>
                      <th style={{padding: '12px 12px 12px 12px', border: 'none'}}>Ingredient</th>
                      <th style={{padding: '12px 12px 12px 12px', border: 'none'}}>Specific Notes (Optional)</th>
                    </thead>
                    {ingredients.map((ingredient, index) => (
                      <tbody style={{border: 'none'}}>
                        <td style={{padding: '0px 0px 5px 0px', border: 'none', verticalAlign: 'middle', width: '25px'}}>
                          <OverlayTrigger
                            placement='bottom'
                            overlay={
                              <Tooltip id={'tooltip-bottom'}>
                                Add a new ingredient above this ingredient
                              </Tooltip>
                            }
                          >
                            <Button
                              style={{backgroundColor: 'white', color: 'black' }}
                              className='deleteIndividualIngredient btn-sm'
                              value={index}
                              onClick={addIngredientBetween}
                            >
                              <FaPlus />
                            </Button>
                          </OverlayTrigger>
                        </td>
                        <td style={{padding: '0px 0px 5px 0px', border: 'none'}} className="ingredientTableSectionAmount">
                          <Form.Group style={{marginBottom: '0px'}} controlId='ingredientsQuantity' className='ingredientsFormGroupAmount'>
                            <Form.Control
                              type='number'
                              step='any'
                              min={0}
                              max={1000}
                              value={ingredient[0]}
                              onChange={(e) => {
                                ingredients[index][0] = e.target.value;
                                setIngredients([...ingredients])
                              }}>
                            </Form.Control>
                          </Form.Group>
                        </td>
                        <td style={{padding: '0px 0px 5px 5px', border: 'none'}} className="ingredientTableSectionMeasurement">
                          <Form.Group style={{marginBottom: '0px'}} controlId='ingredients' className='ingredientsFormGroupMeasurement'>
                            <Form.Control
                              as='select'
                              value={ingredient[1]}
                              onChange={(e) => {
                                ingredients[index][1] = e.target.value;
                                setIngredients([...ingredients])
                              }}>
                              {Measurements.map((measurement) =>
                                <option key={measurement[0]}>
                                  {measurement[1]}
                                </option>
                              )}
                            </Form.Control>
                          </Form.Group>
                        </td>
                        <td style={{padding: '0px 0px 5px 5px', border: 'none'}} className="ingredientTableSectionIngredient">
                          <Form.Group style={{marginBottom: '0px'}} controlId='ingredients' className='ingredientsFormGroupIngredient'>
                            <Form.Control
                              key='index'
                              type='text'
                              placeholder='Enter ingredient here'
                              required
                              value={ingredient[2]}
                              onChange={(e) => {
                                ingredients[index][2] = e.target.value;
                                setIngredients([...ingredients])
                              }}
                            >
                            </Form.Control>
                          </Form.Group>
                        </td>
                        <td style={{padding: '0px 0px 5px 5px', border: 'none'}} className="ingredientTableSectionIngredient">
                          <Form.Group style={{marginBottom: '0px'}} controlId='ingredients' className='ingredientsFormGroupIngredient'>
                            <Form.Control
                              key='index'
                              type='text'
                              value={ingredient[3]}
                              onChange={(e) => {
                                ingredients[index][3] = e.target.value;
                                setIngredients([...ingredients])
                              }}
                            >
                            </Form.Control>
                          </Form.Group>
                        </td>
                        <td style={{padding: '0px 0px 5px 0px', border: 'none', verticalAlign: 'middle', width: '25px'}}>
                          <Button
                            style={{backgroundColor: 'white', color: 'black' }}
                            className='deleteIndividualIngredient btn-sm'
                            value={index}
                            onClick={removeIngredientHandler}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tbody>
                    ))}
                  </Table>
                <Form.Label>Add a new ingredient to bottom of list</Form.Label>
                <Form.Text className='muted'>Note: You will set the quantity and measurement next.</Form.Text>
                <Table className='newIngredientTable' style={{paddingBottom: '0px'}}>
                  <td className='ingredientsTableSectionIngredient' style={{paddingBottom: '0px'}}>
                    <Form.Group controlId='newIngredient'>
                      <Form.Control
                        key='index'
                        type='text'
                        placeholder='Enter new ingredient'
                        onKeyPress={addIngredient}
                      >
                      </Form.Control>
                    </Form.Group>
                  </td>
                  <td></td>
                </Table>
                <Form.Text className='muted'>Note: Hit enter to add the new ingredient and save using the button below.</Form.Text>
                </Form.Group>
              </Tab>
              <Tab eventKey='recipeSteps' title="Recipe Steps">
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center' }}>
                    <Form.Label>Recipe Steps</Form.Label>
                    <Message variant='warning'>
                      <Form.Text className='muted'>Remember to leave any ingredients and quantities out of this section so users can accurately change the serving sizes when they view your recipe.</Form.Text>
                    </Message>
                  </Col>
                  <Col>
                    <Form.Group controlId='recipeSteps'>
                      <ol className="stepListOrder">
                        {steps.map((step, index) => (
                          <Table style={{border: 'none', margin: '0px 0px 5px 0px'}}>
                            <td style={{padding: '12.5px 0px 5px 0px', border: 'none', width: '25px'}}>
                              <li className="stepList"></li>
                            </td>
                            <td style={{padding: '0px 0px 0px 5px', border: 'none'}} className="stepTableSection">
                              <Form.Group style={{margin: '0px 0px 0px 0px'}} controlId='steps' className='stepsFormGroup'>
                                <Form.Control
                                  key='index'
                                  type='text'
                                  placeholder=''
                                  value={step}
                                  onChange={(e) => {
                                    steps[index] = e.target.value;
                                    setSteps([...steps])
                                  }}
                                >
                                </Form.Control>
                              </Form.Group>
                            </td>
                            <td style={{padding: '0px 0px 5px 0px', border: 'none', verticalAlign: 'middle', width: '25px'}}>
                              <OverlayTrigger
                                placement='bottom'
                                overlay={
                                  <Tooltip id={'tooltip-bottom'}>
                                    Add a new step above this step
                                  </Tooltip>
                                }
                              >
                                <Button
                                  style={{backgroundColor: 'white', color: 'black', padding: '0px 5px 0px 5px' }}
                                  className='deleteIndividualStep btn-sm'
                                  value={step}
                                  onClick={addStepBetween}
                                >
                                  <FaPlus />
                                </Button>
                              </OverlayTrigger>
                            </td>
                            <td style={{padding: '0px 0px 5px 0px', border: 'none', verticalAlign: 'middle', width: '25px'}}>
                              <Button
                                style={{backgroundColor: 'white', color: 'black', padding: '0px 5px 0px 5px' }}
                                className='deleteIndividualStep btn-sm'
                                value={step}
                                onClick={removeStepHandler}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </Table>
                        ))}
                        <Form.Label>Add a new step to bottom of list</Form.Label>
                        <Form.Group controlId='newStep'>
                          <Form.Control
                            key='index'
                            type='text'
                            placeholder='Enter next recipe step'
                            onKeyPress={addStep}
                          >
                          </Form.Control>
                        </Form.Group>
                        <Form.Text className='muted'>Note: Hit enter to add the new step and the update button below to save.</Form.Text>
                      </ol>
                      <Form.Group style={{margin: '0px 0px 0px 0px', borderTop: '1px dotted'}}>
                        <Form.Label style={{paddingTop: '10px'}}>Any general notes about the recipe?</Form.Label>
                        <Form.Control
                          as='textarea'
                          rows='3'
                          maxLength='240'
                          placeholder='Enter recipe notes'
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          >
                        </Form.Control>
                      </Form.Group>
                    </Form.Group>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey='recipeDietsAndAllergins' title="Recipe Details">
                <Row>
                  <Col style={{textAlign: 'center'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Message variant='warning'>
                      <Form.Text className='muted'>This section is optional. Fill it out so your recipe can be loved even more. If you are not certain, take your best guess!</Form.Text>
                    </Message>
                    <Form.Label className='dietsLabel'>Diets</Form.Label>
                  </Col>
                  <Col style={{textAlign: 'center'}}>
                    <Form.Group controlId='isVegan' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Vegan'
                        checked={isVegan}
                        onChange={isVeganHandler}
                      />
                    </Form.Group>
                    <Form.Group controlId='isVegetarian' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Vegetarian'
                        checked={isVegetarian}
                        onChange={isVegetarianHandler}
                      />
                    </Form.Group>
                    <Form.Group controlId='isGlutenFree' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Gluten Free'
                        checked={isGlutenFree}
                        onChange={(e) => setIsGlutenFree(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isKetogenic' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Ketogenic'
                        checked={isKetogenic}
                        onChange={(e) => setIsKetogenic(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isPescatarian' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Pescatarian'
                        checked={isPescatarian}
                        onChange={(e) => setIsPescatarian(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                  <Col style={{textAlign: 'center', borderTop: '1px dotted'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Label className='allerginsLabel'>Allergins</Form.Label>
                  </Col>
                  <Col style={{textAlign: 'center'}}>
                    <Form.Group controlId='isDairy' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Contains Dairy'
                        checked={isDairy}
                        onChange={(e) => setIsDairy(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isEgg' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Contains Egg'
                        checked={isEgg}
                        onChange={(e) => setIsEgg(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isNuts' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Contains Nuts'
                        checked={isNuts}
                        onChange={(e) => setIsNuts(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isShellfish' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Contains Shellfish'
                        checked={isShellfish}
                        onChange={(e) => setIsShellfish(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isSoy' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Contains Soy'
                        checked={isSoy}
                        onChange={(e) => setIsSoy(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isWheat' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Contains Wheat'
                        checked={isWheat}
                        onChange={(e) => setIsWheat(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                  <Col style={{textAlign: 'center', borderTop: '1px dotted'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Label className='allerginsLabel'>Meal Courses & Types</Form.Label>
                  </Col>
                  <Col style={{textAlign: 'center'}}>
                    <Form.Group controlId='isBreakfastBrunch' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Breakfast or Brunch'
                        checked={isBreakfastBrunch}
                        type='radio'
                        name='mealTypeRadio'
                        onChange={mealTypeRadioBB}
                      />
                    </Form.Group>
                    <Form.Group controlId='isMainDish' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Main Dish'
                        checked={isMainDish}
                        type='radio'
                        name='mealTypeRadio'
                        onChange={mealTypeRadioMD}
                      />
                    </Form.Group>
                    <Form.Group controlId='isSideSauce' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Side or Sauce'
                        checked={isSideSauce}
                        type='radio'
                        name='mealTypeRadio'
                        onChange={mealTypeRadioSS}
                      />
                    </Form.Group>
                    <Form.Group controlId='isDessert' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Dessert'
                        checked={isDessert}
                        type='radio'
                        name='mealTypeRadio'
                        onChange={mealTypeRadioDe}
                      />
                    </Form.Group>
                    <Form.Group controlId='isSnack' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Snack'
                        checked={isSnack}
                        type='radio'
                        name='mealTypeRadio'
                        onChange={mealTypeRadioS}
                      />
                    </Form.Group>
                    <Form.Group controlId='isAppetizer' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Appetizer'
                        checked={isAppetizer}
                        type='radio'
                        name='mealTypeRadio'
                        onChange={mealTypeRadioA}
                      />
                    </Form.Group>
                    <Form.Group controlId='isDrink' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Drink'
                        checked={isDrink}
                        type='radio'
                        name='mealTypeRadio'
                        onChange={mealTypeRadioDr}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} style={{textAlign: 'center'}}>
                    <Form.Text className='muted'>Select the meal course or type your recipe is most similar to. We understand that some recipes might be harder to pin down. If so, what do you use the recipe for?</Form.Text>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey='recipeImages' title="Recipe Images">
                {uploading === false ? (
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{textAlign: 'center' }}>
                      <Message variant='warning'>
                        <Form.Text className='muted'>A great picture is key to a great recipe. For the best results, upload a square 3024px x 3024px photo. Never use a photo that is not yours.</Form.Text>
                      </Message>
                    </Col>
                    <Col style={{textAlign: 'center'}}>
                      <Form.Group controlId='coverImage' className='imagesGroup'>
                        <FormContainer>
                          <Image
                            style={{width: '50%', textAlign: 'left', minWidth: '200px'}}
                            className="recipeCoverImage"
                            src={recipe_cover_image}
                            key={Date.now()}
                            rounded
                          />
                        </FormContainer>
                        <Form.File
                          style={{width: '50%', textAlign: 'left', minWidth: '330px'}}
                          id='cover-image-file'
                          name='recipe_cover_image'
                          label='Choose Cover Image'
                          custom
                          disabled={!saveBeforeUploadImage}
                          onChange={uploadFileHandler}
                        ></Form.File>
                      </Form.Group>
                      <Form.Group controlId='saveBeforeUploadImage' className='dietsAndAllerginsGroup'>
                        <Form.Check
                          inline
                          label='I understand that uploading an image before saving my recipe will delete any unsaved content. The picture I am uploading is my own and authorized to be used by RecipeBook throughout its platform.'
                          checked={saveBeforeUploadImage}
                          onChange={(e) => setSaveBeforeUploadImage(e.target.checked)}
                        />
                      </Form.Group>
                      <Form.Text className='muted'>Your new image will automatically save once its uploaded.</Form.Text>
                    </Col>
                  </Row>
                ) : (
                  <PancakeLoader>Uploading recipe photo...</PancakeLoader>
                )}
              </Tab>
            </Tabs>
              {uploading === false ? (
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{textAlign: 'center', paddingTop: '20px'}}>
                  <Button type='submit' variant='primary'>
                    Save Recipe
                  </Button>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{paddingTop: '10px'}} >
                  {successMessage !== '' && (
                    <Message variant='success'>{successMessage}</Message>
                  )}
                </Col>
              </Row>
              ) : (
                <Row></Row>
              )}
          </Form>
        </FormContainer>
      )}
    </div>
  )
}

export default ChefRecipeEditPage;
