

# Backend Server for Prepify

This is the backend server  built using **Node.js**, **Express.js**, and **MongoDB**. It includes authentication, article generation via OpenAI, and API endpoints to handle user interactions.

## Features

- **User Authentication**: Users can sign up, log in, and receive a JSON Web Token (JWT) for authorization.
- **Article Generation**: Users can create articles via OpenAI's GPT-3.5 and save them to the database.
- **Protected Routes**: Authorization is handled using JWT tokens, ensuring that users have proper access to certain resources.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database to store user and article data.
- **JWT**: Authentication system using JSON Web Tokens.
- **bcrypt**: For password hashing and comparison.
- **OpenAI GPT-3.5**: For generating article content based on user input.

## Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended version: LTS)
- [MongoDB](https://www.mongodb.com/) or use a cloud database like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [OpenAI API Key](https://beta.openai.com/signup/)

### Steps to Run Locally

1. **Clone the repository**:

   ```bash
   git clone url
   ```

2. **Navigate to the project directory**:

   ```bash
   cd repository-folder
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create a `.env` file** in the root directory and add the following environment variables:

   ```env
   JWT_SECRET=your_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key
   MONGO_URI=your_mongodb_connection_string
   ```

5. **Start the server**:

   ```bash
   npm start
   ```

   The server will be running at `http://localhost:5000`.

## API Endpoints

### **Authentication Endpoints**

#### 1. **POST /api/auth/signup**

- **Description**: Registers a new user by providing a `username`, `email`, and `password`.
- **Request**:
  ```json
  {
    "username": "JohnDoe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User created successfully",
    "token": "JWT_token_here"
  }
  ```

#### 2. **POST /api/auth/login**

- **Description**: Logs in an existing user with their `email` and `password`.
- **Request**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "statusCode": 201,
    "token": "JWT_token_here"
  }
  ```

### **Article Endpoints**

#### 3. **POST /api/articles/articlesgen**

- **Description**: Creates an article based on the provided `topic`. Uses OpenAI to generate the article content.
- **Request** (Authorization required with Bearer token):
  ```json
  {
    "topic": "The Future of AI"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Article created successfully",
    "article": {
      "topic": "The Future of AI",
      "content": "Generated article content here...",
      "userId": "userId_here"
    }
  }
  ```

#### 4. **GET /api/articles/articlesgen**

- **Description**: Fetches all articles created by the authenticated user.
- **Request** (Authorization required with Bearer token): No body required.
- **Response**:
  ```json
  {
    "articles": [
      {
        "topic": "The Future of AI",
        "content": "Generated article content here...",
        "userId": "userId_here"
      },
      {
        "topic": "Tech Innovations in 2024",
        "content": "Another article content here...",
        "userId": "userId_here"
      }
    ]
  }
  ```

## Authentication Middleware

The **auth middleware** is used to protect routes that require authentication. It checks for a **JWT token** in the request headers. If the token is valid, the user is allowed to access the route. If not, a `401 Unauthorized` response is returned.

```js
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user info in req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default auth;
```

## Testing

You can run tests using **Jest** or **Mocha**. To install testing dependencies:

```bash
npm install --save-dev jest supertest
```

Then, run the tests with:

```bash
npm test
```

## Deployment

To deploy the backend to a cloud service like **Heroku** or **AWS**, follow the platform-specific deployment guides.

1. Set up your environment variables on the platform (e.g., **Mongo URI**, **JWT Secret**, and **OpenAI API Key**).
2. Push the code to your Git repository and deploy.

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

---
