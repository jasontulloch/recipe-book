import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { RiPlantFill, RiLeafFill } from 'react-icons/ri';
import { FaBreadSlice } from 'react-icons/fa';
import { GiAvocado, GiMilkCarton, GiRawEgg, GiPeanut, GiNautilusShell, GiCoffeeBeans } from 'react-icons/gi';

const RecipeCardImage = ({ recipe }) => {

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
        <Card.Footer style={{paddingTop: '2px', paddingBottom: '2px'}}>
          <Row>
            <Col style={{display: 'flex', justifyContent: 'space-around'}}>
              {(recipe.isVegan === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Vegan
                    </Tooltip>
                  }
                >
                  <span><RiLeafFill /></span>
                </OverlayTrigger>
              )}
              {(recipe.isVegetarian === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Vegetarian
                    </Tooltip>
                  }
                >
                  <span><RiPlantFill /></span>
                </OverlayTrigger>
              )}
              {(recipe.isGlutenFree === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Gluten Free
                    </Tooltip>
                  }
                >
                  <span><FaBreadSlice /></span>
                </OverlayTrigger>
              )}
              {(recipe.isKetogenic === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Ketogenic
                    </Tooltip>
                  }
                >
                  <span><GiAvocado /></span>
                </OverlayTrigger>
              )}
              {(recipe.isDairy === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Contains dairy
                    </Tooltip>
                  }
                >
                  <span><GiMilkCarton /></span>
                </OverlayTrigger>
              )}
              {(recipe.isEgg === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Contains egg
                    </Tooltip>
                  }
                >
                  <span><GiRawEgg /></span>
                </OverlayTrigger>
              )}
              {(recipe.isNuts === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Contains nuts
                    </Tooltip>
                  }
                >
                  <span><GiPeanut /></span>
                </OverlayTrigger>
              )}
              {(recipe.isShellfish === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Contains shellfish
                    </Tooltip>
                  }
                >
                  <span><GiNautilusShell /></span>
                </OverlayTrigger>
              )}
              {(recipe.isSoy === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Contains soy
                    </Tooltip>
                  }
                >
                  <span><GiCoffeeBeans /></span>
                </OverlayTrigger>
              )}
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default RecipeCardImage;
