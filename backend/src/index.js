const express = require("express");
const cors = require('cors')

const app= express();
app.use(express.json());
app.use(cors({
  origin: 'https://paytmlite-ten.vercel.app', // Vercel frontend URL
  credentials: true, // Allow cookies and credentials
}));


const mainRouter = require("./routes/index")

app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// /api/v1 -> mainrouter 

