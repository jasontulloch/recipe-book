import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, OverlayTrigger, Tooltip, Card, Badge, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMySavedRecipes,
  unsaveRecipe
} from '../../actions/recipeActions';
import { RECIPE_UNSAVE_RESET } from '../../constants/recipeConstants';
import { BiInfoCircle } from 'react-icons/bi'
import { IoLocationOutline } from 'react-icons/io5'
import { IoMdCreate, IoIosMore } from 'react-icons/io'
import { GiBookmark, GiRank3, GiFoodTruck } from 'react-icons/gi'
import { MdTimer, MdFormatListNumbered, MdLocalGroceryStore, MdDelete } from 'react-icons/md'
import { RiBookReadLine } from 'react-icons/ri';
import ClickableBadgeBooleans from '../../components/ClickableBadgeBooleans/ClickableBadgeBooleans.component';
import Message from '../../components/Message/Message.component';
import InfiniteScrollLoader from '../../components/InfiniteScrollLoader/InfiniteScrollLoader.component';
import PopoverStickOnHover from '../../components/PopoverStickOnHover/PopoverStickOnHover.component';

import { isMobile } from 'react-device-detect';

import './ChefSavedRecipesListPage.styles.css';

const ChefSavedRecipesListPage = ({ match , history }) => {

  // Need to be able to unsave a recipe on the current page
  //const [unsave, setUnsave] = useState('')

  const dispatch = useDispatch()

  const recipeMySaved = useSelector(state => state.recipeMySaved)
  const { loading, savedRecipes, chefNames } = recipeMySaved

  const recipeUnsave = useSelector(state => state.recipeUnsave)
  const {
    success: successRecipeUnsave
  } = recipeUnsave

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

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

  useEffect(() => {
    if(!chefInfo) {
      history.push('/login')
    }

    if(isMobile) {
      history.push('/myfoods', { mySavedRecipesListPageMobileState: true })
    }

    if(successRecipeUnsave) {
      dispatch({ type: RECIPE_UNSAVE_RESET })
    }

    dispatch(listMySavedRecipes())

  }, [
    dispatch,
    history,
    match,
    chefInfo,
    successRecipeUnsave
  ])

  // Lazy Loading!!!
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentMySavedRecipesList, setCurrentMySavedRecipesList] = useState([]);
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
      const result = await axios.get(`/api/recipes/savedRecipes?pageNumber=${pageNumber}`, config)
      const recipeData = await result.data.mySavedRecipes
      setTotalPages(result.data.pages)
      if (pageNumber > totalPages) return
      setCurrentMySavedRecipesList(() => {
        return [...currentMySavedRecipesList, ...recipeData];
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

  // Need to update to remove recipe from liked recipes on page (vs new window)
  const [recipeId, setRecipeId] = useState('')
  const [unsave, setUnsave] = useState('')
  const unsaveHandler = (e) => {
    e.preventDefault()
    const index = currentMySavedRecipesList.findIndex(x => x._id === recipeId)
    dispatch(unsaveRecipe(recipeId, {
      unsave
    }))
    setCurrentMySavedRecipesList(() => {
      return [...currentMySavedRecipesList.slice(0, index), ...currentMySavedRecipesList.splice(index+1)]
    })
  }

  return (
      <div className="chefSavedRecipesListPageMobile" style={{paddingLeft: '200px', paddingRight: '30px'}}>
          <div>
          <Row className="chefSavedRecipesMobileRow" style={{paddingLeft: '30px'}}>
            <Col xs={12} style={{ textAlign: 'center', paddingBottom: '15px', paddingLeft: '0px' }}>
              <Button
                style={{margin: '5px', padding: '15px', width: '100%', backgroundColor: '#343a40' }}
                onClick={(e) => history.push(`/recipes`)}
                variant='outline-success'
              >
                <GiBookmark style={{marginRight: '5px'}}/>
                Find New Recipes
              </Button>
            </Col>
            <div style={{marginLeft: '10px'}}>
              <span>
                <h3>Liked Recipes</h3>
              </span>
            </div>
            <Table responsive borderless className='table-sm' style={{marginLeft: '10px'}}>
              <thead style={{borderBottom: 'solid 1px #dedede'}}>
                <tr style={{paddingTop: '2px', paddingBottom: '2px'}}>
                  <th style={{paddingRight: '0px', width: '115px', paddingBottom: '5px'}}><GiBookmark style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'left', }}></th>
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
                {currentMySavedRecipesList && currentMySavedRecipesList.map(recipe => (
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
                        {chefNames && chefNames.find( ({ _id }) => _id === recipe.chef ).username > 15 ? (
                          <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                            {chefNames && chefNames.find( ({ _id }) => _id === recipe.chef ).username.slice(0, 15) + (chefNames.find( ({ _id }) => _id === recipe.chef ).username > 15 ? "..." : "")}
                          </div>
                        ) : (
                          <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                            {chefNames && chefNames.find( ({ _id }) => _id === recipe.chef ).username}
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
                              The chef has unpublished this recipe and appears to be making some edits!
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
                    <td className="align-middle" style={{minWidth: '225px', maxWidth: '225px'}}>
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
                            <Col xs={12}>
                              <LinkContainer to={`/recipe/${recipe._id}`}>
                                <Button variant='light' className='btn-sm' style={{width: '100%', height: '30px'}}>
                                  <RiBookReadLine style={{width: '20px', height: '20px'}}/>
                                  <span style={{paddingLeft: '5px'}}>View Recipe</span>
                                </Button>
                              </LinkContainer>                     
                            </Col>
                            <Col xs={12}>
                              {(chefInfo && recipe.chef === chefInfo._id) && (
                                <LinkContainer to={`/myrecipes/${recipe._id}/edit`} style={{marginLeft: '0px', marginRight: '0px'}}>
                                  <Button variant='light' className='btn-sm' style={{width: '100%', height: '30px', marginLeft: '0px', marginRight: '0px'}}>
                                    <IoMdCreate style={{width: '20px', height: '20px'}}/>
                                    <span style={{paddingLeft: '5px'}}>Edit Recipe</span>
                                  </Button>
                                </LinkContainer>
                              )}                       
                            </Col>
                            {/* <Col xs={12}>
                              <LinkContainer to={`/savedrecipes/${recipe._id}`}>
                                <Button variant='light' className='btn-sm' style={{width: '100%', height: '30px'}}>
                                  <MdDelete style={{width: '20px', height: '20px'}}/>
                                  <span style={{paddingLeft: '5px'}}>Remove Recipe</span>
                                </Button>
                              </LinkContainer>                     
                            </Col> */}
                            <Col xs={12}>
                              <Form onSubmit={unsaveHandler}>
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
                ))}
              </tbody>
            </Table>
          </Row>
          <Row>
            <Col xs={12} style={{paddingLeft: '30px', textAlign: 'center'}}>
              <InfiniteScrollLoader pageNumber={pageNumber} pages={totalPages} loading={loading} />
            </Col>
          </Row>
          </div>
      </div>
  )
}

export default ChefSavedRecipesListPage;
