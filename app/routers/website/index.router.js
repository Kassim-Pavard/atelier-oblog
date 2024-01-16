import express from 'express';
import controller from '../../controllers/website.controller.js';
import controllerWrapper from '../../helpers/controller.wrapper.js';
import WebsiteError from '../../errors/website.error.js';

const websiteRouter = express.Router();

websiteRouter.route('/')
  .get(controllerWrapper(controller.homePage));

websiteRouter.use((_, __, next) => {
  next(new WebsiteError('Page not found', { httpStatus: 404 }));
});

export default websiteRouter;
