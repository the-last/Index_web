var dd = {
    a: 90,
    get view() {
        console.log(this.a);
        return this.a++;
    }
}
var cc = void dd.view // 90  void 会执行计算
cc // undefined
dd.a // 91 