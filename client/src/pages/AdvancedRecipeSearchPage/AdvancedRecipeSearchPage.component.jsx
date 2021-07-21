import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Countries from '../../lists/countries';
import Message from '../../components/Message/Message.component';

import { isBrowser } from 'react-device-detect';
import AdvancedRecipeSearchPageMobile from './AdvancedRecipeSearchPageMobile.component';

const AdvancedRecipeSearchPageTest = ({ history, match }) => {
  const [keywordRecipeName, setKeywordRecipeName] = useState('')
  const [keywordCountry, setKeywordCountry] = useState('')
  const [keywordChefName, setKeywordChefName] = useState('')
  const [keywordCookTimeMin, setKeywordCookTimeMin] = useState(0)
  const [keywordCookTimeMax, setKeywordCookTimeMax] = useState(90)
  const [keywordIsVegan, setKeywordIsVegan] = useState(false)
  const [keywordIsVegetarian, setKeywordIsVegetarian] = useState(false)
  const [keywordIsGlutenFree, setKeywordIsGlutenFree] = useState(false)
  const [keywordIsKetogenic, setKeywordIsKetogenic] = useState(false)
  const [keywordIsPescatarian, setKeywordIsPescatarian] = useState(false)
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
    if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/page/1`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/page/1`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/page/1`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/page/1`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/page/1`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/page/1`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/page/1`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/page/1`)
    // If user wants to search by Allergins
    } else if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    // If user wants to search by Meal Course / Type
    } else if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    // If user wants to search by Diets and Allergins
  } else if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/page/1`)
    // If user wants to search by Diets & Meal Course / Type
    } else if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === true && searchByAllergin === false && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    // If user wants to search by Allergins and Meal Course / Type
    } else if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === false && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    // If user wants to search by Diets & Allergins & Meal Course / Type
  } else if(keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordChefName=${keywordChefName}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    } else if (!keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === true && searchByAllergin === true && searchByMealCourseType === true) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordIsVegan=${keywordIsVegan}/keywordIsVegetarian=${keywordIsVegetarian}/keywordIsGlutenFree=${keywordIsGlutenFree}/keywordIsKetogenic=${keywordIsKetogenic}/keywordIsPescatarian=${keywordIsPescatarian}/keywordIsDairy=${keywordIsDairy}/keywordIsEgg=${keywordIsEgg}/keywordIsNuts=${keywordIsNuts}/keywordIsShellfish=${keywordIsShellfish}/keywordIsSoy=${keywordIsSoy}/keywordIsWheat=${keywordIsWheat}/keywordIsBreakfastBrunch=${keywordIsBreakfastBrunch}/keywordIsMainDish=${keywordIsMainDish}/keywordIsSideSauce=${keywordIsSideSauce}/keywordIsDessert=${keywordIsDessert}/keywordIsSnack=${keywordIsSnack}/keywordIsAppetizer=${keywordIsAppetizer}/keywordIsDrink=${keywordIsDrink}/page/1`)
    // If user doesn't want to search by diet or allergins or meal course / types
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && keywordChefName.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/page/1`)
    } else if (keywordRecipeName.trim() && keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordCountry=${keywordCountry}/page/1`)
    } else if (keywordRecipeName.trim() && keywordChefName.trim() && !keywordCountry.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/keywordChefName=${keywordChefName}/page/1`)
    } else if (keywordCountry.trim() && keywordChefName.trim() && !keywordRecipeName.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/keywordChefName=${keywordChefName}/page/1`)
    } else if (keywordRecipeName.trim() && !keywordCountry.trim() && !keywordChefName.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordRecipeName=${keywordRecipeName}/page/1`)
    } else if (keywordCountry.trim() && !keywordRecipeName.trim() && !keywordChefName.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === false) {
      history.push(`/recipes/advanced-search-results/keywordCookTimeMin=${keywordCookTimeMin}/keywordCookTimeMax=${keywordCookTimeMax}/keywordCountry=${keywordCountry}/page/1`)
    } else if (keywordChefName.trim() && !keywordRecipeName.trim() && !keywordCountry.trim() && searchByDiet === false && searchByAllergin === false && searchByMealCourseType === false) {
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
      setKeywordIsPescatarian(chefInfo.isPescatarian)
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
      setKeywordIsPescatarian(false)
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

  const isVeganHandler = (e) => {
    if (keywordIsVegan === false) {
      setKeywordIsVegan(e.target.checked)
      setKeywordIsVegetarian(e.target.checked)
      setKeywordIsPescatarian(e.target.checked)
    } else {
      setKeywordIsVegan(e.target.checked)
    }
  }

  const isVegetarianHandler = (e) => {
    if (keywordIsVegetarian === false) {
      setKeywordIsVegetarian(e.target.checked)
      setKeywordIsPescatarian(e.target.checked)
    } else {
      setKeywordIsVegetarian(e.target.checked)
    }
  }

  // Function disables all key presses
  function handleKeypress (e) {
    const characterCode = e.key
    if (characterCode) {
      e.preventDefault()
    }
  }

  // Output for what the search will do
  const Diets = []
  const DietsExclude = []
  try {
    if (keywordIsVegan === true) {
      Diets.push('vegan')
    } else {
      DietsExclude.push('vegan')
    }
    if (keywordIsVegetarian === true) {
      Diets.push('vegetarian')
    } else {
      DietsExclude.push('vegetarian')
    }
    if (keywordIsGlutenFree === true) {
      Diets.push('gluten-free')
    } else {
      DietsExclude.push('gluten-free')
    }
    if (keywordIsKetogenic === true) {
      Diets.push('ketogenic')
    } else {
      DietsExclude.push('ketogenic')
    }
    if (keywordIsPescatarian === true) {
      Diets.push('pescatarian')
    } else {
      DietsExclude.push('pescatarian')
    }
  } catch (err) {

  }

  const Allergins = []
  try {
    if (keywordIsDairy === true) {
      Allergins.push('dairy')
    }
    if (keywordIsEgg === true) {
      Allergins.push('egg')
    }
    if (keywordIsNuts === true) {
      Allergins.push('nuts')
    }
    if (keywordIsShellfish === true) {
      Allergins.push('shellfish')
    }
    if (keywordIsSoy === true) {
      Allergins.push('soy')
    }
    if (keywordIsWheat === true) {
      Allergins.push('wheat')
    }
  } catch (err) {

  }

  const mealTypeRadioBB = (e) => {
    e.stopPropagation()
    if (keywordIsBreakfastBrunch === false) {
      setKeywordIsBreakfastBrunch(true)
      setKeywordIsMainDish(false)
      setKeywordIsSideSauce(false)
      setKeywordIsDessert(false)
      setKeywordIsSnack(false)
      setKeywordIsAppetizer(false)
      setKeywordIsDrink(false)
    }
  }

  const mealTypeRadioMD = (e) => {
    e.stopPropagation()
    if (keywordIsMainDish === false) {
       setKeywordIsMainDish(true)
      setKeywordIsBreakfastBrunch(false)
      setKeywordIsSideSauce(false)
      setKeywordIsDessert(false)
      setKeywordIsSnack(false)
      setKeywordIsAppetizer(false)
      setKeywordIsDrink(false)
    }
  }

  const mealTypeRadioSS = (e) => {
    e.stopPropagation()
    if (keywordIsSideSauce === false) {
      setKeywordIsSideSauce(true)
      setKeywordIsMainDish(false)
      setKeywordIsBreakfastBrunch(false)
      setKeywordIsDessert(false)
      setKeywordIsSnack(false)
      setKeywordIsAppetizer(false)
      setKeywordIsDrink(false)
    }
  }

  const mealTypeRadioDe = (e) => {
    e.stopPropagation()
    if (keywordIsDessert === false) {
      setKeywordIsDessert(true)
      setKeywordIsMainDish(false)
      setKeywordIsSideSauce(false)
      setKeywordIsBreakfastBrunch(false)
      setKeywordIsSnack(false)
      setKeywordIsAppetizer(false)
      setKeywordIsDrink(false)
    }
  }

  const mealTypeRadioS = (e) => {
    e.stopPropagation()
    if (keywordIsSnack === false) {
      setKeywordIsSnack(true)
      setKeywordIsMainDish(false)
      setKeywordIsSideSauce(false)
      setKeywordIsDessert(false)
      setKeywordIsBreakfastBrunch(false)
      setKeywordIsAppetizer(false)
      setKeywordIsDrink(false)
    }
  }

  const mealTypeRadioA = (e) => {
    e.stopPropagation()
    if (keywordIsAppetizer === false) {
      setKeywordIsAppetizer(true)
      setKeywordIsMainDish(false)
      setKeywordIsSideSauce(false)
      setKeywordIsDessert(false)
      setKeywordIsSnack(false)
      setKeywordIsBreakfastBrunch(false)
      setKeywordIsDrink(false)
    }
  }

  const mealTypeRadioDr = (e) => {
    e.stopPropagation()
    if (keywordIsDrink === false) {
      setKeywordIsDrink(true)
      setKeywordIsMainDish(false)
      setKeywordIsSideSauce(false)
      setKeywordIsDessert(false)
      setKeywordIsSnack(false)
      setKeywordIsAppetizer(false)
      setKeywordIsBreakfastBrunch(false)
    }
  }

  return (
    <div>
    {(isBrowser) ? (
    <div style={{paddingLeft: '210px', paddingRight: '10px'}}>
      <div style={{textAlign: 'center'}}>
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
              onKeyDown={handleKeypress}
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
              min='1'
              max='360'
              value={keywordCookTimeMax}
              onKeyDown={handleKeypress}
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
                    label='Vegan recipes'
                    checked={keywordIsVegan}
                    onChange={isVeganHandler}
                  />
                </Form.Group>
                <Form.Group controlId='isVegetarian' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Vegetarian recipes'
                    checked={keywordIsVegetarian}
                    onChange={isVegetarianHandler}
                  />
                </Form.Group>
                <Form.Group controlId='isGlutenFree' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Gluten-free recipes'
                    checked={keywordIsGlutenFree}
                    onChange={(e) => setKeywordIsGlutenFree(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isKetogenic' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Ketogenic recipes'
                    checked={keywordIsKetogenic}
                    onChange={(e) => setKeywordIsKetogenic(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isPescatarian' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Pescatarian recipes'
                    checked={keywordIsPescatarian}
                    onChange={(e) => setKeywordIsPescatarian(e.target.checked)}
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
                  {Diets && Diets.length > 0 && (
                    <Message variant='warning'>
                      <Form.Text>Find me all recipes that are: </Form.Text>
                      <Form.Text>{Diets.map((diet) => (<Badge pill variant='primary' style={{marginRight: '3px'}}>{diet}</Badge>))}</Form.Text>
                      <Form.Text>Ignoring all recipes that are: </Form.Text>
                      <Form.Text>{DietsExclude.map((diet) => (<Badge pill variant='primary' style={{marginRight: '3px'}}>{diet}</Badge>))}</Form.Text>
                    </Message>
                  )}
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
                    label='Exclude dairy'
                    checked={keywordIsDairy}
                    onChange={(e) => setKeywordIsDairy(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isEgg' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Exclude egg'
                    checked={keywordIsEgg}
                    onChange={(e) => setKeywordIsEgg(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isNuts' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Exclude nuts'
                    checked={keywordIsNuts}
                    onChange={(e) => setKeywordIsNuts(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isShellfish' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Exclude shellfish'
                    checked={keywordIsShellfish}
                    onChange={(e) => setKeywordIsShellfish(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isSoy' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Exclude soy'
                    checked={keywordIsSoy}
                    onChange={(e) => setKeywordIsSoy(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group controlId='isWheat' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Exclude wheat'
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
                  <p>Pre-checked allergen search parameters are based on your profile so you can get cooking faster.</p>
                    {Allergins && Allergins.length > 0 && (
                      <Message variant='warning'>
                        <Form.Text>Find me all recipes that exclude: </Form.Text>
                        <Form.Text>{Allergins.map((allergin) => (<Badge pill variant='primary' style={{marginRight: '3px'}}>{allergin}</Badge>))}</Form.Text>
                      </Message>
                    )}
                  <Button onClick={(e) => setSearchByAllergin(false)} variant='outline-success' className='p-2' style={{width: '50%'}}>
                    Exclude common allergens from search.
                  </Button>
                </div>
              ) : (
                <Button onClick={(e) => setSearchByAllergin(true)} variant='outline-success' className='p-2' style={{width: '50%'}}>
                  Filter by common allergens?
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
                    label='Breakfast or Brunch'
                    checked={keywordIsBreakfastBrunch}
                    type='radio'
                    name='mealTypeRadio'
                    onChange={mealTypeRadioBB}
                  />
                </Form.Group>
                <Form.Group controlId='isMainDish' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Main Dish'
                    checked={keywordIsMainDish}
                    type='radio'
                    name='mealTypeRadio'
                    onChange={mealTypeRadioMD}
                  />
                </Form.Group>
                <Form.Group controlId='isSideSauce' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Side or Sauce'
                    checked={keywordIsSideSauce}
                    type='radio'
                    name='mealTypeRadio'
                    onChange={mealTypeRadioSS}
                  />
                </Form.Group>
                <Form.Group controlId='isDessert' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Dessert'
                    checked={keywordIsDessert}
                    type='radio'
                    name='mealTypeRadio'
                    onChange={mealTypeRadioDe}
                  />
                </Form.Group>
                <Form.Group controlId='isSnack' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Snack'
                    checked={keywordIsSnack}
                    type='radio'
                    name='mealTypeRadio'
                    onChange={mealTypeRadioS}
                  />
                </Form.Group>
                <Form.Group controlId='isAppetizer' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Appetizer'
                    checked={keywordIsAppetizer}
                    type='radio'
                    name='mealTypeRadio'
                    onChange={mealTypeRadioA}
                  />
                </Form.Group>
                <Form.Group controlId='isDrink' className='dietsAndAllerginsGroup'>
                  <Form.Check
                    inline
                    label='Drink'
                    checked={keywordIsDrink}
                    type='radio'
                    name='mealTypeRadio'
                    onChange={mealTypeRadioDr}
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
    ) : (
      <AdvancedRecipeSearchPageMobile />
    )}
    </div>
  )
}

export default AdvancedRecipeSearchPageTest;
