import { Router } from 'express';
import {
  createUser,
  loginUser,
  getSavedItems,
  updateNutritionPlan,
  addSavedItem
} from '../controllers/userController';

const router = Router();

router.post('/createUser', createUser);
router.post('/login', loginUser);
router.get('/getSavedItems', getSavedItems);
router.post('/updateNutritionPlan', updateNutritionPlan);
router.post('/addSavedItem', addSavedItem);


export default router;