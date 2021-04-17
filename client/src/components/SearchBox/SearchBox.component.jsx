import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import Select from 'react-select';
import { listRecipeNames } from '../../actions/recipeActions';
import { useSelector, useDispatch } from 'react-redux';
import './SearchBox.styles.scss';

const SearchBox = ({ history }) => {
  const [keywordRecipeName, setKeywordRecipeName] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    if(keywordRecipeName.trim()) {
      history.push(`/recipes/search/keywordRecipeName=${keywordRecipeName}/page/1`)
      // Need to set keyword recipe name to another variable and then clear
    } else {
      history.push('/recipes')
    }
    setKeywordRecipeName('')
  }

  const recipeAllNames = useSelector(state => state.recipeAllNames)
  const { loading, error, recipeNames } = recipeAllNames

  console.log(recipeNames)

  const allRecipeNames = recipeNames && recipeNames.map((recipe) => (
    {
      label: recipe.recipe_name,
      value: recipe.recipe_name
    }
  ))

  const styles = {
    container: base => {
      //console.log('container:', base)
      return {
        ...base,
        width: 200,
        fontSize:7.5,
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
    } else {
      setKeywordRecipeName('')
    }
  }

  useEffect(() => {
    dispatch(listRecipeNames())
  }, [keywordRecipeName])

  return (
    <div>
      <Form onSubmit={submitHandler} inline>
        <Select
          isClearable={true}
          options={allRecipeNames}
          placeholder='Search Recipes...'
          autoSize={true}
          onChange={searchRecipeNameHandler}
          value={allRecipeNames.filter(function(recipe) {
            return recipe.value === keywordRecipeName
          })}
          styles={styles}
        />
        {(keywordRecipeName.length < 1) ?  (
        <Button type='submit' variant='outline-success' className='ml-1 p-1' style={{fontSize: '8.5px'}}>
          Search All
        </Button>
        ) : (
        <Button type='submit' variant='outline-success' className='ml-1 p-1' style={{fontSize: '8.5px'}}>
          Search
        </Button>
        )}
      </Form>
    </div>
  )
}

export default SearchBox;
