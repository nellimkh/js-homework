class BankAccount {
    constructor (owner, balance = 0){
        this.owner = owner;
        this.balance = balance;
    }
    deposit(amount){
        this.balance += amount;
        console.log(`${amount}$ deposited. New balance: ${this.balance}`);
        
    }

    withdraw(amount){
        if(amount > this.balance){
            console.log("Insufficient funds");
            
        }else{
            this.balance -= amount;
            console.log(`${amount}$ withdrawn. New balance: ${this.balance}$`);
            
        }
    }
}

const account  = new BankAccount("Nelli", 1000);
account.deposit(50);
account.withdraw(30);
console.log(account.balance);
