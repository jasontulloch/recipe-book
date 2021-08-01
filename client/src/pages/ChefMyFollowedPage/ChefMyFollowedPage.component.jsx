import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMyFollowedChefs
} from '../../actions/chefActions';
import { BiInfoCircle } from 'react-icons/bi'
import { GoSignIn } from 'react-icons/go'
import { IoMdCreate, IoIosMore } from 'react-icons/io'
import { IoPeople } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { GiCook, GiBookshelf, GiFoodTruck } from 'react-icons/gi';
import { RiBookReadLine, RiUserFollowLine } from 'react-icons/ri';
import ClickableBadgeBooleans from '../../components/ClickableBadgeBooleans/ClickableBadgeBooleans.component';
import Message from '../../components/Message/Message.component';
import PopoverStickOnHover from '../../components/PopoverStickOnHover/PopoverStickOnHover.component';
import InfiniteScrollLoader from '../../components/InfiniteScrollLoader/InfiniteScrollLoader.component';

import { isBrowser, isMobile } from 'react-device-detect';

import './ChefMyFollowedPage.styles.css';

const ChefMyFollowedPage = ({ match , history }) => {

  const [unfollow, setUnfollow] = useState('')
  //const pageNumber = match.params.pageNumber || 1
  const [pageNumber, setPageNumber] = useState(1);

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

    if(isMobile) {
      history.push('/myfoods', { myChefsListPageMobileState: true })
    }

    dispatch(listMyFollowedChefs())

  }, [
    dispatch,
    history,
    match,
    chefInfo,
  ])

  // Lazy Loading!!!
  const [currentMyChefsList, setCurrentMyChefsList] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

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
      const result = await axios.get(`/api/chef/${chefInfo._id}/mychefs?pageNumber=${pageNumber}`, config)
      const followedChefData = await result.data.chefs
      setTotalPages(result.data.pages)
      if (pageNumber > totalPages) return
      setCurrentMyChefsList(() => {
        return [...currentMyChefsList, ...followedChefData];
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

  return (
      <div className="chefMyFollowedPageMobile" style={{paddingLeft: '220px', paddingRight: '10px'}}>
            <Row>
              <Col xs={12} style={{ textAlign: 'center', paddingBottom: '15px', paddingLeft: '0px' }}>
                <Button
                  style={{margin: '5px', padding: '15px', width: '100%', backgroundColor: '#343a40' }}
                  onClick={(e) => history.push(`/chefs`)}
                  variant='outline-success'
                >
                  <GiCook style={{marginRight: '5px'}}/>
                  Find New Chefs
                </Button>
              </Col>
              {(isBrowser) ? (
                <Table responsive borderless className='table-sm' style={{marginLeft: '10px'}}>
                  <thead style={{borderBottom: 'solid 1px #dedede'}}>
                    <tr style={{paddingTop: '2px', paddingBottom: '2px'}}>
                      <th style={{paddingRight: '0px', width: '115px'}}><IoPeople style={{width: '20px', height: '20px'}}/></th>
                      <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'left'}}></th>
                      <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center', paddingRight: '0px', width: '10px'}}></th>
                      <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><GiBookshelf style={{width: '20px', height: '20px'}}/></th>
                      <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><RiBookReadLine style={{width: '20px', height: '20px'}}/></th>
                      <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><GiFoodTruck style={{width: '20px', height: '20px'}}/></th>
                      <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><RiUserFollowLine style={{width: '20px', height: '20px'}}/></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(currentMyChefsList && currentMyChefsList.map(chef => (
                        <tr key={chef.id}>
                          <td className="align-middle" style={{paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px'}}>
                            <Card style={{border: 'none', maxWidth: '100px'}}>
                              <Card.Img src={chef.chefPicture} alt={chef.username} style={{height: '77px', width: '100px', borderRadius: '50%'}} />
                            </Card>
                          </td>
                          <td className="align-middle" style={{width: '100px', paddingLeft: '10px'}}>
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
                          <td className="align-middle" style={{textAlign: 'center', minWidth: '225px', maxWidth: '225px'}}>
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
                          <td className="align-middle" style={{textAlign: 'center', width: '50px', padding: '0px'}}>
                            <PopoverStickOnHover
                              component={
                                <div style={{ fontSize: '.85rem', textAlign: 'center', marginLeft: '0px', marginRight: '0px' }}>
                                  <Col xs={12}>
                                    <LinkContainer to={`/chefs/${chef._id}/page/1`}>
                                      <Button variant='light' className='btn-sm' style={{width: '100%', height: '30px'}}>
                                        <span>View Chef</span>
                                      </Button>
                                    </LinkContainer>                     
                                  </Col>
                                  <Col xs={12}>
                                    <LinkContainer to={`/chefs/${chef._id}/page/1`}>
                                      <Button variant='light' className='btn-sm' style={{width: '100%', height: '30px'}}>
                                        <span>Unfollow Chef</span>
                                      </Button>
                                    </LinkContainer>                     
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
                      ))
                    )}
                  </tbody>
                </Table>
              ) : (
                <Table hover responsive borderless className='table-sm' style={{marginLeft: '20px'}}>
                  <thead style={{borderBottom: 'solid 1px #dedede'}}>
                    <tr style={{paddingTop: '2px', paddingBottom: '2px'}}>
                      <th style={{paddingRight: '0px', width: '25px'}}><IoPeople style={{width: '20px', height: '20px'}}/></th>
                      <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'left', paddingRight: '0px', width: '115px'}}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(currentMyChefsList === undefined || currentMyChefsList.length == 0) ? (
                      <div>
                        <Col style={{textAlign: 'center', paddingTop: '100px'}}>
                          <p>It does not look like you are following any chefs yet... let us find you some!</p>
                          <LinkContainer to={`/chefs`}>
                            <Button>
                              <GiCook style={{fontSize: '25px'}}/>All Chefs
                            </Button>
                          </LinkContainer>
                        </Col>
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
                      </div>
                    ) : (
                      currentMyChefsList.map(chef => (
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
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </Row>
            <Row>
              <Col xs={12} style={{paddingLeft: '10px', paddingBottom: '30px', textAlign: 'center'}}>
                <InfiniteScrollLoader pageNumber={pageNumber} pages={totalPages} loading={false} />
              </Col>
            </Row>
      </div>
  )
}

export default ChefMyFollowedPage;
