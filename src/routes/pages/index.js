
import { Router } from 'express'
import { pagesController } from '../../controllers/pages/pagesController.js';

const router = Router();

router.get('/', pagesController.serveHome);
router.get('/settings', pagesController.serveSettings);
router.get('/settings-v2', pagesController.serveSettingsV2);
router.get('/docs', pagesController.serveDocs);
router.get('/qr', pagesController.serveQRCode);

export default router;