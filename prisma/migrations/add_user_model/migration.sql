-- Add User model for persistent authentication
CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL
);
