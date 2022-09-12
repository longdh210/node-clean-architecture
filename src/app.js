const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./frameworks/web/routes");
const projectDependencies = require("./config/projectDependencies");
const ErrorHandler = require("./frameworks/common/ErrorHandler");

const app = express();
const port = process.env.PORT || 3000;

projectDependencies.DatabaseService.initDatabase().then(
    () => {
        // Load middlewares
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        // Load routes
        app.use("/api", routes(projectDependencies));

        // Generic error handler
        app.use(ErrorHandler);

        app.listen(port, () =>
            console.log(`Server start at http://localhost:${port}`)
        );
    },
    (err) => {
        console.log(`DB is not ready, err:${err}`);
    }
);
