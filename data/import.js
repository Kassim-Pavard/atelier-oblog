import pg from 'pg';
import '../app/helpers/env.load.js';
import { readFile } from 'node:fs/promises';

const client = new pg.Client(process.env.DATABASE_URL);

await client.connect();

// Afin de pouvoir réexecuter ce script plusieurs fois, je nettoie les données des tables avant de
// les remplir
await client.query('TRUNCATE TABLE "category", "post" RESTART IDENTITY CASCADE');

// A partir de là je peux utilser ma bdd dans mon script JS
const postsJson = await readFile(new URL('./posts.json', import.meta.url));
const postsFromJson = JSON.parse(postsJson);

const categoriesJson = await readFile(new URL('./categories.json', import.meta.url));
const categoriesFromJson = JSON.parse(categoriesJson);

// Maintenant on a 2 tableaux un pour les posts et un pour les catégories Pour insérer les posts il
// va nous falloir un id de catégorie, donc on va d'abord ajouter les catégories, ensuite récupérer
// l'id des ses insertions, les stocker dans l'obje de catégorie ou tout autre référence. Afin de
// faire correspondre les catégories en toutes lettres des objet de posts par l'id correxpondant
// fraichement inséré.

const categoryPromises = [];
categoriesFromJson.forEach((category) => {
  const promise = client.query(`
    INSERT INTO "category"
    (
      "label",
      "route"
    ) 
    VALUES
    (
      $1,
      $2
    )
    RETURNING *
  `, [
    category.label,
    category.route,
  ]);
  console.log(`création insertion categorie : ${category.label}`);
  categoryPromises.push(promise);
});

const categoryResults = await Promise.all(categoryPromises);
console.log(`${categoryResults.length} categories ajoutés`);
// On ne récupère que la première ligne de chaque résultat afin de créer un objet avec les données
// insérer de chaque enregistrement
const categories = categoryResults.map((result) => result.rows[0]);

// Maintenant que les catégories sont insérés on va pouvoir insérer les posts a leur tout en se
// servant des id des catégories

const postPromises = [];
postsFromJson.forEach((post) => {
  // On recherche dans l'objet de categories récupérer après insertion pour trouver l'objet qui
  // correspond au label de la categorie stovcker dans le json de post afin de récupérer son id
  // d'insertion
  const category = categories.find((categoryInserted) => categoryInserted.label === post.category);
  const promise = client.query(`
    INSERT INTO "post"
    (
      "title",
      "slug",
      "excerpt",
      "content",
      "category_id"
    )
    VALUES
    ($1, $2, $3, $4, $5)
  `, [
    post.title,
    post.slug,
    post.excerpt,
    post.content,
    category.id,
  ]);
  console.log(`création insertion post : ${post.title} avec la catégorie ${category.id}`);
  postPromises.push(promise);
});

const postResults = await Promise.all(postPromises);
console.log(`${postResults.length} posts ajoutés`);

client.end();
