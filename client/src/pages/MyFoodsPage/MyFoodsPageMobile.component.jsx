import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { Row, Col, Button, Table, Card, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    createRecipe,
    listMyRecipes,
    listMySavedRecipes,
} from '../../actions/recipeActions';
import {
    listMyFollowedChefs
} from '../../actions/chefActions';
import {
    createCookbook,
    listMyCookbooks
} from '../../actions/cookbookActions';
import { RECIPE_CREATE_RESET } from '../../constants/recipeConstants';
import { COOKBOOK_CREATE_RESET } from '../../constants/cookbookConstants';

import RecipeCard from '../../components/RecipeCard/RecipeCard.component';
import ChefCard from '../../components/ChefCard/ChefCard.component';

import InfiniteScrollLoader from '../../components/InfiniteScrollLoader/InfiniteScrollLoader.component';

import { HiOutlineClipboardList } from 'react-icons/hi'
import { GiBookmark, GiBookshelf, GiCook } from 'react-icons/gi';


const MyFoodsPageMobile = () => {

    const location = useLocation()
    const { mySavedRecipesListPageMobileState } = location.state || { mySavedRecipesListPageMobileState: false }
    const { myRecipesListPageMobileState } = location.state || { myRecipesListPageMobileState: false }
    const { myChefsListPageMobileState } = location.state || { myChefsListPageMobileState: false }
    const { myCookboksListPageMobileState } = location.state || { myCookboksListPageMobileState: false }

    const [viewLikedRecipes, setViewLikedRecipes] = useState(mySavedRecipesListPageMobileState)
    const [viewFavoriteChefs, setViewFavoriteChefs] = useState(myChefsListPageMobileState)
    const [viewMyRecipes, setViewMyRecipes] = useState(myRecipesListPageMobileState)
    const [viewMyCookbooks, setViewMyCookbooks] = useState(myCookboksListPageMobileState)
    
    const history = useHistory()
    const dispatch = useDispatch()

    const recipeCreate = useSelector(state => state.recipeCreate)
    const {
      success: successCreate,
      recipe: createdRecipe,
    } = recipeCreate

    const cookbookCreate = useSelector(state => state.cookbookCreate)
    const {
      success: successCookbookCreate,
    } = cookbookCreate
    
    const recipeMySaved = useSelector(state => state.recipeMySaved)
    const { savedRecipes, chefNames } = recipeMySaved

    const recipeMyList = useSelector(state => state.recipeMyList)
    const { myRecipes } = recipeMyList

    const chefMyFollowed = useSelector(state => state.chefMyFollowed)
    const { loading, error, chefs } = chefMyFollowed

    const chefLogin = useSelector(state => state.chefLogin)
    const { chefInfo } = chefLogin

    useEffect(() => {
        dispatch({ type: RECIPE_CREATE_RESET })
        dispatch({ type: COOKBOOK_CREATE_RESET })

        if(viewLikedRecipes) {
            dispatch(listMySavedRecipes())
        } 
        // if(viewFavoriteChefs) {
        //     dispatch(listMyFollowedChefs())
        // }
        if(viewMyRecipes) {
            dispatch(listMyRecipes())
        } 
        if(successCookbookCreate) {
            history.push(`/mycookbooks`)
        }
        

        if(successCreate) {
          history.push(`/myrecipes/${createdRecipe._id}/edit`)
        } 
    }, [
        dispatch,
        history,
        successCreate,
        createdRecipe,
        viewLikedRecipes,
        viewMyRecipes,
        viewFavoriteChefs,
        chefInfo,
        successCookbookCreate,
        createCookbook
    ])

    const createRecipeHandler = () => {
        dispatch(createRecipe())
    }
    const createCookbookHandler = () => {
        dispatch(createCookbook())
    }
    const viewLikedRecipesHandler = () => {
        setViewLikedRecipes(true)
        setViewFavoriteChefs(false)
        setViewMyRecipes(false)
        setViewMyCookbooks(false)
    }
    const viewFavoriteChefsHandler = () => {
        setViewLikedRecipes(false)
        setViewFavoriteChefs(true)
        setViewMyRecipes(false)
        setViewMyCookbooks(false)
    }
    const viewMyRecipesHandler = () => {
        setViewLikedRecipes(false)
        setViewFavoriteChefs(false)
        setViewMyRecipes(true)
        setViewMyCookbooks(false)
    }
    const viewMyCookbooksHandler = () => {
        setViewLikedRecipes(false)
        setViewFavoriteChefs(false)
        setViewMyRecipes(false)
        setViewMyCookbooks(true)
    }

    // Lazy Loading!!!
    const [savedRecipePageNumber, setSavedRecipePageNumber] = useState(1);
    const [totalSavedRecipesPages, setTotalSavedRecipesPages] = useState(1);
    const [currentSavedRecipesResult, setCurrentSavedRecipesResult] = useState([]);
    const [currentChefNamesResult, setCurrentChefNamesResult] = useState([]);

    const [followedChefsPageNumber, setFollowedChefsPageNumber] = useState(1);
    const [totalFollowedChefsPages, setTotalFollowedChefsPages] = useState(1);
    const [currentFollowedChefsResult, setCurrentFollowedChefsResult] = useState([]);

    const [myRecipesPageNumber, setMyRecipesPageNumber] = useState(1);
    const [totalMyRecipesPages, setTotalMyRecipesPages] = useState(1);
    const [currentMyRecipesResult, setCurrentMyRecipesResult] = useState([]);

    const [myCookbooksPageNumber, setMyCookbooksPageNumber] = useState(1);
    const [totalMyCookbooksPages, setTotalMyCookbooksPages] = useState(1);
    const [currentMyCookbooksResult, setCurrentMyCookbooksResult] = useState([]);

    const [isFetching, setIsFetching] = useState(false);
  
    useEffect(() => {
      fetchData();
      window.addEventListener('scroll', handleScroll);
    }, []);
  
    const handleScroll = () => {
      if (
        Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
        isFetching
      )
        return;
      setIsFetching(true);
    };
  
    const fetchData = async () => {
      setTimeout(async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${chefInfo.token}`
          }
        }
        if (setViewLikedRecipes) {
            const savedRecipesResult = await axios.get(`/api/recipes/savedRecipes?pageNumber=${savedRecipePageNumber}`, config)
            const savedRecipeData = await savedRecipesResult.data.mySavedRecipes
            setTotalSavedRecipesPages(savedRecipesResult.data.pages)
            //if (savedRecipePageNumber > totalSavedRecipesPages) return
            setCurrentSavedRecipesResult(() => {
                return [...currentSavedRecipesResult, ...savedRecipeData];
            });
            const chefNamesData = await savedRecipesResult.data.chefNames
            setCurrentChefNamesResult(() => {
                return [...currentChefNamesResult, ...chefNamesData];
            });
            setSavedRecipePageNumber(savedRecipePageNumber + 1)
            //localStorage.setItem('savedRecipePageNumber', savedRecipePageNumber)
        }
        if (setViewFavoriteChefs) {
            const followedChefsResult = await axios.get(`/api/chef/${chefInfo._id}/mychefs?pageNumber=${followedChefsPageNumber}`, config)
            const followedChefData = await followedChefsResult.data.chefs
            setTotalFollowedChefsPages(followedChefsResult.data.pages)
            //if (followedChefsPageNumber > totalFollowedChefsPages) return
            setCurrentFollowedChefsResult(() => {
                return [...currentFollowedChefsResult, ...followedChefData];
            });
            setFollowedChefsPageNumber(followedChefsPageNumber + 1)
            console.log(followedChefsPageNumber)
           //localStorage.setItem('followedChefsPageNumber', followedChefsPageNumber)
        }
        if (setViewMyRecipes) {
            const myRecipesResult = await axios.get(`/api/recipes/myRecipes?pageNumber=${myRecipesPageNumber}`, config)
            const myRecipesData = await myRecipesResult.data.myRecipes
            setTotalMyRecipesPages(myRecipesResult.data.pages)
            //if (myRecipesPageNumber > totalMyRecipesPages) return
            setCurrentMyRecipesResult(() => {
                return [...currentMyRecipesResult, ...myRecipesData];
            });
            setMyRecipesPageNumber(myRecipesPageNumber + 1)
            //localStorage.setItem('myRecipesPageNumber', myRecipesPageNumber)
        }
        if (setViewMyCookbooks) {
            const myCookbooksResult = await axios.get(`/api/cookbooks/myCookbooks?pageNumber=${myCookbooksPageNumber}`, config)
            const myCookbooksData = await myCookbooksResult.data.myCookbooks
            setTotalMyCookbooksPages(myCookbooksResult.data.pages)
            //if (myCookbooksPageNumber > totalMyCookbooksPages) return
            setCurrentMyCookbooksResult(() => {
                return [...currentMyCookbooksResult, ...myCookbooksData];
            });
            setMyCookbooksPageNumber(myCookbooksPageNumber + 1)
            //localStorage.setItem('myCookbooksPageNumber', myCookbooksPageNumber)
        }              
      }, 1000);
    };
  
    useEffect(() => {
      if (!isFetching) return;
        fetchMoreListItems()
    }, [isFetching]);
  
    const fetchMoreListItems = () => {
      fetchData();
      setIsFetching(false);
    };

    return (
        <div>
            <Row style={{margin: '0px'}}>
                <Col xs={6}>
                    <Button
                        style={{padding: '15px 5px 15px 5px', width: '100%', backgroundColor: '#343a40' }}
                        onClick={createRecipeHandler}
                        variant='outline-success'
                    >
                        <i className='fas fa-plus' style={{paddingRight: '5px'}} />
                        Create a Recipe
                    </Button>
                </Col>
                <Col xs={6}>
                    <Button
                        style={{padding: '15px 5px 15px 5px', width: '100%', backgroundColor: '#343a40' }}
                        onClick={createCookbookHandler}
                        variant='outline-success'
                    >
                        <i className='fas fa-plus' style={{paddingRight: '5px'}} />
                        New Cookbook
                    </Button>
                </Col>
                <Col xs={12}>
                    <Link
                        to={`/grocerylist`}
                    >
                        <Button
                            style={{marginTop: '10px', padding: '5px', width: '100%', backgroundColor: '#343a40' }}
                            onClick={createCookbookHandler}
                        >
                            <HiOutlineClipboardList style={{marginRight: '5px'}} />
                            Go to Grocery List
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row style={{margin: '15px 0px 30px 0px'}}>
                <div style={{overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap', paddingLeft: '15px', height: '35px'}}>
                    <Badge 
                        pill variant={(viewLikedRecipes || (!viewFavoriteChefs && !viewMyRecipes && !viewMyCookbooks)) ? 'success' : 'primary' }
                        style={{marginRight: '5px', marginTop: '5px'}}
                        onClick={viewLikedRecipesHandler}
                    >
                        Liked Recipes
                    </Badge>
                    <Badge 
                        pill variant={(viewFavoriteChefs) ? 'success' : 'primary' }
                        style={{marginRight: '5px', marginTop: '5px'}}
                        onClick={viewFavoriteChefsHandler}
                    >
                        Favorite Chefs
                    </Badge>
                    <Badge 
                        pill variant={(viewMyRecipes) ? 'success' : 'primary' }
                        style={{marginRight: '5px', marginTop: '5px'}}
                        onClick={viewMyRecipesHandler}
                    >
                        My Recipes
                    </Badge>
                    <Badge 
                        pill variant={(viewMyCookbooks) ? 'success' : 'primary' }
                        style={{marginRight: '5px', marginTop: '5px'}}
                        onClick={viewMyCookbooksHandler}
                    >
                        My Cookbooks
                    </Badge>
                </div>
                <Col xs={12}>
                    <Table responsive borderless className='table-sm'>
                        <tbody>
                        {(viewLikedRecipes || (!viewFavoriteChefs && !viewMyRecipes && !viewMyCookbooks)) && currentSavedRecipesResult && currentSavedRecipesResult.map((recipe) => (         
                            <tr key={recipe.id}>
                                <Link
                                    to={`/recipe/${recipe._id}`}
                                    style={recipe.isPublished === false ? {pointerEvents: "none", textDecoration: 'none'} : {}}
                                >
                                <td style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                    <Card style={{border: 'none'}}>
                                        <Card.Img src={recipe.recipe_cover_image} alt={recipe.recipe_name} style={{height: '77px', width: '100px', borderRadius: '25px'}} />
                                    </Card>
                                </td>
                                <td style={{paddingTop: '20.5px'}}>
                                    {recipe.recipe_name.length > 20 ? (
                                        <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                                            {recipe.recipe_name.slice(0, 40) + (recipe.recipe_name.length > 40 ? "..." : "")}
                                        </div>
                                    ) : (
                                        <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                                            {recipe.recipe_name}
                                        </div>
                                    )}
                                    {currentChefNamesResult.length > 0 && currentChefNamesResult.find( ({ _id }) => _id === recipe.chef ).username > 15 ? (
                                    <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                                        {currentChefNamesResult.find( ({ _id }) => _id === recipe.chef ).username.slice(0, 15) + (currentChefNamesResult.find( ({ _id }) => _id === recipe.chef ).username > 15 ? "..." : "")}
                                    </div>
                                    ) : (
                                    <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                                        {currentChefNamesResult.length > 0 && currentChefNamesResult.find( ({ _id }) => _id === recipe.chef ).username}
                                    </div>
                                    )}
                                </td>
                                </Link>
                            </tr>
                        ))}
                        {(viewLikedRecipes || (!viewFavoriteChefs && !viewMyRecipes && !viewMyCookbooks)) && (
                            <InfiniteScrollLoader pageNumber={savedRecipePageNumber} pages={totalSavedRecipesPages} loading={false} />
                        )}
                        {viewFavoriteChefs && currentFollowedChefsResult && currentFollowedChefsResult.map((chef) => (         
                            <tr key={chef.id}>
                                <Link
                                    to={`/chefs/${chef._id}/page/1`}
                                    style={chef.isVisible === false ? {pointerEvents: "none", textDecoration: 'none'} : {}}
                                >
                                <td style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                    <Card style={{border: 'none'}}>
                                        <Card.Img src={chef.chefPicture} alt={chef.username} style={{height: '77px', width: '100px', borderRadius: '50%'}} />
                                    </Card>
                                </td>
                                <td style={{paddingTop: '38.5px'}}>
                                    {chef.username.length > 40 ? (
                                        <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                                            {chef.username.slice(0, 40) + (chef.username.length > 40 ? "..." : "")}
                                        </div>
                                    ) : (
                                        <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                                            {chef.username}
                                        </div>
                                    )}
                                </td>
                                </Link>
                            </tr>
                        ))}
                        {viewFavoriteChefs && (
                            <InfiniteScrollLoader pageNumber={followedChefsPageNumber} pages={totalFollowedChefsPages} loading={false} />
                        )}
                        {viewMyRecipes && currentMyRecipesResult && currentMyRecipesResult.map((recipe) => (         
                            <tr key={recipe.id}>
                                <Link
                                    to={`/recipe/${recipe._id}`}
                                    style={recipe.isPublished === false ? {pointerEvents: "none", textDecoration: 'none'} : {}}
                                >
                                <td style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                    <Card style={{border: 'none'}}>
                                        <Card.Img src={recipe.recipe_cover_image} alt={recipe.recipe_name} style={{height: '77px', width: '100px', borderRadius: '25px'}} />
                                    </Card>
                                </td>
                                <td style={{paddingTop: '20.5px'}}>
                                    {recipe.recipe_name.length > 20 ? (
                                        <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                                            {recipe.recipe_name.slice(0, 40) + (recipe.recipe_name.length > 40 ? "..." : "")}
                                        </div>
                                    ) : (
                                        <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                                            {recipe.recipe_name}
                                        </div>
                                    )}
                                    {chefInfo.username > 15 ? (
                                    <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                                        {chefInfo.username.slice(0, 15) + (chefInfo.username > 15 ? "..." : "")}
                                    </div>
                                    ) : (
                                    <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                                        {chefInfo.username}
                                    </div>
                                    )}
                                </td>
                                </Link>
                            </tr>
                        ))}
                        {viewMyRecipes && (
                            <InfiniteScrollLoader pageNumber={myRecipesPageNumber} pages={totalMyRecipesPages} loading={false} />
                        )}
                        {viewMyCookbooks && currentMyCookbooksResult && currentMyCookbooksResult.map((cookbook) => (         
                            <tr key={cookbook.id}>
                                <Link
                                    to={`/cookbook/${cookbook._id}`}
                                >
                                <td style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                    <Card style={{border: 'none'}}>
                                        <Card.Img src={cookbook.cookbook_cover_image} alt={cookbook.cookbook_name} style={{height: '77px', width: '100px', borderRadius: '25px'}} />
                                    </Card>
                                </td>
                                <td style={{paddingTop: '20.5px'}}>
                                    {cookbook.cookbook_name.length > 20 ? (
                                        <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                                            {cookbook.cookbook_name.slice(0, 40) + (cookbook.cookbook_name.length > 40 ? "..." : "")}
                                        </div>
                                    ) : (
                                        <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                                            {cookbook.cookbook_name}
                                        </div>
                                    )}
                                    {chefInfo.username > 15 ? (
                                    <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                                        {chefInfo.username.slice(0, 15) + (chefInfo.username > 15 ? "..." : "")}
                                    </div>
                                    ) : (
                                    <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                                        {chefInfo.username}
                                    </div>
                                    )}
                                </td>
                                </Link>
                            </tr>
                        ))}
                        {viewMyCookbooks && (
                            <InfiniteScrollLoader pageNumber={myCookbooksPageNumber} pages={totalMyCookbooksPages} loading={false} />
                        )}
                        </tbody>                        
                    </Table>        
                </Col>
            </Row>
        </div>
    )


}

export default MyFoodsPageMobile;