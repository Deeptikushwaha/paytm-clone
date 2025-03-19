const express = require("express");
const cors = require('cors')

const app= express();
app.use(express.json())
app.use(cors());

const mainRouter = require("./routes/index")

app.use("/api/v1", mainRouter);

app.listen(4000);

// /api/v1 -> mainrouter 

