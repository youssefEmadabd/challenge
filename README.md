# Getting started

## Requirements

* node
* npm
* mongoDB

## Start Server

First, you have to install dependencies

- `npm i`

then start the server using:

- `npm run dev`

# Available endpoints

It is assumed you are running this server locally, thus the domain will be localhost running on port 5000

## Users
- Get `localhost:5000/v1/users/` with `bearer token` in the headers
- Post `localhost:5000/v1/users/` with `bearer token` in the headers
- Patch `localhost:5000/v1/users/` with `bearer token` in the headers
- Delete `localhost:5000/v1/users/` with `bearer token` in the headers
- Post `localhost:5000/v1/users/register/:RoleName` with a specified role name in the params (Register Route)
    - Username and password are required in the body
- Post `localhost:5000/v1/users/login` (login Route)
    - Username and password are required in the body
- Post `localhost:5000/v1/users/deposit` to add money to a seller account
- Post `localhost:5000/v1/users/buy/:productId` to buy a product with id productId
- Post `localhost:5000/v1/users/reset` to reset deposits

## Roles

- Get `localhost:5000/v1/roles/` with `bearer token` in the headers (all users)
- Post `localhost:5000/v1/roles/` with `bearer token` in the headers
- Patch `localhost:5000/v1/roles/` with `bearer token` in the headers
- Delete `localhost:5000/v1/roles/` with `bearer token` in the headers

** Note: only users with admin role can edit roles

## Products

- Get `localhost:5000/v1/products/` with `bearer token` in the headers (all users)
- Post `localhost:5000/v1/products/` with `bearer token` in the headers
- Patch `localhost:5000/v1/products/` with `bearer token` in the headers
- Delete `localhost:5000/v1/products/` with `bearer token` in the headers

** Note: only users with buyer role can edit roles

# Fixtures

Only Roles model has fixtures that persists admin, buyer, and seller roles