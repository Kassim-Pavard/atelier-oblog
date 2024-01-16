import express from 'express';
import ApiError from '../../errors/api.error.js';
import apiPostRouter from './post.router.js';
import apiCategoriesRouter from './category.router.js';

const apiRouter = express.Router();

apiRouter.use('/posts', apiPostRouter);
apiRouter.use('/categories', apiCategoriesRouter);

apiRouter.use((_, __, next) => {
  next(new ApiError('Resource not found', { httpStatus: 404 }));
});

export default apiRouter;
