# API DOC (Cart and Order)

## Description

This is an api to fetch Cart and Product

## Base URL

The base URL for all API requests is:

`http://localhost:5000`


# Add To Cart
## Endpoints

### `POST /addToCart`

Returns a list of data in cart.

### Example

Request:

```
POST /http://localhost:5000/addToCart
```

Body:

```json
{ 
    "product_id":7,
    "quantity": 1
}

```

Response:

```json
{
  "message": "Product added to cart",
  "cartItem": {
    "id": 10,
    "quantity": 1,
    "productID": 7,
    "total": 940,
    "userID": 4,
    "created_at": "2024-02-17T21:27:43.701Z"
  }
}
```


# Show Cart According User that Login
## Endpoints

### `GET /displayCart`

Returns a list of cart.

### Example

Request:

```
GET /http://localhost:5000/displayCart
```

Response:

```json
{
  "total": 940,
  "cart": [
    {
      "id": 10,
      "quantity": 1,
      "productID": 7,
      "total": 940,
      "userID": 4,
      "created_at": "2024-02-17T21:27:43.701Z"
    }
  ]
}
```


# Checkout
## Endpoints

### `POST /checkout`

Returns message and order & order item list.

### Example

Request:

```
POST /http://localhost:5000/checkout
```

Response:

```json
{
  "message": "Order placed successfully",
  "order": {
    "id": 4,
    "userID": 4,
    "nomorOrder": "ORD/531",
    "total": 940,
    "status": "Pending",
    "created_at": "2024-02-17T21:27:54.689Z"
  },
  "items": [
    {
      "order_id": 4,
      "product_id": 7,
      "quantity": 1,
      "total": 940
    }
  ]
}

```

# Process Payment
## Endpoints

### `POST /process_payment/:id`

Returns a client secret that use for code payment in using Stripe .

### Example

Request:

```
POST /http://localhost:5000/process_payment/5
```

Response:

```json
{
  "clientSecret": "pi_3Ol9BTFjm7p******************",
  "message": "Success ! tanks, we will reach out you soon"
}
```

#### recommended you to cek status payment in *Stripe* payment gateway 


# DELETE Cart
## Endpoints

### `DELETE /deleteCart`

Returns a message deleting .

### Example

Request:

```
DELETE /http://localhost:5000/deleteCart
```

Response:

```json
{
  "message": "Cart Empty"
}
```


# Delete Cart By Id

## Endpoints

### `DELETE /deleteCart/:id`

Returns a message deleting .

### Example

Request:

```
DELETE /http://localhost:5000/deleteCart/1
```

Response:

```json
{
 "message": "Product removed from cart"
}
```


# History Order
## Endpoints

### `GET /history_order`

Returns a list of History order user.

### Example

Request:

```
GET /http://localhost:5000/history_order

```

Response:

```json
[
  {
    "id": 4,
    "userID": 4,
    "nomorOrder": "ORD/531",
    "total": 940,
    "status": "Paid",
    "created_at": "2024-02-17T21:27:54.689Z"
  },
  {
    "id": 3,
    "userID": 4,
    "nomorOrder": "ORD/966",
    "total": 9420,
    "status": "Paid",
    "created_at": "2024-02-17T21:26:13.424Z"
  }
]
```



# Get All Order
## Endpoints

### `GET /read_order`

Returns a list of data Order.

### Example

Request:

```
GET /http://localhost:5000/read_order?page=1

```

Response:

```json
{
  "success": true,
  "current_page": 1,
  "total_page": 1,
  "total_data": 3,
  "data": [
    {
      "id": 2,
      "userID": 3,
      "nomorOrder": "ORD/182",
      "total": 1435,
      "status": "Paid",
      "created_at": "2024-02-17T21:18:20.917Z"
    },
    {
      "id": 3,
      "userID": 4,
      "nomorOrder": "ORD/966",
      "total": 9420,
      "status": "Paid",
      "created_at": "2024-02-17T21:26:13.424Z"
    },
    {
      "id": 4,
      "userID": 4,
      "nomorOrder": "ORD/531",
      "total": 940,
      "status": "Paid",
      "created_at": "2024-02-17T21:27:54.689Z"
    }
  ]
}
```

# Delete Order By Id
## Endpoints

### `DELETE /deleteOrder/:id`

Returns a message deleting and order information that has delete.

### Example

Request:

```
DELETE /http://localhost:5000/deleteOrder/1

```

Response:

```json
{
  "message": "Order deleted successfully",
  "order": {
    "id": 1,
    "userID": 3,
    "nomorOrder": "ORD/375",
    "total": 940,
    "status": "Paid",
    "created_at": "2024-02-17T20:53:53.987Z"
  }
}
```


# Read Order Item
## Endpoints

### `GET /read_order_item`

Returns a list of order item in database.

### Example

Request:

```
GET /http://localhost:5000/read_order_item


```

Response:

```json
{
  "success": true,
  "current_page": 1,
  "total_page": 3,
  "total_data": 7,
  "data": [
    {
      "id": 2,
      "order_id": 2,
      "product_id": 1,
      "quantity": 1,
      "total": 495,
      "created_at": "2024-02-17T21:18:20.926Z"
    },
    {
      "id": 3,
      "order_id": 2,
      "product_id": 7,
      "quantity": 1,
      "total": 940,
      "created_at": "2024-02-17T21:18:20.926Z"
    },
    {
      "id": 4,
      "order_id": 3,
      "product_id": 1,
      "quantity": 6,
      "total": 2970,
      "created_at": "2024-02-17T21:26:13.434Z"
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