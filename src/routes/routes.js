import { Router, json } from 'express';
import v2Routes from './api/v2/index.js';
import webhookRoutes from './webhooks/index.js';
import pagesRoutes from './pages/index.js';
import { handleError, logRequest, staticFilesMiddleware, validateJSONReqs } from '../middlewares/index.js';

const router = Router();

//MIDDLEWARES
router.use(logRequest);
router.use(validateJSONReqs);
router.use(staticFilesMiddleware);
router.use(json());

//ROUTES
    //v2 Routes
router.use('/api/v2', v2Routes);

    //Webhook Routes
router.use('/webhooks', webhookRoutes);

    //Frontend Routes
router.use('/', pagesRoutes);

router.use('/styles', staticFilesMiddleware);
router.use('/scripts', staticFilesMiddleware);
router.use('/icons', staticFilesMiddleware);


//ERROR HANDLING
router.use(handleError);
1
export default router;
