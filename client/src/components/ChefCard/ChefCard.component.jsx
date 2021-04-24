import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { RiPlantFill, RiLeafFill } from 'react-icons/ri';
import { FaBreadSlice, FaFish } from 'react-icons/fa';
import { GiAvocado, GiMilkCarton, GiRawEgg, GiPeanut, GiNautilusShell, GiCoffeeBeans, GiWheat } from 'react-icons/gi';

const ChefCard = ({ chef }) => {

  return (
    <div className="chefCardMobile" style={{paddingBottom: '40px'}}>
      <Card className="text-light mb-4 chefCardMobile" style={{ border: 'none', height: '136px', width: '175px' }}>
        <Card.Header style={{textAlign: 'center', padding: '5px', backgroundColor: '#71881B', borderTopRightRadius: '50px', borderTopLeftRadius: '50px', fontSize: '10px' }}>
          <span>
            {chef.username.slice(0, 25) + (chef.username > 25 ? "..." : "")}
          </span>
        </Card.Header>
        <Link to={`/chefs/${chef._id}`} style={{zIndex: '2'}}>
          <Card.Img className="chefCardMobile" src={chef.chefPicture} alt={chef.chefPicture} style={{height: '136px', width: '175px', backgroundColor: '#B2D732' }}/>
        </Link>
        <Card.Footer style={{fontSize: '12.5px', paddingTop: '2px', paddingBottom: '2px', backgroundColor: '#71881B', borderBottomRightRadius: '50px', borderBottomLeftRadius: '50px'}}>
          <Row>
            <Col style={{display: 'flex', justifyContent: 'space-around'}}>
              {(chef.isVegan === true) && (
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
              {(chef.isVegetarian === true) && (
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
              {(chef.isGlutenFree === true) && (
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
              {(chef.isKetogenic === true) && (
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
              {(chef.isPescatarian === true) && (
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
              {(chef.isDairy === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Avoids dairy
                    </Tooltip>
                  }
                >
                  <span><GiMilkCarton /></span>
                </OverlayTrigger>
              )}
              {(chef.isEgg === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Avoids egg
                    </Tooltip>
                  }
                >
                  <span><GiRawEgg /></span>
                </OverlayTrigger>
              )}
              {(chef.isNuts === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Avoids nuts
                    </Tooltip>
                  }
                >
                  <span><GiPeanut /></span>
                </OverlayTrigger>
              )}
              {(chef.isShellfish === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Avoids shellfish
                    </Tooltip>
                  }
                >
                  <span><GiNautilusShell /></span>
                </OverlayTrigger>
              )}
              {(chef.isSoy === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Avoids soy
                    </Tooltip>
                  }
                >
                  <span><GiCoffeeBeans /></span>
                </OverlayTrigger>
              )}
              {(chef.isWheat === true) && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={'tooltip-bottom'}>
                      Avoids wheat
                    </Tooltip>
                  }
                >
                  <span><GiWheat /></span>
                </OverlayTrigger>
              )}
            </Col>
            {chef.isVegan !== true && chef.isVegetarian !== true && chef.isGlutenFree !== true && chef.isKetogenic !== true && chef.isPescatarian !== true && chef.isDairy !== true && chef.isEgg !== true && chef.isNuts !== true && chef.isShellfish !== true && chef.isSoy !== true && chef.isWheat !== true && (
              <span style={{color: '#71881B'}}>&nbsp;</span>
            )}
          </Row>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default ChefCard;
