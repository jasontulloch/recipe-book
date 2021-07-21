import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, urlBaseRecipes, keywordRecipeName='' }) => {
  return pages > 1 && (
    <div>
      <Pagination className='d-flex justify-content-center'>
        {[...Array(pages).keys()].map(x => (
          <LinkContainer
            key={x + 1}
            to={
              (urlBaseRecipes && keywordRecipeName === '')
                ? (`/recipes/page/${x+1}`)
                : `/recipes/search/keywordRecipeName=${keywordRecipeName}/page/${x+1}`
            }
          >
            <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    </div>
  )
}

export default Paginate;
