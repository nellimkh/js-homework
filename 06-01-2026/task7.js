class InvalidReservationError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidReservationError";
  }
}

class ShowtimeFullError extends Error {
  constructor(message) {
    super(message);
    this.name = "ShowtimeFullError";
  }
}

class TheaterOperation {
  reserveSeat() {
    throw new Error("Abstract method");
  }
  purchaseTicket() {
    throw new Error("Abstract method");
  }
}

class Theater extends TheaterOperation {
  #name;
  #basePrice;

  constructor(name, basePrice) {
    super();
    this.#name = name;
    this.#basePrice = basePrice;
  }

  calculateBasePrice(isPeakTime) {
    return isPeakTime ? this.#basePrice * 1.2 : this.#basePrice;
  }

  reserveSeat(showtime, count) {
    showtime.reserve(count);
  }

  purchaseTicket(showtime, count) {
    this.reserveSeat(showtime, count);
    return this.calculateBasePrice(showtime.isPeakTime()) * count;
  }
}

class StandardTheater extends Theater {
  constructor(name) {
    super(name, 10);
    this.type = "STANDARD";
  }
}

class IMAXTheater extends Theater {
  constructor(name) {
    super(name, 18);
    this.type = "IMAX";
  }

  calculateBasePrice(isPeakTime) {
    return super.calculateBasePrice(isPeakTime) * 1.3;
  }
}
class Movie {
  static GENRES = ["Action", "Drama", "Comedy", "Sci-Fi", "Horror"];

  #title;
  #genre;
  #length;

  constructor(title, genre, length) {
    this.title = title;
    this.genre = genre;
    this.length = length;
  }

  set title(value) {
    if (!value) throw new Error("Invalid title");
    this.#title = value;
  }

  set genre(value) {
    if (!Movie.GENRES.includes(value)) {
      throw new Error("Invalid genre");
    }
    this.#genre = value;
  }

  set length(value) {
    if (value <= 0) throw new Error("Invalid length");
    this.#length = value;
  }
}

class Showtime {
  #movie;
  #theater;
  #datetime;
  #seatsAvailable;

  constructor(movie, theater, datetime, seatsAvailable) {
    this.#movie = movie;
    this.#theater = theater;
    this.#datetime = datetime;
    this.#seatsAvailable = seatsAvailable;
  }

  isPeakTime() {
    const hour = this.#datetime.getHours();
    return hour >= 18 && hour <= 22;
  }

  getDayOfWeek() {
    return this.#datetime.getDay();
  }

  reserve(count) {
    if (count <= 0) {
      throw new InvalidReservationError("Invalid seat count");
    }
    if (this.#seatsAvailable < count) {
      throw new ShowtimeFullError("Not enough seats");
    }
    this.#seatsAvailable -= count;
  }
}

class Customer {
  #name;
  #contact;
  #reservations = [];

  constructor(name, contact) {
    this.name = name;
    this.contact = contact;
  }

  set name(value) {
    if (!value) throw new Error("Invalid name");
    this.#name = value;
  }

  set contact(value) {
    if (!value) throw new Error("Invalid contact");
    this.#contact = value;
  }

  addReservation(reservation) {
    this.#reservations.push(reservation);
  }

  get reservations() {
    return [...this.#reservations];
  }
}

class TheaterService {
  withLogging(action, label) {
    return (...args) => {
      console.log(`[LOG] ${label}`, args);
      return action(...args);
    };
  }

  withDiscount(action) {
    return (showtime, count) => {
      let price = action(showtime, count);

      if (count >= 5) {
        price *= 0.9;
      }

      if (showtime.getDayOfWeek() === 2) {
        price *= 0.85;
      }

      return price;
    };
  }
}

