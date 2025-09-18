import { Router } from 'express';
import { qrController } from '../../../../controllers/qr/qrController.js';

const router = Router();

router.get('/', qrController.getQrCode);
router.get('-count', qrController.getQrCode);

export default router;