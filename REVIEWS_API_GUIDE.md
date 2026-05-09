# Reviews Module - API Integration Guide

This document provides a comprehensive overview of the **Reviews** module API to assist in frontend integration. It covers data models, endpoints, request/response structures, and error handling.

---

## 1. Global API Standards

- **Base URL**: `/api`
- **Authentication**: All mutation requests (`POST`, `PATCH`, `DELETE`) require a Bearer Token (Better-Auth).
- **Response Format**: All responses are wrapped in a standard `ApiResponse` object.

### Standard Response Structure
```typescript
export interface ApiResponse<T> {
  success: boolean;
  data?: T | null; // The actual payload
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
  error?: {
    statusCode: number;
    message: string | string[]; // Error description(s)
    error: string; // Error type (e.g., "NotFoundException")
  };
  timestamp: string;
  path: string;
}
```

---

## 2. Updated Data Models

### Target Entities (Company, Product, Service)
New fields have been added to keep track of ratings without performing heavy aggregations on the frontend.

| Field | Type | Description |
| :--- | :--- | :--- |
| `averageRating` | `number` (decimal) | The current average rating (e.g., `4.5`). |
| `reviewCount` | `number` (integer) | The total number of reviews. |

### Review Entity
```typescript
export interface Review {
  id: string;
  rating: number; // 1 to 5
  comment?: string;
  user: User; // The author of the review
  company?: Company;
  product?: Product;
  service?: Service;
  isVerifiedPurchase: boolean;
  createdAt: string;
  updatedAt: string;
}
```

---

## 3. Endpoints

### 3.1 Create a Review
- **Endpoint**: `POST /reviews`
- **Auth Required**: Yes (`user`, `provider`, `agent`, `admin`)
- **Body**:
```json
{
  "rating": 5,
  "comment": "Optional comment here",
  "companyId": "uuid", // Required if reviewing a company
  "productId": "uuid", // Required if reviewing a product
  "serviceId": "uuid"  // Required if reviewing a service
}
```
*Note: You must provide exactly one of `companyId`, `productId`, or `serviceId`.*

---

### 3.2 Update a Review
- **Endpoint**: `PATCH /reviews/:id`
- **Auth Required**: Yes (Owner only)
- **Body**:
```json
{
  "rating": 4, // Optional
  "comment": "Updated comment" // Optional
}
```

---

### 3.3 Delete a Review
- **Endpoint**: `DELETE /reviews/:id`
- **Auth Required**: Yes (Owner only)
- **Response**: `{ "success": true }`

---

### 3.4 Get Reviews (Paginated)
Fetch reviews for a specific target.

- **Company**: `GET /reviews/company/:companyId?page=1&limit=10`
- **Product**: `GET /reviews/product/:productId?page=1&limit=10`
- **Service**: `GET /reviews/service/:serviceId?page=1&limit=10`

**Response Example (`data` property)**:
```json
"data": [
  {
    "id": "...",
    "rating": 5,
    "comment": "...",
    "user": {
      "id": "...",
      "name": "John Doe"
    },
    "createdAt": "2024-05-08T12:00:00Z"
  }
]
```

---

## 4. Integration Tips for Frontend

### 1. Conditional Rendering (Edit/Delete)
Compare the current logged-in user's ID with `review.user.id` to show/hide the Edit and Delete buttons.
```javascript
const isOwner = session.user.id === review.user.id;
```

### 2. Rating Display
Use the `averageRating` and `reviewCount` from the `Company`/`Product`/`Service` objects to display summary stars in listing cards or header sections.

### 3. Error Handling
The backend uses a standard filter. On validation failure (e.g., invalid rating), you will receive:
- `statusCode`: 422
- `message`: An array of strings (e.g., `["rating must not be less than 1"]`)

### 4. Automatic Refresh
After a successful `POST`, `PATCH`, or `DELETE`, you should refresh the list of reviews AND the target entity (Company/Product/Service) to see the updated `averageRating`.
