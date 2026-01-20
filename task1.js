class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class InsufficientFundsError extends Error {
  constructor(message) {
    super(message);
    this.name = "InsufficientFundsError";
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
  }
}

class InvalidTransactionError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidTransactionError";
  }
}

class Transaction {
  constructor(accountNumber, amount, transactionType, metadata = {}) {
    if (amount <= 0) throw new ValidationError("Invalid transaction amount");

    this.accountNumber = accountNumber;
    this.amount = amount;
    this.transactionType = transactionType;
    this.timestamp = Date.now();
    this.metadata = metadata;
  }
}

class BankAccount {
  #balance = 0;
  #transactions = [];

  constructor(accountNumber, type) {
    if (new.target === BankAccount) {
      throw new Error("BankAccount is abstract");
    }

    Object.defineProperty(this, "accountNumber", {
      set(value) {
        if (!/^\d{10}$/.test(value)) {
          throw new ValidationError("Account number must be exactly 10 digits");
        }
        this._accountNumber = value;
      },
      get() {
        return this._accountNumber;
      }
    });

    this.accountNumber = accountNumber;
    this.type = type;
  }

  deposit() {
    throw new Error("deposit() must be implemented");
  }

  withdraw() {
    throw new Error("withdraw() must be implemented");
  }

  transferFunds() {
    throw new Error("transferFunds() must be implemented");
  }

  getBalance() {
    return this.#balance;
  }

  _increaseBalance(amount) {
    if (amount <= 0) throw new ValidationError("Invalid amount");
    this.#balance += amount;
  }

  _decreaseBalance(amount) {
    if (this.#balance < amount) {
      throw new InsufficientFundsError("Insufficient funds");
    }
    this.#balance -= amount;
  }

  _addTransaction(tx) {
    this.#transactions.push(tx);
  }

  getTransactionSummary(limit = 10) {
    return this.#transactions.slice(-limit);
  }

  getAllTransactions() {
    return [...this.#transactions];
  }
}

class IndividualAccount extends BankAccount {
  constructor(accountNumber) {
    super(accountNumber, "individual");
  }

  deposit(amount) {
    this._increaseBalance(amount);
    this._addTransaction(
      new Transaction(this.accountNumber, amount, "deposit")
    );
  }

  withdraw(amount) {
    this._decreaseBalance(amount);
    this._addTransaction(
      new Transaction(this.accountNumber, amount, "withdraw")
    );
  }

  transferFunds(targetAccount, amount, actor) {
    this.withdraw(amount);
    targetAccount.deposit(amount);

    this._addTransaction(
      new Transaction(this.accountNumber, amount, "transfer", {
        toAccount: targetAccount.accountNumber
      })
    );
  }
}

class JointAccount extends BankAccount {
  constructor(accountNumber, owners = []) {
    super(accountNumber, "joint");
    this.owners = owners;
  }

  _checkOwnership(actor) {
    if (!this.owners.includes(actor)) {
      throw new AuthorizationError("Actor is not an owner");
    }
  }

  deposit(amount) {
    this._increaseBalance(amount);
    this._addTransaction(
      new Transaction(this.accountNumber, amount, "deposit")
    );
  }

  withdraw(amount, actor) {
    this._checkOwnership(actor);
    this._decreaseBalance(amount);
    this._addTransaction(
      new Transaction(this.accountNumber, amount, "withdraw")
    );
  }

  transferFunds(targetAccount, amount, actor) {
    this._checkOwnership(actor);
    this.withdraw(amount, actor);
    targetAccount.deposit(amount);

    this._addTransaction(
      new Transaction(this.accountNumber, amount, "transfer", {
        toAccount: targetAccount.accountNumber
      })
    );
  }
}

class Customer {
  constructor(name, contactInfo) {
    Object.defineProperty(this, "name", {
      set(value) {
        if (!value || typeof value !== "string") {
          throw new ValidationError("Invalid name");
        }
        this._name = value;
      },
      get() {
        return this._name;
      }
    });

    Object.defineProperty(this, "contactInfo", {
      set(value) {
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phone = /^\+374\d{8}$/;
        if (!email.test(value) && !phone.test(value)) {
          throw new ValidationError("Invalid contact info");
        }
        this._contactInfo = value;
      },
      get() {
        return this._contactInfo;
      }
    });

    this.name = name;
    this.contactInfo = contactInfo;
    this.accounts = [];
    this.isAuthorized = true;
  }

  addAccount(account) {
    this.accounts.push(account);
  }

  viewAccounts() {
    return this.accounts;
  }

  viewTransactionHistory(accountNumber) {
    const acc = this.accounts.find(a => a.accountNumber === accountNumber);
    if (!acc) throw new ValidationError("Account not found");
    return acc.getAllTransactions();
  }
}

function withLogging(fn, operation) {
  return function (...args) {
    console.log(
      `[${new Date().toISOString()}] ${operation}`,
      args.map(a => a?.accountNumber || a)
    );
    return fn.apply(this, args);
  };
}

function withPermission(fn) {
  return function (targetAccount, amount, actor) {
    if (!actor || actor.isAuthorized !== true) {
      throw new AuthorizationError("Permission denied");
    }
    return fn.call(this, targetAccount, amount, actor);
  };
}

const nelli = new Customer("Nelli", "nelli@gmail.com");
const nona = new Customer("Nona", "+37499112233");

const acc1 = new Indivi
