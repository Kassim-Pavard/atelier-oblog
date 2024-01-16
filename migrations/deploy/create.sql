-- Deploy oblog:create to pg

BEGIN;

CREATE TABLE "category" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" text NOT NULL UNIQUE, -- ici la contrainte unique est sur chaque colonne car le couple "label", "route" pourrait ammener des doublons de l'un ou l'autre
  "route" text NOT NULL UNIQUE CHECK("route" ~ '^/\w*$'),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

CREATE TABLE "post" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" text NOT NULL UNIQUE,
  "slug" text NOT NULL UNIQUE CHECK("slug" ~ '^[\w-]+$'),
  "excerpt" text,
  "content" text,
  "category_id" int NOT NULL REFERENCES "category" ("id"),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

COMMIT;
