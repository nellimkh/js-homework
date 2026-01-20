class PaymentMethod {
  pay(amount) {
    throw new Error("Not implemented");
  }
}

class CardPayment extends PaymentMethod {
  pay(amount) {
    return `Paid ${amount} with card`;
  }
}

class CashPayment extends PaymentMethod {
  pay(amount) {
    return `Paid ${amount} with cash`;
  }
}

class CourseEnrollment {
  constructor(paymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  enroll() {
    return this.paymentMethod.pay(100);
  }
}

const cardEnroll = new CourseEnrollment(new CardPayment());
console.log(cardEnroll.enroll());

const cashEnroll = new CourseEnrollment(new CashPayment());
console.log(cashEnroll.enroll());
