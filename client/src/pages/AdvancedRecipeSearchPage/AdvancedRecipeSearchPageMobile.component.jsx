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

    const highestRatedRecipesHandler = () => {
        history.push('/recipes/page/1', { netVotesState: true, netVotesSortState: -1 })
    }
    const newRecipesHandler = () => {
        history.push('/recipes/page/1', { createdAtState: true, createdAtSortState: -1 })
    }
    const fiveIngredientsOrFewerRecipesHandler = () => {
        history.push('/recipes/page/1', { fiveIngredientsOrFewerRecipesState: true, netVotesSortState: -1 })
    }
    const tenIngredientsOrFewerRecipesHandler = () => {
        history.push('/recipes/page/1', { tenIngredientsOrFewerRecipesState: true, netVotesSortState: -1 })
    }
    const fiveStepsOrFewerRecipesHandler = () => {
        history.push('/recipes/page/1', { fiveStepsOrFewerRecipesState: true, netVotesSortState: -1 })
    }
    const tenStepsOrFewerRecipesHandler = () => {
        history.push('/recipes/page/1', { tenStepsOrFewerRecipesState: true, netVotesSortState: -1 })
    }
    const thirtyMinutesAndUnderRecipesHandler = () => {
        history.push('/recipes/page/1', { thirtyMinutesAndUnderRecipesState: true, netVotesSortState: -1 })
    }
    const sixtyMinutesAndUnderRecipesHandler = () => {
        history.push('/recipes/page/1', { sixtyMinutesAndUnderRecipesState: true, netVotesSortState: -1 })
    }

    return (
        <div>
            <Row>
                <Col xs={12} style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <Route render={({ history }) => <SearchBox history={history} />} /> 
                </Col>
                <Col xs={12} style={{marginLeft: '10px'}}>
                    <p style={{marginTop: '10px', marginBottom: '0px'}}>Find all recipes that are...</p>
                    <div style={{overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap'}}>
                            <div style={{display: 'inline-block', height: '35px'}}>
                                 <ClickableBadgeBooleans isVegan={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>Test</ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isVegetarian={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isGlutenFree={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isKetogenic={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isPescatarian={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isDairy={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isEgg={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isNuts={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isShellfish={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isSoy={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isWheat={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isBreakfastBrunch={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isMainDish={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isSideSauce={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isDessert={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isSnack={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isAppetizer={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                                 <ClickableBadgeBooleans isDrink={true} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                            </div>
                    </div>
                </Col>
            </Row>
            <Row style={{margin: '10px 0px 0px 0px'}}>
                <Col xs={6} style={{paddingRight: '5px'}}>
                    <Button 
                        style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                        onClick={(e) => history.push(`/recipes`)}
                    >
                    <RiBookReadLine style={{marginRight: '5px'}}/>
                        All Recipes
                    </Button>
                </Col>
                <Col xs={6} style={{paddingLeft: '5px'}}>
                    <Button 
                        style={{width: '100%', fontSize: '.75rem', padding: '6px'}}
                        onClick={(e) => history.push(`/chefs/page/1`)}
                    >
                        <GiCook style={{marginRight: '5px'}}/>
                        Find Chefs
                    </Button>
                </Col>     
                <Col xs={12}>
                    <Button
                        style={{padding: '15px', width: '100%', marginTop: '10px' }}
                        onClick={(e) => history.push(`/cookbooks/page/1`)}
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
                            <Link to={`/recipes/advanced-search-results/keywordCountry=${country[1]}/page/1`}>
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{country[1]}</Badge>
                            </Link>
                        </div>
                    )}
                    </div>
                    <div style={{overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap', height: '35px'}}>
                    {Countries.slice(50,100).map((country) =>
                        <div style={{display: 'inline-block'}}>
                            <Link to={`/recipes/advanced-search-results/keywordCountry=${country[1]}/page/1`}>
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{country[1]}</Badge>
                            </Link>
                        </div>
                    )}
                    </div>
                    <div style={{overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap', height: '35px', marginBottom: '50px'}}>
                    {Countries.slice(100,145).map((country) =>
                        <div style={{display: 'inline-block'}}>
                            <Link to={`/recipes/advanced-search-results/keywordCountry=${country[1]}/page/1`}>
                                <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{country[1]}</Badge>
                            </Link>
                        </div>
                    )}
                    </div>
                </Col>                 
            </Row>    
        </div>
    )
}

export default AdvancedRecipeSearchPageMobile;