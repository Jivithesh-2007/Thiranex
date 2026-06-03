# API Documentation - Blog Platform

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-backend-url/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

Tokens are returned from login/register endpoints and stored in localStorage on the client.

---

## Authentication Endpoints

### Register User

**Endpoint:** `POST /auth/register`

**Access:** Public

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "reader" // or "writer"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "reader",
    "avatar": "https://...",
    "bio": "",
    "createdAt": "2024-06-03T10:00:00Z"
  }
}
```

**Error (400):**
```json
{
  "message": "Email already exists" // or other validation errors
}
```

---

### Login User

**Endpoint:** `POST /auth/login`

**Access:** Public

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "reader",
    "avatar": "https://...",
    "bio": ""
  }
}
```

**Error (401):**
```json
{
  "message": "Invalid email or password"
}
```

---

### Get User Profile

**Endpoint:** `GET /auth/profile`

**Access:** Protected (any authenticated user)

**Response (200):**
```json
{
  "user": {
    "_id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "reader",
    "avatar": "https://...",
    "bio": "Software developer",
    "socialLinks": {
      "twitter": "https://twitter.com/john",
      "github": "https://github.com/john"
    }
  }
}
```

---

### Logout User

**Endpoint:** `POST /auth/logout`

**Access:** Protected

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## Post Endpoints

### Get All Posts

**Endpoint:** `GET /posts`

**Access:** Public

**Query Parameters:**
- `page` (default: 1) - Page number for pagination
- `limit` (default: 10, max: 50) - Posts per page
- `sort` (default: "-createdAt") - Sort field
- `category` - Filter by category
- `search` - Search in title/content/excerpt

**Example:** `GET /posts?page=1&limit=10&category=Technology&sort=-viewCount`

**Response (200):**
```json
{
  "posts": [
    {
      "_id": "60d5ec49c1234567890abcde",
      "title": "Getting Started with React",
      "slug": "getting-started-with-react",
      "excerpt": "Learn the basics of React...",
      "content": "<p>React is a JavaScript library...</p>",
      "authorId": {
        "_id": "60d5ec49c1234567890abcd1",
        "name": "John Doe",
        "avatar": "https://...",
        "bio": "Software developer"
      },
      "category": "Technology",
      "tags": ["react", "javascript", "tutorial"],
      "status": "published",
      "viewCount": 1250,
      "commentCount": 15,
      "publishedAt": "2024-06-01T10:00:00Z",
      "createdAt": "2024-06-01T10:00:00Z",
      "updatedAt": "2024-06-03T15:00:00Z"
    }
  ],
  "total": 45,
  "pages": 5,
  "currentPage": 1
}
```

---

### Get Post by Slug (Public View)

**Endpoint:** `GET /posts/:slug`

**Access:** Public

**Parameters:**
- `slug` - URL slug of the post

**Example:** `GET /posts/getting-started-with-react`

**Response (200):**
```json
{
  "_id": "60d5ec49c1234567890abcde",
  "title": "Getting Started with React",
  "slug": "getting-started-with-react",
  "excerpt": "Learn the basics of React...",
  "content": "<p>React is a JavaScript library...</p>",
  "authorId": {
    "_id": "60d5ec49c1234567890abcd1",
    "name": "John Doe",
    "avatar": "https://...",
    "bio": "Software developer",
    "socialLinks": {...},
    "followerCount": 150
  },
  "category": "Technology",
  "tags": ["react", "javascript", "tutorial"],
  "status": "published",
  "viewCount": 1251,
  "commentCount": 15,
  "publishedAt": "2024-06-01T10:00:00Z",
  "metaDescription": "Learn React fundamentals",
  "createdAt": "2024-06-01T10:00:00Z"
}
```

**Error (404):**
```json
{
  "message": "Post not found"
}
```

---

### Get Post by ID (For Editing)

**Endpoint:** `GET /posts/id/:id`

**Access:** Public (but typically used by author for editing)

**Parameters:**
- `id` - MongoDB ObjectId of the post

**Response (200):**
```json
{
  "_id": "60d5ec49c1234567890abcde",
  "title": "Getting Started with React",
  "slug": "getting-started-with-react",
  "excerpt": "Learn the basics of React...",
  "content": "<p>React is a JavaScript library...</p>",
  "authorId": {
    "_id": "60d5ec49c1234567890abcd1",
    "name": "John Doe"
  },
  "category": "Technology",
  "tags": ["react", "javascript"],
  "status": "draft",
  "viewCount": 0,
  "commentCount": 0,
  "publishedAt": null,
  "createdAt": "2024-06-03T10:00:00Z"
}
```

---

### Create Post

**Endpoint:** `POST /posts`

**Access:** Protected (writers only)

**Request Body:**
```json
{
  "title": "My New Post",
  "content": "<h2>Hello</h2><p>This is my post content...</p>",
  "excerpt": "Brief summary of the post",
  "category": "Technology",
  "tags": ["react", "javascript", "tutorial"],
  "featuredImage": "https://...",
  "metaDescription": "SEO description",
  "status": "draft" // or "published"
}
```

**Response (201):**
```json
{
  "message": "Post created successfully",
  "post": {
    "_id": "60d5ec49c1234567890abcde",
    "title": "My New Post",
    "slug": "my-new-post",
    "excerpt": "Brief summary of the post",
    "content": "<h2>Hello</h2><p>This is my post content...</p>",
    "authorId": {
      "_id": "60d5ec49c1234567890abcd1",
      "name": "John Doe"
    },
    "category": "Technology",
    "tags": ["react", "javascript", "tutorial"],
    "status": "draft",
    "viewCount": 0,
    "commentCount": 0,
    "createdAt": "2024-06-03T10:00:00Z"
  }
}
```

**Error (403):**
```json
{
  "message": "Only writers can create posts"
}
```

---

### Update Post

**Endpoint:** `PUT /posts/:id`

**Access:** Protected (author or admin)

**Parameters:**
- `id` - MongoDB ObjectId of the post

**Request Body:**
```json
{
  "title": "Updated Post Title",
  "content": "<p>Updated content...</p>",
  "excerpt": "Updated excerpt",
  "category": "Programming",
  "tags": ["javascript"],
  "status": "published"
}
```

**Response (200):**
```json
{
  "message": "Post updated successfully",
  "post": {
    "_id": "60d5ec49c1234567890abcde",
    "title": "Updated Post Title",
    ...
  }
}
```

**Error (403):**
```json
{
  "message": "You can only edit your own posts"
}
```

---

### Delete Post

**Endpoint:** `DELETE /posts/:id`

**Access:** Protected (author or admin)

**Response (200):**
```json
{
  "message": "Post deleted successfully"
}
```

**Error (403):**
```json
{
  "message": "You can only delete your own posts"
}
```

---

### Publish Draft

**Endpoint:** `PUT /posts/:id/publish`

**Access:** Protected (author or admin)

**Request Body:**
```json
{
  "status": "published"
}
```

**Response (200):**
```json
{
  "message": "Post published successfully",
  "post": {
    "_id": "60d5ec49c1234567890abcde",
    "status": "published",
    "publishedAt": "2024-06-03T15:00:00Z",
    ...
  }
}
```

---

### Search Posts

**Endpoint:** `GET /posts/search`

**Access:** Public

**Query Parameters:**
- `q` - Search query (searches title, content, excerpt)
- `page` - Page number
- `limit` - Posts per page

**Example:** `GET /posts/search?q=react&page=1&limit=10`

**Response (200):**
```json
{
  "posts": [...],
  "total": 25,
  "query": "react"
}
```

---

### Get User Posts

**Endpoint:** `GET /posts/user/:userId`

**Access:** Public

**Parameters:**
- `userId` - MongoDB ObjectId of the user

**Query Parameters:**
- `page` - Page number
- `limit` - Posts per page
- `sort` - Sort field

**Response (200):**
```json
{
  "posts": [...],
  "total": 12,
  "pages": 2
}
```

---

## Comment Endpoints

### Get Post Comments

**Endpoint:** `GET /comments/:postId/comments`

**Access:** Public

**Parameters:**
- `postId` - MongoDB ObjectId of the post

**Query Parameters:**
- `sort` - Sort order (default: "-createdAt")

**Response (200):**
```json
{
  "comments": [
    {
      "_id": "60d5ec49c1234567890abcde",
      "content": "Great post!",
      "authorId": {
        "_id": "60d5ec49c1234567890abcd1",
        "name": "Jane Smith",
        "avatar": "https://..."
      },
      "postId": "60d5ec49c1234567890abcd0",
      "parentCommentId": null,
      "approved": true,
      "likeCount": 5,
      "replyCount": 2,
      "replies": [
        {
          "_id": "60d5ec49c1234567890abcdf",
          "content": "I agree!",
          "authorId": {...},
          "parentCommentId": "60d5ec49c1234567890abcde",
          "approved": true,
          "likeCount": 2,
          "replyCount": 0,
          "replies": [...]
        }
      ],
      "createdAt": "2024-06-01T10:00:00Z"
    }
  ]
}
```

---

### Create Comment

**Endpoint:** `POST /comments/:postId/comments`

**Access:** Protected

**Parameters:**
- `postId` - MongoDB ObjectId of the post

**Request Body:**
```json
{
  "content": "Great post!",
  "parentCommentId": null // Optional: for nested replies
}
```

**Response (201):**
```json
{
  "message": "Comment created successfully",
  "comment": {
    "_id": "60d5ec49c1234567890abcde",
    "content": "Great post!",
    "authorId": {
      "_id": "60d5ec49c1234567890abcd1",
      "name": "Jane Smith",
      "avatar": "https://..."
    },
    "postId": "60d5ec49c1234567890abcd0",
    "parentCommentId": null,
    "approved": false,
    "likeCount": 0,
    "replyCount": 0,
    "createdAt": "2024-06-03T10:00:00Z"
  }
}
```

---

### Update Comment

**Endpoint:** `PUT /comments/:commentId`

**Access:** Protected (author only)

**Parameters:**
- `commentId` - MongoDB ObjectId of the comment

**Request Body:**
```json
{
  "content": "Updated comment content"
}
```

**Response (200):**
```json
{
  "message": "Comment updated successfully",
  "comment": {...}
}
```

---

### Delete Comment

**Endpoint:** `DELETE /comments/:commentId`

**Access:** Protected (author only)

**Response (200):**
```json
{
  "message": "Comment deleted successfully"
}
```

---

### Like Comment

**Endpoint:** `POST /comments/:commentId/like`

**Access:** Protected

**Parameters:**
- `commentId` - MongoDB ObjectId of the comment

**Response (200):**
```json
{
  "message": "Comment liked successfully",
  "comment": {
    "_id": "60d5ec49c1234567890abcde",
    "likeCount": 6,
    "likes": ["60d5ec49c1234567890abcd1", ...],
    ...
  }
}
```

---

### Approve Comment (Admin)

**Endpoint:** `PUT /comments/:commentId/approve`

**Access:** Protected (admin only)

**Parameters:**
- `commentId` - MongoDB ObjectId of the comment

**Request Body:**
```json
{
  "approved": true
}
```

**Response (200):**
```json
{
  "message": "Comment approval status updated",
  "comment": {
    "_id": "60d5ec49c1234567890abcde",
    "approved": true,
    ...
  }
}
```

---

## User Endpoints

### Get User Profile

**Endpoint:** `GET /users/:userId`

**Access:** Public

**Parameters:**
- `userId` - MongoDB ObjectId of the user

**Response (200):**
```json
{
  "_id": "60d5ec49c1234567890abcd1",
  "name": "John Doe",
  "avatar": "https://...",
  "bio": "Software developer",
  "socialLinks": {
    "twitter": "https://twitter.com/john",
    "github": "https://github.com/john"
  },
  "role": "writer",
  "followerCount": 150,
  "postCount": 25,
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

### Get User Posts

**Endpoint:** `GET /users/:userId/posts`

**Access:** Public

**Parameters:**
- `userId` - MongoDB ObjectId of the user

**Query Parameters:**
- `page` - Page number
- `limit` - Posts per page
- `sort` - Sort field

**Response (200):**
```json
{
  "posts": [...],
  "total": 25,
  "pages": 3
}
```

---

### Update User Profile

**Endpoint:** `PUT /users/profile`

**Access:** Protected

**Request Body:**
```json
{
  "name": "Updated Name",
  "bio": "Updated bio",
  "avatar": "https://...",
  "socialLinks": {
    "twitter": "https://twitter.com/john",
    "github": "https://github.com/john"
  }
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {...}
}
```

---

### Follow User

**Endpoint:** `POST /users/:userId/follow`

**Access:** Protected

**Parameters:**
- `userId` - MongoDB ObjectId of the user to follow

**Response (200):**
```json
{
  "message": "User followed successfully",
  "followerCount": 151
}
```

---

### Get My Comments

**Endpoint:** `GET /users/my/comments`

**Access:** Protected

**Query Parameters:**
- `page` - Page number
- `limit` - Comments per page

**Response (200):**
```json
{
  "comments": [...],
  "total": 42,
  "pages": 5
}
```

---

## Category Endpoints

### Get All Categories

**Endpoint:** `GET /categories`

**Access:** Public

**Response (200):**
```json
[
  {
    "_id": "60d5ec49c1234567890abcde",
    "name": "Technology",
    "slug": "technology",
    "description": "Technology related posts",
    "postCount": 45
  },
  {
    "_id": "60d5ec49c1234567890abcdf",
    "name": "Programming",
    "slug": "programming",
    "description": "Programming tutorials and tips",
    "postCount": 38
  }
]
```

---

### Get Category by Slug

**Endpoint:** `GET /categories/:slug`

**Access:** Public

**Parameters:**
- `slug` - URL slug of the category

**Response (200):**
```json
{
  "_id": "60d5ec49c1234567890abcde",
  "name": "Technology",
  "slug": "technology",
  "description": "Technology related posts",
  "postCount": 45
}
```

---

### Create Category (Admin)

**Endpoint:** `POST /categories`

**Access:** Protected (admin only)

**Request Body:**
```json
{
  "name": "DevOps",
  "description": "DevOps and Infrastructure posts"
}
```

**Response (201):**
```json
{
  "message": "Category created successfully",
  "category": {
    "_id": "60d5ec49c1234567890abce0",
    "name": "DevOps",
    "slug": "devops",
    "description": "DevOps and Infrastructure posts",
    "postCount": 0
  }
}
```

---

## Tag Endpoints

### Get All Tags

**Endpoint:** `GET /tags`

**Access:** Public

**Response (200):**
```json
[
  {
    "_id": "60d5ec49c1234567890abcde",
    "name": "react",
    "slug": "react",
    "postCount": 25
  },
  {
    "_id": "60d5ec49c1234567890abcdf",
    "name": "javascript",
    "slug": "javascript",
    "postCount": 45
  }
]
```

---

### Create Tags

**Endpoint:** `POST /tags`

**Access:** Protected

**Request Body:**
```json
{
  "tags": ["vue", "angular", "svelte"]
}
```

**Response (201):**
```json
{
  "message": "Tags created successfully",
  "tags": [...]
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "message": "Validation error description"
}
```

### 401 - Unauthorized
```json
{
  "message": "Invalid or missing authentication token"
}
```

### 403 - Forbidden
```json
{
  "message": "You don't have permission to perform this action"
}
```

### 404 - Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 - Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Rate Limiting

Rate limiting is not currently implemented. Consider adding it for production:
- 100 requests per minute for public endpoints
- 50 requests per minute for authenticated endpoints

---

## Pagination

For endpoints that support pagination:
- Default page size: 10
- Maximum page size: 50
- Use `page` and `limit` query parameters

Example: `/posts?page=2&limit=20`

---

## Sorting

Sort fields are specified with direction prefix:
- `-` for descending (default)
- No prefix for ascending

Examples:
- `-createdAt` - Newest first
- `-viewCount` - Most viewed first
- `title` - Alphabetical order
- `-likeCount` - Most liked first

---

## Authentication Header

All protected endpoints require:
```
Authorization: Bearer {jwt_token}
```

Tokens are valid for 30 days. After expiration, users need to login again.

---

## Webhook Support

Currently not implemented. Consider adding webhooks for:
- Post published
- Comment posted
- User registration
- Post deleted

---

**API Documentation Complete**
