import moment from "moment";
import express, {Request, Response} from "express";
const cors = require('cors');

const flights = require("./data/flights.json");
const stations = require("./data/stations.json");

import {Station, Flight} from "./types";

const app = express();
const PORT: number = 3000;

app.use(cors({credentials: true, origin: true}));

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Mito Airline API!");
});

app.get("/flights", (req: Request, res: Response) => {
    res.send(flights);
});

app.get("/stations", (req: Request, res: Response) => {
    if (req.query.iata) {
        const requestedStation = stations.find((station: Station) => station.iata === req.query.iata);
        res.send(requestedStation);
        return;
    }
    res.send(stations);
});

app.get("/available-destinations", (req: Request, res: Response) => {
    const availableDestinations: Station[] = [];

    if (req?.query?.origin) {
        stations.forEach((station: Station) => {
            if (station.connections.includes(String(req?.query?.origin))) {
                availableDestinations.push(station);
            }
        })
    } else {
        res.send(stations);
        return;
    }

    res.send(availableDestinations);
});

app.get("/available-flights", (req: Request, res: Response) => {
    const availableFlights: Flight[] = [];

    if (!(req?.query?.date
        && req?.query?.destination
        && req?.query?.origin)) {
        res.send(availableFlights);
    }

    flights.forEach((flight: Flight) => {
        if ((moment(flight.departureDateTime).format('L') === moment(req?.query?.date as string).format('L'))
            && flight.departureStation === req?.query?.origin
            && flight.arrivalStation === req?.query?.destination) {
            availableFlights.push(flight);
        }
    })

    res.send(availableFlights);
});


app.listen(PORT);

module.exports = app;