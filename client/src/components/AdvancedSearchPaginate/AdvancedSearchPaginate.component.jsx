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
                (keywordRecipeName !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/page/${x+1}`
              : (keywordCountry !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/page/${x+1}`
              : (keywordChefName !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/page/${x+1}`
              : (keywordRecipeName !== '' && keywordCountry !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/page/${x+1}`
              : (keywordRecipeName !== '' && keywordChefName !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/page/${x+1}`
              : (keywordCountry !== '' && keywordChefName !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/page/${x+1}`
              : (keywordRecipeName !== '' && keywordCountry !== '' && keywordChefName !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/page/${x+1}`
              : (keywordIsVegan !== '' && keywordIsVegetarian !== '' && keywordIsGlutenFree !== '' && keywordIsKetogenic !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/${x+1}`
              : (keywordRecipeName !== '' && keywordIsVegan !== '' && keywordIsVegetarian !== '' && keywordIsGlutenFree !== '' && keywordIsKetogenic !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/${x+1}`
              : (keywordCountry !== '' && keywordIsVegan !== '' && keywordIsVegetarian !== '' && keywordIsGlutenFree !== '' && keywordIsKetogenic !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/${x+1}`
              : (keywordChefName !== '' && keywordIsVegan !== '' && keywordIsVegetarian !== '' && keywordIsGlutenFree !== '' && keywordIsKetogenic !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/${x+1}`
              : (keywordRecipeName !== '' && keywordCountry !== '' && keywordIsVegan !== '' && keywordIsVegetarian !== '' && keywordIsGlutenFree !== '' && keywordIsKetogenic !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/${x+1}`
              : (keywordRecipeName !== '' && keywordChefName !== '' && keywordIsVegan !== '' && keywordIsVegetarian !== '' && keywordIsGlutenFree !== '' && keywordIsKetogenic !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/${x+1}`
              : (keywordCountry !== '' && keywordChefName !== '' && keywordIsVegan !== '' && keywordIsVegetarian !== '' && keywordIsGlutenFree !== '' && keywordIsKetogenic !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/${x+1}`
              : (keywordRecipeName !== '' && keywordCountry !== ''  && keywordChefName !== '' && keywordIsVegan !== '' && keywordIsVegetarian !== '' && keywordIsGlutenFree !== '' && keywordIsKetogenic !== '') ? `/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/${x+1}`
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
