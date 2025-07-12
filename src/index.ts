import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Mito Airline API!");
});

app.listen(PORT, () => {
    console.log(`Mito Airline server is running on port ${PORT}`);
});

module.exports = app;