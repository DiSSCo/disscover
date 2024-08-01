# DiSSCover

Search, discover and act upon data within the DiSSCo digital infrastructure.

Adheres to the Apache version 2.0 license.

## About this application

DiSSCover is a service provided by the Distributed System of Scientific Collections (DiSSCo) to interact with its digital infrastructure. The name, not only derived from DiSSCo, but also from the verb ‘to discover’, relates to the main purpose of the portal: to search and explore the data within the digital infrastructure. The core data that can be explored consists of specimens, with additional data like different types of media, attached to it. To emphasize the difference between DiSSCover and other discovery portals like GBIF, it is important to recognize a key part of the application: acting upon the data. Users are able to act upon records like specimens, to improve the data quality. Quality marks or other kinds of suggestions can be annotated on a specimen. When accepted, these annotations can become part of the specimen object itself, making it richer in data quality. With the combination of data discovery and enrichment, DiSSCover sets sail for a world where all kinds of users are able to work together on improving the online bio- and geodiversity.

## Technical specs

DiSSCover is built using the React framework as the core foundation (bootstrapped with [VITE](https://github.com/facebook/create-react-app)). A bunch of packages are applied to complete the boilerplate using NPM. Some noteworthy packages:

- Bootstrap 5, CSS grid, modals and styling
- SCSS modules, import styles with prefixes
- React Router (DOM), for managing routing
- Formik, building and managing forms
- React data table component, building tables
- Redux, for keeping track of the universal state
- I18n, for translating to other languages
- Axios, for handling fetch requests

Most of the core files are written in TypeScript, the type strict variant of JavaScript, using the arrow functional approach. As the application is dependent on the DiSSCo API, it uses asynchronous functions to dynamicly load content. General responses from the API are saved within the Redux state to preserve them and prevent multiple API calls. The Redux state also makes it easy for unlinked components to use these data.

Languages used:

- TypeScript (JavaScript with strict typing)
- TSX (JSX/HTML)
- SCSS (CSS)

The application makes use of different source materials to for example: map data from API responses or to show static data properties (as options). Data kind of source files are written in JSON (as are all API responses). Media source files can reach from images, to audio, video and IIIF formats.

Tests make use of the React Testing library as well as JEST.

## Running DiSSCover locally

Running a local test version of DiSSCover requires a view steps:

- Clone the repository to your local machine by:
    - Using the clone command in your terminal
    - Using Github Desktop to add the repository
- Make sure you have NPM installed
    - The Node Package Manager is a helpful tool for managing JavaScript based applications. It keeps track of state of our application and the required dependencies.
- Add a proxy in package.json that points to the DiSSCo API
    - The proxy is needed to evade CORS errors. Because our local environment is not recognized by the CORS protocol of the DiSSCo API as a valid origin, it will reject all fetch requests.
    - The proxy needs to look like this: "proxy": "https://sandbox.dissco.tech"
- Set the Axios url environment variable to localhost
    - Because of our proxy, we want to point all our fetch requests to our localhost, which then redirects them to the DiSSCo API using the proxy.
    - Set the REACT_APP_AXIOS_URL environment variable in the .env file to: "http://localhost:3000/api/v1"
- Open the terminal and navigate into the root folder of the repository.
- Finally, run 'npm start' to boot the application. This will open a new tab in your browser and display the application.

## Deploying with Docker

DiSSCover comes with a Docker image which can be deployed using Docker. The Docker image will first build the optimized deployment version of the application, where after it is exposed on port 3000 by NGINX. DiSSCo houses the Docker image in a Kubernetes cluster. The latest version of the Docker image can also be found in this reposotory: https://gallery.ecr.aws/dissco/disscover.

Mind that when you deploy the Docker image locally, it will not be able to fetch the data from the API due to CORS. Because it is a deployment version of React, it will not accept proxies within the package.json file to solve this problem.

## Commands

All available commands that can be run from root:

#### `npm start`
To start the application.

#### `npm build`
Builds a production version of the application for deployment. Optimizes all files into compressed JavaScript and CSS files that are parsed by the interpreter.

#### `npm test`
To run the tests. The terminal will show how many tests passed and which failed.

#### `npm testc`
To run the tests and receive a coverage report. The coverage report indicates the amount of code lines, that are covered by the tests.

## Feedback and support

DiSSCo is very open to receive feedback on its services. Please insert a ticket in the Github repository of DiSSCover to address your feedback.

DiSSCo lends support for its services. Please insert a ticket in the Github repository of DiSSCover to raise an issue and ask for support.