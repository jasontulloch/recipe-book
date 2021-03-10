import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AdvancedSearchPaginate = ({
  pages,
  page,
  keywordRecipeName = '',
  keywordCountry = '',
  keywordChefName = '',
  keywordCookTimeMin = '',
  keywordCookTimeMax = '',
  keywordIsVegan = '',
  keywordIsVegetarian = '',
  keywordIsGlutenFree = '',
  keywordIsKetogenic = '',
  keywordIsDairy = '',
  keywordIsEgg = '',
  keywordIsNuts = '',
  keywordIsShellfish = '',
  keywordIsSoy = '',
  keywordIsWheat = '',
  keywordIsBreakfastBrunch = '',
  keywordIsMainDish = '',
  keywordIsSideSauce = '',
  keywordIsDessert = '',
  keywordIsSnack = '',
  keywordIsAppetizer = '',
  keywordIsDrink = ''
}) => {
  return pages > 1 && (
    <div>
      <Pagination className='d-flex justify-content-center'>
        {[...Array(pages).keys()].map(x => (
          <LinkContainer
            key={x + 1}
            to={
              (keywordRecipeName === 'c')
                ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/page/${x+1}`
                : `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/page/${x+1}`
            }
          >
            <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    </div>
  )
}

export default AdvancedSearchPaginate;
