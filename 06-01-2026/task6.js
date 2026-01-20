class InvalidExerciseError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidExerciseError";
  }
}

class InvalidPlanDurationError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidPlanDurationError";
  }
}

class FitnessTrackingOperation {
  trackProgress() {
    throw new Error("Abstract method");
  }
  updateProgress() {
    throw new Error("Abstract method");
  }
  viewPlan() {
    throw new Error("Abstract method");
  }
}

class Exercise {
  #name;

  constructor(name) {
    this.name = name;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (!value) throw new InvalidExerciseError("Invalid exercise name");
    this.#name = value;
  }
}

class CardioExercise extends Exercise {
  #duration;
  #calories;

  constructor(name, duration, calories) {
    super(name);
    this.duration = duration;
    this.calories = calories;
    this.type = "CARDIO";
  }

  set duration(value) {
    if (value <= 0) throw new InvalidExerciseError("Invalid duration");
    this.#duration = value;
  }

  set calories(value) {
    if (value <= 0) throw new InvalidExerciseError("Invalid calories");
    this.#calories = value;
  }
}

class StrengthExercise extends Exercise {
  #sets;
  #reps;
  #weight;

  constructor(name, sets, reps, weight) {
    super(name);
    this.sets = sets;
    this.reps = reps;
    this.weight = weight;
    this.type = "STRENGTH";
  }

  set sets(value) {
    if (value <= 0) throw new InvalidExerciseError("Invalid sets");
    this.#sets = value;
  }

  set reps(value) {
    if (value <= 0) throw new InvalidExerciseError("Invalid reps");
    this.#reps = value;
  }

  set weight(value) {
    if (value < 0) throw new InvalidExerciseError("Invalid weight");
    this.#weight = value;
  }
}

class User {
  #name;
  #contact;
  #favorites = [];
  #connections = [];

  constructor(name, contact) {
    this.name = name;
    this.contact = contact;
  }

  set name(value) {
    if (!value) throw new Error("Invalid user name");
    this.#name = value;
  }

  set contact(value) {
    if (!value) throw new Error("Invalid contact");
    this.#contact = value;
  }

  addFavorite(exercise) {
    this.#favorites.push(exercise);
  }

  removeFavorite(exerciseName) {
    this.#favorites = this.#favorites.filter(e => e.name !== exerciseName);
  }

  follow(user) {
    if (!this.#connections.includes(user)) {
      this.#connections.push(user);
    }
  }

  get favorites() {
    return [...this.#favorites];
  }
}

class WorkoutPlan extends FitnessTrackingOperation {
  #user;
  #exercises = [];
  #duration;
  #progress = 0;

  constructor(user, duration) {
    super();
    this.#user = user;
    this.duration = duration;
  }

  set duration(value) {
    if (value <= 0) {
      throw new InvalidPlanDurationError("Invalid plan duration");
    }
    this.#duration = value;
  }

  addExercise(exercise) {
    this.#exercises.push(exercise);
  }

  removeExercise(exerciseName) {
    this.#exercises = this.#exercises.filter(e => e.name !== exerciseName);
  }

  trackProgress() {
    return this.#progress;
  }

  updateProgress(value) {
    if (value < 0 || value > 100) return;
    this.#progress = value;
  }

  viewPlan() {
    return {
      user: this.#user,
      exercises: [...this.#exercises],
      duration: this.#duration,
      progress: this.#progress
    };
  }
}
function withLogging(action, label) {
  return (...args) => {
    console.log(`[LOG] ${label}`, args);
    return action(...args);
  };
}

function withAchievementNotifier(action) {
  return (plan, value) => {
    action(plan, value);
    if (value === 50) {
      console.log("Achievement unlocked: Halfway there!");
    }
    if (value === 100) {
      console.log("Achievement unlocked: Plan completed!");
    }
  };
}