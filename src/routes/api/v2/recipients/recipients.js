import {Router} from 'express';
import { recipientsController } from '../../../../controllers/recipients/recipientsController.js';

const router = Router();

router.get('/', recipientsController.getAll);
router.get('/:id', recipientsController.getById);

export default router;
