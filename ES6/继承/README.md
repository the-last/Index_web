# JS-class-继承及开发模式
详细学习js继承的方法

## 1 ES5的实现方式（2015年之前的标准）

js对象的复用通过原型链的方式实现，
函数方法在`prototype`
prototype存储在子类的`__proto__`中
构造函数在constructor中，必须使用`new`关键字

### 1.1 原型链

```
function Parent () {
    this.name = 'haha';
    this.car = ['area', 'auto'];
}
Parent.prototype.getinfo = function () {
    return `name:  ${this.name} + age: ${this.car}`;
}

function Child () {
    this.name  = 'heihei';
}
Child.prototype = new Parent();
var child = new Child();
child.getinfo(); // name: heihei car: area auto;

var childOther = new Parent();
childOther.car.push('bmw');
child.getinfo(); // name: heihei car: area auto bmw;
```
- 缺点：1、不能向父类传参数，2、类的属性值被所有子类共享

### 1.2 构造函数

```
function Parent (name) {
    this.name = name;
    this.car = ['area','auto'];
}

function Child (name) {
    Parent.call(this, name);
}
var child1 = new Child('haha');
var child2 = new Child('heihei');

child1.push('bmw');
child2.car;  //  area auto

```
- 缺点：方法不能继承，call对应constructor，不能继承prototype的复制。

### 1.3 组合式

```
function Parent (name) {
    this.name = name;
    this.car = ['area', 'auto'];
}
Parent.prototype.getinfo = function () {
    return `name: ${this.name} + car: ${this.car}`;
}

function Child (name) {
    Parent.call(this, name);
}
Child.prototype = new Parent();
var child1 = new Child('haha');
child1.getinfo();  // name: haha + car: area auto
var child2 = new Child('heihei');
child2.car.push('bmw');
child1.getinfo();  // name: haha + car: area auto 
child2.getinfo();  // name: haha + car: area auto bmw 

```
- 缺点：子类有两份父类的属性信息，有瑕疵

### 1.4 寄生组合式

```
function Parent (name) {
    this.name = name;
    this.car = ['area', 'auto'];
}
Parent.prototype.getinfo = function () {
    return `name: ${this.name} + car: ${this.car}`;
}

function Child (name) {
    Parent.call(this, name);
}

<!-- 关键点：单独创建constructor，并继承父类然后赋给子类原型 -->
var proto = Object.create(Parent.prototype);
proto.constructor = Child;
Child.prototype = proto;

var child1 = new Child('haha');
child1.getinfo(); // name: haha + car: area auto
var child2 = new Child('heihei');
child2.getinfo(); // name: heihei + car； area autp
child2.car.push('bmw');
child1.getinfo(); // name: haha + car: area auto
```
- 缺点： 基本上完美了

### 1.5 原型式

```
function Parent() {
    this.name = 'haha';
    this.car = ['area', 'auto'];
}

var child = Object.create(new Parent());
child.attr1 = 'new job';
```
或者
```
function Parent () {
    this.name = 'heihei';
    this.car = ['auto'];
}
function deget (obj) {
    var F = function () {};
    F.prototype = obj;
    return new F();
}
var child = deget(new Parent());
child.attr1 = 'new job';
```
- 缺点：
在已有的对象上衍生对象，父类对象充当原型对象,原型实例属性会被所有实例共享
不能复用，属性是现加的，函数没有封装

### 1.6 寄生式

```
function beget(obj) {
    var F = function(){};
    F.prototype = obj;
    return new F();
}
function Super() {
    this.val = 1;
    this.arr = [1];
}

function getSubObject (obj) {
    var clone = beget(obj);
    clone.attr1 = 1;
    clone.attr2 = 2;

    return clone;
}
var sub = getSubObject(new Super());
console.log(sub.val);
console.log(sub.arr);
console.log(sub.attr1);

```
- 原理： 创建对象 --> 增强 --> 返回对象
- 缺点： 不能复用

## 2 ES6 的实现方式 （ES2015）

### 2.1 类的声明
- 类的定义，需要class关键字，声明方式如下：
```
// 类的名称按照原则和编程习惯首字符应该大写！
class Error {
  // constructor中添加初始化类实例的时候，需要传入的变量
  constructor(type, date, source) {
      this.type = type;
      this.date = date;
      this.source = source;
  }
}
```
- 类的表达式声明
```
// 声明匿名的类
let Rect = class {
    constructor (height) {
        this.height = height;
    }
};
let r = new Rect(100);
 
 // 声明具名的类
let RectAngle = class Rect {
    constructor (width) {
        this.width = width;
    }

    getClassName () {
        return Rect.name;
    }
}

```
- 以上两种类的声明方式都不会声明提前，一定要先声明。
- 并且一次声明报错，类的名字会被写入内存，就是那个错误的类名也已经被占用。

### 2.2 类体及特征
- 严格模式
类的声明和表达式主体默认都在严格模式下执行，也是ES6的趋势。
构造函数，静态方法，原型方法，getter，setter 都在严格模式下执行。

- 构造函数
类的特殊方法，用于创建和初始化一个对象。
每个类只能有一个构造函数，有多个构造函数会报语法错误。
构造函数可以使用`super`关键字调用父类的构造函数。

- Getter 和 Setter 方法
```
class Rect {
    constructor () {
        //  ...声明类的属性
    }

    // 使用 get set 关键字，对某个属性进行存值和取值时，执行相应操作
    get prop () {
        return '获取prop';
    }

    set prop (value) {
        console.log('setter: ', value);
    }

}

var rectIns = new Rect();
rectIns.prop;  // 获取prop
rectIns.prop = '新的prop'; // setter: 新的prop

```

- 类的属性
`class属性包括3种：静态属性，实例属性，原型属性。`<br>

- 属性的赋值和访问

`类的属性不能通过super作为对象的时候访问，实例属性可以通过super对象的时候给子类添加属性，然后还是用this访问！`
```
class Animal {
    constructor () {
        this.name = 'history'
    }
    myDog () {
        console.log(333);
    }
}
class Dog extends Animal {
    constructor () {
        super();
        this.childName = 'now';

    }
    setSuper () {
        super.newName = '666';
    }
    getSuper () {
        console.log(this.newName);     //666
        console.log(this.childName);   //now
        console.log(this.name);        //history
        console.log(super.name);       //undefined
        console.log(super.childName);  //undefined
        console.log(super.newName);    //undefined
    }
}

var dog = new Dog();
dog.getSuper();
```

### 2.3 类的静态方法

静态方式的特征
```
静态方法的创建和引用方式，直接作用在函数或者类上
实例方法和属性在constructor或者原型上
静态方法不能被类的实例使用
实例方法和属性也不能被静态方法使用
静态方法和属性可以被子类继承
静态方法可调用静态属性
```
声明静态方法和静态属性的形式如下：
```
class Animal {
    // 定义静态方法
    static getsomething () {
        console.log('exe static function: ', this.feature);
    }
}
// 不能在class内部定义static变量
Animal.feature = 'staticAttrs';
Animal.getsomething(); // exe static function: staticAttrs
```
类的静态方法和属性，跟实例的方法和属性可以是同名
因为是两个不同的空间，静态方法挂在`Function`上，实例方法挂在`Object`上。
互相访问不到，会提示未定义。

### 2.4 类的继承

- 类的继承必须使用super关键字和extends关键字
举个栗子
```
class Animal {
    constructor(height, weight) {
        this.height = height;
        this.weight = weight;
    }
}

class Dog extends Animal {
    constructor(height, weight, color) {
        // super声明在前
        super(height, weight);
        this.color = color;
    }
    // 这个方法默认放在父类的原型上
    generateAnimal () {
        return this.color;
    }
}

let labuladuo = new Dog(1, 30, 'brown');

labuladuo instanceof Animal;
labuladuo instanceof Dog;

```
其中，super() 关键字作用类似构造器的继承
A.prototype.constructor.call(this)（还是js的原始继承方式）
super()先用父类的constructor生成自己的constructor
然后之后再声明this.color = color,才有了自己的constructor
```
super.x = '子类super赋值等同于给this赋值';

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}
```
就像原型链继承，如果在A.prototype = new B()之前扩展prototype
都会被new B()覆盖，用法很相似都需要先声明，但是实质不同。

- super 关键字作为对象使用
super 在子类中super() 之后，可以认为super本身是一个对象，指向父类的prototype
```
super.height === Animal.prototype.height  // true
```
`super`代表了但是不等于Animal父类的`prototype`。
所以在子类中通过super.generateAnimal()的方式可以调用父类原型上的方法。
- `super` 不能访问子类或者父类constructor的实例属性。
- `super` 不能无姿势的使用; super有两种默认属性，作为函数和作为对象，但是必须隐式的指明，否则会有报错。

- super 如果用在static静态方法中，会继承父类的静态方法，如下：
```
class Animal {
    static myDog (dog) {
        console.log('static function: ', dog);
    }
    myDog (dog) {
        console.log('instance function: ', dog);
    }
}
class Dog extends Animal {
    static myDog (dog) {
        super.myDog(dog)
    }
}
Dog.myDog('labuladuo');  // static function: labuladuo

```

### 2.5 类的prototype和__proto__

- 关于js 继承的原型链
1） 子类`__proto__`指向父类，表示构造函数的继承
2） 子类`prototype`的`__proto__`指向父类的`prototype`，表示方法的继承
举个例子
```
class A {}
class B extends A {}
B.__proto__ === A // true
b.prototype.__proto__ === A.prototype  // true
```

### 2.6 原生构造函数的继承

原生的构造函数包括：9种
```
Boolean
String
Number
Array
RegExp
Date
Error
Object
Function
```
创建Error对象的扩展
```
class ExtendError extends Error {
    constructor (message) {
        super();
        this.name = this.constructor.name;
        this.message = message;
        this.stack = (new Error()).stack;
    }
}   

var myError = new ExtendError('12');
myError.message; // '12'
myError instanceof Error;  // true 
myError.stack;  
// "Error
//     at new ExtendError (<anonymous>:6:23)
//     at <anonymous>:10:15"
```
扩展工具库（自定义工具库），比如将DOM节点对象作为参数，将节点操作方法作为继承的父类
进行节点工具库扩展。

