import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { updateChefProfile } from '../../actions/chefActions';

const SavedIngredientsPage = ({ history }) => {

  const [warningMessage, setWarningMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [ingredientIndex, setIngredientIndex] = useState('')

  const dispatch = useDispatch()

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const chefDetails = useSelector(state => state.chefDetails)
  const { loading, error, chef } = chefDetails

  //const ingredientsList = chefInfo.savedIngredients
  //const innerList = [... new Set(ingredientsList.map(recipe => recipe.savedIngredients))]

  //function Comparator(a, b) {
  //  if (a[2] < b[2]) return -1;
  //  if (a[2] > b[2]) return 1;
  //  return 0;
  //}

  //console.log(innerList.flat())

  //const finalList = innerList.flat().sort(Comparator)

  const [savedIngredients, setSavedIngredients] = useState([])

  useEffect(() => {
    if(!chefInfo) {
      history.push('/login')
    } else {
      setSavedIngredients(chef.savedIngredients)
    }
  }, [dispatch, history, chefLogin, chefInfo, chef])

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
      let removeIngredient = chefInfo.savedIngredients.splice(arrayItem, 1)
      setSavedIngredients([...chefInfo.savedIngredients])
      console.log(savedIngredients)
      dispatch(updateChefProfile({
        _id: chef._id,
        savedIngredients,
      }))
    }
  }

  return (
    <div>
      <Row style={{textAlign: 'center'}}>
        <Col md={12}>
          <h1>My Grocery List</h1>
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
          {chefInfo.savedIngredients.map((groceries, index) =>
            <Row>
              <p style={{marginBottom: '0px'}}>{groceries[0]} {groceries[1].toUpperCase()} {groceries[2].toUpperCase()}</p>
              <Button
                variant='link'
                style={{ marginRight: '12.25px', padding: 0, height: '30px'}}
                value={index}
                onClick={removeIngredientHandler}
                >
                <FaTrash />
              </Button>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  )
}



export default SavedIngredientsPage;
