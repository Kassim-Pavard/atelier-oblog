import express from 'express';
import CategoryController from '../../controllers/category.controller.js';
import controllerWrapper from '../../helpers/controller.wrapper.js';
import categoryCreateSchema from '../../schemas/category.create.schema.js';
import categoryUpdateSchema from '../../schemas/category.update.schema.js';
import validationMiddleware from '../../middlewares/validation.middleware.js';

const categoryRouter = express.Router();

categoryRouter.route('/')
  /**
   * GET /api/categories
   * @summary Get all categories
   * @tags Categories
   * @return {Category[]} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .get(controllerWrapper(CategoryController.getAll.bind(CategoryController)))
  /**
   * POST /api/categories
   * @summary Add a category
   * @tags Categories
   * @param {CategoryInput} request.body.required - Category info
   * @return {Category} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .post(
    validationMiddleware('body', categoryCreateSchema),
    controllerWrapper(CategoryController.create.bind(CategoryController)),
  );
/**
 * @route GET /api/posts/
 */
categoryRouter.route('/:id(\\d+)')
/**
 * GET /api/categories/{id}
 * @summary Get a category from its id
 * @tags Categories
 * @param {number} id.path.required - Category id
 * @return {Category} 200 - success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 * @return {ApiJsonError} 404 - Not found response - application/json
 * @return {ApiJsonError} 500 - Internal Server Error - application/json
 */
  .get(controllerWrapper(CategoryController.getByPk.bind(CategoryController)))
  /**
   * PATCH /api/categories/{id}
   * @summary Update a category
   * @tags Categories
   * @param {number} id.path.required - Category id
   * @param {CategoryInput} request.body.required - Category info
   * @return {Category} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 404 - Not found response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .patch(
    validationMiddleware('body', categoryUpdateSchema),
    controllerWrapper(CategoryController.update.bind(CategoryController)),
  )
  /**
   * DELETE /api/categories/{id}
   * @summary Delete a category
   * @tags Categories
   * @param {number} id.path.required - Category id
   * @return {Category} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 404 - Not found response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .delete(controllerWrapper(CategoryController.delete.bind(CategoryController)));
export default categoryRouter;
