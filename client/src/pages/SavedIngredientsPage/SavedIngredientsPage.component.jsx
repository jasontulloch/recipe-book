import React, { useState, useEffect, setState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { getChefDetails, updateChefProfile } from '../../actions/chefActions';
import { emailGroceryList } from '../../actions/groceryListActions';
import { CHEF_UPDATE_PROFILE_RESET } from '../../constants/chefConstants';

import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import Message from '../../components/Message/Message.component';

import axios from 'axios';

const SavedIngredientsPage = ({ history }) => {

  // These are required in the model so need to pass the current values in or profile would return '' otherwise
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
  const [isMetric, setIsMetric] = useState(false)
  const [useTeaspoons, setUseTeaspoons] = useState(false)
  const [useTablespoons, setUseTablespoons] = useState(false)
  const [useFluidOunces, setUseFluidOunces] = useState(false)
  const [useCups, setUseCups] = useState(false)
  const [usePints, setUsePints] = useState(false)
  const [useQuarts, setUseQuarts] = useState(false)
  const [useGallons, setUseGallons] = useState(false)
  const [useOunces, setUseOunces] = useState(false)
  const [usePounds, setUsePounds] = useState(false)
  const [useInches, setUseInches] = useState(false)
  const [useMillilitres, setUseMillilitres] = useState(false)
  const [useLitres, setUseLitres] = useState(false)
  const [useGrams, setUseGrams] = useState(false)
  const [useKilograms, setUseKilograms] = useState(false)
  const [useCentimetres, setUseCentimetres] = useState(false)
  const [useMillimetres, setUseMillimetres] = useState(false)
  const [bio, setBio] = useState('')

  const [warningMessage, setWarningMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [ingredientIndex, setIngredientIndex] = useState('')
  const [savedIngredients, setSavedIngredients] = useState([])

  const [firstPageLoad, setFirstPageLoad] = useState(true)
  const [displayIngredientOnly, setDisplayIngredientOnly] = useState(true)

  const dispatch = useDispatch()

  const chefDetails = useSelector(state => state.chefDetails)
  const { loading, error, chef } = chefDetails

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const chefUpdateProfile = useSelector(state => state.chefUpdateProfile)
  const {
    success,
    chefInfo: chefInfoUpdate
  } = chefUpdateProfile

  //const chefDeleteGroceryListIngredient = useSelector(state => state.chefDeleteGroceryListIngredient)
  //const {
  //  loading: loadingDeleteGroceryListIngredient,
  //  error: errorDeleteGroceryListIngredient,
  //  success: successDeleteGroceryListIngredient
  //} = chefDeleteGroceryListIngredient

  //const ingredientsList = chefInfo.savedIngredients
  //const innerList = [... new Set(ingredientsList.map(recipe => recipe.savedIngredients))]

  //function Comparator(a, b) {
  //  if (a[2] < b[2]) return -1;
  //  if (a[2] > b[2]) return 1;
  //  return 0;
  //}

  //console.log(innerList.flat())

  //const finalList = innerList.flat().sort(Comparator)

  useEffect(() => {
    if(!chefInfo) {
      history.push('/login')
    } else {
      if(!chef || !chef.username || success || firstPageLoad === true) {
        dispatch({ type: CHEF_UPDATE_PROFILE_RESET })
        dispatch(getChefDetails('profile'))
        setFirstPageLoad(false)
      } else {
        setFirstName(chef.first_name)
        setLastName(chef.last_name)
        setUsername(chef.username)
        setEmail(chef.email)
        setBio(chef.bio)
        setIsVegan(chef.isVegan)
        setIsVegetarian(chef.isVegetarian)
        setIsGlutenFree(chef.isGlutenFree)
        setIsKetogenic(chef.isKetogenic)
        setIsPescatarian(chef.isPescatarian)
        setIsDairy(chef.isDairy)
        setIsEgg(chef.isEgg)
        setIsNuts(chef.isNuts)
        setIsShellfish(chef.isShellfish)
        setIsSoy(chef.isSoy)
        setIsWheat(chef.isWheat)
        setIsBreakfastBrunch(chef.isBreakfastBrunch)
        setIsMainDish(chef.isMainDish)
        setIsSideSauce(chef.isSideSauce)
        setIsDessert(chef.isDessert)
        setIsSnack(chef.isSnack)
        setIsAppetizer(chef.isAppetizer)
        setIsDrink(chef.isDrink)
        setIsMetric(chef.isMetric)
        setUseTeaspoons(chef.useTeaspoons)
        setUseTablespoons(chef.useTablespoons)
        setUseFluidOunces(chef.useFluidOunces)
        setUseCups(chef.useCups)
        setUsePints(chef.usePints)
        setUseQuarts(chef.useQuarts)
        setUseGallons(chef.useGallons)
        setUseOunces(chef.useOunces)
        setUsePounds(chef.usePounds)
        setUseInches(chef.useInches)
        setUseMillilitres(chef.useMillilitres)
        setUseLitres(chef.useLitres)
        setUseGrams(chef.useGrams)
        setUseKilograms(chef.useKilograms)
        setUseCentimetres(chef.useCentimetres)
        setUseMillimetres(chef.useMillimetres)
        setSavedIngredients(chef.savedIngredients)
      }
    }
  }, [dispatch, history, chefLogin, chefInfo, chef, success])

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
      //let removeIngredient = chefInfo.savedIngredients.splice(arrayItem, 1)
      let removeIngredientChef = chef.savedIngredients.splice(arrayItem, 1)
      setSavedIngredients([...chef.savedIngredients])
      setIngredientIndex(arrayItem)
      dispatch(updateChefProfile({
        _id: chef._id,
        first_name,
        last_name,
        username,
        email,
        password,
        bio,
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
        isMetric,
        useTeaspoons,
        useTablespoons,
        useFluidOunces,
        useCups,
        usePints,
        useQuarts,
        useGallons,
        useOunces,
        usePounds,
        useInches,
        useMillilitres,
        useLitres,
        useGrams,
        useKilograms,
        useCentimetres,
        useMillimetres,
        savedIngredients
      }))
    }
  }

  const clearAllIngredientsHandler = (e) => {
    e.preventDefault()
    let removeAllIngredients = chef.savedIngredients.splice(0, chef.savedIngredients.length)
    setSavedIngredients([...chef.savedIngredients])
    dispatch(updateChefProfile({
      _id: chef._id,
      first_name,
      last_name,
      username,
      email,
      password,
      bio,
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
      isMetric,
      useTeaspoons,
      useTablespoons,
      useFluidOunces,
      useCups,
      usePints,
      useQuarts,
      useGallons,
      useOunces,
      usePounds,
      useInches,
      useMillilitres,
      useLitres,
      useGrams,
      useKilograms,
      useCentimetres,
      useMillimetres,
      savedIngredients
    }))
  }

  const addIngredientName = (e) => {
    if (e.which === 13) {
      e.preventDefault()
      setSavedIngredients([...savedIngredients, ['', '', e.target.value]])
      document.getElementById('newIngredientName').value = ''
    }
  }

  const addIngredientQuantityMeasurement = (e) => {
    if (e.which === 13) {
      e.preventDefault()
      setSavedIngredients([...savedIngredients, ['', '', e.target.value]])
      document.getElementById('newIngredientQuantityMeasurement').value = ''
    }
  }

  const addNewIngredientHandler = (e) => {
      e.preventDefault()
      let newIngredientList = chef.savedIngredients.push([e.target[0].value, e.target[1].value, e.target[2].value])
      setSavedIngredients([...savedIngredients])
      document.getElementById('newIngredientQuantity').value = ''
      document.getElementById('newIngredientMeasurement').value = ''
      document.getElementById('newIngredientName').value = ''
      dispatch(updateChefProfile({
        _id: chef._id,
        first_name,
        last_name,
        username,
        email,
        password,
        bio,
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
        isMetric,
        useTeaspoons,
        useTablespoons,
        useFluidOunces,
        useCups,
        usePints,
        useQuarts,
        useGallons,
        useOunces,
        usePounds,
        useInches,
        useMillilitres,
        useLitres,
        useGrams,
        useKilograms,
        useCentimetres,
        useMillimetres,
        savedIngredients
      }))
  }

  const [temporarilyDisableEmailButton, setTemporarilyDisableEmailButton] = useState(false)
  const [successEmailMessage, setSuccessEmailMessage] = useState('')
  const emailGroceryListHandler = (e) => {
    e.preventDefault()
    setSuccessEmailMessage(`Your saved ingredients are on their way to you! They will be sent to ${chef.email}`)
    setTemporarilyDisableEmailButton(true)
    setTimeout(function() {
      setSuccessMessage('')
      setTemporarilyDisableEmailButton(false)
    }, 20000)
    dispatch(emailGroceryList({
      _id: chef._id,
      first_name: chef.first_name,
      last_name: chef.last_name,
      email: chef.email,
      savedIngredients: chef.savedIngredients
    }))
  }

  return (
    <div>
      {error ? (
        <Message>{error}</Message>
      ) : (
        <div>
          <Row style={{textAlign: 'center'}}>
            <Form style={{width: '100%'}}>
              <Form.Group as={Row} controlId='groceryListLabel'>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Form.Label>
                    <h4 style= {{ marginRight: '5px' }}>My Grocery List</h4>
                  </Form.Label>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Form.Check
                    style={{ padding: '5px', height: '25px'}}
                    inline
                    label='Only display ingredients?'
                    checked={displayIngredientOnly}
                    onChange={(e) => setDisplayIngredientOnly(e.target.checked)}
                  />
                </Col>
              </Form.Group>
            </Form>
            <Col xs={12} sm={6} md={6} lg={6} xl={6} style={{textAlign: 'center'}}>
              <Form onSubmit={emailGroceryListHandler}>
                <Button
                  variant='primary'
                  style={{padding: '0px', marginTop: '5px', marginRight: '0px', width: '200px' }}
                  type='submit'
                  disabled={temporarilyDisableEmailButton}
                >
                  Email Grocery List
                </Button>
              </Form>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6} xl={6} style={{textAlign: 'center'}}>
              <Button
                variant='primary'
                style={{padding: '0px', marginTop: '5px', marginLeft: '0px', width: '200px' }}
                disabled
              >
                Text Grocery List
              </Button>
            </Col>
            {temporarilyDisableEmailButton === true && (
              <Col xs={12} style={{textAlign: 'center'}}>
                <Form.Text style={{paddingTop: '10px'}}>
                  <Message variant='success'>{successEmailMessage}</Message>
                </Form.Text>
              </Col>
            )}
            <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{paddingTop: '15px', textAlign: 'center'}}>
              {(displayIngredientOnly == true && savedIngredients.length !== 0) && (
                savedIngredients.map((groceries, index) =>
                  <Row>
                    <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{padding: '0px', textAlign: 'right'}}>
                      <Button
                        variant='link'
                        style={{ marginRight: '12.25px', padding: '0px 0px 12.5px 0px', height: '30px'}}
                        value={index}
                        onClick={removeIngredientHandler}
                        >
                        <FaTrash />
                      </Button>
                    </Col>
                    <Col xs={11} sm={11} md={11} lg={11} xl={11} style={{textAlign: 'left'}}>
                      <p style={{marginBottom: '0px'}}>{groceries[2].toUpperCase()}</p>
                    </Col>
                  </Row>
              ))}
              {(displayIngredientOnly == false && savedIngredients.length !== 0) && (
                savedIngredients.map((groceries, index) =>
                  <Row>
                    <Button
                      variant='link'
                      style={{ marginRight: '12.25px', padding: 0, height: '30px'}}
                      value={index}
                      onClick={removeIngredientHandler}
                      >
                      <FaTrash />
                    </Button>
                    <p style={{marginBottom: '0px'}}>{groceries[0]} {groceries[1].toUpperCase()} {groceries[2].toUpperCase()}</p>
                  </Row>
              ))}
            </Col>
          </Row>
          <Form onSubmit={addNewIngredientHandler}>
            <Row style={{textAlign: 'center'}}>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{paddingTop: '15px', textAlign: 'center' }}>
                <Form.Label>Add a new ingredient</Form.Label>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={4}>
                <Form.Group controlId='newIngredientQuantity'>
                  <Form.Control
                    key='index'
                    type='text'
                    placeholder='1/3'
                    required
                  >
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={4}>
                <Form.Group controlId='newIngredientMeasurement'>
                  <Form.Control
                    key='index'
                    type='text'
                    placeholder='Cup'
                    required
                  >
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={4}>
                <Form.Group controlId='newIngredientName'>
                  <Form.Control
                    key='index'
                    type='text'
                    placeholder='Basmati Rice'
                    required
                  >
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Col style={{padding: '5px 5px 15px 5px', textAlign: 'center' }}>
              <Button type='submit' variant='primary'>
                Add New Ingredient
              </Button>
            </Col>
          </Form>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{textAlign: 'center'}}>
            <Button
              variant='primary'
              style={{padding: '5px', marginLeft: '5px'}}
              onClick={clearAllIngredientsHandler}
            >
              Clear All Ingredients
            </Button>
          </Col>
        </div>
      )}
    </div>
  )
}



export default SavedIngredientsPage;
