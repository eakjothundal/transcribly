import express from "express";
import cors from "cors";

const app = express();

// Allow CORS from frontend
app.use(
  cors({
    origin: process.env.FRONTEND,
  })
);

app.use("/api", (req, res) => {
  res.json({ message: "something" });
});

app.listen(3055, () => {
  console.log("Backend running on http://localhost:3055");
});
