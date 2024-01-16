import CategoryDatamapper from '../datamappers/category.datamapper.js';
import CoreController from './core.controller.js';

export default class CategoryController extends CoreController {
  static datamapper = CategoryDatamapper;
}
