import express from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import { emailGroceryList } from '../controllers/emailGroceryListController.js';

// Need to figure out how to incorporate - not too concerned here
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/emailGroceryList')
  .post(emailGroceryList)

export default router;
