class InvalidJobPostingError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "InvalidJobPostingError";
  }
}

class ApplicationError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "ApplicationError";
  }
}

class AuthorizationError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "AuthorizationError";
  }
}

class JobPostingOperation {
  createPosting() { throw new Error("Abstract"); }
  editPosting()   { throw new Error("Abstract"); }
  deletePosting() { throw new Error("Abstract"); }
  listPostings()  { throw new Error("Abstract"); }
}

class JobPosting {
  #id;
  #title;
  #description;

  constructor(title, description, company) {
    this.#id = Math.random().toString(36).slice(2);
    this.company = company;
    this.title = title;
    this.description = description;
    this.applications = [];
  }

  get id() { return this.#id; }

  get title() { return this.#title; }
  set title(value) {
    if (!value || value.length < 3) {
      throw new InvalidJobPostingError("Invalid title");
    }
    this.#title = value;
  }

  get description() { return this.#description; }
  set description(value) {
    if (!value) throw new InvalidJobPostingError("Invalid description");
    this.#description = value;
  }
}

class FullTimeJob extends JobPosting {
  constructor(title, description, company) {
    super(title, description, company);
    this.type = "FULL_TIME";
  }
}

class PartTimeJob extends JobPosting {
  #workHours;

  constructor(title, description, company, workHours) {
    super(title, description, company);
    this.workHours = workHours;
    this.type = "PART_TIME";
  }

  get workHours() { return this.#workHours; }
  set workHours(value) {
    if (value <= 0) {
      throw new InvalidJobPostingError("Invalid work hours");
    }
    this.#workHours = value;
  }
}

class Company extends JobPostingOperation {
  #name;
  #contact;
  #postings = [];

  constructor(name, contact) {
    super();
    if (!name || !contact) throw new Error("Invalid company");
    this.#name = name;
    this.#contact = contact;
  }

  createPosting(job) {
    this.#postings.push(job);
  }

  editPosting(jobId, newTitle, newDescription) {
    const job = this.#postings.find(j => j.id === jobId);
    if (!job) throw new InvalidJobPostingError("Job not found");
    job.title = newTitle;
    job.description = newDescription;
  }

  deletePosting(jobId) {
    this.#postings = this.#postings.filter(j => j.id !== jobId);
  }

  listPostings() {
    return [...this.#postings];
  }

  viewApplications(jobId) {
    const job = this.#postings.find(j => j.id === jobId);
    if (!job) throw new InvalidJobPostingError("Job not found");
    return job.applications;
  }
}
class JobSeeker {
  #name;
  #contact;

  constructor(name, contact, resume) {
    if (!name || !contact) throw new Error("Invalid seeker");
    this.#name = name;
    this.#contact = contact;
    this.resume = resume;
    this.applications = [];
  }

  search(allPostings, keyword) {
    return allPostings.filter(p =>
      p.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  apply(job) {
    if (!job) throw new ApplicationError("Job does not exist");
    const application = new JobApplication(job, this);
    this.applications.push(application);
    job.applications.push(application);
    return application;
  }
}

class JobApplication {
  #status = "PENDING";

  constructor(job, seeker) {
    this.job = job;
    this.seeker = seeker;
  }

  get status() { return this.#status; }

  updateStatus(newStatus) {
    this.#status = newStatus;
  }
}
class JobService {
  constructor(company) {
    this.company = company;
  }

  withAuthorization(action) {
    return (user, ...args) => {
      if (user !== this.company) {
        throw new AuthorizationError("Access denied");
      }
      return action(...args);
    };
  }

  withLogging(action, name) {
    return (...args) => {
      console.log(`[LOG] ${name}`, args);
      return action(...args);
    };
  }
}
