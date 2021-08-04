import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { IoMdSearch } from 'react-icons/io'
import { AiOutlineHome } from 'react-icons/ai'
import { GiFoodTruck } from 'react-icons/gi'

const IconBarMobile = () => {

    const chefLogin = useSelector(state => state.chefLogin)
    const { chefInfo } = chefLogin

    useEffect(() => {
    
      }, [
        chefInfo,
    ])

    return (
        <Navbar bg="dark" variant="dark" fixed="bottom" style={{padding: '0px'}}>
            <Nav style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', width: '100%'}}>
                <LinkContainer to='/'>
                  <Nav.Link>
                    <div>
                        <AiOutlineHome style={{marginRight: '5px'}}/>
                        Home
                    </div>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/advanced-search'>
                    <Nav.Link>
                        <div>
                            <IoMdSearch style={{marginRight: '5px'}}/>
                            Search
                        </div>
                    </Nav.Link>
                </LinkContainer>   
                {chefInfo && (
                    <LinkContainer to='/myfoods'>
                        <Nav.Link>
                            <div>
                                <GiFoodTruck style={{marginRight: '5px'}}/>
                                Foods
                            </div>
                        </Nav.Link>
                    </LinkContainer>                   
                )}
            </Nav> 
        </Navbar>
    )
}

export default IconBarMobile;