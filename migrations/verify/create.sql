-- Verify oblog:create on pg

BEGIN;

SELECT "id", "label", "route", "created_at", "updated_at" FROM "category" WHERE false;
SELECT "id", "title", "slug", "excerpt", "content", "created_at", "updated_at" FROM "post" WHERE false;

ROLLBACK;
