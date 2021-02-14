import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header/Header.component';
import Footer from './components/Footer/Footer.component';

import HomePage from './pages/HomePage/HomePage.component';
import LoginPage from './pages/LoginPage/LoginPage.component';
import RegisterPage from './pages/RegisterPage/RegisterPage.component';
import ProfileEditPage from './pages/ProfileEditPage/ProfileEditPage.component';
import ChefRecipesListPage from './pages/ChefRecipesListPage/ChefRecipesListPage.component';
import ChefRecipeEditPage from './pages/ChefRecipeEditPage/ChefRecipeEditPage.component';
import ChefSavedRecipesListPage from './pages/ChefSavedRecipesListPage/ChefSavedRecipesListPage.component';
import ChefSavedRecipesDeletePage from './pages/ChefSavedRecipesDeletePage/ChefSavedRecipesDeletePage.component';
import AllRecipesPage from './pages/AllRecipesPage/AllRecipesPage.component';
import AdvancedRecipeSearchPage from './pages/AdvancedRecipeSearchPage/AdvancedRecipeSearchPage.component';
import AdvancedRecipeSearchResultsPage from './pages/AdvancedRecipeSearchResultsPage/AdvancedRecipeSearchResultsPage.component';
import IndividualRecipePage from './pages/IndividualRecipePage/IndividualRecipePage.component';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container className=''>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/profile' component={ProfileEditPage} />
          <Route path='/myrecipes' component={ChefRecipesListPage} exact />
          <Route path='/myrecipes/:id/edit' component={ChefRecipeEditPage} exact />
          <Route path='/savedrecipes' component={ChefSavedRecipesListPage} exact />
          <Route path='/savedrecipes/:id' component={ChefSavedRecipesDeletePage} exact />
          <Route path='/recipes' component={AllRecipesPage} exact />
          <Route path='/recipes/advanced-search' component={AdvancedRecipeSearchPage} exact />
          <Route path='/recipe/:id' component={IndividualRecipePage} exact />
          <Route path='/recipes/advanced-search-results/keywordRecipeName=:keywordRecipeName/keywordCountry=:keywordCountry' component={AdvancedRecipeSearchResultsPage} />
          <Route path='/recipes/search/keywordRecipeName=:keywordRecipeName' component={AllRecipesPage} />
          <Route path='/' component={HomePage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;
