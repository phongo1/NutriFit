import { Router } from 'express';
import { searchItem } from '../controllers/groceryController';

const router = Router();
router.post('/searchItem', searchItem);
export default router;