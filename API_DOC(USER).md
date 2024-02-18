# API DOC (User)

## Description

This is an api to fetch Users

## Base URL

The base URL for all API requests is:

`http://localhost:5000`


# Get All User
## Endpoints

### `GET /users`

Returns a list of all user in the database column.

### Example

Request:

```
GET /http://localhost:5000/users
```

Response:

```json
[
    {
    "id": 1,
    "email": "admin@gmail.com",
    "name": "Admin",
    "password": "$2b$10$LeAKKgUG74Qt5pUa7e5kb.vvzfeFVX7wFKLOiWaw1mTSXwU64OnQ6",
    "is_blocked": false,
    "role_id": 1,
    "created_at": "2024-02-17T20:12:57.737Z"
  },
  {
    "id": 2,
    "email": "seller@gmail.com",
    "name": "seller",
    "password": "$2b$10$edblm3fY4rGZiU4Eleyc7uyu/.eKxj62WPjKdx8zXkuGLgEfzjrLe",
    "is_blocked": false,
    "role_id": 2,
    "created_at": "2024-02-17T20:13:22.749Z"
  },
]

```


# Get User by Id
## Endpoints

### `GET /user/:id`

Returns a list of all user in the database column.

### Example

Request:

```
GET /http://localhost:5000/user/1
```

Response:

```json
[
    {
    "id": 1,
    "email": "admin@gmail.com",
    "name": "Admin",
    "password": "$2b$10$LeAKKgUG74Qt5pUa7e5kb.vvzfeFVX7wFKLOiWaw1mTSXwU64OnQ6",
    "is_blocked": false,
    "role_id": 1,
    "created_at": "2024-02-17T20:12:57.737Z"
  },
 
]

```

# Update User
## Endpoints

### `POST /user/:id`

Returns a list of all user in the database column.

### Example

Request:

```
POST /http://localhost:5000/update/4
```

Body :
```json
{
  "name": "ratnaUpdate",
  "email": "ratnaupdate@gmail.com",
  "password": "somepassword"
}

```

Response:

```json
{
  "message": "User Update Successfully",
  "user": {
    "id": 4,
    "email": "ratnaupdate@gmail.com",
    "name": "ratnaUpdate",
    "password": "$2b$10$CcQh9x/Qm.2KFxlAaYFTmOcTVfiJ5.Vpci.u.yk9RMlY2SB1mQ3lO",
    "is_blocked": false,
    "role_id": 3,
    "created_at": "2024-02-17T20:14:09.181Z"
  }
}

```

# Delete User
## Endpoints

### `DELETE /users`

Returns a list of all user in the database column.

### Example

Request:

```
DELETE /http://localhost:5000/user/delete/6
```

Response:

```json
{
  "message": "User deleted successfully",
  "user": {
    "id": 6,
    "email": "samantha@gmail.com",
    "name": "samantha",
    "password": "$2b$10$vc.d3vmkwPRiOjFS.aXrZe.SxLfV8zkUcRUT8a2I5Vt2ZKJJOJ5f.",
    "is_blocked": false,
    "role_id": 3,
    "created_at": "2024-02-18T10:32:01.603Z"
  }
}
```




## Errors

This API uses the following error codes:

- `400 Bad Request`: The request was malformed or missing required parameters.
- `401 Unauthorized`: The API key provided was invalid or missing.
- `404 Not Found`: The requested resource was not found.
- `500 Internal Server Error`: An unexpected error occurred on the server.