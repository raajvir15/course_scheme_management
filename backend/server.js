const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const courseRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");

// routes
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
