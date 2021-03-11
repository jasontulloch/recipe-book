import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Countries from '../../lists/countries';

const AdvancedRecipeSearchPage = ({ history, match }) => {
  const [keywordRecipeName, setKeywordRecipeName] = useState('')
  const [keywordCountry, setKeywordCountry] = useState('')
  const [keywordChefName, setKeywordChefName] = useState('')
  const [keywordCookTimeMin, setKeywordCookTimeMin] = useState(0)
  const [keywordCookTimeMax, setKeywordCookTimeMax] = useState(60)
  const [keywordIsVegan, setKeywordIsVegan] = useState(false)
  const [keywordIsVegetarian, setKeywordIsVegetarian] = useState(false)
  const [keywordIsGlutenFree, setKeywordIsGlutenFree] = useState(false)
  const [keywordIsKetogenic, setKeywordIsKetogenic] = useState(false)
  const [keywordIsDairy, setKeywordIsDairy] = useState(false)
  const [keywordIsEgg, setKeywordIsEgg] = useState(false)
  const [keywordIsNuts, setKeywordIsNuts] = useState(false)
  const [keywordIsShellfish, setKeywordIsShellfish] = useState(false)
  const [keywordIsSoy, setKeywordIsSoy] = useState(false)
  const [keywordIsWheat, setKeywordIsWheat] = useState(false)
  const [keywordIsBreakfastBrunch, setKeywordIsBreakfastBrunch] = useState(false)
  const [keywordIsMainDish, setKeywordIsMainDish] = useState(false)
  const [keywordIsSideSauce, setKeywordIsSideSauce] = useState(false)
  const [keywordIsDessert, setKeywordIsDessert] = useState(false)
  const [keywordIsSnack, setKeywordIsSnack] = useState(false)
  const [keywordIsAppetizer, setKeywordIsAppetizer] = useState(false)
  const [keywordIsDrink, setKeywordIsDrink] = useState(false)

  const [searchByDiet, setSearchByDiet] = useState(false)
  const [searchByAllergin, setSearchByAllergin] = useState(false)
  const [searchByMealCourseType, setSearchByMealCourseType] = useState(false)
  //const pageNumber = match.params.pageNumber || 1

  const chefLogin = useSelector(state => state.chefLogin)
  const { chefInfo } = chefLogin

  const submitHandler = (e) => {
    e.preventDefault()
    // If user was to search by diets
    if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/1`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/1`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/1`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/1`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/1`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/1`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/1`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/page/1`)
    // If user wants to search by Allergins
    } else if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    // If user wants to search by Meal Course / Type
    } else if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    // If user wants to search by Diets and Allergins
  } else if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    // If user wants to search by Diets & Meal Course / Type
    } else if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == false && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    // If user wants to search by Allergins and Meal Course / Type
    } else if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    // If user wants to search by Diets & Allergins & Meal Course / Type
  } else if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == true && searchByAllergin == true && searchByMealCourseType == true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}`)
    // If user doesn't want to search by diet or allergins or meal course / types
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/page/1`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/page/1`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/page/1`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/page/1`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/page/1`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/page/1`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet == false && searchByAllergin == false && searchByMealCourseType == false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/page/1`)
    } else {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/page/1`)
    }
  }

  useEffect(() => {
    if (chefInfo) {
      setKeywordIsVegan(chefInfo.isVegan)
      setKeywordIsVegetarian(chefInfo.isVegetarian)
      setKeywordIsGlutenFree(chefInfo.isGlutenFree)
      setKeywordIsKetogenic(chefInfo.isKetogenic)
      setKeywordIsDairy(chefInfo.isDairy)
      setKeywordIsEgg(chefInfo.isEgg)
      setKeywordIsNuts(chefInfo.isNuts)
      setKeywordIsShellfish(chefInfo.isShellfish)
      setKeywordIsSoy(chefInfo.isSoy)
      setKeywordIsWheat(chefInfo.isWheat)
      setKeywordIsBreakfastBrunch(chefInfo.isBreakfastBrunch)
      setKeywordIsMainDish(chefInfo.isMainDish)
      setKeywordIsSideSauce(chefInfo.isSideSauce)
      setKeywordIsDessert(chefInfo.isDessert)
      setKeywordIsSnack(chefInfo.isSnack)
      setKeywordIsAppetizer(chefInfo.isAppetizer)
      setKeywordIsDrink(chefInfo.isDrink)
    } else {
      setKeywordIsVegan(false)
      setKeywordIsVegetarian(false)
      setKeywordIsGlutenFree(false)
      setKeywordIsKetogenic(false)
      setKeywordIsDairy(false)
      setKeywordIsEgg(false)
      setKeywordIsNuts(false)
      setKeywordIsShellfish(false)
      setKeywordIsSoy(false)
      setKeywordIsWheat(false)
      setKeywordIsBreakfastBrunch(false)
      setKeywordIsMainDish(false)
      setKeywordIsSideSauce(false)
      setKeywordIsDessert(false)
      setKeywordIsSnack(false)
      setKeywordIsAppetizer(false)
      setKeywordIsDrink(false)
    }
  }, [chefInfo])

  return (
    <div>
      <div style={{textAlign: 'center'}}>
        <h1>Advanced Search</h1>
        <p style={{marginBottom: '0px'}}>Looking for the most popular recipe? Don't worry, you can sort after your search.</p>
        <p>How about a different serving size? All recipes can be adjusted on their individual page.</p>
      </div>
      <Form onSubmit={submitHandler}>
        <Form.Group as={Row}>
          <Form.Label column md={2}>Recipe Name:</Form.Label>
          <Col md={10}>
            <Form.Control
              type='text'
              name='keywordRecipeName'
              onChange={(e) => setKeywordRecipeName(e.target.value)}
              placeholder='Search by recipe name...'
              className=''
            >
            </Form.Control>
            <Form.Text>Leave blank and we will search every recipe we can find...</Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column md={2}>Country of Origin:</Form.Label>
          <Col md={10}>
            <Form.Control
              as='select'
              value={keywordCountry}
              onChange={(e) => setKeywordCountry(e.target.value)}
            >
              {Countries.map((country) =>
                <option key={country[0]}>
                  {country[1]}
                </option>
              )}
            </Form.Control>
            <Form.Text>Leave blank and we will search every country...</Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column md={2}>Chef Username:</Form.Label>
          <Col md={10}>
            <Form.Control
              type='text'
              name='keywordChefName'
              onChange={(e) => setKeywordChefName(e.target.value)}
              placeholder='Search by chef username...'
              className=''
            ></Form.Control>
            <Form.Text>Find your favorite chef or leave blank and search them all...</Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column md={2}>Cook Time:</Form.Label>
          <Form.Label column md={2}>Between</Form.Label>
          <Col md={2}>
            <Form.Control
              type='number'
              name='keywordCookTimeMin'
              onChange={(e) => setKeywordCookTimeMin(e.target.value)}
              placeholder='Minimum time'
              required
              min='0'
              max='359'
              value={keywordCookTimeMin}
              className=''
            ></Form.Control>
          </Col>
          <Form.Label column md={1}>and</Form.Label>
          <Col md={2}>
            <Form.Control
              type='number'
              name='keywordCookTimeMax'
              onChange={(e) => setKeywordCookTimeMax(e.target.value)}
              placeholder='Maximum time'
              required
              min='0'
              max='360'
              value={keywordCookTimeMax}
              className=''
            ></Form.Control>
          </Col>
          <Form.Label column md={1}>minutes</Form.Label>
        </Form.Group>
        {(searchByDiet === true) ? (
          <Row style={{ textAlign:'center', border: '1px 1px 1px 0px dashed blue' }}>
            <Col>
                <Form.Group controlId='isVegan' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Vegan recipes?'
                    checked={keywordIsVegan}
                    onChange={(e) => setKeywordIsVegan(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isVegetarian' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Vegetarian recipes?'
                    checked={keywordIsVegetarian}
                    onChange={(e) => setKeywordIsVegetarian(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isGlutenFree' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Gluten-free recipes?'
                    checked={keywordIsGlutenFree}
                    onChange={(e) => setKeywordIsGlutenFree(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isKetogenic' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Ketogenic recipes?'
                    checked={keywordIsKetogenic}
                    onChange={(e) => setKeywordIsKetogenic(e.target.checked)}
                  />
                </Form.Group>
            </Col>
          </Row>
        ) : (
          <div></div>
        )}
        <Row style={{ textAlign: 'center', paddingBottom: '15px' }}>
          <Col>
              {(searchByDiet === true) ? (
                <div>
                  <p>Pre-checked diet search parameters are based on your profile so you can get cooking faster.</p>
                  <Button onClick={(e) => setSearchByDiet(false)} variant='outline-success' className='p-2' style={{width: '50%'}}>
                    Exclude diets from search.
                  </Button>
                </div>
              ) : (
                <Button onClick={(e) => setSearchByDiet(true)} variant='outline-success' className='p-2' style={{width: '50%'}}>
                  Filter by diets?
                </Button>
              )}
          </Col>
        </Row>
        {(searchByAllergin === true) ? (
          <Row style={{ textAlign:'center' }}>
            <Col>
                <Form.Group controlId='isDairy' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Contains dairy?'
                    checked={keywordIsDairy}
                    onChange={(e) => setKeywordIsDairy(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isEgg' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Contains egg?'
                    checked={keywordIsEgg}
                    onChange={(e) => setKeywordIsEgg(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isNuts' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Contains nuts?'
                    checked={keywordIsNuts}
                    onChange={(e) => setKeywordIsNuts(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isShellfish' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Contains shellfish?'
                    checked={keywordIsShellfish}
                    onChange={(e) => setKeywordIsShellfish(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isSoy' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Contains soy?'
                    checked={keywordIsSoy}
                    onChange={(e) => setKeywordIsSoy(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isWheat' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Contains wheat?'
                    checked={keywordIsWheat}
                    onChange={(e) => setKeywordIsWheat(e.target.checked)}
                  />
                </Form.Group>
            </Col>
          </Row>
        ) : (
          <div></div>
        )}
        <Row style={{ textAlign: 'center', paddingBottom: '15px' }}>
          <Col>
              {(searchByAllergin === true) ? (
                <div>
                  <p>Pre-checked allergin search parameters are based on your profile so you can get cooking faster.</p>
                  <Button onClick={(e) => setSearchByAllergin(false)} variant='outline-success' className='p-2' style={{width: '50%'}}>
                    Exclude common allergins from search.
                  </Button>
                </div>
              ) : (
                <Button onClick={(e) => setSearchByAllergin(true)} variant='outline-success' className='p-2' style={{width: '50%'}}>
                  Filter by common allergins?
                </Button>
              )}
          </Col>
        </Row>

        {(searchByMealCourseType === true) ? (
          <Row style={{ textAlign:'center' }}>
            <Col>
                <Form.Group controlId='isBreakfastBrunch' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Breakfast or Brunch?'
                    checked={keywordIsBreakfastBrunch}
                    onChange={(e) => setKeywordIsBreakfastBrunch(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isMainDish' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Main Dish?'
                    checked={keywordIsMainDish}
                    onChange={(e) => setKeywordIsMainDish(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isSideSauce' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Side or Sauce?'
                    checked={keywordIsSideSauce}
                    onChange={(e) => setKeywordIsSideSauce(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isDessert' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Dessert?'
                    checked={keywordIsDessert}
                    onChange={(e) => setKeywordIsDessert(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isSnack' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Snack?'
                    checked={keywordIsSnack}
                    onChange={(e) => setKeywordIsSnack(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isAppetizer' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Appetizer?'
                    checked={keywordIsAppetizer}
                    onChange={(e) => setKeywordIsAppetizer(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isDrink' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Drink?'
                    checked={keywordIsDrink}
                    onChange={(e) => setKeywordIsDrink(e.target.checked)}
                  />
                </Form.Group>
            </Col>
          </Row>
        ) : (
          <div></div>
        )}
        <Row style={{ textAlign: 'center', paddingBottom: '15px', borderBottom: '2px dotted' }}>
          <Col>
              {(searchByMealCourseType === true) ? (
                <div>
                  <p>Pre-checked meal course / type search parameters are based on your profile so you can get cooking faster.</p>
                  <Button onClick={(e) => setSearchByMealCourseType(false)} variant='outline-success' className='p-2' style={{width: '50%'}}>
                    Exclude meal course / type from search.
                  </Button>
                </div>
              ) : (
                <Button onClick={(e) => setSearchByMealCourseType(true)} variant='outline-success' className='p-2' style={{width: '50%'}}>
                  Filter by meal course / type?
                </Button>
              )}
          </Col>
        </Row>

        <Row style={{ textAlign: 'center', paddingTop: '5px' }}>
          <Col>
            <Button type='submit' variant='outline-success' className='p-2' style={{width: '25%'}}>
              Search
            </Button>
          </Col>
        </Row>

      </Form>
    </div>
  )
}

export default AdvancedRecipeSearchPage;
