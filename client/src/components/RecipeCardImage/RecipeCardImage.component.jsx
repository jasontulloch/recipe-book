import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const RecipeCardImage = ({ recipe }) => {
  return (
    <div>

    <Link to={`/recipe/${recipe._id}`}>
      <Card className="text-white mb-4" style={{ height: '20em' }}>
        <Card.Img src={recipe.recipe_cover_image} alt={recipe.recipe_name} style={{ height: '100%' }}/>
        <Card.ImgOverlay>
          <Card.Title>{recipe.recipe_name}</Card.Title>
        </Card.ImgOverlay>
      </Card>
    </Link>

    </div>
  )
}

export default RecipeCardImage;
