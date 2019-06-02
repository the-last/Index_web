var dd = {
    a: 90,
    get view() {
        console.log(this.a);
        return this.a++;
    }
}
var cc = void dd.view // 90  void 会执行计算， 但是不会赋值。
console.log(cc);      // undefined，会执行，但是不会返回值。
console.log(dd.a);    // 91  执行了计算。

var a,b,c;
a = void ( b = 1, c = 2 );
console.log(a); // undefined
console.log(b); // 1
console.log(c); // 2
