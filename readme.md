# Description

- NodeJS / Express / MongoDB

- Server directory: the root of the project

# Installation

1. Global Installation of ```nodemon```:
```
npm i nodemon -g
```
2. Run ```npm install``` in root directory.
3. Run ```npm run dev```: This will start the server (running server.js with nodemon).

# More info

The server is running on nodeJS / Express

# Task

## API Task
1. Create a database connection to MongoDB

  - You can register a free MongoDB Cloud Cluster on https://www.mongodb.com/cloud/atlas by pressing "Try Free" and follow the steps.

  - Or you can download and install MongoDB on your own computer and use that one https://docs.mongodb.com/manual/administration/install-community/.

2. Create Database models for: Genres & Books and connect the server to the MongoDB database using mongoose https://mongoosejs.com/

  - Book: should have a name, author, genre & dates of creation and last update

  - Genre: should have a name & dates of creation and last update

3. Add test data in your database for Books and Genres

  - You can create a seeder script or manually create the documents in your database

4. Create API Endpoints for:

  - Getting the information about a single book: ```/api/book/:id```

  - Getting a list of all books: ```/api/books```

  - Getting a list of books by genre: ```/api/genre/:id```

  - Getting a list of genres: ```/api/genres```

  - Search books by name: ```/api/books/search``` ( Should be a post method with a search param)

  - Search books by genre name: ```/api/genres/search``` ( Should be a post method with a search param)

---

5. An additional task, not mandatory:

  - Create model for Users

  - Add a register/login/forgot password login in the application.

  - Provide the library information only to authenticated users

##### Note: All additional tasks are not mandatory, but will consider a big plus if they are provided and work as expected.
