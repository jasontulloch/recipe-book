import React, { useState, useEffect, setState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { getChefDetails, updateChefProfile } from '../../actions/chefActions';
import { CHEF_UPDATE_PROFILE_RESET } from '../../constants/chefConstants';

import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import Message from '../../components/Message/Message.component';

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
  const [isDairy, setIsDairy] = useState(false)
  const [isEgg, setIsEgg] = useState(false)
  const [isNuts, setIsNuts] = useState(false)
  const [isShellfish, setIsShellfish] = useState(false)
  const [isSoy, setIsSoy] = useState(false)
  const [isWheat, setIsWheat] = useState(false)
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
        setIsDairy(chef.isDairy)
        setIsEgg(chef.isEgg)
        setIsNuts(chef.isNuts)
        setIsShellfish(chef.isShellfish)
        setIsSoy(chef.isSoy)
        setIsWheat(chef.isWheat)
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

  // Function currently works locally, need to update database
  const removeIngredientHandler = (e) => {
    e.preventDefault()
    let arrayItem = e.currentTarget.value
    console.log(arrayItem)
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
        isDairy,
        isEgg,
        isNuts,
        isShellfish,
        isSoy,
        isWheat,
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

  return (
    <div>
      {error ? (
        <Message>{error}</Message>
      ) : (
        <div>
          <Row style={{textAlign: 'center'}}>
            <Col md={12}>
              <Form>
                <Form.Group as={Row} controlId='groceryListLabel'>
                  <h1 style= {{ marginRight: '5px' }}>My Grocery List</h1>
                  <Form.Check
                    style={{ padding: '5px', width: '40px', height: '25px'}}
                    inline
                    label='Only display ingredients?'
                    checked={displayIngredientOnly}
                    onChange={(e) => setDisplayIngredientOnly(e.target.checked)}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={6} style={{textAlign: 'right'}}>
              <Button variant='primary' style={{padding: '5px'}}>
                Email Grocery List
              </Button>
            </Col>
            <Col md={6} style={{textAlign: 'left'}}>
              <Button variant='primary' style={{padding: '5px'}}>
                Text Grocery List
              </Button>
            </Col>
          </Row>
          <Row style={{textAlign: 'center', paddingTop: '10px'}}>
            <Col>
              {displayIngredientOnly ? (
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
                    <p style={{marginBottom: '0px'}}>{groceries[2].toUpperCase()}</p>
                  </Row>
              )) : (
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
        </div>
      )}
    </div>
  )
}



export default SavedIngredientsPage;
