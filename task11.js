class GameNotInstalledError extends Error {
  constructor(message) {
    super(message);
    this.name = "GameNotInstalledError";
  }
}

class ProgressSaveError extends Error {
  constructor(message) {
    super(message);
    this.name = "ProgressSaveError";
  }
}

class InvalidCompetitionError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidCompetitionError";
  }
}

class Game {
  static GENRES = ["Sports", "Adventure", "RPG", "Shooter"];
  #title;
  #genre;
  #releaseDate;

  constructor(title, genre, releaseDate) {
    this.title = title;
    this.genre = genre;
    this.releaseDate = releaseDate;
  }

  set title(value) {
    if (!value) throw new Error("Invalid game title");
    this.#title = value;
  }

  set genre(value) {
    if (!Game.GENRES.includes(value)) throw new Error("Invalid genre");
    this.#genre = value;
  }

  set releaseDate(value) {
    if (!(value instanceof Date)) throw new Error("Invalid releaseDate");
    this.#releaseDate = value;
  }

  get title() { return this.#title; }
  get genre() { return this.#genre; }
  get releaseDate() { return this.#releaseDate; }

  play(player) { throw new Error("Abstract method"); }
  saveProgress(player, data) { throw new Error("Abstract method"); }
  getDetails() { throw new Error("Abstract method"); }
}

class SportsGame extends Game {
  play(player) {
    console.log(`${player.name} is playing sports game ${this.title}`);
  }

  saveProgress(player, data) {
    player.savedProgress.set(this.title, data);
  }

  getDetails() { return `Sports Game: ${this.title} (${this.genre})`; }
}

class AdventureGame extends Game {
  play(player) {
    console.log(`${player.name} is playing adventure game ${this.title}`);
  }

  saveProgress(player, data) {
    player.savedProgress.set(this.title, data);
  }

  getDetails() { return `Adventure Game: ${this.title} (${this.genre})`; }
}

class Player {
  #name;
  #contact;
  #verified;

  constructor(name, contact, verified = true) {
    this.name = name;
    this.contact = contact;
    this.#verified = verified;
    this.savedProgress = new Map();
    this.friends = [];
    this.achievements = [];
  }

  get name() { return this.#name; }
  get contact() { return this.#contact; }
  isVerified() { return this.#verified; }

  set name(value) {
    if (!value) throw new Error("Invalid player name");
    this.#name = value;
  }

  set contact(value) {
    if (!value) throw new Error("Invalid contact");
    this.#contact = value;
  }

  playGame(game) { game.play(this); }
  saveProgress(game, data) { game.saveProgress(this, data); }
  viewProgress(gameTitle) { return this.savedProgress.get(gameTitle); }
  addFriend(player) { this.friends.push(player); }
  competeWith(opponent, game) {
    if (!this.#verified || !opponent.isVerified()) {
      throw new InvalidCompetitionError("Both players must be verified");
    }
    console.log(`${this.name} is competing with ${opponent.name} in ${game.title}`);
  }
}

class Console {
  constructor(consoleType) {
    this.consoleType = consoleType;
    this.installedGames = [];
    this.activePlayers = [];
  }

  install(game) {
    this.installedGames.push(game);
  }

  uninstall(game) {
    this.installedGames = this.installedGames.filter(g => g !== game);
  }

  startGame(game, player) {
    if (!this.installedGames.includes(game)) throw new GameNotInstalledError(`${game.title} not installed`);
    this.activePlayers.push(player);
    game.play(player);
  }

  listInstalledGames() {
    return this.installedGames.map(g => g.getDetails());
  }
}

class GameService {
  withLogging(action, label) {
    return (...args) => {
      console.log(`[LOG] ${label}`, args.map(a => a.title || a.name || a));
      return action(...args);
    };
  }

  withAccessControl(action) {
    return (player, opponent, game) => {
      if (!player.isVerified() || !opponent.isVerified()) {
        throw new InvalidCompetitionError("Both players must be verified");
      }
      return action(player, opponent, game);
    };
  }
}
