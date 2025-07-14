import express, { Request, Response } from "express";
const flights = require("../data/flights.json");
const stations = require("../data/stations.json");

import { Station, Flight } from "../types";

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
    const availableDestinations: Station[] = [];

    if(req?.query?.origin) {
        stations.forEach((station: Station) => {
            if(station.connections.includes(String(req?.query?.origin))) {
                availableDestinations.push(station);
            }
        })
    } else {
        res.send(stations);
        return;
    }

    res.send(availableDestinations);
});


app.listen(PORT);

module.exports = app;