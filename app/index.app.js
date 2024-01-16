import express from 'express';
import path from 'node:path';
import router from './routers/index.router.js';
import errorMiddleware from './middlewares/error.middleware.js';
import createDoc from './helpers/api.doc.js';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve('app/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('../public'));

createDoc(app);

app.use(router);

app.use(errorMiddleware);

export default app;
