import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    createRecipe,
    listMostRecentRecipes,
    listHighestRatedRecipesLimited,
  } from '../../actions/recipeActions';
import { RECIPE_CREATE_RESET } from '../../constants/recipeConstants';

import RecipeCard from '../../components/RecipeCard/RecipeCard.component';

import { GiBookmark, GiBookshelf, GiCook } from 'react-icons/gi';
import { RiBookReadLine } from 'react-icons/ri';

const HomePageMobile = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const chefLogin = useSelector(state => state.chefLogin)
    const { chefInfo } = chefLogin

    const recipeCreate = useSelector(state => state.recipeCreate)
    const {
      success: successCreate,
      recipe: createdRecipe,
    } = recipeCreate
    
    const recipeListMostRecent = useSelector(state => state.recipeListMostRecent)
    const { mostRecentRecipes } = recipeListMostRecent

    const recipeListHighestRatedLimited = useSelector(state => state.recipeListHighestRatedLimited)
    const { highestRatedRecipesLimited } = recipeListHighestRatedLimited

    useEffect(() => {
        dispatch({ type: RECIPE_CREATE_RESET })
        dispatch(listMostRecentRecipes())
        dispatch(listHighestRatedRecipesLimited())

        if(successCreate) {
          history.push(`/myrecipes/${createdRecipe._id}/edit`)
        } 
      }, [
        dispatch,
        history,
        chefInfo,
        successCreate,
        createdRecipe
      ])

    const createRecipeHandler = () => {
        dispatch(createRecipe())
      }

    return (
        <div>
            {(chefInfo) && (
            <div>
                <Row style={{margin: '0px'}}>
                    <Col xs={12}>
                        <Button
                            style={{padding: '15px', width: '100%', backgroundColor: '#343a40' }}
                            onClick={createRecipeHandler}
                            variant='outline-success'
                        >
                            <i className='fas fa-plus'> Create a Recipe</i>
                        </Button>
                    </Col>
                    <Col xs={6} style={{marginTop: '10px', paddingRight: '5px'}}>
                        <Button 
                            style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                            onClick={(e) => history.push(`/savedrecipes`)}
                        >
                            <GiBookmark style={{marginRight: '5px'}}/>
                            Liked Recipes
                        </Button>
                    </Col>
                    <Col xs={6} style={{marginTop: '10px', paddingLeft: '5px'}}>                      
                        <Button 
                            style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                            onClick={(e) => history.push(`/mychefs/page/1`)}
                        >
                            <GiCook style={{marginRight: '5px'}} />
                            Favorite Chefs
                        </Button>
                    </Col>              
                </Row>
                <Row style={{margin: '10px 0px 0px 0px'}}>
                    <Col xs={6} style={{paddingRight: '5px'}}>
                        <Button 
                            style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                            onClick={(e) => history.push(`/myrecipes`)}
                        >
                            <RiBookReadLine style={{marginRight: '5px'}}/>
                            My Recipes
                        </Button>
                    </Col>
                    <Col xs={6} style={{paddingLeft: '5px'}}>
                        <Button 
                            style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                            onClick={(e) => history.push(`/mycookbooks`)}
                        >
                            <GiBookshelf style={{marginRight: '5px'}}/>
                            My Cookbooks
                        </Button>
                    </Col>              
                </Row>  
            </div>
            )}
            <div>
                <Row style={{margin: '15px 0px 0px 0px'}}>
                    <Col xs={12}>
                        <h3>New Recipes</h3>
                    </Col>
                    <Col xs={12}>
                        <div style={{overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap'}}>
                            {mostRecentRecipes && mostRecentRecipes.map((recipe) => (
                                <div style={{display: 'inline-block', marginRight: '10px', height: '195px'}}>
                                    <RecipeCard recipe={recipe} />
                                </div>
                            ))}
                            <div>
                                
                            </div>                      
                        </div>
                    </Col>
                    <Col xs={12}>
                        <h3>Top Recipes</h3>
                    </Col>
                    <Col xs={12}>
                        <div style={{overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap'}}>
                            {highestRatedRecipesLimited && highestRatedRecipesLimited.map((recipe) => (
                                <div style={{display: 'inline-block', marginRight: '10px', height: '195px'}}>
                                    <RecipeCard recipe={recipe} />
                                </div>
                            ))}                           
                        </div>
                    </Col>
                </Row>
                
            </div>

        </div>

    )
}

export default HomePageMobile;