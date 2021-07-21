import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMyFollowedChefs
} from '../../actions/chefActions';
import { BiInfoCircle } from 'react-icons/bi'
import { GoSignIn } from 'react-icons/go'
import { IoMdCreate} from 'react-icons/io'
import { IoPeople } from 'react-icons/io5'
import { GiCook, GiBookshelf, GiFoodTruck } from 'react-icons/gi';
import { RiBookReadLine, RiUserFollowLine } from 'react-icons/ri';
import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import ClickableBadgeBooleans from '../../components/ClickableBadgeBooleans/ClickableBadgeBooleans.component';
import PaginateMyChefs from '../../components/PaginateMyChefs/PaginateMyChefs.component';

import './ChefMyFollowedPage.styles.css';

const ChefMyFollowedPage = ({ match , history }) => {

  const [unfollow, setUnfollow] = useState('')
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const chefMyFollowed = useSelector(state => state.chefMyFollowed)
  const { loading, error, chefs, finalRecipes, pages, page } = chefMyFollowed

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 2000)
  }

  useEffect(() => {
    if(!chefInfo) {
      history.push('/login')
    }
    dispatch(listMyFollowedChefs(match.params.id, pageNumber))

  }, [
    dispatch,
    history,
    match,
    chefInfo,
    pageNumber
  ])

  return (
      <div style={{paddingLeft: '200px'}} className="chefMyFollowedPageFirstDivMobile">
        {initialLoader ? (
          <PancakeLoader>Finding the chefs you already love...</PancakeLoader>
        ) : (chefInfo && chefs && chefs.length > 0) ? (
          <div style={{display: 'block', marginRight: 'auto', marginLeft: '20px'}} className="allChefsPageMobile2Div">
            <Row>
              <Table hover responsive borderless className='table-sm' style={{marginLeft: '20px'}}>
                <thead style={{borderBottom: 'solid 1px #dedede'}}>
                  <tr style={{paddingTop: '2px', paddingBottom: '2px'}}>
                    <th style={{paddingRight: '0px', width: '115px'}}><IoPeople style={{width: '20px', height: '20px'}}/></th>
                    <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'left', paddingRight: '0px', width: '115px'}}></th>
                    <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center', paddingRight: '0px', width: '10px'}}></th>
                    <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><GiBookshelf style={{width: '20px', height: '20px'}}/></th>
                    <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><RiBookReadLine style={{width: '20px', height: '20px'}}/></th>
                    <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><GiFoodTruck style={{width: '20px', height: '20px'}}/></th>
                    <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><RiUserFollowLine style={{width: '20px', height: '20px'}}/></th>
                    <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}>Metric</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {(chefs === undefined || chefs.length == 0) ? (
                    <div></div>
                  ) : (
                    chefs.map(chef => (
                      <tr key={chef.id}>
                        <td className="align-middle" style={{paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px'}}>
                          <Card style={{border: 'none', maxWidth: '100px'}}>
                            <Card.Img src={chef.chefPicture} alt={chef.username} style={{height: '77px', width: '100px'}} />
                          </Card>
                        </td>
                        <td className="align-middle" style={{maxWidth: '200px', paddingLeft: '0px'}}>
                          <Link
                            to={`/chefs/${chef._id}/page/1`}
                            style={chef.isVisible === false ? {pointerEvents: "none", textDecoration: 'none'} : {}}
                          >
                            {chef.username.length > 20 ? (
                              <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                                {chef.username.slice(0, 20) + (chef.username.length > 20 ? "..." : "")}
                              </div>
                            ) : (
                              <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                                {chef.username}
                              </div>
                            )}
                          </Link>
                        </td>
                        <td className="align-middle" style={{padding: '0px'}}>
                          {chef.isVisible === false && (
                            <OverlayTrigger
                              placement='bottom'
                              overlay={
                                <Tooltip id={'tooltip-bottom'}>
                                  The chef has taken their profile offline. Hopefully they will be back soon!
                                </Tooltip>
                              }
                            >
                              <span><BiInfoCircle /></span>
                            </OverlayTrigger>
                          )}
                        </td>
                        <td className="align-middle" style={{textAlign: 'center', width: '130px'}}>
                          {chef.cookbooks.length < 1 ? (
                            <div>n/a</div>
                          ) : (chef.cookbooks.length === 1) ? (
                            <div>1 Cookbook</div>
                          ) : (
                            <div>{chef.cookbooks.length} Cookbooks</div>
                          )}
                        </td>
                        <td className="align-middle" style={{textAlign: 'center', width: '100px'}}>
                          {chef.myRecipes.length < 1 ? (
                            <div>n/a</div>
                          ) : (chef.myRecipes.length === 1) ? (
                            <div>1 Recipe</div>
                          ) : (
                            <div>{chef.myRecipes.length} Recipes</div>
                          )}
                        </td>
                        <td className="align-middle" style={{width: '250px', textAlign: 'center'}}>
                          {(chef.isVegan === true && (
                            <ClickableBadgeBooleans isVegan={chef.isVegan} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                          ))}
                          {(chef.isVegetarian === true && (
                            <ClickableBadgeBooleans isVegetarian={chef.isVegetarian} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                          ))}
                          {(chef.isGlutenFree === true && (
                            <ClickableBadgeBooleans isGlutenFree={chef.isGlutenFree} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                          ))}
                          {(chef.isKetogenic === true && (
                            <ClickableBadgeBooleans isKetogenic={chef.isKetogenic} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                          ))}
                          {(chef.isPescatarian === true && (
                            <ClickableBadgeBooleans isPescatarian={chef.isPescatarian} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                          ))}
                          {(chef.isDairy === true && (
                            <ClickableBadgeBooleans isDairy={chef.isDairy} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                          ))}
                          {(chef.isEgg === true && (
                            <ClickableBadgeBooleans isEgg={chef.isEgg} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                          ))}
                          {(chef.isNuts === true && (
                            <ClickableBadgeBooleans isNuts={chef.isNuts} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                          ))}
                          {(chef.isShellfish === true && (
                            <ClickableBadgeBooleans isShellfish={chef.isShellfish} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                          ))}
                          {(chef.isSoy === true && (
                            <ClickableBadgeBooleans isSoy={chef.isSoy} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                          ))}
                          {(chef.isWheat === true && (
                            <ClickableBadgeBooleans isWheat={chef.isWheat} pill variant='primary' style={{marginRight: '5px', marginBottom: '3px'}}></ClickableBadgeBooleans>
                          ))}
                        </td>
                        <td className="align-middle" style={{textAlign: 'center', width: '50px'}}>Update for # of followers</td>
                        <td className="align-middle" style={{textAlign: 'center', width: '50px'}}>
                          {chef.isMetric === true ? (
                            <i className='fas fa-check'></i>
                          ): (
                            <i className='fas fa-times'></i>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Row>
            <Row>
              <Col xs={12}>
                <PaginateMyChefs
                  pages={pages}
                  page={page}
                />
              </Col>
            </Row>
          </div>
        ) : (chefInfo) ? (
          <Col style={{textAlign: 'center', paddingTop: '100px'}}>
            <p>It does not look like you are following any chefs yet... let us find you some!</p>
            <LinkContainer to={`/chefs`}>
              <Button>
                <GiCook style={{fontSize: '25px'}}/>All Chefs
              </Button>
            </LinkContainer>
          </Col>
        ) : (
          <Col style={{textAlign: 'center', paddingTop: '100px'}}>
            <p>Log into your account to see the chefs you love or create an account to start following our amazing chefs!</p>
            <LinkContainer to={`/login`}>
              <Button>
                <GoSignIn style={{paddingRight: '5px', fontSize: '25px'}}/>Login
              </Button>
            </LinkContainer>
            <LinkContainer to={`/register`} style={{marginLeft: '10px'}}>
              <Button>
                <IoMdCreate style={{paddingRight: '5px', fontSize: '25px'}}/>Register
              </Button>
            </LinkContainer>
          </Col>
        )}
      </div>
  )
}

export default ChefMyFollowedPage;
