# Dataverse API Implementation Guide

This guide explains the standardized pattern for fetching data from Dataverse using a layered architecture approach. Follow this pattern for all new entity implementations.

## Architecture Overview

The implementation follows a 4-layer architecture:
```
Client Request → Routes → Controllers → Services → Dataverse API
```

## Implementation Pattern

### 1. Services Layer (`src/services/`)

**Purpose**: Handle direct API communication with Dataverse
- Makes HTTP requests to Dataverse Web API
- Handles authentication headers
- Transforms raw data if needed
- Contains business logic for data processing

**Example**: `productServices.ts`
```typescript
import axios from 'axios';

interface EntityResponse {
  value: any[];
  '@odata.count'?: number;
}

export const fetchAllEntities = async (token: string): Promise<EntityResponse> => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'OData-Version': '4.0',
    'OData-MaxVersion': '4.0'
  };

  const response = await axios.get(
    `${process.env.WEB_API_URL}/entities?$count=true`,
    { headers }
  );

  return response.data;
};
```

**Key Responsibilities**:
- Configure Dataverse API headers
- Build OData query URLs
- Handle API responses
- Transform data (e.g., option set values to readable text)
- Return typed responses

### 2. Controllers Layer (`src/controllers/`)

**Purpose**: Handle HTTP request/response logic and validation
- Validate incoming requests
- Extract data from request body
- Call appropriate service functions
- Format responses consistently
- Handle errors gracefully

**Example**: `entityController.ts`
```typescript
import { Request, Response } from 'express';
import { fetchAllEntities } from '../services/entityServices';

interface EntityRequestBody {
  token: string;
  entityId?: string;
}

export const getAllEntities = async (req: Request<{}, {}, EntityRequestBody>, res: Response): Promise<void> => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ error: 'Token is required' });
    return;
  }

  try {
    const entitiesData = await fetchAllEntities(token);

    res.status(200).json({
      success: true,
      message: 'Entities fetched successfully',
      totalCount: entitiesData['@odata.count'] || 0,
      data: entitiesData.value,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error fetching entities:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch entities',
      details: error.response?.data || error.message
    });
  }
};
```

**Key Responsibilities**:
- Input validation
- Request body parsing
- Service layer orchestration
- Consistent response formatting
- Error handling and logging

### 3. Routes Layer (`src/routes/`)

**Purpose**: Define API endpoints and map them to controllers
- Define HTTP methods and paths
- Connect routes to controller functions
- Group related endpoints

**Example**: `entityRoute.ts`
```typescript
import { Router } from 'express';
import { getAllEntities, getEntityById } from '../controllers/entityController';

const router = Router();

router.post('/all', getAllEntities);
router.post('/single', getEntityById);

export default router;
```

**Key Responsibilities**:
- Route definition
- HTTP method mapping
- Controller function binding

### 4. Main Application (`src/index.ts`)

**Purpose**: Application setup and route registration
- Configure Express app
- Set up middleware (CORS, JSON parsing)
- Register route modules
- Start server

**Key Responsibilities**:
- App configuration
- Middleware setup
- Route registration
- Server initialization

## Step-by-Step Implementation Guide

### Step 1: Create Service Functions
1. Create `src/services/[entity]Services.ts`
2. Define interfaces for API responses
3. Implement functions for different operations:
   - `fetchAll[Entity]` - Get all records
   - `fetch[Entity]ById` - Get single record
   - `fetch[Entity]ByFilter` - Get filtered records

### Step 2: Create Controller Functions
1. Create `src/controllers/[entity]Controller.ts`
2. Define request body interfaces
3. Implement controller functions:
   - Validate inputs
   - Call service functions
   - Format responses
   - Handle errors

### Step 3: Create Route Definitions
1. Create `src/routes/[entity]Route.ts`
2. Import controller functions
3. Define routes with appropriate HTTP methods
4. Export router

### Step 4: Register Routes in Main App
1. Import route module in `src/index.ts`
2. Register with `app.use('/api/v1/[entity]', [entity]Route)`

## Testing with Postman

### 1. Get All Records
```
POST http://localhost:3000/api/v1/[entity]/all
Content-Type: application/json

{
  "token": "your_access_token_here"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Entities fetched successfully",
  "totalCount": 10,
  "data": [...],
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 2. Get Single Record
```
POST http://localhost:3000/api/v1/[entity]/single
Content-Type: application/json

{
  "token": "your_access_token_here",
  "entityId": "record-guid-here"
}
```

### 3. Get Filtered Records
```
POST http://localhost:3000/api/v1/[entity]/filter
Content-Type: application/json

{
  "token": "your_access_token_here",
  "filterType": "active"
}
```

## Error Handling

All endpoints return consistent error responses:
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (missing required fields)
- `401` - Unauthorized (invalid token)
- `404` - Not Found
- `500` - Internal Server Error

## Environment Variables

Required in `.env` file:
```
WEB_API_URL=https://your-org.api.crm.dynamics.com/api/data/v9.2
PORT=3000
NODE_ENV=development
```

## Best Practices

1. **Consistent Naming**: Use plural for collections (`/products/all`) and singular for single items (`/product/single`)
2. **Type Safety**: Define TypeScript interfaces for all request/response objects
3. **Error Handling**: Always handle errors gracefully with meaningful messages
4. **Validation**: Validate all required inputs before processing
5. **Logging**: Log errors for debugging purposes
6. **Response Format**: Use consistent response structure across all endpoints
7. **Token Security**: Never log or expose authentication tokens

## File Structure Template

```
src/
├── services/
│   └── [entity]Services.ts
├── controllers/
│   └── [entity]Controller.ts
├── routes/
│   └── [entity]Route.ts
└── index.ts
```

Follow this pattern for all new Dataverse entity implementations to maintain consistency and code quality across the project."# kf_dashboard-practicise" 
