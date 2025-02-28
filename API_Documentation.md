# LAPO BACKEND API DOCUMENTATION

## Table of Contents:
1. [Authentication Endpoints](#authentication-endpoints)
2. [Scheme Management Endpoints](#scheme-management-endpoints)
3. [Card Management Endpoints](#card-management-endpoints)
4. [Error Handling](#error-handling)
5. [Authentication](#authentication)

---

## 1. Authentication Endpoints

### 1.1 User Registration
**Endpoint:** `POST /api/auth/register`  
**Description:** Register a new user account  

#### Request Body:
```json
{
    "username": "string",    
    "email": "string",       
    "password": "string",    
    "fullName": "string"     
}
```
#### Response:
```json
{
    "status": "success",
    "data": {
        "user": {
            "id": "string",
            "username": "string",
            "email": "string",
            "fullName": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        "token": "string"
    }
}
```

### 1.2 User Login
**Endpoint:** `POST /api/auth/login`  
**Description:** Authenticate user and get access token  

#### Request Body:
```json
{
    "email": "string",
    "password": "string"
}
```
#### Response:
```json
{
    "status": "success",
    "data": {
        "token": "string",
        "user": {
            "id": "string",
            "username": "string",
            "email": "string",
            "fullName": "string"
        }
    }
}
```

---

## 2. Scheme Management Endpoints
**All scheme endpoints require authentication token in header:**  
`Authorization: Bearer {token}`

### 2.1 Create Scheme
**Endpoint:** `POST /api/schemes`  
**Description:** Create a new card scheme  

#### Request Body:
```json
{
    "schemeName": "string",
    "panLength": number
}
```
#### Response:
```json
{
    "status": "success",
    "data": {
        "scheme": {
            "id": "string",
            "schemeName": "string",
            "panLength": number,
            "user": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    }
}
```

### 2.2 Update Scheme
**Endpoint:** `PUT /api/schemes/:id`  
**Description:** Update an existing scheme  

#### URL Parameters:
- `id`: Scheme ID  

#### Request Body:
```json
{
    "schemeName": "string",
    "panLength": number
}
```
#### Response:
```json
{
    "status": "success",
    "data": {
        "scheme": {
            "id": "string",
            "schemeName": "string",
            "panLength": number,
            "user": "string",
            "updatedAt": "date"
        }
    }
}
```

### 2.3 Delete Scheme
**Endpoint:** `DELETE /api/schemes/:id`  
**Description:** Delete a scheme  

#### URL Parameters:
- `id`: Scheme ID  

#### Response:
```json
{
    "status": "success",
    "message": "Scheme deleted successfully"
}
```

### 2.4 Get All Schemes
**Endpoint:** `GET /api/schemes`  
**Description:** Get all schemes for authenticated user  

#### Response:
```json
{
    "status": "success",
    "data": {
        "schemes": [
            {
                "id": "string",
                "schemeName": "string",
                "panLength": number,
                "user": "string",
                "createdAt": "date",
                "updatedAt": "date"
            }
        ]
    }
}
```

---

## 3. Card Management Endpoints
**All card endpoints require authentication token in header:**  
`Authorization: Bearer {token}`

### 3.1 Create Card
**Endpoint:** `POST /api/cards`  
**Description:** Create a new card  

#### Request Body:
```json
{
    "cardName": "string",
    "cardScheme": "string",
    "description": "string",
    "branchBlacklist": "string",
    "blacklist": boolean,
    "binPrefix": "string",
    "expiration": "string",
    "currency": "string",
    "fee": {
        "feeName": "string",
        "value": number,
        "frequency": "string",
        "currency": "string",
        "time": "string",
        "accountPad": "string",
        "account": "string"
    }
}
```
#### Response:
```json
{
    "status": "success",
    "data": {
        "card": {
            "id": "string",
            "cardName": "string",
            "cardScheme": "string",
            "description": "string",
            "branchBlacklist": "string",
            "blacklist": boolean,
            "binPrefix": "string",
            "expiration": "string",
            "currency": "string",
            "fee": {
                "feeName": "string",
                "value": number,
                "frequency": "string",
                "currency": "string",
                "time": "string",
                "accountPad": "string",
                "account": "string"
            },
            "user": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    }
}
```

### 3.2 Update Card
**Endpoint:** `PUT /api/cards/:id`  
**Description:** Update an existing card  

#### URL Parameters:
- `id`: Card ID  

#### Request Body:
_(Any of the fields from card creation can be updated)_

#### Response:
```json
{
    "status": "success",
    "data": {
        "card": {
            // Updated card details
        }
    }
}
```

### 3.3 Delete Card
**Endpoint:** `DELETE /api/cards/:id`  
**Description:** Delete a card  

#### URL Parameters:
- `id`: Card ID  

#### Response:
```json
{
    "status": "success",
    "message": "Card deleted successfully"
}
```

### 3.4 Get All Cards
**Endpoint:** `GET /api/cards`  
**Description:** Get all cards for authenticated user  

#### Response:
```json
{
    "status": "success",
    "data": {
        "cards": [
            {
                // Card details as per create card response
            }
        ]
    }
}
```

---

## 4. Error Handling
All endpoints follow a consistent error response format:

```json
{
    "status": "error",
    "message": "Error description"
}
```

### Common Error Codes:
- **400**: Bad Request (Invalid input)
- **401**: Unauthorized (Missing or invalid token)
- **403**: Forbidden (Insufficient permissions)
- **404**: Not Found
- **500**: Internal Server Error

---

## 5. Authentication
Protected endpoints require JWT token in the `Authorization` header:

```
Authorization: Bearer {token}
```

- The token is obtained after successful login or registration.
- All timestamps are in **ISO 8601 format**.
- All IDs are **MongoDB ObjectIds**.
- The `user` field in schemes and cards references the creator's **user ID**.

---
