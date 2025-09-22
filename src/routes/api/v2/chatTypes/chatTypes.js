import {Router} from 'express';
import { chatTypesController } from '../../../../controllers/chatTypes/chatTypesController.js';

const router = Router();

router.get('/', chatTypesController.getAll);
router.get('/:id', chatTypesController.getById);

export default router;