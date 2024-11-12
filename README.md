# BlueChat Backend

The **BlueChat Backend** is the server-side component of the BlueChat application, designed to handle authentication, AI conversations, and chat history management. It serves as the backbone for managing data and requests between the client-side chat interface and Google's Generative AI API.

## Features

- **User Authentication**: Provides user registration and login functionality.
- **AI-Powered Conversations**: Facilitates communication with Google's **Generative AI (Gemini 1.5 Flash)** model.
- **Chat History Management**: Stores, retrieves, and resets chat histories for each user.
- **Error Handling**: Implements error handling for smooth interactions.
- **Secure Data Handling**: Stores user data (username, password, email) and chat history in MongoDB, with hashed passwords for security.

## Tech Stack

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user information and chat histories.
- **Mongoose**: ODM for MongoDB, managing data models and queries.
- **bcrypt**: For password hashing and secure storage.
- **Google's Generative AI (Gemini 1.5 Flash)**: AI model for natural language conversations.
- **JWT (JSON Web Token)**: Used for secure user authentication and session management.

## Prerequisites

- **Node.js** and **npm** installed.
- **MongoDB** instance running or access to a MongoDB cloud database.
- A valid API key for **Google's Generative AI (Gemini 1.5 Flash)** model.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anni-x1/BlueChat-Backend.git
   cd BlueChat-Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following keys:
   ```bash
   API_KEY=your_google_generative_ai_api_key
   MONGO_URI=your_mongo_database_uri
   JWT_SECRET=your_jwt_secret_key
   PORT=your_preferred_port (optional, default is 59000)
   ```

4. Start the server:
   ```bash
   node server.js
   ```

   The server will be available at `http://localhost:59000`.

## API Endpoints

### Authentication

- **POST /api/auth/register**
  - Registers a new user by accepting `username`, `email`, and `password`.
  - Passwords are hashed before storage.
  
  Request:
  ```json
  {
    "username": "new_username",
    "email": "user_email@example.com",
    "password": "secure_password"
  }
  ```

  Response:
  ```json
  {
    "message": "User registered successfully",
    "user": { "username": "new_username", "email": "user_email@example.com" }
  }
  ```

- **POST /api/auth/login**
  - Authenticates users with `username` and `password`.
  - Returns a JWT token on successful login.
  
  Request:
  ```json
  {
    "username": "registered_username",
    "password": "user_password"
  }
  ```

  Response:
  ```json
  {
    "message": "Login successful",
    "token": "JWT_TOKEN_HERE",
    "user": { "username": "registered_username", "email": "user_email@example.com" }
  }
  ```

### Chat

- **POST /api/chat**
  - Sends a message to the AI model and receives a response.
  - Requires the user's `username` and the message as input.

  Request:
  ```json
  {
    "username": "registered_username",
    "message": "Your input message here"
  }
  ```

  Response:
  ```json
  {
    "message": "AI-generated response",
    "chatHistory": [ { "message": "message1" }, { "message": "message2" } ]
  }
  ```

### Chat History Management

- **POST /api/user/resetHistory**
  - Resets the chat history for the specified user.
  
  Request:
  ```json
  {
    "username": "registered_username"
  }
  ```

  Response:
  ```json
  {
    "message": "Chat history reset successfully"
  }
  ```

- **DELETE /api/user/deleteUser**
  - Deletes the user and all associated data, including chat history.
  
  Request:
  ```json
  {
    "username": "registered_username"
  }
  ```

  Response:
  ```json
  {
    "message": "User and associated data deleted"
  }
  ```

## Middleware

1. **Authentication Middleware (JWT)**:
   - Protects certain routes to ensure that only authenticated users can access them. It validates the token sent in the request headers and allows or denies access accordingly.

2. **Error Handling Middleware**:
   - Catches errors from asynchronous route handlers and provides descriptive responses to the client, ensuring that the API does not crash.

## Security

- **Password Hashing**: All passwords are hashed using `bcrypt` before being stored in the database.
- **JWT (JSON Web Token)**: A JWT token is issued upon successful login, allowing secure authentication for user-specific actions like chat history and message sending.
- **Data Protection**: User information and chat data are stored securely in MongoDB.

## Future Enhancements

- **Role-based Authorization**: Introduce roles like admin, user, and guest for more granular access control.
- **Advanced Analytics**: Implement usage statistics and AI performance metrics to track interactions and improve the model.
- **Voice Input Integration**: Allow users to send voice inputs, which are transcribed and processed by the AI.

## Contributing

Feel free to fork the repository, make changes, and submit a pull request. Contributions are welcome to improve both the backend structure and API functionality.