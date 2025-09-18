import { Router } from 'express';
import { validateJSONReqs } from '../../../middlewares/index.js';
import endpointRoutes from './endpoints/endpoints.js';
import recipientRoutes from './recipients/recipients.js';
import qrRoutes from './qr/qr.js';

const router = Router();

//General Middlewares for v2
router.use(validateJSONReqs);

//v2 Routes
router.use('/endpoint', endpointRoutes);
router.use('/recipients', recipientRoutes);
router.use('/qr', qrRoutes);

export default router;
