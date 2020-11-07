import React, { useState, useEffect, setState } from 'react';
import { Form, Button, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getChefDetails, updateChefProfile } from '../../actions/chefActions';
import { CHEF_UPDATE_PROFILE_RESET } from '../../constants/chefConstants';
import FormContainer from '../../components/FormContainer/FormContainer.component';

import './ProfileEditPage.styles.scss';

const ProfileEditPage = ({ location, history }) => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isVegan, setIsVegan] = useState('')
  const [bio, setBio] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const chefDetails = useSelector(state => state.chefDetails)
  const { loading, error, chef } = chefDetails

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const chefUpdateProfile = useSelector(state => state.chefUpdateProfile)
  const { success } = chefUpdateProfile

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
        setBio(chef.bio)
        setIsVegan(chef.isVegan)
      }
    }
  }, [dispatch, history, chefInfo, chef, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateChefProfile({
        id: chef._id,
        first_name,
        last_name,
        username,
        email,
        password,
        bio,
        isVegan
      }))
    }
  }

  const [key, setKey] = useState('auth')

  //const isVegan = chef.diets[0].isVegan
  //const isVegetarian = chef.diets[0].isVegetarian
  //const handleCheck = () => {
  //  setIsVegan(!isVegan)
  //}

  console.log(isVegan)


  return (
    <FormContainer className="profileEditPage">
      <h1>Chef Profile</h1>
      <Form className='profileEditPageForm' onSubmit={submitHandler}>
        <Tabs id="profileEditPageTabs" activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab eventKey='auth' title="Auth">
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
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter a username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              >
              </Form.Control>
              <Form.Text className='muted'>Your username will be public</Form.Text>
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
            <Form.Group controlId='isVegan'>
              <Form.Check
                label='Vegan?'
                checked={isVegan}
                onChange={(e) => setIsVegan(e.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId='bio'>
              <Form.Label>Chef Bio</Form.Label>
              <Form.Control
                as='textarea'
                rows='5'
                maxLength='240'
                placeholder='Enter bio'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              >
              </Form.Control>
              <Form.Text className='muted'>Your bio will be public</Form.Text>
            </Form.Group>

          </Tab>
        </Tabs>

        <Button type='submit' variant='primary'>
          Update
        </Button>
      </Form>


    </FormContainer>

  )
}

export default ProfileEditPage;
