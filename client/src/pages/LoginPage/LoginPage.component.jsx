import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer/FormContainer.component';
import { login } from '../../actions/chefActions';

import './LoginPage.styles.css';
import { HiStop } from 'react-icons/hi';

import { isBrowser, isMobile } from 'react-device-detect';

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const redirect = location.search ? location.search.split('=')[1] : '/recipes'

  useEffect(() => {
    if (isMobile && chefInfo) {
      history.push('/')
    }
    if (isBrowser && chefInfo) {
      history.push(redirect)
    }
  }, [history, chefInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className="loginPageMobile">
      <FormContainer>
          <h1>Sign In</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Sign In
            </Button>
          </Form>

          <Row className='py-3'>
            <Col>
              New to RecipeBook?{' '}
              <Link to={'/register'}>
                Register
              </Link>
            </Col>
          </Row>
      </FormContainer>
    </div>


  )
}

export default LoginPage;
