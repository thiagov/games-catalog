# Games Catalog

This project is a simple game catalog application. It can be used to add games and show the games added.
There is a [live demo](http://158.101.116.85/) available.

The application was made with a Java backend and Angular frontend. These two parts can be found on the `backend` and `frontend` directories
on this project.

Instructions on how to run the backend and frontend can be found below.

## Backend

### Building and running

To build the backend you need `maven` installed. Just run:
```
mvn package
```
The application jar will be stored in the `target/` directory.

To run the backend it is necessary to have a MySQL database running. On the [application.properties](backend/src/main/resources/application.properties)
file you can change the database address, name and credentials. The database setup (table creation, initial data load)
is done automatically with `Liquibase`, so it is only necessary to have the database running with the correct credentials on application.properties.

You can run the application locally on `http://localhost:8080/` by running:
```
mvn spring-boot:run
```

Or you can run the application jar, generated with maven, with the following command:
```
java -jar gamescatalog-1.0.0.jar
```
This will start the server on `http://localhost:8080/`.

### Running tests

The backend has some simple JUnit tests, which can be run with the following command:
```
mvn test
```

## Frontend

### Building and running

To build and run the frontend you need `npm` installed. Before running or building the project you need to install all its dependencies,
which can be done by running the following command:
```
npm install
```

With the dependencies installed, you can start a dev server on `http://localhost:4200/` by running:
```
npm run start
```
When running the dev server, the application will try to look for a back-end on `http://localhost:8080`.

To build the project just run:
```
npm run build
```
The build artifacts will be stored in the `dist/` directory.

### Running tests

The frontend has some tests that can be run with jest. The tests can be run with the following command:
```
npm run test
```
