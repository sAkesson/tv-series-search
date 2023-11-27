# tv-series-search

In this project you can search up tv series and see detailed information about them. This project is a code test provided by a company.

## Get started

1. Clone project
2. Run `npm install` to get all node modules
3. Run `npm start` to start the project

## General project structure

In `src` the project is divided into several folders to indicate which logic belongs to which context.

`api` - handles all API calls\
`components` - where all general components are stored\
`configs` - ts files that holds constants and configs that are used throughout the project (like urls, CSS rules used for emotion etc)\
`content` - pages and their specific child components\
`helpers` - general helpers in different areas that are be used throughout the project\
`tests` - where everything related to tests are stored\
`types` - Where are types that are used throughout the projects are stored

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Considerations if I had more time

### Tests

### Persistence for API calls

To keep things simple I opted for using session storage. In part because a user probably wouldn't search for the show on multiple occasions and in that case the data would just take up storage. Further more, information might change (like image, status and end date), meaning that I would then have to account for those types of changes too, which would only complicate the solution.

### Implementing a favorite show list

For this I would have kept an array of the show-ids in localStorage. To keep track of the list inside the project (and for an easy toggle-functionality) I would have implemented Redux so that the page re-rendered the components on change. Redux would also hold the interface and update localStorage according to changes that were made.
