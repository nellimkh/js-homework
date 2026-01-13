// good example
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
}

class PayrollCalculator {
  calculateTax(employee) {
    return employee.salary * 0.2;
  }
}

class ReportGenerator {
  generate(employee, payrollCalculator) {
    return `Employee: ${employee.name}, Salary: ${employee.salary}, Tax: ${payrollCalculator.calculateTax(employee)}`;
  }
}

class FileSaver {
  save(report) {
    console.log(`Saving report: ${report}`);
  }
}

const emp = new Employee("Nelli", 1000);
const payroll = new PayrollCalculator();
const reportGen = new ReportGenerator();
const saver = new FileSaver();

const report = reportGen.generate(emp, payroll);
saver.save(report);
