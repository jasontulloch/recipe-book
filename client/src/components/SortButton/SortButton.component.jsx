import React, { useState } from 'react';
import { DropdownButton, Dropdown, Row, Col } from 'react-bootstrap';

const SortButton = () => {

  const [netVotesSort, setNetVotesSort] = useState('')
  const [createdAtSort, setCreatedAtSort] = useState(-1)
  const [sortButtonLabel, setSortButtonLabel] = useState('Most Recent')

  const handleMostRecent = (e) => {
    e.preventDefault()
    setCreatedAtSort(-1)
    setNetVotesSort('')
    setSortButtonLabel('Most Recent')
  }

  const handleHighestRanking = (e) => {
    e.preventDefault()
    setNetVotesSort(-1)
    setCreatedAtSort('')
    setSortButtonLabel('Highest Ranking')
  }

  const handleLowestRanking = (e) => {
    e.preventDefault()
    setNetVotesSort(1)
    setCreatedAtSort('')
    setSortButtonLabel('Lowest Ranking')
  }

  return (
      <Row style={{textAlign:'center'}}>
        <Col xs={12} md={3} style={{paddingBottom: '10px'}}>
          <DropdownButton id="dropdown-item-button" title={sortButtonLabel}>
            <Dropdown.Item as="button" onClick={handleMostRecent}>Most Recent</Dropdown.Item>
            <Dropdown.Item as="button" onClick={handleHighestRanking}>Highest Rated</Dropdown.Item>
            <Dropdown.Item as="button" onClick={handleLowestRanking}>Lowest Rated</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
  )
}

export default SortButton;
