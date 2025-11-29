# Preficient

DB definition  


CREATE TABLE users (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL,
    phone       TEXT UNIQUE,
    cc          TEXT UNIQUE,
    url_photo   TEXT
);


CREATE TABLE resources (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    description TEXT,
    quantity    INTEGER NOT NULL DEFAULT 0,
    id_user     uuid REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE storage (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type        TEXT NOT NULL,
    lowlimit    INTEGER NOT NULL,
    highlimit   INTEGER NOT NULL
);


CREATE TABLE storage_resources (
    id_storage  uuid REFERENCES storage(id) ON DELETE CASCADE,
    id_resource uuid REFERENCES resources(id) ON DELETE CASCADE,
    PRIMARY KEY (id_storage, id_resource)
);


CREATE TABLE vehicle_type (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE vehicles (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    capacidad   INTEGER NOT NULL,
    id_type     uuid NOT NULL REFERENCES vehicle_type(id) ON DELETE RESTRICT,
    id_user     uuid REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE maps (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    url         TEXT NOT NULL,
    description TEXT
);

DER:
![alt text]({7A07AAF9-9DF6-49CD-959F-E77D42C25519}.png)