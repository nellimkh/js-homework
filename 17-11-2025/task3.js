/*
Երբ գրում ենք console.log(obj.__proto__)  կոնսոլում երևում է {},
իսկ երբ գրում ենք  console.log(Object.getOwnPropertyNames(obj.__proto__))
երևում են մեթոդներ՝ toString, valueOf և այլն։
Այս տարբերությունը լինում է 3 հիմնական պատճառով․

1․ Enumerable vs Non-enumerable properties (թվարկվող և ոչ-թվարկվող հատկություններ)
JavaScript-ում object-ի հատկությունները կարող են լինել՝
Enumerable (թվարկվող) — երևում են console.log-ում, for...in-ում, Object.keys()-ում։
Non-enumerable (ոչ-թվարկվող) — գոյություն ունեն, բայց չեն երևում սովորական դիտման ժամանակ։
JavaScript-ի ներկառուցված բոլոր prototype մեթոդները (օրինակ՝ toString, hasOwnProperty) սահմանված են որպես non-enumerable։
Դրա համար obj.__proto__ իրականում մեթոդներ ունի, բայց {} է երևում, որովհետև այդ մեթոդները չեն թվարկվում, ու կոնսոլը դրանք չի ցույց տալիս։

2․ Node.js-ի console formatting (կոնսոլի ձևաչափում)
Node.js-ի console.log()-ը օբյեկտները ցույց է տալիս միայն՝ enumerable սեփական property-ները,
և օբյեկտի ընդհանուր ձևը ({}): Քանի որ prototype-ի մեթոդները non-enumerable են՝
 Node.js-ը դրանք չի ցույց տալիս {}-ի մեջ։ Բայց նրանք իրականում գոյություն ունեն obj.proto–ում
Որպեսզի ամբողջ ցուցակը տեսնենք, պետք է օգտագործել՝ Object.getOwnPropertyNames(obj.__proto__)
սա վերադարձնում է բոլոր own property-ները՝ անկախ enumerable լինելուց։

3․ Ինչպես են class-ի method-ները սահմանվում  default
ES6 class-երում մեթոդները միշտ դրվում են prototype-ում, և ունեն՝ enumerable: false
օրինակ․
class A {
 sayHello() {}
}
sayHello մեթոդը կա A.prototype-ում, բայց չի երևում {}-ում, որովհետև դարձյալ non-enumerable է։
Նույն մոտեցումն է օգտագործվում նաև JavaScript-ի ներկառուցված object prototype-ներում։
*/