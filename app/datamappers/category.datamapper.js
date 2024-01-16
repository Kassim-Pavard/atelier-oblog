/**
 * @typedef {object} Category
 * @property {integer} id - Category id
 * @property {string} label - Category label
 * @property {string} route - Category route
 * @property {string} created_at - Category created_at
 * @property {string} updated_at - Category updated_at
 */

/**
 * @typedef {object} CategoryInput
 * @property {string} label.required - Category label
 * @property {string} route.required - Category route
 */
import CoreDatamapper from './core.datamapper.js';

export default class CategoryDatamapper extends CoreDatamapper {
  static readTableName = 'category';

  static writeTableName = 'category';
}
