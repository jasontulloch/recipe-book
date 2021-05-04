import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const PaginateIndividualChef = ({ pages, page, id }) => {
  return pages > 1 && (
    <div>
      <Pagination className='d-flex justify-content-center'>
        {[...Array(pages).keys()].map(x => (
          <LinkContainer
            key={x + 1}
            to={`/chefs/${id}/page/${x+1}`}
          >
            <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    </div>
  )
}

export default PaginateIndividualChef;
