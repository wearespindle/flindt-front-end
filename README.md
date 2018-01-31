# Flindt <img src="https://user-images.githubusercontent.com/519955/34173812-07860bf6-e4f7-11e7-8cbb-2a1c19695b7e.png" align="right"/>

> Sparks conversations since 2016

Flindt is a feedback tool for holacracy companies.

## Flind front end

A [Webpack](https://webpack.js.org/)-enabled front end for the Flindt feedback tool.

## Status

<a href="https://travis-ci.org/wearespindle/flindt-front-end"><img src="https://api.travis-ci.org/wearespindle/flindt-front-end.svg?branch=master" alt="Build status" /></a>

Active / maintained.

## Running the front end

Run `npm i` and `npm run start`:

```txt
# npm i
# npm run start

Compiled successfully!

You can now view Flindt in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.1.1:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

As stated in the output above, the front end can be reached on `http://localhost:3000`.

Remember you also need to run the [database and backend Docker](https://github.com/wearespindle/flindt#docker-related)-containers for Flindt to work.

Live reload is currently not supported, but you know what they say:

*Loads of manual refreshing per day, keeps the arthritis away!*
