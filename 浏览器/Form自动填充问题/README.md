### 1，浏览器在什么情况下会提供历史预选功能？

表单项有name值或者id值 ，会提供预选项 <br>
name值或id值重复时，预选项会合并 <br>
form的id或name重名时，预选项会按照记录提供，也就是两个表单重名，一个提交过，另一个也可以用历史预选项功能 <br>
多个form时，可以按照forms数组顺序访问表单。 <br>


### 2，阻止默认提交和获取表单值

* 两种阻止默认提交的写法：
    * 1，onsubmit回调事件 或 input/button 按钮的type改为 submit并按钮添加点击事件
    *    函数在调用时传入event，在函数执行中，加上 event.preventDedault ()
    * 
    * 2，在 onsubmit回调函数中写上 "return getForm()"
* 在对应的回调函数中返回bool值，如果为false不执行默认的提交。
    * 
    * 获取表单的值方式：
    *    document.forms[0]["name值"].value
    *    document.forms[0]["id值"].value