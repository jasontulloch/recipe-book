import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listCookbookDetails
} from '../../actions/cookbookActions';
import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import ClickableBadgeBooleans from '../../components/ClickableBadgeBooleans/ClickableBadgeBooleans.component';
import { IoLocationOutline } from 'react-icons/io5'
import { IoMdCreate } from 'react-icons/io'
import { GiBookmark, GiRank3, GiFoodTruck } from 'react-icons/gi'
import { MdTimer, MdFormatListNumbered, MdLocalGroceryStore, MdDelete } from 'react-icons/md'

import './CookbookDetailsPage.styles.scss';

const CookbookDetailsPage = ({ match , history }) => {

  const dispatch = useDispatch()

  const cookbookDetails = useSelector(state => state.cookbookDetails)
  const { loading, error, cookbook, myCookbookRecipes } = cookbookDetails

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 2000)
  }

  useEffect(() => {
    dispatch(listCookbookDetails(match.params.id))
  }, [
    dispatch,
    history,
    chefInfo,
  ])

  return (
      <div className="chefRecipesListPageMobile" style={{paddingLeft: '200px', paddingRight: '30px'}}>
        {initialLoader ?  (
          <PancakeLoader>Loading cookbook...</PancakeLoader>
        ) : (
          <Row>
            <div style={{marginLeft: '30px'}}>
              <span>
                <h3>{cookbook.cookbook_name}</h3>
              </span>
              <p>{cookbook.description}</p>
            </div>

            <Table hover responsive borderless className='table-sm' style={{marginLeft: '20px'}}>
              <thead style={{borderBottom: 'solid 1px #dedede'}}>
                <tr style={{paddingTop: '2px', paddingBottom: '2px'}}>
                  <th style={{paddingRight: '0px', width: '115px'}}><GiBookmark style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'left', paddingRight: '0px', width: '115px'}}></th>
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
                {(myCookbookRecipes === undefined || myCookbookRecipes.length == 0) ? (
                  <div></div>
                ) : (
                  myCookbookRecipes.map(recipe => (
                    <tr key={recipe.id}>
                      <td style={{paddingRight: '0px', paddingBottom: '0px'}}>
                        <Card style={{border: 'none', maxWidth: '100px'}}>
                          <Card.Img src={recipe.recipe_cover_image} alt={recipe.recipe_name} style={{height: '77px', width: '100px'}} />
                        </Card>
                      </td>
                      <td className="align-middle" style={{maxWidth: '200px'}}>
                        <Link to={`/recipe/${recipe._id}`}>
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
                        <Link to={`/recipe/${recipe._id}`}>
                          {recipe.chef.length > 15 ? (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                              {recipe.chef.slice(0, 15) + (recipe.chef.length > 15 ? "..." : "")}
                            </div>
                          ) : (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontStyle: 'italic'}}>
                              {recipe.chef}
                            </div>
                          )}
                        </Link>
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '50px'}}>{recipe.country}</td>
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
                      <td className="align-middle" style={{textAlign: 'center', width: '50px', padding: '0px', paddingRight: '20px'}}>
                        {(chefInfo && cookbook.chef === chefInfo._id) && (
                          <LinkContainer to={`/myrecipes/${recipe._id}/edit`} style={{paddingLeft: '5px', paddingRight: '5px'}}>
                            <Button variant='light' className='btn-sm' style={{width: '30px', height: '30px'}}>
                              <MdDelete style={{width: '20px', height: '20px'}}/>
                            </Button>
                          </LinkContainer>
                        )}
                      </td>
                    </tr>
                  ))
                )
              }
              </tbody>
            </Table>
          </Row>
        )}
      </div>
  )
}

export default CookbookDetailsPage;
