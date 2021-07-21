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
  updateChef,
  followChef,
  unfollowChef,
  getMyFollowedChefs
} from '../controllers/chefController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Note that /:id is needed as the starting point (i think since using protect)
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
router.route('/:id/follow')
  .post(protect, followChef)
router.route('/:id/unfollow')
  .delete(protect, unfollowChef)
router.route('/:id/mychefs')
  .get(protect, getMyFollowedChefs)

export default router;
