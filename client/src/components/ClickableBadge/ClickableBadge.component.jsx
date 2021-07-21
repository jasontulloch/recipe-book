import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

const ClickableBadge = ({ allergin, diet, mealtype, country }) => {

  return (
    <div style={{display: 'inline'}}>
        {(diet === 'Vegan') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsVegan=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{diet}</Badge>
          </Link>
        ) : (diet === 'Vegetarian') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsVegetarian=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{diet}</Badge>
          </Link>
        ) : (diet === 'Gluten Free') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsGlutenFree=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{diet}</Badge>
          </Link>
        ) : (diet === 'Ketogenic') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsKetogenic=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{diet}</Badge>
          </Link>
        ) : (diet === 'Pescatarian') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsPescatarian=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{diet}</Badge>
          </Link>
        ) : (allergin === 'Dairy') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsDairy=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{allergin} Free</Badge>
          </Link>
        ) : (allergin === 'Egg') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsEgg=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{allergin} Free</Badge>
          </Link>
        ) : (allergin === 'Nuts') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsNuts=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{allergin} Free</Badge>
          </Link>
        ) : (allergin === 'Shellfish') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsShellfish=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{allergin} Free</Badge>
          </Link>
        ) : (allergin === 'Soy') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsSoy=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{allergin} Free</Badge>
          </Link>
        ) : (allergin === 'Wheat') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsWheat=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{allergin} Free</Badge>
          </Link>
        ) : (mealtype === 'Appetizer') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsAppetizer=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{mealtype}</Badge>
          </Link>
        ) : (mealtype === 'Breakfast or Brunch') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsBreakfastBrunch=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{mealtype}</Badge>
          </Link>
        ) : (mealtype === 'Dessert') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsDessert=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{mealtype}</Badge>
          </Link>
        ) : (mealtype === 'Drink') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsDrink=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{mealtype}</Badge>
          </Link>
        ) : (mealtype === 'Main Dish') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsMainDish=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{mealtype}</Badge>
          </Link>
        ) : (mealtype === 'Side or Sauce') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsSideSauce=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{mealtype}</Badge>
          </Link>
        ) : (mealtype === 'Snack') ? (
          <Link to={`/recipes/advanced-search-results/keywordIsSnack=true/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{mealtype}</Badge>
          </Link>
        ) : (
          <Link to={`/recipes/advanced-search-results/keywordCountry=${country}/page/1`}>
            <Badge pill variant='primary' style={{marginRight: '5px', marginTop: '5px'}}>{country}</Badge>
          </Link>
        )}
    </div>
  )
}

export default ClickableBadge;
