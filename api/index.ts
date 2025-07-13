import express, { Request, Response } from "express";
const flights = require("../data/flights.json");
const stations = require("../data/stations.json");

const app= express();
const PORT: number = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Mito Airline API!");
});

app.get("/flights", (req: Request, res: Response) => {
    res.send(flights);
});

app.get("/stations", (req: Request, res: Response) => {
    res.send(stations);
});

app.listen(PORT);

module.exports = app;