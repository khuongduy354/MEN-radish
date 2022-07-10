//boostrap expressjs
import express, { Request, Response } from "express";
import "dotenv/config";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT.toString());
});

// Error handling
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Error" });
});

process.on("uncaughtException", (e) => {
  console.log(e);
  process.exit(1);
});
process.on("unhandledRejection", (e) => {
  console.log(e);
  process.exit(1);
});
