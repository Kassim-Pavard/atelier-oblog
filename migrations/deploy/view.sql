-- Deploy oblog:view to pg

BEGIN;

-- Une vue est une sorte de favoris de requêtes. On stocke physiquement une requête sous un alias les résultats de cette requête seront considéré comme une table virtuelle (on peu lire mais on peut pas écrire)
-- El sera donc requêtable avec un SELECT comme n'importe quelle table. Mais on ne pourra pas INSERT, UPDATE, ou DELETE
-- La création d'une vue nous permet de simplifier les requête au niveau de l'application JS et de normaliser la récupération d'info au sein d'une même entité en dynamisant la table source.

CREATE VIEW "post_with_category" AS
SELECT
"post".*,
"category"."label" AS "category"
FROM "post"
JOIN "category" ON "category"."id" = "post"."category_id";

COMMIT;
