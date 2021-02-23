import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row } from 'react-bootstrap';

const RecipeCardImage = ({ recipe }) => {
  const Diets = []
  if (recipe.isVegan === true) {
    Diets.push('Vegan')
  }
  if (recipe.isVegetarian === true) {
    Diets.push('Vegetarian')
  }
  if (recipe.isGlutenFree === true) {
    Diets.push('Gluten Free')
  }
  if (recipe.isKetogenic === true) {
    Diets.push('Ketogenic')
  }

  const Allergins = []
  if (recipe.isDairy === true) {
    Allergins.push('Dairy')
  }
  if (recipe.isEgg === true) {
    Allergins.push('Egg')
  }
  if (recipe.isNuts === true) {
    Allergins.push('Nuts')
  }
  if (recipe.isShellfish === true) {
    Allergins.push('Shellfish')
  }
  if (recipe.isSoy === true) {
    Allergins.push('Soy')
  }

  return (
    <div>
      <Card className="text mb-4" style={{ height: '200px' }}>
        <Card.Header style={{textAlign: 'center', padding: '0px'}}>{recipe.recipe_name}</Card.Header>
        <Card.ImgOverlay style={{textAlign: 'right', bottom: '1px', marginTop: '160px'}}>
          {recipe.netVotes}
        </Card.ImgOverlay>
        <Link to={`/recipe/${recipe._id}`}>
          <Card.Img src={recipe.recipe_cover_image} alt={recipe.recipe_name} style={{ height: '100%', borderBottomRightRadius: '100px' }}/>
        </Link>
        <Card.Footer>
          <Row>
            {Diets.length > 0 && 'Diets: '}{new Intl.ListFormat().format(Diets)}
          </Row>
          <Row>
            {Allergins.length > 0 && 'Allergins: '}{new Intl.ListFormat().format(Diets)}
          </Row>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default RecipeCardImage;
