const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();
const portFinder = require('portfinder');

portFinder.getPort({
    port: 8080,    // minimum port
    stopPort: 9080 // maximum port
}, (error, portFound) => {
    if (error) {
        console.log(error);
        return;
    }
    const port = process.env.PORT || portFound;

    app.use(history({
        verbose: true
    }));

    app.use(serveStatic(path.join(__dirname, '/dist')));

    app.listen(port, () => {
        console.log('Server started at http://localhost:%s', port)
    });
});
