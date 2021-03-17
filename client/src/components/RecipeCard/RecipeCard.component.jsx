import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { RiPlantFill, RiLeafFill } from 'react-icons/ri';
import { FaBreadSlice, FaVoteYea, FaFish } from 'react-icons/fa';
import { GiAvocado, GiMilkCarton, GiRawEgg, GiPeanut, GiNautilusShell, GiCoffeeBeans, GiWheat } from 'react-icons/gi';

const RecipeCardImage = ({ recipe }) => {

  return (
    <div style={{paddingBottom: '40px'}}>
      <Card className="text-light mb-4 " style={{ border: 'none', height: '225px', width: '225px' }}>
        <Card.Header style={{textAlign: 'center', padding: '5px', backgroundColor: '#71881B', borderTopRightRadius: '50px', borderTopLeftRadius: '50px' }}>
          <span>
            {recipe.recipe_name.slice(0, 25) + (recipe.recipe_name.length > 25 ? "..." : "")}
          </span>
        </Card.Header>
        <Link to={`/recipe/${recipe._id}`} style={{zIndex: '2'}}>
          <Card.Img src={recipe.recipe_cover_image} alt={recipe.recipe_name} style={{height: '225px', width: '225px', backgroundColor: '#B2D732' }}/>
        </Link>
        <Card.Footer style={{paddingTop: '2px', paddingBottom: '2px', backgroundColor: '#71881B', borderBottomRightRadius: '50px', borderBottomLeftRadius: '50px'}}>
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
              {(recipe.isPescatarian === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Pescatarian
                    </Tooltip>
                  }
                >
                  <span><FaFish /></span>
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
              {(recipe.isWheat === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Contains wheat
                    </Tooltip>
                  }
                >
                  <span><GiWheat /></span>
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
