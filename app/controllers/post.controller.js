import PostDatamapper from '../datamappers/post.datamapper.js';
import CoreController from './core.controller.js';

export default class PostController extends CoreController {
  static datamapper = PostDatamapper;
}
