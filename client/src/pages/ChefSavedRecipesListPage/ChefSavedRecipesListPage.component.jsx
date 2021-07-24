import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMySavedRecipes,
  //unsaveRecipe
} from '../../actions/recipeActions';
import { RECIPE_UNSAVE_RESET } from '../../constants/recipeConstants';
import { BiInfoCircle } from 'react-icons/bi'
import { IoLocationOutline } from 'react-icons/io5'
import { IoMdCreate } from 'react-icons/io'
import { GiBookmark, GiRank3, GiFoodTruck } from 'react-icons/gi'
import { MdTimer, MdFormatListNumbered, MdLocalGroceryStore, MdDelete } from 'react-icons/md'
import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import ClickableBadgeBooleans from '../../components/ClickableBadgeBooleans/ClickableBadgeBooleans.component';

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

  useEffect(() => {
    if(!chefInfo) {
      history.push('/login')
    }

    if(isMobile) {
      history.push('/myfoods')
    }

    if(successRecipeUnsave) {
      alert('Recipe removed')
      //setUnsave('')
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
      const result = await axios.get(`/api/recipes/savedRecipes?pageNumber=${pageNumber}`)
      const data = await result.data.savedRecipes
      console.log(result)
      setPageNumber(pageNumber + 1)
      setCurrentMySavedRecipesList(() => {
        return [...currentMySavedRecipesList, ...data];
      });
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
  //const unsaveHandler = (e) => {
  //  e.preventDefault()
  //  dispatch(unsaveRecipe(unsave, {
  //    unsave
  //  }))
  //}


  return (
      <div className="chefSavedRecipesListPageMobile" style={{paddingLeft: '200px', paddingRight: '30px'}}>
        {currentMySavedRecipesList.length > 0 ? (
          <Row className="chefSavedRecipesMobileRow" style={{paddingLeft: '30px'}}>
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentMySavedRecipesList.map(recipe => (
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
                    <td className="align-middle" style={{maxWidth: '200px', paddingLeft: '10px'}}>
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
                      <Link to={`/chefs/${recipe.chef}/page/1`}>
                        {chefNames.find( ({ _id }) => _id === recipe.chef ).username > 15 ? (
                          <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                            {chefNames.find( ({ _id }) => _id === recipe.chef ).username.slice(0, 15) + (chefNames.find( ({ _id }) => _id === recipe.chef ).username > 15 ? "..." : "")}
                          </div>
                        ) : (
                          <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                            {chefNames.find( ({ _id }) => _id === recipe.chef ).username}
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
                    <td className="align-middle" style={{textAlign: 'center', width: '50px'}}>{recipe.country < 1 ? 'n/a' : recipe.country}</td>
                    <td className="align-middle" style={{textAlign: 'center', width: '35px'}}>{recipe.cook_time}</td>
                    <td className="align-middle" style={{width: '225px'}}>
                      {(recipe.isVegan === true && (
                        <ClickableBadgeBooleans isVegan={recipe.isVegan} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isVegetarian === true && (
                        <ClickableBadgeBooleans isVegetarian={recipe.isVegetarian} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isGlutenFree === true && (
                        <ClickableBadgeBooleans isGlutenFree={recipe.isGlutenFree} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isKetogenic === true && (
                        <ClickableBadgeBooleans isKetogenic={recipe.isKetogenic} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isPescatarian === true && (
                        <ClickableBadgeBooleans isPescatarian={recipe.isPescatarian} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isDairy === true && (
                        <ClickableBadgeBooleans isDairy={recipe.isDairy} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isEgg === true && (
                        <ClickableBadgeBooleans isEgg={recipe.isEgg} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isNuts === true && (
                        <ClickableBadgeBooleans isNuts={recipe.isNuts} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isShellfish === true && (
                        <ClickableBadgeBooleans isShellfish={recipe.isShellfish} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isSoy === true && (
                        <ClickableBadgeBooleans isSoy={recipe.isSoy} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isWheat === true && (
                        <ClickableBadgeBooleans isWheat={recipe.isWheat} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isAppetizer === true && (
                        <ClickableBadgeBooleans isAppetizer={recipe.isAppetizer} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isBreakfastBrunch === true && (
                        <ClickableBadgeBooleans isBreakfastBrunch={recipe.isBreakfastBrunch} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isDessert === true && (
                        <ClickableBadgeBooleans isDessert={recipe.isDessert} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isDrink === true && (
                        <ClickableBadgeBooleans isDrink={recipe.isDrink} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isMainDish === true && (
                        <ClickableBadgeBooleans isMainDish={recipe.isMainDish} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isSideSauce === true && (
                        <ClickableBadgeBooleans isSideSauce={recipe.isSideSauce} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
                      ))}
                      {(recipe.isSnack === true && (
                        <ClickableBadgeBooleans isSnack={recipe.isSnack} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}>VEGAN</ClickableBadgeBooleans>
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
                      {(chefInfo && recipe.chef === chefInfo._id) && (
                        <LinkContainer to={`/myrecipes/${recipe._id}/edit`} style={{paddingLeft: '5px', paddingRight: '5px'}}>
                          <Button variant='light' className='btn-sm' style={{width: '30px', height: '30px'}}>
                            <IoMdCreate style={{width: '20px', height: '20px'}}/>
                          </Button>
                        </LinkContainer>
                      )}
                    </td>
                    <td className="align-middle" style={{textAlign: 'center', width: '50px', padding: '0px'}}>
                      <LinkContainer to={`/savedrecipes/${recipe._id}`} style={{paddingLeft: '5px', paddingRight: '5px'}}>
                        <Button variant='light' className='btn-sm' style={{width: '30px', height: '30px'}}>
                          <MdDelete style={{width: '20px', height: '20px'}}/>
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        ) : (
          <Row>
            <Col style={{textAlign: 'center', paddingTop: '100px'}}>
              <p >Looks like you don't have any recipes saved yet, let's find you some!</p>
              <LinkContainer to={`/recipes`}>
                <Button variant='light' className='btn-sm'>
                  <i className='fas fa-search'>Explore all Recipes!</i>
                </Button>
              </LinkContainer>
              <LinkContainer to={`/recipes/advanced-search`}>
                <Button variant='light' className='btn-sm'>
                  <i className='fas fa-search'>Find the Exact Recipe you are Looking For!</i>
                </Button>
              </LinkContainer>
            </Col>
          </Row>
        )}
      </div>
  )
}

export default ChefSavedRecipesListPage;
