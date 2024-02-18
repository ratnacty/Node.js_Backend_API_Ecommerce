# API Doc (Auth)

## Description

This is an api to Process Authentication (Login & register)

## Base URL

The base URL for all API requests is:

`http://localhost:5000`

# Register

## Endpoints

### `POST /registeruser`

Returns a data of new user Registrated.

### Response

Returns a JSON object with the following properties:

- `message`: a response message.
- `user`: An array of user objects, each with the following properties:
    - `id`: The unique identifier of the user.
    - `email`: The title email of user.
    - `name`: The name of user.
    - `password`: the paswword of user that already encrypt.
    - `is_block`: The status of default user.
    - `role_id`: The role of user that can follow the permission

### Example

Request:

```
POST http://localhost:5000/registeruser
```
Body: 

use :

- `roleId: 3` for Regular User,
- `roleId: 2` for Register as Seller


``` json
 {
    "name": "samantha",
    "password": "password123",
    "email": "samantha@gmail.com",
    "roleId": 3
  }

```

Response:

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 6,
    "email": "samantha@gmail.com",
    "name": "samantha",
    "password": "********************",
    "is_blocked": false,
    "role_id": 3,
    "created_at": "2024-02-18T10:32:01.603Z"
  }
}

```

# Login
## Endpoints

### `POST /login`

Returns a data of user that has login.

### Response

Returns a JSON object with the following properties:

- `token`: generate jwt token.
- `user`: An array of user objects, each with the following properties:
    - `id`: The unique identifier of the user.
    - `email`: The title email of user.
    - `name`: The name of user.
    - `password`: the paswword of user that already encrypt.
    - `is_block`: The status of default user.
    - `role_id`: The role of user that can follow the permission
    - `created_at`: when user created
    - `role`: description the user role

### Example

Request:

```
POST http://localhost:5000/login
```
Body: 
- `seller@gmail.com` to login as seller
- `shamanta@gmail.com` to login as regular user

``` json
{
   "password": "password123",
    "email": "seller@gmail.com"
}

```

Response:

```json
{
  "token": "**********************",
  "user": {
    "id": 2,
    "email": "seller@gmail.com",
    "name": "seller",
    "password": "********************",
    "is_blocked": false,
    "role_id": 2,
    "created_at": "2024-02-17T20:13:22.749Z",
    "role": {
      "id": 2,
      "name": "seller",
      "created_at": "2024-02-17T20:08:49.854Z"
    }
  }
}

```