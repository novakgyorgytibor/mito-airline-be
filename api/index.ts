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

app.get("/available-destinations", (req: Request, res: Response) => {
    console.log(req.query, stations.length);
    const availableDestinations: any[] = [];

    if(req?.query?.origin) {
        stations.forEach((station: any):void => {
            if(station.connections.includes(req?.query.origin)) {
                availableDestinations.push(station);
            }
        })
    } else {
        res.status(400).send("Required parameter: origin");
    }
    res.send(availableDestinations);
});


app.listen(PORT);

module.exports = app;