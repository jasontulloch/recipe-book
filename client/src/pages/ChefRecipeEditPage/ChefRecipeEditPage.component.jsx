import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Tabs, Tab, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer/FormContainer.component';
import Message from '../../components/Message/Message.component';
import { listRecipeDetails, updateRecipe, deleteRecipe } from '../../actions/recipeActions';
import { RECIPE_UPDATE_RESET } from '../../constants/recipeConstants';

import './ChefRecipeEditPage.styles.scss';
import Countries from '../../lists/countries';

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
  const [isDairy, setIsDairy] = useState(false)
  const [isEgg, setIsEgg] = useState(false)
  const [isNuts, setIsNuts] = useState(false)
  const [isShellfish, setIsShellfish] = useState(false)
  const [isSoy, setIsSoy] = useState(false)

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

  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: RECIPE_UPDATE_RESET })
      //history.push('/myrecipes')
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
        setIsDairy(recipe.isDairy)
        setIsEgg(recipe.isEgg)
        setIsNuts(recipe.isNuts)
        setIsShellfish(recipe.isShellfish)
        setIsSoy(recipe.isSoy)
      }
    }
  }, [dispatch, history, recipeId, recipe, successUpdate])

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
        isDairy,
        isEgg,
        isNuts,
        isShellfish,
        isSoy,
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
      setIngredients([...ingredients, e.target.value])
      document.getElementById('newIngredient').value = ''
    }
  }

  const addStepBetween = (e) => {
    e.preventDefault()
    let currentArrayItem = e.target.value
    let indexPosition = steps.indexOf(currentArrayItem)
    let newSteps = steps.splice(indexPosition, 0, 'Step placeholder')
    setSteps([...steps])
  }

  const addIngredientBetween = (e) => {
    e.preventDefault()
    let currentArrayItem = e.target.value
    let indexPosition = ingredients.indexOf(currentArrayItem)
    let newIngredients = ingredients.splice(indexPosition, 0, 'Ingredient placeholder')
    setIngredients([...ingredients])
  }

  const removeStepHandler = (e) => {
    e.preventDefault()
    let arrayItem = e.target.value
    let indexPosition = steps.indexOf(arrayItem)
    if (indexPosition === -1 || indexPosition === undefined) {
      setWarningMessage('Trouble deleting a step? Try again (or wait a few seconds), our server just needs to update!')
      setTimeout(function() {
        setWarningMessage('')
      }, 3000)
      arrayItem = e.target.value
      indexPosition = steps.indexOf(arrayItem)
    } else {
      let newSteps = steps.splice(indexPosition, 1)
      setSteps([...steps])
    }
  }

  const removeIngredientHandler = (e) => {
    e.preventDefault()
    let arrayItem = e.target.value
    let indexPosition = ingredients.indexOf(arrayItem)
    if (indexPosition === -1 || indexPosition === undefined) {
      setWarningMessage('Trouble deleting an ingredient? Try again (or wait a few seconds), our server just needs to update!')
      setTimeout(function() {
        setWarningMessage('')
      }, 3000)
      arrayItem = e.target.value
      indexPosition = ingredients.indexOf(arrayItem)
    } else {
      let newIngredients = ingredients.splice(indexPosition, 1)
      setIngredients([...ingredients])
    }
  }

  return (
    <div>
      <Link to='/myrecipes' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        {warningMessage !== '' && (
          <Message variant='danger'>{warningMessage}</Message>
        )}
        {successMessage !== '' && (
          <Message variant='success'>{successMessage}</Message>
        )}
        <h1>Edit Recipe: {recipe_name}</h1>
        <Form onSubmit={submitHandler}>
          <Tabs id="profileEditPageTabs" activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey='recipeDetails' title="Recipe Details">
              <Form.Group controlId='recipeName'>
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter recipe name'
                  value={recipe_name}
                  onChange={(e) => setRecipeName(e.target.value)}
                >
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='country'>
                <Form.Label>Country of Origin</Form.Label>
                <Form.Control as='select' onChange={(e) => setCountry(e.target.value)}>
                  {Countries.map((country) =>
                    <option key={country[0]} value={country[1]}>
                      {country[1]}
                    </option>
                  )}
                </Form.Control>
                <Form.Text className='muted'>Help users find your recipe. Not certain? Select n/a.</Form.Text>
              </Form.Group>
              <Form.Group controlId='cookTime'>
                <Form.Label>Cook Time</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter estimated cook time'
                  value={cook_time}
                  onChange={(e) => setCookTime(e.target.value)}
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
                >
                </Form.Control>
                <Form.Text className='muted'>Users will be able to adjust as needed.</Form.Text>
              </Form.Group>
            </Tab>
            <Tab eventKey='recipeSteps' title="Recipe Steps">
              <Form.Group controlId='recipeSteps'>
                <ol className="stepListOrder">
                  {steps.map((step, index) => (
                    <Table>
                      <li className="stepList">
                        <td className="stepTableSection">
                          <Form.Group controlId='steps' className='stepsFormGroup'>
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
                        <td>
                          <Button
                            variant='danger'
                            className='deleteIndividualStep btn-sm'
                            value={step}
                            onClick={removeStepHandler}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                          <Button
                            variant='warning'
                            className='deleteIndividualStep btn-sm'
                            value={step}
                            onClick={addStepBetween}
                          >
                            <i className='fas fa-plus'></i>
                          </Button>
                        </td>
                      </li>
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
              </Form.Group>
            </Tab>
            <Tab eventKey='recipeIngredients' title="Recipe Ingredients">
              <Form.Group controlId='recipeIngredients'>
                <ol className="ingredientListOrder">
                  {ingredients.map((ingredient, index) => (
                    <Table>
                      <li className="ingredientList">
                        <td className="ingredientTableSection">
                          <Form.Group controlId='ingredients' className='ingredientsFormGroup'>
                            <Form.Control
                              key='index'
                              type='text'
                              placeholder=''
                              value={ingredient}
                              onChange={(e) => {
                                ingredients[index] = e.target.value;
                                setIngredients([...ingredients])
                              }}
                            >
                            </Form.Control>
                          </Form.Group>
                        </td>
                        <td>
                          <Button
                            variant='danger'
                            className='deleteIndividualIngredient btn-sm'
                            value={ingredient}
                            onClick={removeIngredientHandler}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                          <Button
                            variant='warning'
                            className='deleteIndividualIngredient btn-sm'
                            value={ingredient}
                            onClick={addIngredientBetween}
                          >
                            <i className='fas fa-plus'></i>
                          </Button>
                        </td>
                      </li>
                    </Table>
                  ))}
                  <Form.Label>Add another ingredient</Form.Label>
                  <Form.Group controlId='newIngredient'>
                    <Form.Control
                      key='index'
                      type='text'
                      placeholder='Enter another ingredient'
                      onKeyPress={addIngredient}
                    >
                    </Form.Control>
                  </Form.Group>
                  <Form.Text className='muted'>Note: Hit enter to add the new ingredient and the update button below to save.</Form.Text>
                </ol>
              </Form.Group>
            </Tab>
            <Tab eventKey='recipeDietsAndAllergins' title="Recipe Diets & Allergins">
              <Form.Label className='dietsLabel'>Diets</Form.Label>
              <br />
              <Form.Group controlId='isVegan' className='dietsAndAllerginsGroup'>
                <Form.Check
                  inline
                  label='Vegan?'
                  checked={isVegan}
                  onChange={(e) => setIsVegan(e.target.checked)}
                />
              </Form.Group>
              <Form.Group controlId='isVegetarian' className='dietsAndAllerginsGroup'>
                <Form.Check
                  inline
                  label='Vegetarian?'
                  checked={isVegetarian}
                  onChange={(e) => setIsVegetarian(e.target.checked)}
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
              <br />
              <Form.Label className='allerginsLabel'>Allergins</Form.Label>
              <br />
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
            </Tab>
          </Tabs>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default ChefRecipeEditPage;
