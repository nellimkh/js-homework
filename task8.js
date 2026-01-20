class EnrollmentError extends Error {
  constructor(message) {
    super(message);
    this.name = "EnrollmentError";
  }
}

class InvalidCourseError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidCourseError";
  }
}

class SchoolOperation {
  enrollStudent() {
    throw new Error("Abstract method");
  }
  manageCourses() {
    throw new Error("Abstract method");
  }
  viewProgress() {
    throw new Error("Abstract method");
  }
}

class Student {
  #name;
  #contact;
  #courses = [];
  #progress = new Map();

  constructor(name, contact) {
    this.name = name;
    this.contact = contact;
  }

  set name(value) {
    if (!value) throw new Error("Invalid student name");
    this.#name = value;
  }

  set contact(value) {
    if (!value) throw new Error("Invalid contact");
    this.#contact = value;
  }

  enroll(course) {
    this.#courses.push(course);
    this.#progress.set(course.courseName, 0);
  }

  updateProgress(courseName, value) {
    if (!this.#progress.has(courseName)) {
      throw new EnrollmentError("Student not enrolled in course");
    }
    this.#progress.set(courseName, value);
  }

  get progress() {
    return new Map(this.#progress);
  }
}

class Teacher {
  #name;
  #contact;
  #subject;
  #courses = [];

  constructor(name, contact, subject) {
    this.name = name;
    this.contact = contact;
    this.#subject = subject;
  }

  set name(value) {
    if (!value) throw new Error("Invalid teacher name");
    this.#name = value;
  }

  set contact(value) {
    if (!value) throw new Error("Invalid contact");
    this.#contact = value;
  }

  assignCourse(course) {
    this.#courses.push(course);
  }
}

class Course {
  #courseName;
  #teacher;
  #students = [];
  #prerequisite;

  constructor(courseName, teacher, prerequisite = null) {
    if (!courseName || !teacher) {
      throw new InvalidCourseError("Invalid course data");
    }
    this.#courseName = courseName;
    this.#teacher = teacher;
    this.#prerequisite = prerequisite;
    teacher.assignCourse(this);
  }

  get courseName() {
    return this.#courseName;
  }

  get prerequisite() {
    return this.#prerequisite;
  }

  addStudent(student) {
    this.#students.push(student);
  }

  get students() {
    return [...this.#students];
  }
}

class MathCourse extends Course {
  #difficultyLevel;

  constructor(name, teacher, difficultyLevel, prerequisite = null) {
    super(name, teacher, prerequisite);
    this.#difficultyLevel = difficultyLevel;
    this.type = "MATH";
  }
}

class EnglishCourse extends Course {
  #literaryFocus;

  constructor(name, teacher, literaryFocus, prerequisite = null) {
    super(name, teacher, prerequisite);
    this.#literaryFocus = literaryFocus;
    this.type = "ENGLISH";
  }
}

class SchoolManager extends SchoolOperation {
  enrollStudent(student, course) {
    course.addStudent(student);
    student.enroll(course);
  }

  manageCourses() {
  }

  viewProgress(student) {
    return student.progress;
  }
}

class SchoolService {
  withLogging(action, label) {
    return (...args) => {
      console.log(`[LOG] ${label}`, args);
      return action(...args);
    };
  }

  withPrerequisiteValidation(action) {
    return (student, course) => {
      const prereq = course.prerequisite;
      if (prereq && !student.progress.has(prereq)) {
        throw new EnrollmentError(
          `Missing prerequisite: ${prereq}`
        );
      }
      return action(student, course);
    };
  }
}
