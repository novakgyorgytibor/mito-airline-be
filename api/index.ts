import moment from "moment";
import express from "express";
const cors = require("cors");

import type { Request, Response } from "express";
import type { Station, Flight } from "./types";

const flights = require("./data/flights.json");
const stations = require("./data/stations.json");

const app = express();
const PORT: number = 3000;

app.use(cors());
app.use(express.json());

app.get("/flights", (req: Request, res: Response) => {
  res.json(flights);
});

app.get("/stations", (req: Request, res: Response) => {
  if (req.query.iata) {
    const requestedStation = stations.find(
      (station: Station) => station.iata === req.query.iata,
    );
    res.json(requestedStation);
    return;
  }
  res.json(stations);
});

app.get("/available-destinations", (req: Request, res: Response) => {
  const availableDestinations: Station[] = [];

  if (!req?.query?.origin) {
    res.status(400).send("Missing required parameter(s): origin!");
    return;
  }

  stations.forEach((station: Station) => {
    if (station.connections.includes(String(req?.query?.origin))) {
      availableDestinations.push(station);
    }
  });

  res.json(availableDestinations);
});

app.get("/available-flights", (req: Request, res: Response) => {
  const availableFlights: Flight[] = [];

  if (!(req?.query?.date && req?.query?.destination && req?.query?.origin)) {
    res
      .status(400)
      .send("Missing required parameter(s): date, destination, origin!");
  }

  flights.forEach((flight: Flight) => {
    if (
      moment(flight.departureDateTime).format("L") ===
        moment(req?.query?.date as string).format("L") &&
      flight.departureStation === req?.query?.origin &&
      flight.arrivalStation === req?.query?.destination
    ) {
      availableFlights.push(flight);
    }
  });

  res.json(availableFlights);
});

app.listen(PORT);

module.exports = app;
