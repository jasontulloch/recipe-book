import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Tabs, Tab, Table, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer/FormContainer.component';

const HomePage = () => {

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Welcome to RecipeBook!</h1>
      <h4 style={{textAlign: 'center'}}>We appreciate you stopping by. If it is your first time here, let us explain who we are.</h4>

      <br/>
      <p>RecipeBook has been designed with one simple goal in mind, to get you offline faster and spending the time doing what we all love sooner. Simply put, our team was tired of advertisements filling our screens, reading stories about the inspiration for a certain recipe, and not being able to find the best recipe possible.</p>
      <p>We know other platforms exist, but give us a try, we doubt you will be disappointed. We are working hard everyday to be better than the competition.</p>
      <p>Okay, you've read this far, but what do we really offer?</p>

      <ul>
        <li>Clean + easy to read recipes with nothing in between</li>
        <li>Advanced search capabilities to find the exact recipes you are looking for... search by recipe name, country, chef, common allergins, diets, meal types / courses, etc.</li>
        <li>Real recipes posted by real people and ranked by you... how else will we ever find our what the best recipes in the world actually are?</li>
        <li>Flexible recipes that can be changed between the imperial and metric system while also being adjusted for the exact serving size you need. Simply put, we want anyone and everyone to be able to use our service.</li>
        <li>Ability to create a grocery list based on the recipe you want to cook. Premium members can send receive the grocery list in an email or text.</li>
      </ul>

      <p>So what are you waiting for? Click search above to find all recipes or use our advanced search feature to find exactly what you are looking for!</p>

    </div>
  )
}

export default HomePage;
