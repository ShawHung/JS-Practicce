// 声明一个构造函数
function Construct(){}

// 创建一个实例对象
let con_one = new Construct()

// 构造函数具有一个原型对象prototype 
//关系为 Construct => prototype 
console.log(Construct.prototype)// => 构造函数的原型对象本身，Construct.prototype

// 实例对象具有一个不标准的（各浏览器支持性不同）的__proto__属性（原型属性）
// 该属性指向构造函数的原型对象 关系为 实例对象.__proto__ => 构造函数.prototype
console.log(con_one.__proto__) // => 指向构造函数的原型对象，Construct.prototype

// 什么属性可以指向实例对象呢 => 无， 因为实例对象可以存在多个

// 但是构造函数的原型对象可以指向构造函数，属性为constructor
// 关系为 构造函数.prototype.constructor => 构造函数 即 实例对象.__proto__.constructor => 构造函数

console.log(Construct.prototype.constructor) // => 指向构造函数Construct
console.log(con_one.__proto__.constructor) // => 指向构造函数Construct

// 根据上述描述可以得出

/**
 * 1、构造函数具有一个原型对象，通过构造函数.prototype访问
 * 2、通过new操作符生成构造函数的实例对象，实例对象具有一个原型，
 * 可以通过实例对象.__proto__访问，访问到的原型即构造函数的原型对象
 * 即构造函数.prototype === 实例对象.__proto__
 * 3、构造函数的原型对象，可以通过构造函数原型对象.constructor访问到构造函数
 * 即构造函数.prototype.constructor === 构造函数
 * 即实例对象.__proto__.constructor === 构造函数
 * 
*/

console.log(Construct.prototype === con_one.__proto__)
console.log(Construct.prototype.constructor === Construct)
console.log(con_one.__proto__.constructor === Construct)


/**
 * @special 几个特殊的例子
 * 1、Function.prototype === Function.__proto__ 这个不深究，可能是语言设计的问题
 * 2、实例对象.constructor === 构造函数，这是因为实例对象上没有constructor属性，就沿着
 * 原型链往上找，即通过实例对象.__proto__访问到了构造函数.prototype，然后在构造函数的
 * 原型对象上找到了constructor属性，然后就可以通过继承该属性访问到构造函数
 * 3、实例对象的__proto__属性继承自Object，自己本身没有，__proto__是一个不标准的属性
 * 被多个浏览器实现了，可以理解为Object.getPrototypeOf()方法查找对象原型。
 * 4、__proto__查找的顶点是null，null没有__proto__属性
 * 5、构造函数的__proto__属性指向Function.prototype，Function.prototype的__proto__属性
 * 指向Object.prototype，Object.prototype的__proto__属性指向null
 * 6、构造函数原型对象的__proto__属性指向Object.prototype，Object.prototype的__proto__属性指向null
*/

console.log(Function.__proto__ === Function.prototype)// true
console.log(Function.__proto__.constructor === Function.prototype.constructor)//true

console.log(con_one.constructor === Construct)//true

console.log(Construct.prototype.__proto__)// => Object.prototype
console.log(Construct.prototype.__proto__.__proto__)
console.log(Construct.__proto__)
console.log(Construct.__proto__.__proto__)
console.log(Construct.__proto__.__proto__.__proto__)


/**
 * @method 原型相关方法
 * 1、Object.getPrototypeOf()等同于Reflect.getPrototypeOf()获取对象原型方法， 参数为对象，如果不是对象，ES6以下报错，ES6以上会把参数强制转换成对象
 * 2、Object.setPrototypeOf(obj,proto) 等同于Reflect.getPrototypeOf() 设置对象原型，参数一为要设置的对象，参数二为要设置的原型
 * 3、Object.prototype.isPrototypeOf() 可以被继承，参数为被判断的对象
*/

console.log(Object.getPrototypeOf(con_one))// 构造函数的原型对象
console.log(Object.getPrototypeOf(Construct)) // Function.prototype
console.log(Object.getPrototypeOf(Construct.prototype)) // Object.prototype

let proto_obj = {
    name: "proto"
}
Object.setPrototypeOf(con_one, proto_obj)
console.log(Object.getPrototypeOf(con_one)) // { name: 'proto' }

console.log(proto_obj.isPrototypeOf(con_one))// true

console.log(Object.prototype.isPrototypeOf(Construct.prototype))//true
console.log(Function.prototype.isPrototypeOf(Construct))//true