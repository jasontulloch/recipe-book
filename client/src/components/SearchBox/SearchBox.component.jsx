import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

import Select from 'react-select';
import { listRecipeNames } from '../../actions/recipeActions';
import { useSelector, useDispatch } from 'react-redux';
import './SearchBox.styles.css';

import { isBrowser, isMobile } from 'react-device-detect';

const SearchBox = ({ history }) => {
  const [keywordRecipeName, setKeywordRecipeName] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(isBrowser)
    if (keywordRecipeName.trim()) {
      history.push('/recipes', { nameRecipe: keywordRecipeName })
    } else {
      history.push('/recipes')
    }
    setKeywordRecipeName('')
  }

  const recipeAllNames = useSelector(state => state.recipeAllNames)
  const { recipeNames } = recipeAllNames

  let allRecipeNames = recipeNames && recipeNames.map((recipe) => (
    {
      label: recipe.recipe_name,
      value: recipe.recipe_name
    }
  ))


  const [displayRecipes, setDisplayRecipes] = useState(allRecipeNames)
  //console.log(displayRecipes)

  // this works to add to my object
  //allRecipeNames[allRecipeNames.length] = {label: 'hi', value: 'yo'}

  const styles = {
    container: base => {
      //console.log('container:', base)
      return {
        ...base,
        width: 175,
        fontSize:12,
        zIndex: 100,
      }
    },
    menuList: styles => {
      return {
        boxSizing: 'border-box',
        maxHeight: 200,
        overflowY: 'hidden',
        paddingBottom: 4,
        paddingTop: 4,
        position: 'fixed',
        zIndex: 100,
        backgroundColor: 'white'
      }
    },
  };

  const searchRecipeNameHandler = (e) => {
    if (e) {
      setKeywordRecipeName(e.value)
      if (isBrowser) {
        history.push('/recipes', { nameRecipe: e.value })
      } else {
        history.push('/recipes', { nameRecipe: e.value })
      }
    }
  }

  const newSearchItemHandler = (e) => {
    allRecipeNames[0] = {label: e.target.value, value: e.target.value}
    setDisplayRecipes(allRecipeNames)
  }

  //console.log(allRecipeNames)

  useEffect(() => {
    if (searchRecipeNameHandler) {
      dispatch(listRecipeNames())
    }
  }, [keywordRecipeName])

  return (
    <div>
      <Form onSubmit={submitHandler} inline>
        <div onKeyUp={newSearchItemHandler}>
          <Select
            options={displayRecipes}
            placeholder='Search Recipes...'
            autoSize={true}
            onChange={searchRecipeNameHandler}
            value={displayRecipes.filter(function(recipe) {
              return recipe.value === keywordRecipeName
            })}
            noOptionsMessage={() => null}
            styles={styles}
            theme={theme => ({
              ...theme,
              borderRadius: 0,
              borderColor: 'none',
              colors: {
                ...theme.colors,
                primary25: '#4bbf73',
                primary: '#4bbf73',
              },
            })}
          />
        </div>
      </Form>
    </div>
  )
}

export default SearchBox;
