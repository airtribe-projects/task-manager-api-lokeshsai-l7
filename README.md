# Task Manager API

A simple **Node.js + Express** backend application for managing tasks with full CRUD (Create, Read, Update, Delete) operations.

## Features

- Get all tasks / get a task by ID
- Create new tasks
- Update a task
- Delete a task

## Install Dependencies

```
npm install
```

## Run Development Server

```
node app.js
```

## To run the test cases

```
npm run test
```

## API Endpoints

| Method |  Endpoint  |    Description    |
| ------ | :--------: | :---------------: |
| GET    |   /tasks   |   Get all tasks   |
| GET    | /tasks/:id |  Get task by ID   |
| POST   |   /tasks   | Create a new task |
| PUT    | /tasks/:id |    Update task    |
| DELETE | /tasks/:id |    Delete task    |

## Example Responses

```
GET /tasks

[
    {
        "id": 2,
        "title": "Create a new project",
        "description": "Create a new project using the Express application generator",
        "completed": true
    },
    {
        "id": 3,
        "title": "Install nodemon",
        "description": "Install nodemon as a development dependency",
        "completed": true
    },
    {
        "id": 4,
        "title": "Install Express",
        "description": "Install Express",
        "completed": false
    },
    ...
]
```

```
GET /tasks/:id

{
    "id": 3,
    "title": "Install nodemon",
    "description": "Install nodemon as a development dependency",
    "completed": true
}
```

```
POST /tasks

Request Body
{
    "title": "Install nodemon",
    "description": "Install nodemon as a development dependency",
    "completed": true
}

Response Body
{
    "message": "Task created successfully"
}
```

```
PUT /tasks/:id

Request Body
{
    "title": "Install nodemon",
    "description": "Install nodemon as a development dependency",
    "completed": true
}

Response Body
{
    "id":4,
    "title":"Install nodemon",
    "description":"Install nodemon as a development dependency",
    "completed":true
}
```

```
DELETE /tasks/:id

{
    "message":"Task is deleted"
}
```
