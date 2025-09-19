import {Router} from 'express';
import { endpointsController } from '../../../../controllers/endpoints/endpointsController.js';

const router = Router();

router.get('/', endpointsController.getAll);
router.get('/:id', endpointsController.getById);
router.post('/', endpointsController.create);
router.put('/', endpointsController.update);
router.delete('/', endpointsController.delete);

export default router