import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const pagesController = {
    
    servePage(pageName) {
        return async (req, res, next) => {
            try {
                const filePath = path.join(__dirname, `../../public/${pageName}.html`);
				//Check if file exists
				await fs.access(filePath);
				res.sendFile(filePath);
			} catch (error) {
                if (error.code === 'ENOENT') {
                    console.warn(`Page not found: ${pageName}`);
					return this.serve404(req, res);
				}
				next(error);
			}
		};
	},
    
    serveHome: null,
    serveQRCode: null,
    serveSettings: null,
    serveSettingsV2: null,
    serveDocs: null,

	serveStatic(req, res, next) {
		try {
			const filePath = path.join(__dirname, '../../public', req.path);

			if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
				res.setHeader('Cache-Control', 'public, max-age=86400'); //Max one day
			}

			res.sendFile(filePath);
		} catch (error) {
			next(error);
		}
	},

	serve404(req, res) {
		const filePath = path.join(__dirname, '../../public/404.html');
		res.status(404).sendFile(filePath, (err) => {
			if (err) {
				res.status(404).json({
					error: 'Page not found',
					message: `The page ${req.originalUrl} does not exist.`,
					suggestion: 'Check the URL or return to the home page.',
				});
			}
		});
	},
};

pagesController.serveHome = pagesController.servePage('index');
pagesController.serveQRCode = pagesController.servePage('qr-code');
pagesController.serveSettings = pagesController.servePage('settings');
pagesController.serveSettingsV2 = pagesController.servePage('settings-v2');
pagesController.serveDocs = pagesController.servePage('docs');