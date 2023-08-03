# Music App
The Music App is a simple web application built with Nest.js and TypeORM that allows users to manage albums and tracks for various artists. The application runs in a Docker container and includes features such as authentication, logging, unit tests, integration tests and etc.

# Features
- Authentication: Users can sign up, log in, and access protected routes to manage albums and tracks. 
- Logging: The application logs important events and errors for easier debugging and monitoring.
- Unit Tests: Comprehensive unit tests ensure the reliability and stability of the core functionalities.
- Integration Tests: Integration tests validate the interactions between different components of the application.
- Add Albums and Tracks and etc: Users can add new albums and tracks for different artists to expand the music collection.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## Running application with Docker

```
docker-compose up
```

## Running migrations 

```
npm run migrations run
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
