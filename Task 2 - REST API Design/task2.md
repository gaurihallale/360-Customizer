### 1. Define the Endpoint URL and HTTP Method
+ Endpoint URL: /api/users/{username}
+ HTTP Method: GET

 ### 2. Expected Request Parameters and Response Structure
 Request Parameters
+ Path Parameter : The unique username of the user whose profile is being requested.
+ Query Parameters : Comma-separated list of specific fields to include in the response

```
  GET /api/users/gauri?fields=gauri,email&includePosts=true
```

### 3. Response Structure:

+ Success Response:
```
{
  "success": true,
  "user": {
    "username": "gauri",
    "name": "Gauri Hallale",
    "email": "gaurihallale@example.com",
    "posts": [ // included if includePosts=true
      {
        "postId": 1,
        "title": "My First Post",
        "content": "Hello, world!"
      },
      {
        "postId": 2,
        "title": "Another Day",
        "content": "Today was great!"
      }
    ]
  }
}

```
+ Error Response:
```
{
  "success": false,
  "message": "User not found"
}
```

### 4. Error Handling and Input Validation

+ Error Handling
    + User Not Found:
If a user with the specified username does not exist, return a 404 Not Found status with a relevant error message.

    + Validation Errors:
If the username parameter is missing or invalid (e.g., not a string or too long), return a 400 Bad Request status with a message indicating the issue.

+ Input Validation
    + Username Validation:
Check that the username parameter is present, is a string, and conforms to any necessary constraints (e.g., length, allowed characters).
```
function validateUsername(username) {
    const usernamePattern = /^[a-zA-Z0-9_]{3,30}$/; // example pattern for username
    return usernamePattern.test(username);
}
```
+ Query Parameters Validation:

  + For the fields parameter, check that it does not contain any invalid fields (e.g., fields that should not be exposed).
  + For the includePosts parameter, ensure it is a boolean.




