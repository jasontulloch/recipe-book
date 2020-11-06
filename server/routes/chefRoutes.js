import express from 'express';
import {
  authChef,
  registerChef,
  getChefProfile,
  updateChefProfile,
  getChefs,
  deleteChef,
  getChefByIdAdmin,
  getChefById,
  updateChef
} from '../controllers/chefController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(registerChef)
  .get(protect, admin, getChefs)
router.post('/login', authChef)
router.route('/profile')
  .get(protect, getChefProfile)
  .put(protect, updateChefProfile)
router.route('/:id')
  .delete(protect, admin, deleteChef)
  .get(protect, admin, getChefByIdAdmin)
  .put(protect, admin, updateChef)

export default router;
