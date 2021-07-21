import express from 'express';
import path from 'path';
import { textGroceryList } from '../controllers/textGroceryListController.js';

// Need to figure out how to incorporate - not too concerned here
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/textGroceryList')
  .post(textGroceryList)

export default router;
