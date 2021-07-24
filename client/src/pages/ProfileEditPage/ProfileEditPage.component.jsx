import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Tabs, Tab, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getChefDetails, updateChefProfile } from '../../actions/chefActions';
import { CHEF_UPDATE_PROFILE_RESET } from '../../constants/chefConstants';
import FormContainer from '../../components/FormContainer/FormContainer.component';
import Message from '../../components/Message/Message.component';
import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';

import './ProfileEditPage.styles.css';

const ProfileEditPage = ({ location, history, match }) => {
  //const chefId = match.params.id

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
  const [uploading, setUploading] = useState(false)

  const [warningMessage, setWarningMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [saveBeforeUploadImage, setSaveBeforeUploadImage] = useState(false)

  const dispatch = useDispatch()

  const chefDetails = useSelector(state => state.chefDetails)
  const { chef } = chefDetails

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const chefUpdateProfile = useSelector(state => state.chefUpdateProfile)
  const {
    success,
    chefInfo: chefInfoUpdate
  } = chefUpdateProfile

  useEffect(() => {
    if(!chefInfo) {
      history.push('/login')
    } else {
      if(!chef || !chef.username || success) {
        dispatch({ type: CHEF_UPDATE_PROFILE_RESET })
        dispatch(getChefDetails('profile'))
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
      }
    }
  }, [dispatch, history, chefLogin, chefInfo, chef, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setWarningMessage('Passwords do not match. Please try again.')
      setTimeout(function() {
        setWarningMessage('')
      }, 3000)
      setPassword('')
      setConfirmPassword('')
    } else {
      setSuccessMessage('Profile has been successfully updated')
      setTimeout(function() {
        setSuccessMessage('')
      }, 3000)
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
      }))
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

  const [key, setKey] = useState('auth')

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

  const uploadFileHandler = async(e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('chefPicture', file)
    setUploading(true)
    setChefPicture('')

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.put(`/api/uploadChefPicture/${chef._id}`, formData, config)

      setChefPicture(data)
      setSuccessMessage('Chef profile picture successfully uploaded!')
      setTimeout(function() {
        setSuccessMessage('')
      }, 3000)
      setUploading(false)
      dispatch(getChefDetails('profile'))
    } catch (error) {
      setUploading(false)
    }
  }

  return (
    <div style={{paddingLeft: '200px', paddingRight: '30px'}} className="chefProfileMobile">
      <FormContainer className="profileEditPage">
        <Col xs={12} className="chefProfileMobile" style={{textAlign: 'center'}}>
          {warningMessage !== '' && (
            <Message variant='danger'>{warningMessage}</Message>
          )}
          {successMessage !== '' && (
            <Message variant='success'>{successMessage}</Message>
          )}
        </Col>
        <h1 style={{textAlign: 'center'}}>Chef Profile</h1>
        <Form className='profileEditPageForm' onSubmit={submitHandler}>
          <Tabs fill id="profileEditPageTabs" activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey='auth' title="General">
              <Col xs={12} style={{textAlign:'center'}}>
                <Form.Group controlId='isVisible' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Make your chef profile public'
                    checked={isVisible}
                    onChange={(e) => setIsVisible(e.target.checked)}
                  />
                </Form.Group>
                <Form.Text>Other chefs will be able to view your profile and follow you. Your name, contact information, and log in information will never be shared.</Form.Text>
              </Col>
              <Form.Group controlId='first_name'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your first name'
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='last_name'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your last name'
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='username'>
                <Form.Label>Chefname</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter a chefname'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength={25}
                  required
                >
                </Form.Control>
                <Form.Text className='muted'>Your username will be public.</Form.Text>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                >
                </Form.Control>
                <Form.Text>We will never email you or share your email with anyone without your permission.</Form.Text>
              </Form.Group>

              <Form.Group controlId='phone_number'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your phone number'
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                >
                </Form.Control>
                <Form.Text>We will never message you or share your phone number with anyone without your permission.</Form.Text>
              </Form.Group>


              <Form.Group controlId='connect_first_name'>
                <Message style={{marginTop: '10px'}}>Ever wish you could text or email your grocery list or a recipe's ingredients directly to someone else? Yeah, so did we.</Message>
                <Form.Label>Partner Chef First Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter your partner chef's first name"
                  value={connect_first_name}
                  onChange={(e) => setConnectFirstName(e.target.value)}
                  required
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='connect_last_name'>
                <Form.Label>Partner Chef Last Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter your partner chef's last name"
                  value={connect_last_name}
                  onChange={(e) => setConnectLastName(e.target.value)}
                  required
                >
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='connect_email'>
                <Form.Label>Partner Chef Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder="Enter your partner chef's email"
                  value={connect_email}
                  onChange={(e) => setConnectEmail(e.target.value)}
                  required
                >
                </Form.Control>
                <Form.Text>We will never email your partner chef or share their email with anyone. Providing an email will allow you to send recipes / ingredients to your partner chef throughout this application.</Form.Text>
              </Form.Group>

              <Form.Group controlId='connect_phone_number'>
                <Form.Label>Partner Chef Phone Number</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter your partner chef's phone number"
                  value={connect_phone_number}
                  onChange={(e) => setConnectPhoneNumber(e.target.value)}
                  required
                >
                </Form.Control>
                <Form.Text>We will never text / call your partner chef or share their phone number with anyone. Providing a phone number will allow you to send recipes / ingredients to your partner chef throughout this application.</Form.Text>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
              </Form.Group>
            </Tab>
            <Tab eventKey='chef-detail' title="Chef Detail">
              <Row>
                <Col style={{textAlign: 'center'}} xs={12} sm={12} md={12} lg={12} xl={12}>
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
                <Col xs={12} style={{textAlign: 'center', paddingBottom: '10px'}}>
                  <Form.Text>Particular diet? This will help us show you exactly what you are looking for.</Form.Text>
                </Col>
                <Col style={{textAlign: 'center', borderTop: '1px dotted'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Form.Label className='allerginsLabel'>Allergens</Form.Label>
                </Col>
                <Col style={{textAlign: 'center'}}>
                  <Form.Group controlId='isDairy' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Dairy'
                      checked={isDairy}
                      onChange={(e) => setIsDairy(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='isEgg' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Egg'
                      checked={isEgg}
                      onChange={(e) => setIsEgg(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='isNuts' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Nuts'
                      checked={isNuts}
                      onChange={(e) => setIsNuts(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='isShellfish' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Shellfish'
                      checked={isShellfish}
                      onChange={(e) => setIsShellfish(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='isSoy' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Soy'
                      checked={isSoy}
                      onChange={(e) => setIsSoy(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='isWheat' className='dietsAndAllerginsGroup'>
                    <Form.Check
                      inline
                      label='Wheat'
                      checked={isWheat}
                      onChange={(e) => setIsWheat(e.target.checked)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} style={{textAlign: 'center', paddingBottom: '10px'}}>
                  <Form.Text>Should we avoid any common allergens?</Form.Text>
                </Col>
                <Col style={{textAlign: 'center', borderTop: '1px dotted'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Form.Label className='allerginsLabel'>Meal Course / Type</Form.Label>
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
                <Col xs={12} style={{textAlign: 'center', paddingBottom: '10px'}}>
                  <Form.Text>What type of meal are you normally searching for?</Form.Text>
                </Col>
                <Col style={{textAlign: 'center', borderTop: '1px dotted', paddingTop: '10px'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Form.Group controlId='bio'>
                    <Form.Label>Chef Bio</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows='5'
                      maxLength='900'
                      placeholder='Enter bio'
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    >
                    </Form.Control>
                    <Form.Text className='muted'>Your bio will be public</Form.Text>
                  </Form.Group>
                </Col>
                <Col style={{textAlign: 'center'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Message variant='warning' style={{textAlign: 'center', width: '100%', marginTop: '5px'}}>
                    <Form.Text>The following measurement options are optional. You can now decide the unit of measurements a recipe is presented in (e.g. cups and tablespoons only).</Form.Text>
                  </Message>
                  <Form.Label className='allerginsLabel'>Measurement (Imperial / US System)</Form.Label>
                </Col>
                <Col style={{textAlign: 'center', paddingBottom: '10px'}}>
                  <Form.Group controlId='useTeaspoons' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Teaspoons'
                      checked={useTeaspoons}
                      onChange={(e) => setUseTeaspoons(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='useTablespoons' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Tablespoons'
                      checked={useTablespoons}
                      onChange={(e) => setUseTablespoons(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='useFluidOunces' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Fluid Ounces'
                      checked={useFluidOunces}
                      onChange={(e) => setUseFluidOunces(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='useCups' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Cups'
                      checked={useCups}
                      onChange={(e) => setUseCups(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='usePints' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Pints'
                      checked={usePints}
                      onChange={(e) => setUsePints(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='useQuarts' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Quarts'
                      checked={useQuarts}
                      onChange={(e) => setUseQuarts(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='useGallons' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Gallons'
                      checked={useGallons}
                      onChange={(e) => setUseGallons(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='useOunces' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Ounces'
                      checked={useOunces}
                      onChange={(e) => setUseOunces(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='usePounds' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Pounds'
                      checked={usePounds}
                      onChange={(e) => setUsePounds(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='useInches' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Inches'
                      checked={useInches}
                      onChange={(e) => setUseInches(e.target.checked)}
                    />
                  </Form.Group>
                </Col>
                <Col style={{textAlign: 'center', borderTop: '1px dotted'}} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Form.Label className='allerginsLabel'>Measurement (Metric System)</Form.Label>
                </Col>
                <Col style={{textAlign: 'center', paddingBottom: '20px'}}>
                  <Form.Group controlId='isMetric' className='measurementsMetricToggleGroup'>
                    <Form.Check
                      inline
                      label='Use the metric system on default?'
                      checked={isMetric}
                      onChange={(e) => setIsMetric(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='useMillilitres' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Millilitres?'
                      checked={useMillilitres}
                      onChange={(e) => setUseMillilitres(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='useLitres' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Litres'
                      checked={useLitres}
                      onChange={(e) => setUseLitres(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='useGrams' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Grams'
                      checked={useGrams}
                      onChange={(e) => setUseGrams(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='useKilograms' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Kilograms'
                      checked={useKilograms}
                      onChange={(e) => setUseKilograms(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='useCentimetres' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Centimetres'
                      checked={useCentimetres}
                      onChange={(e) => setUseCentimetres(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group controlId='useMillimetres' className='measurementsGroup'>
                    <Form.Check
                      inline
                      label='Millimetres'
                      checked={useMillimetres}
                      onChange={(e) => setUseMillimetres(e.target.checked)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Tab>


            <Tab eventKey='chefPicture' title="Chef Profile Picture">
              {uploading === false ? (
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{textAlign: 'center' }}>
                    <Message variant='warning'>
                      <Form.Text className='muted'>A great picture is key to a great chef. This picture will be public and viewable by others.</Form.Text>
                    </Message>
                  </Col>
                  <Col style={{textAlign: 'center'}}>
                    <Form.Group controlId='coverImage' className='imagesGroup'>
                      <FormContainer>
                        <Image
                          style={{width: '50%', textAlign: 'left', minWidth: '200px'}}
                          className="chefPicture"
                          src={chefPicture}
                          key={Date.now()}
                          rounded
                        />
                      </FormContainer>
                      <Form.File
                        className="profileNewPictureMobileButton"
                        style={{width: '50%', textAlign: 'left', minWidth: '330px'}}
                        id='cover-image-file'
                        name='chefPicture'
                        label='Choose Profile Picture'
                        custom
                        disabled={!saveBeforeUploadImage}
                        onChange={uploadFileHandler}
                      ></Form.File>
                    </Form.Group>
                    <Form.Group controlId='saveBeforeUploadImage' className='dietsAndAllerginsGroup'>
                      <Form.Check
                        inline
                        label='I understand that uploading an image before saving my profile will delete any unsaved content. The picture I am uploading is my own and authorized to be used by RecipeBook throughout its platform.'
                        checked={saveBeforeUploadImage}
                        onChange={(e) => setSaveBeforeUploadImage(e.target.checked)}
                      />
                    </Form.Group>
                    <Form.Text className='muted' style={{paddingBottom: '10px'}}>Your new image will automatically save once its uploaded.</Form.Text>
                  </Col>
                </Row>
              ) : (
                <PancakeLoader>Uploading chef profile picture...</PancakeLoader>
              )}
            </Tab>
          </Tabs>
          <Row>
            <Col style={{textAlign: 'center'}}>
              <Button type='submit' variant='primary'>
                Update
              </Button>
            </Col>
            <Col xs={12} style={{textAlign: 'center', paddingTop: '10px' }}>
              {successMessage !== '' && (
                <Message variant='success'>{successMessage}</Message>
              )}
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </div>
  )
}

export default ProfileEditPage;
