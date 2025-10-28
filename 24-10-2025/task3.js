class Student {
    constructor(name) {
        this.name = name;
        this.grades = [];
    }

    addGrade(grade) {
        this.grades.push(grade);
    }

    average() {
        if (this.grades.length === 0) {
            return 0;
        }

        let sum = 0;
        for (let grade of this.grades) {
            sum += grade;
        }

        return sum / this.grades.length;
    }
}

const student = new Student("Nelli");
student.addGrade(18);
student.addGrade(19);
student.addGrade(20);
student.addGrade(17);

console.log("Student", student.name);
console.log("Average grade", student.average());

