// bad example
class EmployeeManager {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  calculateTax() {
    return this.salary * 0.2;
  }

  generateReport() {
    return `Employee: ${this.name}, Salary: ${this.salary}, Tax: ${this.calculateTax()}`;
  }

  saveToFile() {
    console.log(`Saving report: ${this.generateReport()}`);
  }
}

const emp = new EmployeeManager("Nelli", 1000);
emp.saveToFile();
