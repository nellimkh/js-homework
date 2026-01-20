class Teachable {
  teach() {
    throw new Error("Not implemented");
  }
}

class Studyable {
  study() {
    throw new Error("Not implemented");
  }
}

class HomeworkCheckable {
  checkHomework() {
    throw new Error("Not implemented");
  }
}

class Teacher extends Teachable {
  teach() {
    return "Teaching lesson";
  }

  checkHomework() {
    return "Checking homework";
  }
}

class Student extends Studyable {
  study() {
    return "Studying lesson";
  }
}
