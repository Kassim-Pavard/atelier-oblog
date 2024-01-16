/**
 * @typedef {object} Post
 * @property {integer} id - Post id
 * @property {string} title - Post title
 * @property {string} slug - Post slug
 * @property {string} excerpt - Post excerpt
 * @property {string} content - Post content
 * @property {string} created_at - Post created_at
 * @property {string} updated_at - Post updated_at
 */

/**
 * @typedef {object} PostInput
 * @property {string} title.required - Post title
 * @property {string} slug.required - Post slug
 * @property {string} excerpt - Post excerpt
 * @property {string} content - Post content
 */
import client from '../helpers/pg.client.js';
import CoreDatamapper from './core.datamapper.js';

export default class PostDatamapper extends CoreDatamapper {
  static readTableName = 'post_with_category';

  static writeTableName = 'post';

  // Exercice en autonomie :
  /*
  1. déporté cette nouvelle façon de faire dans le core.datamapper
  2. Créer la function correspondante pour les catégorie
  3. par extension dynamiser l'appel de la fonction
     dans le core.datamapper au même titre que la
     dynamisation des tables
  4. Faire la même chose pour les updates
  5. Si vous avez du temps vous pouvez créer une migration sqitch pour la création des fonctions
  */
  static async insert(data) {
    const result = await client.query(
      'SELECT * FROM new_post($1)',
      [data],
    );
    return result.rows[0];
  }
}
