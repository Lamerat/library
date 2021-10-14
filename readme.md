# Library

### Project Information
- Language and version: JavaScript ES2020
- Platform and version: Node v14.0+

### Core Back-End Technologies
- NodeJS
- Express
- MongoDB

### Installation
```bash
npm install
```
### .env Configuration
The project requires creation and configuration of a `.env` file
```bash
EXPRESS_PORT = 5000
DB_HOST = mongodb+srv://cluster0.7zjjw.mongodb.net/library?retryWrites=true&w=majority
DB_USER = root
DB_PASS = ?
DB_LIMIT = 5
JWT_KEY = R4DI4TOR
TOKEN_LIFE = 24h
```

| ENVIRONMENT VARIABLE | VALUE | DESCRIPTION |
| -------------------- | ----- | ----------- |
| EXPRESS_PORT | 5000 | Server Port |
| DB_HOST | localhost | Database Host |
| DB_USER | root | Database Username |
| DB_PASS | ? | Database Password |
| DB_LIMIT | 5 | Database Connection Limit |
| SECRET_KEY | R4DI4TOR | JWT Secret Key |
| TOKEN_LIFE | 24h | Token Expiration Duration |

### Start
After successfull install of the required dependencies, You will be able to run the following scripts:
- `start` - runs the current state of the code. Real-time changes do not reflect automatically.
- `dev` - runs the current state of the code. Takes care of all real-time changes and visualizes them.
```bash
# Runs Express with Nodemon
npm run dev
```

### Server structure
```bash
src
  ├─ authentication   # contains authentication logic
  │  ├── create-token.js
  │  └── strategy.js
  ├─ common   # contains enumerables and helper files
  │  ├── convert-search-pattern.js
  │  ├── errors.js
  │  ├── query-constants.js
  │  └── schemas.js
  ├─ controllers    # contains controller layer logic
  │  ├── books-controller.js
  │  ├── genres-controller.js
  │  └── users-controller.js
  ├─ data   # contains data layer logic
  │  ├── books-data.js
  │  ├── genres-data.js
  │  └── users-data.js
  ├─ middlewares    # contains custom middlewares
  │  ├── authenticator.js
  │  ├── body-validator.js
  │  ├── objectId-validator.js
  │  └── token-validator.js
  ├─ services   # contains service layer logic
  │  ├── books-services.js
  │  ├── genres-services.js
  │  └── users-services.js
  └─ validators   # contains request body/params validation logic
     ├── search-pattern-validator.js
     └── user-credentials-validator.js  
```

### Endpoints
#### __/api/book__
- Method - GET
- Authentication: YES
- Get all books in library
```JSON
[
  {
    "_id": "616720073b3d39971f0e94c5",
    "name": "The Catcher in the Rye",
    "author": "Jerome David Salinger",
    "createOn": "2021-10-09T21:00:00.000Z",
    "lastUpdateOn": "2021-10-09T21:00:00.000Z",
    "genre": {
      "_id": "61671fea3b3d39971f0e94c4",
      "name": "Classic"
    }
  },
  {
    "_id": "616743453b3d39971f0e94c7",
    "name": "The Eye of the World",
    "author": "Robert Jordan",
    "createOn": "2021-10-09T21:00:00.000Z",
    "lastUpdateOn": "2021-10-09T21:00:00.000Z",
    "genre": {
      "_id": "616743073b3d39971f0e94c6",
      "name": "Fantasy"
    }
  },
]
```
#### __/api/book/:id__
- Method - GET
- Authentication: YES
- Get single book by id
- Example param: 61674f8b97652408ce5edc3c
```JSON
{
  "_id": "61674f8b97652408ce5edc3c",
  "name": "Nineteen Eighty-Four",
  "author": "George Orwell",
  "createOn": "2021-10-09T21:00:00.000Z",
  "lastUpdateOn": "2021-10-09T21:00:00.000Z",
  "genre": {
    "_id": "61671fea3b3d39971f0e94c4",
    "name": "Classic"
  }
}
```

#### __/api/book/search__
- Method - POST
- Authentication: YES
- Search for match in books names (titles)
- Example body
```JSON
{ "pattern": "catch" //keyword (not case sensitive) }
```
```JSON
[
  {
    "_id": "616720073b3d39971f0e94c5",
    "name": "The Catcher in the Rye", // 'catch' match 'Catcher
    "author": "Jerome David Salinger",
    "createOn": "2021-10-09T21:00:00.000Z",
    "lastUpdateOn": "2021-10-09T21:00:00.000Z",
    "genre": {
      "_id": "61671fea3b3d39971f0e94c4",
      "name": "Classic"
    }
  },
]
```

#### __/api/genre/__
- Method - GET
- Authentication: YES
- Get all genres in library
```JSON
[
  {
    "_id": "61671fea3b3d39971f0e94c4",
    "name": "Classic",
    "createOn": "Sat Oct 09 2021 00:00:00 GMT+0300 (Eastern European Summer Time)",
    "lastUpdateOn": "Mon Oct 11 2021 00:00:00 GMT+0300 (Eastern European Summer Time)"
  },
  {
    "_id": "616743073b3d39971f0e94c6",
    "name": "Fantasy",
    "createOn": "Fri Sep 10 2021 00:00:00 GMT+0300 (Eastern European Summer Time)",
    "lastUpdateOn": "2021-10-05"
  }
]
```
#### __/api/genre/:id__
- Method - GET
- Authentication: YES
- Get all books from this genre
- Example param: 61671fea3b3d39971f0e94c4
```JSON
[
  {
    "_id": "616720073b3d39971f0e94c5",
    "name": "The Catcher in the Rye",
    "author": "Jerome David Salinger",
    "createOn": "2021-10-09T21:00:00.000Z",
    "lastUpdateOn": "2021-10-09T21:00:00.000Z",
    "genre": {
      "_id": "61671fea3b3d39971f0e94c4",
      "name": "Classic"
    }
  },
  {
    "_id": "61674f2c97652408ce5edc3b",
    "name": "Pride and Prejudice",
    "author": "Jane Austen",
    "createOn": "2021-10-09T21:00:00.000Z",
    "lastUpdateOn": "2021-10-09T21:00:00.000Z",
    "genre": {
      "_id": "61671fea3b3d39971f0e94c4",
      "name": "Classic"
    }
  }
]
```
#### __/api/genre/search__
- Method - POST
- Authentication: YES
- Search for match in genres name
- Example body
```JSON
{ "pattern": "c" //keyword (not case sensitive) }
```
```JSON
[
  {
    "_id": "61674f8b97652408ce5edc3c",
    "name": "Nineteen Eighty-Four",
    "author": "George Orwell",
    "createOn": "2021-10-09T21:00:00.000Z",
    "lastUpdateOn": "2021-10-09T21:00:00.000Z",
    "genre": {
      "_id": "61671fea3b3d39971f0e94c4",
      "name": "Classic"   // "c" match "Classic"
    }
  },
  {
    "_id": "6167fdd55e4f426e50c210b3",
    "name": "Murder on the Orient Express",
    "author": "Agatha Christie",
    "createOn": "2021-10-09T21:00:00.000Z",
    "lastUpdateOn": "2021-10-09T21:00:00.000Z",
    "genre": {
      "_id": "61684e0b091b4964e2986b06",
      "name": "Crime"   // "c" match "Crime"
    }
  }
]
```

#### __/api/user/register__
- Method - POST
- Authentication: NO
- Register new user
- Example body
```JSON
{
  "username": "elka",     // String with min 4 symbols, no special symbols, except _
  "password": "123456"    // String with min 6 symbols, no special symbols
}
```

#### __/api/user/login__
- Method - POST
- Authentication: NO
- Login to system
- Example body
```JSON
{
  "username": "elka",     // String with min 4 symbols, no special symbols, except _
  "password": "123456"    // String with min 6 symbols, no special symbols
}
```
Result is JWT token
```JSON
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjgyZmI4NjgwMzZjN2JjMGQyMTA1MSIsInVzZXJuYW1lIjoiZWxrYSIsImlhdCI6MTYzNDIzMTg2MiwiZXhwIjoxNjM0MzE4MjYyfQ.AVa7-SbPgSynSO39oxqlQi8TCJiBrhu89lEqG47KSds"
}
```

#### __/api/user/logout__
- Method - POST
- Authentication: YES
- Logout from system