import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, OverlayTrigger, Tooltip, Card, Badge, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMyRecipes,
  createRecipe,
  deleteRecipe,
} from '../../actions/recipeActions';
import { RECIPE_CREATE_RESET } from '../../constants/recipeConstants';
import InfiniteScrollLoader from '../../components/InfiniteScrollLoader/InfiniteScrollLoader.component';
import ClickableBadgeBooleans from '../../components/ClickableBadgeBooleans/ClickableBadgeBooleans.component';
import PopoverStickOnHover from '../../components/PopoverStickOnHover/PopoverStickOnHover.component';
import { IoLocationOutline } from 'react-icons/io5'
import { IoMdCreate, IoIosMore } from 'react-icons/io'
import { BiInfoCircle } from 'react-icons/bi'
import { GiBookmark, GiRank3, GiFoodTruck } from 'react-icons/gi'
import { MdTimer, MdFormatListNumbered, MdLocalGroceryStore, MdDelete, MdPublish } from 'react-icons/md'

import { isMobile } from 'react-device-detect';

import './ChefRecipesListPage.styles.css';

const ChefRecipesListPage = ({ match , history }) => {

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

  const recipeMyList = useSelector(state => state.recipeMyList)
  const { loading, myRecipes } = recipeMyList

  const recipeCreate = useSelector(state => state.recipeCreate)
  const {
    success: successCreate,
    recipe: createdRecipe,
  } = recipeCreate

  const recipeDelete = useSelector(state => state.recipeDelete)
  const {
    success: successDelete,
  } = recipeDelete

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 2000)
  }

  useEffect(() => {
    dispatch({ type: RECIPE_CREATE_RESET })

    if(isMobile) {
      history.push('/myfoods', { myRecipesListPageMobileState: true })
    }

    if(!chefInfo) {
      history.push('/login')
    }

    if(successDelete) {
      dispatch(listMyRecipes())
    }

    if(successCreate) {
      history.push(`/myrecipes/${createdRecipe._id}/edit`)
    } else {
      dispatch(listMyRecipes())
    }
  }, [
    dispatch,
    history,
    chefInfo,
    successCreate,
    successDelete,
    createdRecipe,
    isMobile
  ])

  // const deleteHandler = (id) => {
  //   if(window.confirm('Are you sure? You can not undo this action.')) {
  //     dispatch(deleteRecipe(id))
  //   }
  // }

  const createRecipeHandler = () => {
    dispatch(createRecipe())
  }

    // Lazy Loading!!!
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentMyRecipesList, setCurrentMyRecipesList] = useState([]);
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
        const result = await axios.get(`/api/recipes/myRecipes?pageNumber=${pageNumber}`, config)
        const recipeData = await result.data.myRecipes
        setTotalPages(result.data.pages)
        if (pageNumber > totalPages) return
        setCurrentMyRecipesList(() => {
          return [...currentMyRecipesList, ...recipeData];
        });
        setPageNumber(pageNumber + 1)
        localStorage.setItem('pageNumber', pageNumber)
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

  // Permanately delete a chef created recipe
  const [recipeId, setRecipeId] = useState('')
  const deleteHandler = (e) => {
    e.preventDefault()
    const index = currentMyRecipesList.findIndex(x => x._id === recipeId)
    if(window.confirm('Are you sure? You can not undo this action.')) {
      dispatch(deleteRecipe(recipeId))
      setCurrentMyRecipesList(() => {
        return [...currentMyRecipesList.slice(0, index), ...currentMyRecipesList.splice(index+1)]
      })
    }
  }

  return (
      <div style={{paddingLeft: '220px', paddingRight: '10px'}}>
          <Row>
            <Col xs={12} style={{ textAlign: 'center', paddingBottom: '15px', paddingLeft: '0px' }}>
              <Button
                style={{margin: '5px', padding: '15px', width: '100%', backgroundColor: '#343a40' }}
                onClick={createRecipeHandler}
                variant='outline-success'
              >
                <i className='fas fa-plus'> Create a Recipe</i>
              </Button>
            </Col>
            <Table responsive borderless className='table-sm'>
              <thead style={{borderBottom: 'solid 1px #dedede'}}>
                <tr style={{paddingTop: '2px', paddingBottom: '2px'}}>
                  <th style={{paddingRight: '0px', width: '115px'}}><GiBookmark style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'left', paddingRight: '0px', width: '115px'}}></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center', paddingRight: '0px', width: '10px'}}></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><IoLocationOutline style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdTimer style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><GiFoodTruck style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><GiRank3 style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdFormatListNumbered style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><MdLocalGroceryStore style={{width: '20px', height: '20px'}}/></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(currentMyRecipesList && currentMyRecipesList.map(recipe => (
                    <tr key={recipe.id}>
                       <Link
                        to={`/recipe/${recipe._id}`}
                        style={recipe.isPublished === false ? {pointerEvents: "none", textDecoration: 'none'} : {}}
                      >
                        <td className="align-middle" style={{paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px'}}>
                          <Card style={{border: 'none', maxWidth: '100px'}}>
                            <Card.Img src={recipe.recipe_cover_image} alt={recipe.recipe_name} style={{height: '77px', width: '100px', borderRadius: '25px'}} />
                          </Card>
                        </td>
                      </Link>
                      <td className="align-middle" style={{maxWidth: '200px', paddingLeft: '10px', minWidth: '225px', maxWidth: '225px'}}>
                        <Link
                          to={`/recipe/${recipe._id}`}
                          style={recipe.isPublished === false ? {pointerEvents: "none", textDecoration: 'none'} : {}}
                        >
                          {recipe.recipe_name.length > 60 ? (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                              {recipe.recipe_name.slice(0, 60) + (recipe.recipe_name.length > 60 ? "..." : "")}
                            </div>
                          ) : (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                              {recipe.recipe_name}
                            </div>
                          )}
                        </Link>

                        <Link to={`/chefs/${recipe.chef}`}>
                          {chefInfo.username > 15 ? (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                              {chefInfo.username.slice(0, 15) + (chefInfo.username > 15 ? "..." : "")}
                            </div>
                          ) : (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                              {chefInfo.username}
                            </div>
                          )}
                        </Link>
                      </td>
                      <td className="align-middle" style={{padding: '0px'}}>
                        {recipe.isPublished === false && (
                          <OverlayTrigger
                            placement='bottom'
                            overlay={
                              <Tooltip id={'tooltip-bottom'}>
                                You need to publish the recipe to view it!
                              </Tooltip>
                            }
                          >
                            <span><BiInfoCircle /></span>
                          </OverlayTrigger>
                        )}
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '50px'}}>
                        <div onClick={countryRecipesHandler} style={{cursor: 'pointer'}}>
                          {recipe.country < 1 ? 'n/a' : recipe.country}
                        </div>
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '35px'}}>{recipe.cook_time}</td>
                      <td className="align-middle" style={{minWidth: '150px', maxWidth: '150px', textAlign: 'center'}}>
                        {(recipe.isVegan === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={veganRecipesHandler}>Vegan</Badge> 
                        ))}
                        {(recipe.isVegetarian === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={vegetarianRecipesHandler}>Vegetarian</Badge> 
                        ))}
                        {(recipe.isGlutenFree === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={glutenFreeRecipesHandler}>Gluten Free</Badge>                                                               
                        ))}
                        {(recipe.isKetogenic === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={ketogenicRecipesHandler}>Ketogenic</Badge>    
                        ))}
                        {(recipe.isPescatarian === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={pescatarianRecipesHandler}>Pescatarian</Badge>     
                        ))}
                        {(recipe.isDairy === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={dairyRecipesHandler}>Dairy Free</Badge>    
                        ))}
                        {(recipe.isEgg === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={eggRecipesHandler}>Egg Free</Badge>                                   
                        ))}
                        {(recipe.isNuts === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={nutsRecipesHandler}>Nuts Free</Badge>                                  
                        ))}
                        {(recipe.isShellfish === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={shellfishRecipesHandler}>Shellfish Free</Badge>                                  
                        ))}
                        {(recipe.isSoy === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={soyRecipesHandler}>Soy Free</Badge>                                  
                        ))}
                        {(recipe.isWheat === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={wheatRecipesHandler}>Wheat Free</Badge>
                        ))}
                        {(recipe.isAppetizer === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={appetizerRecipesHandler}>Appetizer</Badge>  
                        ))}
                        {(recipe.isBreakfastBrunch === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={breakfastBrunchRecipesHandler}>Breakfast or Brunch</Badge>  
                        ))}
                        {(recipe.isDessert === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={dessertRecipesHandler}>Dessert</Badge>  
                        ))}
                        {(recipe.isDrink === true && ( 
                          <Badge pill variant='primary' style={{marginRight: '15px', marginTop: '5px', cursor: 'pointer'}} onClick={drinkRecipesHandler}>Drink</Badge>
                        ))}
                        {(recipe.isMainDish === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={mainDishRecipesHandler}>Main Dish</Badge>  
                        ))}
                        {(recipe.isSideSauce === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={sideSauceRecipesHandler}>Side or Sauce</Badge>  
                        ))}
                        {(recipe.isSnack === true && (
                          <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} onClick={snackRecipesHandler}>Snack</Badge> 
                        ))}
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '50px'}}>{recipe.netVotes}</td>
                      <td className="align-middle" style={{textAlign: 'center', width: '80px'}}>
                        {recipe.steps.length} Steps
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '120px'}}>
                        {recipe.ingredients.length} Ingredients
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '50px', padding: '0px'}}>
                        <PopoverStickOnHover
                          component={
                            <div style={{ fontSize: '.85rem', textAlign: 'center', marginLeft: '0px', marginRight: '0px' }}>
                              {(recipe.isPublished) && (
                              <Col xs={12}>
                                <LinkContainer to={`/recipe/${recipe._id}`}>
                                  <Button variant='light' className='btn-sm' style={{width: '100%', height: '30px'}}>
                                    View Recipe
                                  </Button>
                                </LinkContainer>                     
                              </Col>
                              )} 
                              <Col xs={12}>
                                <LinkContainer to={`/myrecipes/${recipe._id}/edit`}>
                                  <Button variant='light' className='btn-sm' style={{width: '100%', height: '30px'}}>
                                    Edit Recipe
                                  </Button>
                                </LinkContainer>                     
                              </Col>
                              {/* <Col xs={12}>
                                <Button 
                                  variant='light' 
                                  className='btn-sm' 
                                  style={{width: '100%', height: '30px'}}
                                  onClick={() => deleteHandler(recipe._id)}
                                >
                                  Remove Recipe
                                </Button>
                              </Col> */}
                              <Col xs={12}>
                                <Form onSubmit={deleteHandler}>
                                  <Button variant='light' className='btn-sm' style={{width: '100%', height: '30px'}}
                                    type='submit'
                                    onClick={(e) => setRecipeId(recipe._id)}
                                  >
                                    Remove Recipe
                                  </Button>
                                </Form>                  
                              </Col>
                            </div>
                          }
                          placement="left"
                          onMouseEnter={() => { }}
                          delay={200}
                        >
                          <div>
                            <IoIosMore style={{ fontSize: '1.25rem' }}/>
                          </div>
                        </PopoverStickOnHover>      
                      </td>
                    </tr>
                )))}
              </tbody>
            </Table>
          </Row>
          <Row>
            <Col xs={12} style={{paddingLeft: '0px', textAlign: 'center'}}>
              <InfiniteScrollLoader pageNumber={pageNumber} pages={totalPages} loading={false} />
            </Col>
          </Row>
      </div>
  )
}

export default ChefRecipesListPage;
