<img src="https://user-images.githubusercontent.com/519955/34173812-07860bf6-e4f7-11e7-8cbb-2a1c19695b7e.png" />

A feedback tool for Holacracy companies.

*Sparks conversations since 2016*

# Flind front end

A [Webpack](https://webpack.js.org/)-enabled front end for the Flindt feedback tool.

## Status

<href="https://travis-ci.org/wearespindle/flindt-front-end"><img src="https://api.travis-ci.org/wearespindle/flindt-front-end.svg?branch=master" alt="Build status" /></a>

Active / maintained.

## Running the front end

- Without Docker:

```txt
npm i
npm run start
```

- 🐳 Docker:

The command `docker-compose up` will setup a multi-stage build Docker-container.\
Inside is the front end statically build and served through nginx webserver.\
It can be reached via `htpp://localhost:3000`.

In both cases you also need to run the [database and backend Docker](https://github.com/wearespindle/flindt#docker-related)-containers for Flindt to work.

Live reload is currently not supported, but you know what they say:

*Loads of manual refreshing per day, keeps the arthritis away!*
