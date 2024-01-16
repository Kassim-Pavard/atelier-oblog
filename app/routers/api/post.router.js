import express from 'express';
import PostController from '../../controllers/post.controller.js';
import postCreateSchema from '../../schemas/post.create.schema.js';
import postUpdateSchema from '../../schemas/post.update.schema.js';
import controllerWrapper from '../../helpers/controller.wrapper.js';
import validationMiddleware from '../../middlewares/validation.middleware.js';

const postRouter = express.Router();

postRouter.route('/')
  /**
   * GET /api/posts
   * @summary Get all posts
   * @tags Posts
   * @return {Post[]} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .get(controllerWrapper(PostController.getAll.bind(PostController)))
  /**
   * POST /api/posts
   * @summary Create a new post
   * @tags Posts
   * @param {PostInput} request.body.required - Post info
   * @return {Post} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .post(
    validationMiddleware('body', postCreateSchema),
    controllerWrapper(PostController.create.bind(PostController)),
  );

postRouter.route('/:id(\\d+)')
  /**
   * GET /api/posts/{id}
   * @summary Get a post from its id
   * @tags Posts
   * @param {number} id.path.required - Post id
   * @return {Post} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 404 - Not found response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .get(controllerWrapper(PostController.getByPk.bind(PostController)))
  /**
   * PATCH /api/posts/{id}
   * @summary Update a post
   * @tags Posts
   * @param {number} id.path.required - Post id
   * @param {PostInput} request.body.required - Post info
   * @return {Post} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 404 - Not found response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .patch(
    validationMiddleware('body', postUpdateSchema),
    controllerWrapper(PostController.update.bind(PostController)),
  )
  /**
   * DELETE /api/posts/{id}
   * @summary Delete a post
   * @tags Posts
   * @param {number} id.path.required - Post id
   * @return {Post} 200 - success response - application/json
   * @return {ApiJsonError} 400 - Bad request response - application/json
   * @return {ApiJsonError} 404 - Not found response - application/json
   * @return {ApiJsonError} 500 - Internal Server Error - application/json
   */
  .delete(controllerWrapper(PostController.delete.bind(PostController)));

export default postRouter;
