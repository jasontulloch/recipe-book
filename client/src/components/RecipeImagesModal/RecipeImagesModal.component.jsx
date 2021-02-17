import React from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';

const RecipeImagesModal = ({ recipe }) => {
  // Set variable to display / hide modal
  const [modalShow, setModalShow] = React.useState(false);

  console.log(recipe)

  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        RECIPE IMAGES
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Carousel>
          <Carousel.Item>
            <img
              className='w-100'
              src={recipe.recipe_cover_image}
              alt='First Slide'
            />
          </Carousel.Item>
        </Carousel>
      </Modal>
    </div>
  )
}

export default RecipeImagesModal;
