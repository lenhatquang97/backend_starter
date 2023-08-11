const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./src/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8122;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});