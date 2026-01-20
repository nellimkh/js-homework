class CardPayment {
  pay(amount) {
    return `Paid ${amount} with card`;
  }
}

class CourseEnrollment {
  constructor() {
    this.payment = new CardPayment();
  }

  enroll() {
    return this.payment.pay(100);
  }
}

const enrollment = new CourseEnrollment();
console.log(enrollment.enroll());
