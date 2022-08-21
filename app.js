const express = require("express"); // importing express library for server creation and functions.
const cors = require("cors"); // importing cors library.
const path = require("path");
const bodyParser = require("body-parser"); // importing req body parser
const conn = require("./db/db_config");

const app = express(); // creating express object - app.
app.use(cors()); // using cors to Allow or Enable all the Cross-Origin requests or endpoints.
app.use(bodyParser.json()); // to parse request body's json data
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// defining the hostname and port number.
const hostname = "localhost";
const port = 3001;

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/controller", require("./controller/index"));
// api routes
app.use("/users", require("./users/controller"));
// app server default response for index.
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + 'index.html'));
// });

app.post("/check_server", async(req, res) => {
    try {
        const connection_status = await conn.check_connection_status();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(connection_status));
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(err));
    }
});

// app server starting and listening for requests.
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});