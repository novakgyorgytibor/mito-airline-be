export interface Price {
  amount: number;
  currencyCode: string;
}
export interface Fare {
  bundle: "basic" | "standard" | "plus";
  remainingTickets: number;
  price: Price;
}

export interface Flight {
  id: string;
  departureStation: string;
  arrivalStation: string;
  departureDateTime: string;
  arrivalDateTime: string;
  fares: Fare[];
}

export interface Station {
  iata: string;
  shortName: string;
  connections: string[];
}

export interface CartItem extends Flight {
  selectedFare: Fare;
}

export interface Cart {
  items: CartItem[];
  total: Price;
}
