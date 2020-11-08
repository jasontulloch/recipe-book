import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Tabs, Tab, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer/FormContainer.component';
import { listRecipeDetails, updateRecipe, deleteRecipe } from '../../actions/recipeActions';
import { RECIPE_UPDATE_RESET } from '../../constants/recipeConstants';

import './ChefRecipeEditPage.styles.scss';

const ChefRecipeEditPage = ({ match, history }) => {
  const recipeId = match.params.id

  const [recipe_name, setRecipeName] = useState('')
  const [country, setCountry] = useState('')
  const [cook_time, setCookTime] = useState(30)
  const [serving_size, setServingSize] = useState(4)
  const [steps, setSteps] = useState([])

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
      }
    }
  }, [dispatch, history, recipeId, recipe, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateRecipe({
        _id: recipeId,
        recipe_name,
        country,
        cook_time,
        serving_size,
        steps
      })
    )
  }

  const [key, setKey] = useState('recipeDetails')
  const newStepInput = document

  const addStep = (e) => {
    if (e.which === 13) {
      e.preventDefault()
      setSteps([...steps, e.target.value])
      document.getElementById('newStep').value = ''
    }
  }

  //
  const removeStepHandler = (e) => {
    let arrayItem = e.target.value
    let indexPosition = steps.indexOf(arrayItem)
    let newSteps = steps.splice(indexPosition, 1)
    setSteps([...steps])
  }

  return (
    <div>
      <Link to='/myrecipes' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
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
                <Form.Control
                  type='text'
                  placeholder='Select country of origin or n/a'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                </Form.Control>
                <Form.Text className='muted'>Help users find your recipe. Not certain? Select n/a.</Form.Text>
              </Form.Group>
              <Form.Group controlId='cookTime'>
                <Form.Label>Cook Time</Form.Label>
                <Form.Control
                  type='text'
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
                  type='text'
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
                            Delete
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
                  <Form.Text className='muted'>Note: Hit enter to add the new step and update to save.</Form.Text>
                </ol>
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
