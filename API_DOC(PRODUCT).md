# API DOC (Product)

## Description

This is an api to fetch Product

## Base URL

The base URL for all API requests is:

`http://localhost:5000`


# Get All Product
## Endpoints

### `GET /products`

Returns a list of all Product in the database.

### Example

Request:

```
GET /http://localhost:5000/products?page=1
```

Response:

```json
{
  "success": true,
  "current_page": 1,
  "total_page": 4,
  "total_data": 11,
  "data": [
    {
      "id": 1,
      "name": "Samsung A-32",
      "category": "Samsung",
      "price": 495,
      "in_stock": true,
      "description": "Super Amoled A-Series",
      "user_id": 1,
      "created_at": "2024-02-17T20:15:13.314Z"
    },
    {
      "id": 2,
      "name": "Samsung A-51",
      "category": "Samsung",
      "price": 530,
      "in_stock": true,
      "description": "Super Amoled A-Series",
      "user_id": 2,
      "created_at": "2024-02-17T20:16:29.088Z"
    },
    {
      "id": 3,
      "name": "Samsung Z-FLip",
      "category": "Samsung",
      "price": 880,
      "in_stock": true,
      "description": "New Era Smartphone Flip",
      "user_id": 2,
      "created_at": "2024-02-17T20:17:18.188Z"
    }
  ]
}
```


# Get Product by Id
## Endpoints

### `GET /product/:id`

Returns a list of information product by Id.

### Example

Request:

```
GET /http://localhost:5000/product/4
```

Response:

```json
{
  "id": 4,
  "name": "Samsung Galaxy M-50",
  "category": "Samsung",
  "price": 320,
  "in_stock": true,
  "description": "Friendly Price",
  "user_id": 2,
  "created_at": "2024-02-17T20:17:53.122Z"
}

```

# Update Product
## Endpoints

### `PUT /product/:id`

Returns a update new data of product.

### Example

Request:

```
PUT /http://localhost:5000/product/4
```

Body :
```json
{
  "name": "Samsung Galaxy M-54",
  "category": "Samsung",
  "price": 320,
  "in_stock": true,
  "description": "Friendly Price"
}

```

Response:

```json
{
  "message": "Product updated successfully",
  "product": {
    "id": 4,
    "name": "Samsung Galaxy M-54",
    "category": "Samsung",
    "price": 320,
    "in_stock": true,
    "description": "Friendly Price",
    "user_id": 2,
    "created_at": "2024-02-17T20:17:53.122Z"
  }
}


```

# Delete Product
## Endpoints

### `DELETE /product/:id`

Returns a message deleteing product and product information.

### Example

Request:

```
DELETE /http://localhost:5000/product/4
```

Response:

```json
{
  "message": "Product deleted successfully",
  "product": {
    "id": 4,
    "name": "Samsung Galaxy M-54",
    "category": "Samsung",
    "price": 320,
    "in_stock": true,
    "description": "Friendly Price",
    "user_id": 2,
    "created_at": "2024-02-17T20:17:53.122Z"
  }
}
```


# Search Product
## Endpoints

### `GET /search`

Returns a list of all product by (params query).

### Example

Request:

you can search by category, name product and description

```
GET /http://localhost:5000/search?query=promax
```

Response:

```json
{
  "current_page": 1,
  "total_page": 1,
  "total_data": 1,
  "data": [
    {
      "id": 7,
      "name": "Apple 14 Promax",
      "category": "Apple",
      "price": 940,
      "in_stock": true,
      "description": "Trendy Design",
      "user_id": 2,
      "created_at": "2024-02-17T20:20:20.990Z"
    }
  ]
}
```





## Errors

This API uses the following error codes:

- `400 Bad Request`: The request was malformed or missing required parameters.
- `401 Unauthorized`: The API key provided was invalid or missing.
- `404 Not Found`: The requested resource was not found.
- `500 Internal Server Error`: An unexpected error occurred on the server.