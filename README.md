# SolrProject

This application uses ReactJS to connect with Solr and fetching data. Also used Material UI and Materializecss.

## First Time Setup
If you already have npm and node installed, you can skip this step.
For Ubuntu:
```
$sudo apt-get update
$sudo apt-get install nodejs
$node -v
$sudo apt-get install npm
$npm -v
```
For Mac:
 
1. Open the Terminal app and type `brew install node`.
2. Sit back and wait. Homebrew downloads some files and installs them. And that’s it.

## Running

- Run with:
```
$npm start
```

Then view the page through this url:
```
localhost:8080/demo/
```

## Install dependencies
If you can't run the program, try the following command to install node modules locally.
```
$npm install  OR  $sudo npm install
```
Node modules used:
- react
- react-dom
- material-ui
- recharts
- react-solr-connector
- react-highlight

* If there is a CORS error, please install this chrome plugin:
* https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
