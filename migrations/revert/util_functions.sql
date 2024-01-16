-- Revert oblog:util_functions from pg

BEGIN;

DROP FUNCTION create_category(json);

DROP FUNCTION create_post(json);

DROP FUNCTION update_category(json);

DROP FUNCTION update_post(json);

COMMIT;
