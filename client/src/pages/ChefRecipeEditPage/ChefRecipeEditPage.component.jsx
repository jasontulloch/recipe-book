import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Tabs, Tab, Table, Image, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer/FormContainer.component';
import Message from '../../components/Message/Message.component';
import { listRecipeDetails, updateRecipe, deleteRecipe } from '../../actions/recipeActions';
import { RECIPE_UPDATE_RESET, RECIPE_DETAILS_RESET } from '../../constants/recipeConstants';

import './ChefRecipeEditPage.styles.scss';
import Countries from '../../lists/countries';
import Measurements from '../../lists/measurements';
import Quantities from '../../lists/quantities';

import { FaPlus, FaTrash } from 'react-icons/fa';

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

  const [warningMessage, setWarningMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const dispatch = useDispatch()

  const recipeDetails = useSelector(state => state.recipeDetails)
  const { loading, error, recipe } = recipeDetails

  const recipeUpdate = useSelector(state => state.recipeUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = recipeUpdate

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

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
        recipe_cover_image
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
      setIngredients([...ingredients, ['', '', e.target.value]])
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
      let newIngredients = ingredients.splice(currentArrayItem, 0, ['', '', ''])
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

  // Function disables any negatives and 0
  // Still need to update to stop manual entry above 20
  function handleKeypress (e) {
    const characterCode = e.key
    if (characterCode === 'Backspace') return

    const characterNumber = Number(characterCode)
    if (characterNumber >= 0 && characterNumber <= 9 ) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return
      } else if (characterNumber === 0) {
        e.preventDefault()
      }
    } else {
      e.preventDefault()
    }
  }

  const isVeganHandler = (e) => {
    if (isVegan == false) {
      setIsVegan(e.target.checked)
      setIsVegetarian(e.target.checked)
      setIsPescatarian(e.target.checked)
    } else {
      setIsVegan(e.target.checked)
    }
  }

  const isVegetarianHandler = (e) => {
    if (isVegetarian == false) {
      setIsVegetarian(e.target.checked)
      setIsPescatarian(e.target.checked)
    } else {
      setIsVegetarian(e.target.checked)
    }
  }

  return (
    <div>
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
            <Col xs={12} sm={12} md={2} lg={2} xl={2} style={{paddingLeft: '0px', paddingBottom: '10px', textAlign: 'center' }}>
              <Link to='/myrecipes' className='btn btn-dark' style={{ padding: '0px 5px 0px 5px' }}>
                Go Back
              </Link>
            </Col>
            <Col xs={12} sm={12} md={10} lg={10} xl={10}>
              <h4>Edit Recipe: {recipe_name}</h4>
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
                      <Message variant='warning'>We only display the first 25 characters of a recipe name in the search results... try simplifying the recipe name. If you can't, don't worry, your recipe will still be availabe. Currently, your recipe will read as "{recipe_name.slice(0, 25) + (recipe_name.length > 25 ? "..." : "")}"</Message>
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
                  <Form.Label>Cook Time</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter estimated cook time'
                    value={cook_time}
                    onChange={(e) => setCookTime(e.target.value)}
                    onKeyDown={handleKeypress}
                    min={1}
                  >
                  </Form.Control>
                  <Form.Text className='muted'>Enter in minutes, we will take care of the rest.</Form.Text>
                </Form.Group>
                <Form.Group controlId='servingSize'>
                  <Form.Label>Serving Size</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='How many servings does your recipe have?'
                    value={serving_size}
                    onChange={(e) => setServingSize(e.target.value)}
                    onKeyDown={handleKeypress}
                    min={1}
                    max={20}
                  >
                  </Form.Control>
                  <Form.Text className='muted'>Users will be able to adjust as needed. We present all recipes as 4 servings, which users can adjust.</Form.Text>
                </Form.Group>
              </Tab>
              <Tab eventKey='recipeSteps' title="Recipe Steps">
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center' }}>
                    <Form.Label>Recipe Steps</Form.Label>
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
                              <Button
                                style={{backgroundColor: 'white', color: 'black', padding: '0px 5px 0px 5px' }}
                                className='deleteIndividualStep btn-sm'
                                value={step}
                                onClick={addStepBetween}
                              >
                                <FaPlus />
                              </Button>
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
                        <Form.Label>Add a new step</Form.Label>
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
              <Tab eventKey='recipeIngredients' title="Recipe Ingredients">
                <Form.Group controlId='recipeIngredients'>
                  <Table className='ingredientTable'>
                    <thead style={{textAlign:'center' }} class='ingredientTableHeaders'>
                      <th style={{padding: '12px 0px 12px 0px', border: 'none'}}></th>
                      <th style={{padding: '12px 12px 12px 12px', border: 'none'}}>Quantity</th>
                      <th style={{padding: '12px 12px 12px 12px', border: 'none'}}>Measurement</th>
                      <th style={{padding: '12px 12px 12px 12px', border: 'none'}}>Ingredient</th>
                    </thead>
                    {ingredients.map((ingredient, index) => (
                      <tbody style={{border: 'none'}}>
                        <td style={{padding: '0px 0px 5px 0px', border: 'none', verticalAlign: 'middle', width: '25px'}}>
                          <Button
                            style={{backgroundColor: 'white', color: 'black' }}
                            className='deleteIndividualIngredient btn-sm'
                            value={index}
                            onClick={addIngredientBetween}
                          >
                            <FaPlus />
                          </Button>
                        </td>
                        <td style={{padding: '0px 0px 5px 0px', border: 'none'}} className="ingredientTableSectionAmount">
                          <Form.Group style={{marginBottom: '0px'}} controlId='ingredients' className='ingredientsFormGroupAmount'>
                            <Form.Control
                              type='number'
                              step='any'
                              min={0}
                              max={25}
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
                <Form.Label>Add another ingredient</Form.Label>
                <Form.Text className='muted'>Note: You will set the quantity and measurement next.</Form.Text>
                <Table className='newIngredientTable'>
                  <td className='ingredientsTableSectionIngredient'>
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
                <Form.Text className='muted'>Note: Hit enter to add the new ingredient and the update button below to save.</Form.Text>
                </Form.Group>
              </Tab>
              <Tab eventKey='recipeDietsAndAllergins' title="Recipe Details">
                <Row>
                  <Col style={{textAlign: 'center'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Label className='dietsLabel'>Diets</Form.Label>
                  </Col>
                  <Col style={{textAlign: 'center'}}>
                    <Form.Group controlId='isVegan' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Vegan?'
                        checked={isVegan}
                        onChange={isVeganHandler}
                      />
                    </Form.Group>
                    <Form.Group controlId='isVegetarian' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Vegetarian?'
                        checked={isVegetarian}
                        onChange={isVegetarianHandler}
                      />
                    </Form.Group>
                    <Form.Group controlId='isGlutenFree' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Gluten Free?'
                        checked={isGlutenFree}
                        onChange={(e) => setIsGlutenFree(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isKetogenic' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Ketogenic?'
                        checked={isKetogenic}
                        onChange={(e) => setIsKetogenic(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isPescatarian' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Pescatarian?'
                        checked={isPescatarian}
                        onChange={(e) => setIsPescatarian(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                  <Col style={{textAlign: 'center', borderTop: '1px dotted'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Label className='allerginsLabel'>Allergins</Form.Label>
                  </Col>
                  <Col>
                    <Form.Group controlId='isDairy' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Contains Dairy?'
                        checked={isDairy}
                        onChange={(e) => setIsDairy(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isEgg' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Contains Egg?'
                        checked={isEgg}
                        onChange={(e) => setIsEgg(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isNuts' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Contains Nuts?'
                        checked={isNuts}
                        onChange={(e) => setIsNuts(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isShellfish' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Contains Shellfish?'
                        checked={isShellfish}
                        onChange={(e) => setIsShellfish(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isSoy' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Contains Soy?'
                        checked={isSoy}
                        onChange={(e) => setIsSoy(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isWheat' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Contains Wheat?'
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
                        label='Breakfast or Brunch?'
                        checked={isBreakfastBrunch}
                        onChange={(e) => setIsBreakfastBrunch(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isMainDish' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Main Dish?'
                        checked={isMainDish}
                        onChange={(e) => setIsMainDish(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isSideSauce' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Side or Sauce?'
                        checked={isSideSauce}
                        onChange={(e) => setIsSideSauce(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isDessert' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Dessert?'
                        checked={isDessert}
                        onChange={(e) => setIsDessert(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isSnack' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Snack?'
                        checked={isSnack}
                        onChange={(e) => setIsSnack(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isAppetizer' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Appetizer?'
                        checked={isAppetizer}
                        onChange={(e) => setIsAppetizer(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Group controlId='isDrink' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='Drink?'
                        checked={isDrink}
                        onChange={(e) => setIsDrink(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey='recipeImages' title="Recipe Images">
                {uploading === false ? (
                  <Form.Group controlId='coverImage' className='imagesGroup'>
                    <Form.Label>Cover Image</Form.Label>
                      <FormContainer>
                        <Image
                          className="recipeCoverImage"
                          src={recipe_cover_image}
                          key={Date.now()}
                          rounded
                        />
                    </FormContainer>
                    <Form.File
                      id='cover-image-file'
                      name='recipe_cover_image'
                      label='Choose Cover Image'
                      custom
                      onChange={uploadFileHandler}
                    ></Form.File>
                  </Form.Group>
                ) : (
                  <PancakeLoader>Uploading recipe photo...</PancakeLoader>
                )}
              </Tab>
            </Tabs>
            <Row>
              {uploading === false ? (
                <Col style={{textAlign: 'center'}}>
                  <Button type='submit' variant='primary'>
                    Update
                  </Button>
                </Col>
              ) : (
                <Col></Col>
              )}
            </Row>
          </Form>
        </FormContainer>
      )}
    </div>
  )
}

export default ChefRecipeEditPage;
