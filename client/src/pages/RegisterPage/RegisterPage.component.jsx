import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer/FormContainer.component';
import { register } from '../../actions/chefActions';

import './RegisterPage.styles.css';

const RegisterPage = ({ location, history }) => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const chefRegister = useSelector(state => state.chefRegister)
  const { chefInfo } = chefRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (chefInfo) {
      history.push(redirect)
    }
  }, [history, chefInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(first_name, last_name, username, email, phone_number, password))
    }
  }

  return (
    <div className="registerPageMobile" style={{paddingLeft: '200px'}}>
      <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
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
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
              required
            >
            </Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Register
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>    
  )
}

export default RegisterPage;
