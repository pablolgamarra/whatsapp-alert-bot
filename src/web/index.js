import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Router from '../routes/routes.js';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../public')));
app.use(Router);

export default app;
