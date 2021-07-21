import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listMyCookbooks,
  createCookbook,
  deleteCookbook,
} from '../../actions/cookbookActions';
import { COOKBOOK_CREATE_RESET } from '../../constants/cookbookConstants';
import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';
import { GiBookshelf } from 'react-icons/gi'
import { RiBookReadLine } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'

import './ChefCookbooksListPage.styles.css';

const ChefCookbooksListPage = ({ match , history }) => {

  const dispatch = useDispatch()

  const cookbookMyList = useSelector(state => state.cookbookMyList)
  const { loading, cookbooks } = cookbookMyList

  const cookbookCreate = useSelector(state => state.cookbookCreate)
  const {
    success: successCreate,
    cookbook: createdCookbook,
  } = cookbookCreate

  const cookbookDelete = useSelector(state => state.cookbookDelete)
  const {
    success: successDelete,
  } = cookbookDelete

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 2000)
  }

  useEffect(() => {
    dispatch({ type: COOKBOOK_CREATE_RESET })

    if(!chefInfo) {
      history.push('/login')
    }

    if(successCreate) {
      history.push(`/cookbooks/${createdCookbook._id}`)
    } else {
      dispatch(listMyCookbooks())
    }
  }, [
    dispatch,
    history,
    chefInfo,
    successCreate,
    successDelete,
    createdCookbook
  ])

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure? You can not undo this action.')) {
      dispatch(deleteCookbook(id))
    }
  }

  const createCookbookHandler = () => {
    dispatch(createCookbook())
  }

  return (
      <div className="chefRecipesListPageMobile" style={{paddingLeft: '220px', paddingRight: '10px'}}>
        {initialLoader ?  (
          <PancakeLoader>Collecting all of your cookbooks...</PancakeLoader>
        ) : (
          <Row>
            <Col className="recipeListButtonMobile" xs={12} style={{ textAlign: 'center', paddingBottom: '15px', paddingLeft: '0px' }}>
              <Button
                style={{margin: '5px', padding: '15px', width: '100%', backgroundColor: '#343a40' }}
                onClick={createCookbookHandler}
                variant='outline-success'
              >
                <i className='fas fa-plus'> Create a Cookbook</i>
              </Button>
            </Col>
            <Table hover responsive borderless className='table-sm' style={{width: '100vw'}}>
              <thead style={{borderBottom: 'solid 1px #dedede'}}>
                <tr style={{paddingTop: '2px', paddingBottom: '2px'}}>
                  <th style={{paddingRight: '0px', width: '25px'}}><GiBookshelf style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'left', paddingRight: '0px', width: '115px'}}></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}><RiBookReadLine style={{width: '20px', height: '20px'}}/></th>
                  <th style={{paddingTop: '2px', paddingBottom: '5px', textAlign: 'center'}}>Private</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(cookbooks === undefined || cookbooks.length === 0) ? (
                  <div></div>
                ) : (
                  cookbooks.map(cookbook => (
                    <tr key={cookbook.id}>
                      <td className="align-middle" style={{paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px', width: '50px'}}>
                        <Card style={{border: 'none'}}>
                          <Card.Img src={cookbook.cookbook_cover_image} alt={cookbook.cookbook_name} style={{height: '77px', width: '100px'}} />
                        </Card>
                      </td>
                      <td className="align-middle" style={{paddingLeft: '15px', width: '350px'}}>
                        <Link
                          to={`/cookbooks/${cookbook._id}`}
                        >
                          {cookbook.cookbook_name.length > 30 ? (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                              {cookbook.cookbook_name.slice(0, 30) + (cookbook.cookbook_name.length > 30 ? "..." : "")}
                            </div>
                          ) : (
                            <div style={{top: '50%', position: 'relative', wordWrap: 'break-word', fontWeight: 'bold'}}>
                              {cookbook.cookbook_name}
                            </div>
                          )}
                        </Link>

                        <Link to={`/chefs/${cookbook.chef}/page/1`}>
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
                      <td className="align-middle" style={{textAlign: 'center', width: '200px'}}>
                        {cookbook.recipes.length} Recipes
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', width: '50px'}}>
                        {cookbook.isPrivate === true ? (
                          <i className='fas fa-check'></i>
                        ): (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td className="align-middle" style={{textAlign: 'center', padding: '0px 5px 0px 5px'}}>
                        <Button
                          variant='light'
                          className='btn-sm'
                          style={{width: '30px', height: '30px'}}
                          onClick={() => deleteHandler(cookbook._id)}
                        >
                          <MdDelete style={{width: '20px', height: '20px'}}/>
                        </Button>
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

export default ChefCookbooksListPage;
