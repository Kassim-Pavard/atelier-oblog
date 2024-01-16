-- Revert oblog:create from pg

BEGIN;

DROP TABLE "post", "category";

COMMIT;
