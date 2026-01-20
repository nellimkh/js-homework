class EducationSystem {
  teach() {
    throw new Error("Not implemented");
  }

  study() {
    throw new Error("Not implemented");
  }

  checkHomework() {
    throw new Error("Not implemented");
  }
}

class Teacher extends EducationSystem {
  teach() {
    return "Teaching lesson";
  }

  study() {
    throw new Error("Teacher does not study");
  }

  checkHomework() {
    return "Checking homework";
  }
}

class Student extends EducationSystem {
  teach() {
    throw new Error("Student does not teach");
  }

  study() {
    return "Studying lesson";
  }

  checkHomework() {
    throw new Error("Student does not check homework");
  }
}
