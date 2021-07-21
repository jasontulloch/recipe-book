import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import PancakeLoader from '../../components/PancakeLoader/PancakeLoader.component';

const RecipeImagesModal = ({ recipe, loading }) => {
  // Set variable to display / hide modal
  const [modalShow, setModalShow] = React.useState(false);
  // Initializing loader for timeout
  const [initialLoader, setInitialLoader] = useState(true)
  if (loading !== true) {
    setTimeout(() => setInitialLoader(false), 3000)
  }

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => setModalShow(true)}
        style={{fontSize: '10px', lineHeight: '10px', width: '100%', paddingLeft: '5px', paddingRight: '5px'}}
      >
        View Recipe Image
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        {initialLoader ?  (
          <PancakeLoader>Fetching {recipe.recipe_name} images...</PancakeLoader>
        ) : (
          <Carousel>
            <Carousel.Item>
              <img
                className='w-100'
                src={recipe.recipe_cover_image}
                alt='First Slide'
              />
            </Carousel.Item>
          </Carousel>
        )}
      </Modal>
    </div>
  )
}

export default RecipeImagesModal;
