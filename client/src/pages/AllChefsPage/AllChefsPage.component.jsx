import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import ChefCard from '../../components/ChefCard/ChefCard.component';
import { listChefs } from '../../actions/chefPublicActions';

import Message from '../../components/Message/Message.component';
import InfiniteScrollLoader from '../../components/InfiniteScrollLoader/InfiniteScrollLoader.component';

import { isBrowser } from 'react-device-detect';
import AllChefsPageMobile from './AllChefsPageMobile.component';

import './AllChefsPage.styles.css';

const AllChefsPage = ({ match }) => {

  const dispatch = useDispatch()

  // Lazy loading section
  const [pageNumber, setPageNumber] = useState(1);
	const [isFetching, setIsFetching] = useState(false);

  const chefList = useSelector(state => state.chefList)
  const { loading, error, chefs, pages, page } = chefList

  useEffect(() => {
    dispatch(listChefs(pageNumber))
  }, [
    dispatch,
    pageNumber,
  ])

  const [currentChefList, setCurrentChefList] = useState([]);

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
      const result = await axios.get(`/api/chefs?pageNumber=${pageNumber}`)
      const data = result.data.chefs
      if (pageNumber > pages) return
      setCurrentChefList(() => {
        return [...currentChefList, ...data];
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
    <div>
      {(isBrowser) ? (
        <div style={{paddingLeft: '200px', display: 'block', marginRight: 'auto', marginLeft: '20px'}} className="allChefsPageMobile2Div">
          <Row className="allChefsPageMobileRow">
            {currentChefList && currentChefList.map((chef) => (
              <Col className="allChefsPageChefCardMobile" key={chef._id} style={{maxWidth: '190px', minWidth: '190px'}}>
                <ChefCard chef={chef} />
              </Col>
            ))}
          </Row>        
        </div>
      ) : (
        <AllChefsPageMobile currentChefList={currentChefList} />
      )}
      <div className='allChefsPageMobileInfiniteScroll' style={{textAlign: 'center', paddingLeft: '210px', paddingRight: '10px'}}>
        <InfiniteScrollLoader pageNumber={pageNumber} pages={pages} loading={loading} />
      </div>
    </div>
  )
}

export default AllChefsPage;
