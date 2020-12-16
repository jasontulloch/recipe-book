import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Tabs, Tab, Table, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer/FormContainer.component';
import Message from '../../components/Message/Message.component';
import { listRecipes } from '../../actions/recipeActions';
import { RECIPE_UPDATE_RESET } from '../../constants/recipeConstants';

import Unitz from 'unitz'

const HomePage = ({ match, history }) => {
  const dispatch = useDispatch()

  // Note how recipeList matches in store.js
  // Passing in loading, error, recipes from recipeReducer.js
  // Use selector will get the recipes and display them
  const recipeList = useSelector(state => state.recipeList)
  const { loading, error, recipes, page, pages } = recipeList

  // This is firing off the action to get recipes in state
  useEffect(() => {
    dispatch(listRecipes())
  }, [dispatch])

  const servingsize = 2
  const quantity1 = recipes.map((recipe) =>
    eval(recipe.ingredients[0][0]) * servingsize
  )
  const measurement1 = recipes.map((recipe) =>
    recipe.ingredients[0][1]
  )

  const merge = quantity1 + ' ' + measurement1;
  const mergeBetter = Unitz.compound(merge, ['gal', 'qt', 'pt', 'c', 'tbsp', 'tsp', 'oz']);
  const mergeNew = String(mergeBetter)
  const mergeNewer = mergeNew.replace('gal', 'Gallon')


  return (
    <div>
        <Table>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Measurement</th>
              <th>Ingredient</th>
            </tr>
          </thead>
          <tbody>

          {recipes.map((recipe) =>
            <div>
              <tr>
                <td>{recipe.ingredients[0][0]}</td>
                <td>{recipe.ingredients[0][1]}</td>
                <td>{recipe.ingredients[0][2]}</td>
              </tr>
            </div>
          )}
          </tbody>
        </Table>
        <h1>HI</h1>
        <h1>{quantity1}</h1>
        <h1>{mergeBetter}</h1>
        <h1>{mergeNew}</h1>
        <h1>{mergeNewer}</h1>
    </div>
  )
}

export default HomePage;
