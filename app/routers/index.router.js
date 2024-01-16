import express from 'express';
import apiRouter from './api/index.router.js';
import websiteRouter from './website/index.router.js';

const router = express.Router();

// Afin de créer plusieurs "categories" de router on peut prrefixé l'utilsation des ceux
// On prendra de toujours les déclarer du plus restrictif au moins restrictif
router.use('/api', apiRouter);
router.use('/', websiteRouter);

export default router;
