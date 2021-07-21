import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

const ClickableBadgeBooleans = ({
  history,
  isVegan,
  isVegetarian,
  isGlutenFree,
  isKetogenic,
  isPescatarian,
  isDairy,
  isEgg,
  isNuts,
  isShellfish,
  isSoy,
  isWheat,
  isAppetizer,
  isBreakfastBrunch,
  isDessert,
  isDrink,
  isMainDish,
  isSideSauce,
  isSnack
}) => {

  return (
    <div style={{display: 'inline'}}>
        {(isVegan === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsVegan=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Vegan</Badge>
          </Link>
        ) : (isVegetarian === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsVegetarian=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Vegetarian</Badge>
          </Link>
        ) : (isGlutenFree === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsGlutenFree=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Gluten Free</Badge>
          </Link>
        ) : (isKetogenic === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsKetogenic=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Ketogenic</Badge>
          </Link>
        ) : (isPescatarian === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsPescatarian=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Pescatarian</Badge>
          </Link>
        ) : (isDairy === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsDairy=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Dairy Free</Badge>
          </Link>
        ) : (isEgg === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsEgg=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Egg Free</Badge>
          </Link>
        ) : (isNuts === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsNuts=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Nuts Free</Badge>
          </Link>
        ) : (isShellfish === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsShellfish=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Shellfish Free</Badge>
          </Link>
        ) : (isSoy === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsSoy=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Soy Free</Badge>
          </Link>
        ) : (isWheat === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsWheat=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Wheat Free</Badge>
          </Link>
        ) : (isAppetizer === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsAppetizer=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Appetizer</Badge>
          </Link>
        ) : (isBreakfastBrunch === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsBreakfastBrunch=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Breakfast or Brunch</Badge>
          </Link>
        ) : (isDessert === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsDessert=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Dessert</Badge>
          </Link>
        ) : (isDrink === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsDrink=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Drink</Badge>
          </Link>
        ) : (isMainDish === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsMainDish=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Main Dish</Badge>
          </Link>
        ) : (isSideSauce === true) ? (
          <Link to={`/recipes/advanced-search-results/keywordIsSideSauce=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Side or Sauce</Badge>
          </Link>
        ) : (
          <Link to={`/recipes/advanced-search-results/keywordIsSnack=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>Snack</Badge>
          </Link>
        )}
    </div>
  )
}

export default ClickableBadgeBooleans;
