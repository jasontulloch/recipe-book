import React, { useState, useEffect, setState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form, DropdownButton, Badge } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { getChefDetails, updateChefProfile } from '../../actions/chefActions';
import { emailGroceryList, textGroceryList } from '../../actions/groceryListActions';
import { CHEF_UPDATE_PROFILE_RESET } from '../../constants/chefConstants';

import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import PopoverStickOnHover from '../../components/PopoverStickOnHover/PopoverStickOnHover.component';
import Message from '../../components/Message/Message.component';

import { isBrowser } from 'react-device-detect';
import axios from 'axios';

import './SavedIngredientsPage.styles.css';

// Importing functions for organization - test
import MessageIngredients from '../../functions/MessageIngredients';

const SavedIngredientsPage = ({ history }) => {

  // These are required in the model so need to pass the current values in or profile would return '' otherwise
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [connect_first_name, setConnectFirstName] = useState('')
  const [connect_last_name, setConnectLastName] = useState('')
  const [connect_email, setConnectEmail] = useState('')
  const [connect_phone_number, setConnectPhoneNumber] = useState('')
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
  const [isVisible, setIsVisible] = useState(false)
  const [chefPicture, setChefPicture] = useState('')

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
        setPhoneNumber(chef.phone_number)
        setConnectFirstName(chef.connect_first_name)
        setConnectLastName(chef.connect_last_name)
        setConnectEmail(chef.connect_email)
        setConnectPhoneNumber(chef.connect_phone_number)
        setBio(chef.bio)
        setChefPicture(chef.chefPicture)
        setIsVisible(chef.isVisible)
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
        phone_number,
        connect_first_name,
        connect_last_name,
        connect_email,
        connect_phone_number,
        password,
        bio,
        chefPicture,
        isVisible,
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
      phone_number,
      connect_first_name,
      connect_last_name,
      connect_email,
      connect_phone_number,
      password,
      bio,
      chefPicture,
      isVisible,
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
        phone_number,
        connect_first_name,
        connect_last_name,
        connect_email,
        connect_phone_number,
        password,
        bio,
        chefPicture,
        isVisible,
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

  const [successEmailMessage, setSuccessEmailMessage] = useState('')
  const [successTextMessage, setSuccessTextMessage] = useState('')

  const emailGroceryListHandler = (e) => {
    e.preventDefault()
    setSuccessEmailMessage(`Your saved ingredients are on their way to you! They will be sent to ${chef.email}`)
    setTimeout(function() {
      setSuccessEmailMessage('')
    }, 20000)
    dispatch(emailGroceryList({
      _id: chef._id,
      first_name: chef.first_name,
      last_name: chef.last_name,
      email: chef.email,
      savedIngredients: chef.savedIngredients
    }))
  }

  const textGroceryListHandler = (e) => {
    e.preventDefault()
    setSuccessTextMessage(`Your saved ingredients are on their way to you! They will be sent to ${chef.phone_number}`)
    setTimeout(function() {
      setSuccessTextMessage('')
    }, 20000)
    dispatch(textGroceryList({
      _id: chef._id,
      first_name: chef.first_name,
      last_name: chef.last_name,
      phone_number: chef.phone_number,
      savedIngredients: chef.savedIngredients
    }))
  }

  const textGroceryListPartnerChefHandler = (e) => {
    e.preventDefault()
    setSuccessMessage(`Recipe ingredients are on their way to ${chef.connect_first_name}! They will be sent to ${chef.connect_phone_number}`)
    setTimeout(function() {
      setSuccessTextMessage('')
    }, 20000)
    dispatch(textGroceryList({
      _id: chef._id,
      first_name: chef.connect_first_name,
      last_name: chef.connect_last_name,
      phone_number: chef.connect_phone_number,
      savedIngredients: chef.savedIngredients
    }))
  }

  const emailGroceryListPartnerChefHandler = (e) => {
    e.preventDefault()
    setSuccessEmailMessage(`Recipe ingredients are on their way to ${chef.connect_first_name}! They will be sent to ${chef.connect_email}`)
    setTimeout(function() {
      setSuccessEmailMessage('')
    }, 20000)
    dispatch(emailGroceryList({
      _id: chef._id,
      first_name: chef.connect_first_name,
      last_name: chef.connect_last_name,
      email: chef.connect_email,
      savedIngredients: chef.savedIngredients
    }))
  }

  // Use when I want to create a text component
  // <MessageIngredients
  //   dispatch={dispatch}
  //   successTextMessage={successTextMessage}
  //   setSuccessTextMessage={setSuccessTextMessage}
  //   temporarilyDisableEmailButton={temporarilyDisableEmailButton}
  //   setTemporarilyDisableEmailButton={setTemporarilyDisableEmailButton}
  //   temporarilyDisableTextButton={temporarilyDisableTextButton}
  //   setTemporarilyDisableTextButton={setTemporarilyDisableTextButton}
  //   chef={chef}
  // />

  return (
    <div style={{paddingLeft: '220px', paddingRight: '30px'}} className="savedIngredientsPageMobile">
      {error ? (
        <Message>{error}</Message>
      ) : (
        <div>
          {(successTextMessage !== '') && (
            <Message variant='success'>
              {successTextMessage}
            </Message>
          )}
          {(successEmailMessage !== '') && (
            <Message variant='success'>
              {successEmailMessage}
            </Message>
          )}
          {(isBrowser) ? (
          <div>
            <Row>
              <Col>
                <h3>MY GROCERY LIST</h3>
              </Col>
              {savedIngredients.length !== 0 && (
                <Col style={{textAlign: 'right'}}>
                  <Form>
                    <Form.Group controlId='groceryListLabel'>
                      <Form.Check
                        type='switch'
                        id='custom-switch'
                        style={{ padding: '5px', height: '15px'}}
                        inline
                        label='Hide Quantities?'
                        checked={displayIngredientOnly}
                        onChange={(e) => setDisplayIngredientOnly(e.target.checked)}
                      />
                    </Form.Group>
                  </Form>
                </Col>
              )}
            </Row>
            <Row style={{borderBottom: 'dotted 1px', paddingBottom: '25px'}}>
              <Form inline onSubmit={addNewIngredientHandler} style={{width: '100%'}}>
                <div style={{width: '100px', marginRight: '5px'}}>
                  <Form.Control
                    id='newIngredientQuantity'
                    key='index'
                    type='text'
                    placeholder='1/3'
                    required
                    style={{width: '100%'}}
                  >
                  </Form.Control>
                </div>
                <div style={{width: '100px', marginRight: '5px'}}>
                  <Form.Control
                    id='newIngredientMeasurement'
                    key='index'
                    type='text'
                    placeholder='Cup'
                    required
                    style={{width: '100%'}}
                  >
                  </Form.Control>
                </div>
                <div style={{width: '24.5%', marginRight: '5px'}}>
                  <Form.Control
                    id='newIngredientName'
                    key='index'
                    type='text'
                    placeholder='Basmati Rice'
                    required
                    style={{width: '100%'}}
                  >
                  </Form.Control>
                </div>
                <div style={{right: '50px', position: 'absolute'}}>
                  <Button
                    type='submit'
                    variant='primary'
                    style={{fontSize: '10px', lineHeight: '20px', paddingLeft: '5px', paddingRight: '5px', width: '100%'}}
                  >
                    Add New Ingredient
                  </Button>
                </div>
              </Form>
            </Row>  
          </div>            
          ) : (
          <div>
            <Row>
              <Col style={{textAlign: 'center'}} xs={12}>
                <h3>MY GROCERY LIST</h3>
              </Col>
              {savedIngredients.length !== 0 && (
                <Col style={{display: 'flex', justifyContent: 'center'}}>
                  <Form> 
                    <Form.Group>
                      <Form.Check
                        type='switch'
                        id='custom-switch'
                        style={{ marginLeft: '50px', padding: '5px', height: '15px'}}
                        inline
                        label='Hide Quantities?'
                        checked={displayIngredientOnly}
                        onChange={(e) => setDisplayIngredientOnly(e.target.checked)}
                      />
                    </Form.Group>
                  </Form>
                </Col>
              )}
            </Row>
            <Row style={{borderBottom: 'dotted 1px', paddingBottom: '25px'}}>
              <Form inline onSubmit={addNewIngredientHandler} style={{width: '100%'}}>
              <Col xs={6}>
                <div>
                  <Form.Control
                    id='newIngredientQuantity'
                    key='index'
                    type='text'
                    placeholder='1/3'
                    required
                    style={{width: '100%'}}
                  >
                  </Form.Control>
                </div>
              </Col>
              <Col xs={6}>
                <div>
                  <Form.Control
                    id='newIngredientMeasurement'
                    key='index'
                    type='text'
                    placeholder='Cup'
                    required
                    style={{width: '100%'}}
                  >
                  </Form.Control>
                </div>
              </Col>
              <Col xs={12}>
                <div style={{paddingTop: '10px'}}>
                  <Form.Control
                    id='newIngredientName'
                    key='index'
                    type='text'
                    placeholder='Basmati Rice'
                    required
                    style={{width: '100%'}}
                  >
                  </Form.Control>
                </div>             
              </Col>                
              <Col xs={12}>
                <div style={{paddingTop: '10px'}}>
                  <Button
                    type='submit'
                    variant='primary'
                    style={{fontSize: '10px', lineHeight: '20px', paddingLeft: '5px', paddingRight: '5px', width: '100%'}}
                  >
                    Add New Ingredient
                  </Button>
                </div>
              </Col>
              </Form>
            </Row>  
          </div>   
          )}
          {savedIngredients.length !== 0 && (
          <Row style={{paddingTop: '15px'}}>
            <Col xs={6} style={{textAlign: 'center'}}>
              <div>
                <PopoverStickOnHover
                  component={
                    <div style={{ backgroundColor: '#343a40', fontSize: '.85rem', width: '175px', textAlign: 'center' }}>
                      <Form onSubmit={textGroceryListHandler}>
                        <Button
                          variant='primary'
                          style={{fontSize: '10px', lineHeight: '10px', width: '100%', paddingLeft: '5px', paddingRight: '5px'}}
                          type='submit'
                          disabled={(chef == null || chef.phone_number === '') ? true : false}
                        >
                          Text Me Grocery List
                        </Button>
                      </Form>
                      <Form onSubmit={emailGroceryListHandler}>
                        <Button
                          style={{fontSize: '10px', lineHeight: '10px', width: '100%', paddingLeft: '5px', paddingRight: '5px'}}
                          type='submit'
                          disabled={(chef == null || chef.email === '') ? true : false}
                        >
                          Email Me Grocery List
                        </Button>
                      </Form>
                      <Form onSubmit={textGroceryListPartnerChefHandler}>
                        <Button
                          variant='primary'
                          style={{fontSize: '10px', lineHeight: '10px', width: '100%', paddingLeft: '5px', paddingRight: '5px'}}
                          type='submit'
                          disabled={(chef == null || chef.connect_phone_number === '') ? true : false}
                        >
                          Text {chef.connect_first_name} Grocery List
                        </Button>
                      </Form>
                      <Form onSubmit={emailGroceryListPartnerChefHandler}>
                        <Button
                          style={{fontSize: '10px', lineHeight: '10px', width: '100%', paddingLeft: '5px', paddingRight: '5px'}}
                          type='submit'
                          disabled={(chef == null || chef.connect_email === '') ? true : false}
                        >
                          Email {chef.connect_first_name} Grocery List
                        </Button>
                      </Form>
                    </div>
                  }
                  placement="bottom"
                  onMouseEnter={() => { }}
                  delay={200}
                >
                  <div className="sidebarIcon">
                    <Button
                      style={{height: '25px', paddingTop: '0px', paddingBottom: '0px', textAlign: 'center', width: '100%'}}
                    >
                      Share
                    </Button>
                  </div>
                </PopoverStickOnHover>
              </div>
            </Col>
            <Col xs={6} style={{textAlign: 'center'}}>
              <Button
                variant='primary'
                style={{padding: '4px', lineHeight: '10px', height: '24px', width: '100%'}}
                onClick={clearAllIngredientsHandler}
              >
                Clear All
              </Button>
            </Col>
            <Col xs={12} style={{paddingTop: '10px', textAlign: 'center'}}>
              <Message>Click an ingredient to remove it from your grocery list</Message>
            </Col>
          </Row>
          )}
          <Col style={{paddingTop: '10px'}}>
            <h6 style={{textAlign: 'center'}}>
              {(displayIngredientOnly == true && savedIngredients.length !== 0) && (
                savedIngredients.map((groceries, index) =>
                  <div style={{display: 'inline-block'}}>
                    <Button
                      style={{borderRadius: '10rem', fontSize: '10px', padding: '0px 5px 0px 5px', margin: '5px'}}
                      onClick={removeIngredientHandler}
                      value={index}
                    >
                      {groceries[2].toUpperCase()}
                    </Button>
                  </div>
                )
              )}
              {(displayIngredientOnly == false && savedIngredients.length !== 0) && (
                savedIngredients.map((groceries, index) =>
                  <div style={{display: 'inline-block'}}>
                    <Button
                      style={{borderRadius: '10rem', fontSize: '10px', padding: '0px 5px 0px 5px', margin: '5px'}}
                      onClick={removeIngredientHandler}
                      value={index}
                    >
                      {groceries[0]} {groceries[1].toUpperCase()} {groceries[2].toUpperCase()}
                    </Button>
                  </div>
                )
              )}
            </h6>
          </Col>
        </div>
      )}
    </div>
  )
}



export default SavedIngredientsPage;
