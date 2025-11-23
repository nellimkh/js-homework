// 1

/*
Պրոտոտիպների շղթան (prototype chain) սկսվում է ամբողջովին օբյեկտից, ավելի կոնկրետ այն օբյեկտից, որի վրա փորձում եք property մուտք գործել։ 
Պրոտոտիպ շղթայի սկիզբը օբյեկտն է, վերջը՝ null:
Յուրաքանչյուր property որոնում անցնում է շղթայով՝
սեփական հատկություններ → ժառանգված հատկություններ → … → null*/

// 2
/*
Պրոտոտիպների շղթան ավարտվում է null-ով։
obj → obj.[[Prototype]] → ... → Object.prototype → null
օրինակ՝
const arr = [];
console.log(arr.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null → շղթայի վերջ
 */


// 3
/*
Միակ օբյեկտը, որի պրոտոտիպը null է այն է, որը հստակ ստեղծվել է Object.create(null)-ով։ 
Սովորական օբյեկտները ({} կամ new Object()) ժառանգում են Object.prototype-ից։

Object.create(null)-ով ստեղծված օբյեկտները չունեն պրոտոտիպ, ուստի՝ չեն ժառանգում որևէ ներկառուցված մեթոդներ, 
օրինակ՝ toString(), hasOwnProperty(), և այլն։
*/

// 4
/*
JavaScript-ում property-ի որոնումը (lookup) հետևում է պրոտոտիպների շղթային (prototype chain)։
Սա այն մեխանիզմն է, որով JS-ը գտնում է property-ին, երբ փորձում եք մուտք գործել օբյեկտի վրա։ */