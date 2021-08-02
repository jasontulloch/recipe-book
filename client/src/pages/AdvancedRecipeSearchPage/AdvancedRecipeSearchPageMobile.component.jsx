import React, { useEffect, useState } from 'react';
import { Route, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Badge } from 'react-bootstrap';

import SearchBox from '../../components/SearchBox/SearchBox.component';
import ClickableBadgeBooleans from '../../components/ClickableBadgeBooleans/ClickableBadgeBooleans.component';

import Countries from '../../lists/countries';

import { GiBookshelf, GiCook } from 'react-icons/gi';
import { RiBookReadLine } from 'react-icons/ri';

const AdvancedRecipeSearchPageMobile = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const veganRecipesHandler = (e) => { history.push('/recipes', { isVegan: true, isVegetarian: '', isGlutenFree: '', isKetogenic: '', isPescatarian: '' }) }
    const vegetarianRecipesHandler = (e) => { history.push('/recipes', { isVegan: '', isVegetarian: true, isGlutenFree: '', isKetogenic: '', isPescatarian: '' }) }
    const glutenFreeRecipesHandler = (e) => { history.push('/recipes', { isVegan: '', isVegetarian: '', isGlutenFree: true, isKetogenic: '', isPescatarian: '' }) }
    const ketogenicRecipesHandler = (e) => { history.push('/recipes', { isVegan: '', isVegetarian: '', isGlutenFree: '', isKetogenic: true, isPescatarian: '' }) }
    const pescatarianRecipesHandler = (e) => { history.push('/recipes', { isVegan: '', isVegetarian: '', isGlutenFree: '', isKetogenic: '', isPescatarian: true }) }
    const dairyRecipesHandler = (e) => { history.push('/recipes', { isDairy: true, isEgg: '', isNuts: '', isShellfish: '', isSoy: '', isWheat: '' }) }
    const eggRecipesHandler = (e) => { history.push('/recipes', { isDairy: '', isEgg: true, isNuts: '', isShellfish: '', isSoy: '', isWheat: '' }) }
    const nutsRecipesHandler = (e) => { history.push('/recipes', { isDairy: '', isEgg: '', isNuts: true, isShellfish: '', isSoy: '', isWheat: '' }) }
    const shellfishRecipesHandler = (e) => { history.push('/recipes', { isDairy: '', isEgg: '', isNuts: '', isShellfish: true, isSoy: '', isWheat: '' }) }
    const soyRecipesHandler = (e) => { history.push('/recipes', { isDairy: '', isEgg: '', isNuts: '', isShellfish: '', isSoy: true, isWheat: '' }) }
    const wheatRecipesHandler = (e) => { history.push('/recipes', { isDairy: '', isEgg: '', isNuts: '', isShellfish: '', isSoy: '', isWheat: true }) }
    const breakfastBrunchRecipesHandler = (e) => { history.push('/recipes', { isBreakfastBrunch: true, isMainDish: '', isSideSauce: '', isDessert: '', isSnack: '', isAppetizer: '', isDrink: '' }) }
    const mainDishRecipesHandler = (e) => { history.push('/recipes', { isBreakfastBrunch: '', isMainDish: true, isSideSauce: '', isDessert: '', isSnack: '', isAppetizer: '', isDrink: '' }) }
    const sideSauceRecipesHandler = (e) => { history.push('/recipes', { isBreakfastBrunch: '', isMainDish: '', isSideSauce: true, isDessert: '', isSnack: '', isAppetizer: '', isDrink: '' }) }
    const dessertRecipesHandler = (e) => { history.push('/recipes', { isBreakfastBrunch: '', isMainDish: '', isSideSauce: '', isDessert: true, isSnack: '', isAppetizer: '', isDrink: '' }) }
    const snackRecipesHandler = (e) => { history.push('/recipes', { isBreakfastBrunch: '', isMainDish: '', isSideSauce: '', isDessert: '', isSnack: true, isAppetizer: '', isDrink: '' }) }
    const appetizerRecipesHandler = (e) => { history.push('/recipes', { isBreakfastBrunch: '', isMainDish: '', isSideSauce: '', isDessert: '', isSnack: '', isAppetizer: true, isDrink: '' }) }
    const drinkRecipesHandler = (e) => { history.push('/recipes', { isBreakfastBrunch: '', isMainDish: '', isSideSauce: '', isDessert: '', isSnack: '', isAppetizer: '', isDrink: true }) }
    const countryRecipesHandler = (e) => { history.push('/recipes', { countryName: e.target.textContent }) }
    const allRecipesHandler = () => { history.push('/recipes', { allRecipesState: true }) }
    const highestRatedRecipesHandler = () => { history.push('/recipes', { netVotesState: true, netVotesSortState: -1 }) }
    const newRecipesHandler = () => { history.push('/recipes', { createdAtState: true, createdAtSortState: -1 }) }
    const fiveIngredientsOrFewerRecipesHandler = () => { history.push('/recipes', { fiveIngredientsOrFewerRecipesState: true, netVotesSortState: -1 }) }
    const tenIngredientsOrFewerRecipesHandler = () => { history.push('/recipes', { tenIngredientsOrFewerRecipesState: true, netVotesSortState: -1 }) }
    const fiveStepsOrFewerRecipesHandler = () => { history.push('/recipes', { fiveStepsOrFewerRecipesState: true, netVotesSortState: -1 }) }
    const tenStepsOrFewerRecipesHandler = () => { history.push('/recipes', { tenStepsOrFewerRecipesState: true, netVotesSortState: -1 }) }
    const thirtyMinutesAndUnderRecipesHandler = () => { history.push('/recipes', { thirtyMinutesAndUnderRecipesState: true, netVotesSortState: -1 }) }
    const sixtyMinutesAndUnderRecipesHandler = () => { history.push('/recipes', { sixtyMinutesAndUnderRecipesState: true, netVotesSortState: -1 }) }

    return (
        <div>
            <Row>
                <Col xs={12} style={{display: 'flex', justifyContent: 'space-evenly', paddingTop: '10px'}}>
                    <Route render={({ history }) => <SearchBox history={history} />} /> 
                </Col>
                <Col xs={12} style={{marginLeft: '10px'}}>
                    <p style={{marginTop: '10px', marginBottom: '0px'}}>Find all recipes that are...</p>
                    <div style={{overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap'}}>
                            <div style={{display: 'inline-block', height: '35px'}}>
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={veganRecipesHandler}>Vegan</Badge>
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={vegetarianRecipesHandler}>Vegetarian</Badge> 
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={glutenFreeRecipesHandler}>Gluten Free</Badge>                                                               
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={ketogenicRecipesHandler}>Ketogenic</Badge>    
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={pescatarianRecipesHandler}>Pescatarian</Badge>    
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={dairyRecipesHandler}>Dairy Free</Badge>    
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={eggRecipesHandler}>Egg Free</Badge>                                  
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={nutsRecipesHandler}>Nuts Free</Badge>                                  
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={shellfishRecipesHandler}>Shellfish Free</Badge>                                  
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={soyRecipesHandler}>Soy Free</Badge>                                  
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={wheatRecipesHandler}>Wheat Free</Badge>
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={breakfastBrunchRecipesHandler}>Breakfast or Brunch</Badge>  
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={mainDishRecipesHandler}>Main Dish</Badge>  
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={sideSauceRecipesHandler}>Side or Sauce</Badge>  
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={dessertRecipesHandler}>Dessert</Badge>  
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={snackRecipesHandler}>Snack</Badge>  
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}} onClick={appetizerRecipesHandler}>Appetizer</Badge>  
                                <Badge pill variant='primary' style={{marginRight: '15px', marginTop: '5px'}} onClick={drinkRecipesHandler}>Drink</Badge>                                    
                            </div>
                    </div>
                </Col>
            </Row>
            <Row style={{margin: '10px 0px 0px 0px'}}>
                <Col xs={6} style={{paddingRight: '5px'}}>
                    <Button 
                        style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                        onClick={allRecipesHandler}
                    >
                    <RiBookReadLine style={{marginRight: '5px'}}/>
                        All Recipes
                    </Button>
                </Col>
                <Col xs={6} style={{paddingLeft: '5px'}}>
                    <Button 
                        style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                        onClick={(e) => history.push(`/chefs`)}
                    >
                        <GiCook style={{marginRight: '5px'}}/>
                        Find Chefs
                    </Button>
                </Col>     
                <Col xs={12}>
                    <Button
                        style={{padding: '15px', width: '100%', marginTop: '10px' }}
                        onClick={(e) => history.push(`/cookbooks`)}
                        disabled
                    >
                        <GiBookshelf style={{marginRight: '5px'}}/>
                        Cookbooks
                    </Button>
                </Col>        
            </Row>  
            <Row style={{marginTop: '10px'}}>
                <Col xs={12} style={{marginLeft: '10px'}}>
                    <p style={{marginTop: '10px', marginBottom: '0px'}}>Browse...</p>
                </Col>
            </Row>
            <Row style={{margin: '10px 0px 0px 0px'}}>
                <Col xs={6} style={{paddingRight: '5px'}}>
                    <Button 
                        style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                        onClick={highestRatedRecipesHandler}
                    >
                    <RiBookReadLine style={{marginRight: '5px'}}/>
                        Top Recipes
                    </Button>
                </Col>
                <Col xs={6} style={{paddingLeft: '5px'}}>
                    <Button 
                        style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                        onClick={newRecipesHandler}
                    >
                        <GiBookshelf style={{marginRight: '5px'}}/>
                        New Recipes
                    </Button>
                </Col>
                <Col xs={6} style={{paddingRight: '5px', paddingTop: '10px'}}>
                    <Button 
                        style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                        onClick={fiveStepsOrFewerRecipesHandler}
                    >
                    <RiBookReadLine style={{marginRight: '5px'}}/>
                        Less Than 5 Steps
                    </Button>
                </Col>
                <Col xs={6} style={{paddingLeft: '5px', paddingTop: '10px'}}>
                    <Button 
                        style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                        onClick={tenStepsOrFewerRecipesHandler}
                    >
                        <GiBookshelf style={{marginRight: '5px'}}/>
                        Less Than 10 Steps
                    </Button>
                </Col>   
                <Col xs={6} style={{paddingRight: '5px', paddingTop: '10px'}}>
                    <Button 
                        style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                        onClick={fiveIngredientsOrFewerRecipesHandler}
                    >
                    <RiBookReadLine style={{marginRight: '5px'}}/>
                        5 or Less Ingredients
                    </Button>
                </Col>
                <Col xs={6} style={{paddingLeft: '5px', paddingTop: '10px'}}>
                    <Button 
                        style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                        onClick={tenIngredientsOrFewerRecipesHandler}
                    >
                        <GiBookshelf style={{marginRight: '5px'}}/>
                        10 or Less Ingredients
                    </Button>
                </Col>
                <Col xs={6} style={{paddingRight: '5px', paddingTop: '10px'}}>
                    <Button 
                        style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                        onClick={thirtyMinutesAndUnderRecipesHandler}
                    >
                    <RiBookReadLine style={{marginRight: '5px'}}/>
                        Under 30 Minutes
                    </Button>
                </Col>
                <Col xs={6} style={{paddingLeft: '5px', paddingTop: '10px'}}>
                    <Button 
                        style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                        onClick={sixtyMinutesAndUnderRecipesHandler}
                    >
                        <GiBookshelf style={{marginRight: '5px'}}/>
                        Under 60 Minutes
                    </Button>
                </Col>    
                <Col xs={12}>
                    <p style={{marginTop: '10px', marginBottom: '0px'}}>Country of origin...</p>
                    <div style={{overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap', height: '35px'}}>
                    {Countries.slice(0,50).map((country) =>
                        <div style={{display: 'inline-block'}}>
                            <Badge 
                                pill 
                                variant='primary' 
                                style={{marginRight: '5px', marginTop: '5px'}}
                                onClick={countryRecipesHandler}
                            >
                                {country[1]}
                            </Badge>
                        </div>
                    )}
                    </div>
                    <div style={{overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap', height: '35px'}}>
                    {Countries.slice(50,100).map((country) =>
                        <div style={{display: 'inline-block'}}>
                            <Badge 
                                pill 
                                variant='primary'
                                style={{marginRight: '5px', marginTop: '5px'}}
                                onClick={countryRecipesHandler}
                            >
                                {country[1]}
                            </Badge>
                        </div>
                    )}
                    </div>
                    <div style={{overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap', height: '35px', marginBottom: '50px'}}>
                    {Countries.slice(100,145).map((country) =>
                        <div style={{display: 'inline-block'}}>
                            <Badge 
                                pill 
                                variant='primary'
                                style={{marginRight: '5px', marginTop: '5px'}}
                                onClick={countryRecipesHandler}
                            >
                                {country[1]}
                            </Badge>
                        </div>
                    )}
                    </div>
                </Col>                 
            </Row>    
        </div>
    )
}

export default AdvancedRecipeSearchPageMobile;