import { Router } from 'express';
import { searchItem } from '../controllers/groceryController';

const router = Router();
router.get('/searchItem', searchItem);
export default router;