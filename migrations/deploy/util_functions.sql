-- Deploy oblog:util_functions to pg

BEGIN;

CREATE FUNCTION create_category("data" json) RETURNS category AS $$

  INSERT INTO "category"
  (
    "label",
    "route"
  ) VALUES (
    data->>'label',
    data->>'route'
  ) RETURNING *

$$ LANGUAGE sql STRICT;

CREATE FUNCTION create_post("data" json) RETURNS post AS $$

  INSERT INTO "post"
  (
    "title",
    "slug",
    "excerpt",
    "content",
    "category_id"
  ) VALUES (
    data->>'title',
    data->>'slug',
    data->>'excerpt',
    data->>'content',
    (data->>'category_id')::int
  ) RETURNING *

$$ LANGUAGE sql STRICT;

CREATE FUNCTION update_category(json) RETURNS category AS $$

  UPDATE "category" SET
    "label" = $1->>'label',
    "route" = $1->>'route'
  WHERE "id" = ($1->>id)::int
  RETURNING *

$$ LANGUAGE sql STRICT;

CREATE FUNCTION update_post(json) RETURNS post AS $$

  UPDATE "post" SET
    "title" = $1->>'title',
    "slug" = $1->>'slug',
    "excerpt" = $1->>'excerpt',
    "content" = $1->>'content',
    "category_id" = ($1->>'category_id')::int,
    "updated_at" = now()
  WHERE "id" = ($1->>'id')::int
  RETURNING *

$$ LANGUAGE sql STRICT;

COMMIT;
