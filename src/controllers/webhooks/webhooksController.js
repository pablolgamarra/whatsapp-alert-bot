import { getEndpoints } from '../../data/dao/dao.js';
import sendMessage from '../../bot/handlers/sendMessage.js';

export const webhooksController = {
    async processWebhook(req, res, next) {
        try {
            const { source } = req.params;
            const data = req.body;

            // Validate route
            if (!source) {
                return res.status(400).json({ 
                    error: 'Endpoint not configured',
                    code: 'MISSING_SOURCE'
                });
            }

            if (!data.message) {
                return res.status(400).json({ 
                    error: 'The message parameter is required',
                    code: 'MISSING_MESSAGE'
                });
            }

            // Get webhook configuration from db
            const filter = `WHERE t1.url = '${source}'`;
            const webhookConfig = await getEndpoints(filter);

            if (!webhookConfig || webhookConfig.length === 0) {
                return res.status(404).json({ 
                    error: `Webhook configuration not found for: ${source}`,
                    code: 'WEBHOOK_NOT_FOUND'
                });
            }

            const webhook = webhookConfig[0];
            const alertRecipients = webhook.recipients;

            if (!alertRecipients || !Array.isArray(alertRecipients) || alertRecipients.length === 0) {
                return res.status(404).json({ 
                    error: `Recipients for ${source} not configured`,
                    code: 'NO_RECIPIENTS'
                });
            }

            // Procesar el mensaje para cada recipient
            const results = await Promise.allSettled(
                alertRecipients.map(async (recipient) => {
                    try {
                        await sendMessage(recipient.chatId, data.message);
                        return { 
                            recipient: recipient.name, 
                            chatId: recipient.chatId, 
                            status: 'sent' 
                        };
                    } catch (error) {
                        console.error(`❌ Error sending to ${recipient.name}:`, error);
                        throw {
                            recipient: recipient.name,
                            chatId: recipient.chatId,
                            status: 'failed',
                            error: error.message
                        };
                    }
                })
            );

            // Analizar resultados
            const successful = results.filter(r => r.status === 'fulfilled');
            const failed = results.filter(r => r.status === 'rejected');

            if (failed.length === 0) {
                // Todos los mensajes se enviaron correctamente
                res.status(200).json({ 
                    status: 'success',
                    message: 'Message sent to all recipients',
                    sent_to: successful.length,
                    webhook_source: source,
                    recipients: successful.map(r => r.value)
                });
            } else if (successful.length > 0) {
                // Algunos mensajes se enviaron, otros fallaron
                res.status(207).json({ // 207 Multi-Status
                    status: 'partial_success',
                    message: 'Message sent to some recipients',
                    sent_to: successful.length,
                    failed: failed.length,
                    webhook_source: source,
                    successful_recipients: successful.map(r => r.value),
                    failed_recipients: failed.map(r => r.reason)
                });
            } else {
                // Todos los mensajes fallaron
                res.status(500).json({
                    status: 'failed',
                    message: 'Failed to send message to any recipient',
                    webhook_source: source,
                    failed_recipients: failed.map(r => r.reason)
                });
            }

        } catch (error) {
            console.error('❌ Webhook processing error:', error);
            next(error); // Pasar al middleware de manejo de errores
        }
    },

    // GET /webhook/:source (opcional - para verificar configuración)
    async getWebhookInfo(req, res, next) {
        try {
            const { source } = req.params;

            if (!source) {
                return res.status(400).json({ error: 'Source parameter is required' });
            }

            const filter = `WHERE t1.url = '${source}'`;
            const webhookConfig = await getEndpoints(filter);

            if (!webhookConfig || webhookConfig.length === 0) {
                return res.status(404).json({ 
                    error: `Webhook configuration not found for: ${source}` 
                });
            }

            const webhook = webhookConfig[0];
            
            res.status(200).json({
                webhook_endpoint: webhook.webhook_endpoint,
                webhook_alias: webhook.webhook_alias,
                recipients_count: webhook.recipients.length,
                recipients: webhook.recipients.map(r => ({
                    name: r.name,
                    chatId: r.chatId
                })),
                status: 'active'
            });

        } catch (error) {
            console.error('❌ Error getting webhook info:', error);
            next(error);
        }
    }
};