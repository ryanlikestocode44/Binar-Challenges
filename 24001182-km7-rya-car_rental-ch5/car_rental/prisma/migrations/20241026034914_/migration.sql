-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "profilepicture" VARCHAR,
    "roleid" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "userspk" PRIMARY KEY ("id")
);
