import { Router } from "express";
import { webhooksController } from "../../controllers/webhooks/webhooksController.js";

const router = Router();

router.get(':source', webhooksController.getWebhookInfo);
router.post(':source', webhooksController.processWebhook);

export default router;