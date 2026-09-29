const express = require("express");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("/secret", (req, res) => {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Basic ")) {
        res.setHeader("WWW-Authenticate", 'Basic realm="Secret Area"');
        return res.status(401).send("Authentication required");
    }

    const credentials = Buffer
        .from(auth.split(" ")[1], "base64")
        .toString()
        .split(":");

    const username = credentials[0];
    const password = credentials[1];

    if (
        username === process.env.USERNAME &&
        password === process.env.PASSWORD
    ) {
        return res.send(process.env.SECRET_MESSAGE);
    }

    res.status(401).send("Invalid username or password");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});