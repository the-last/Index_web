## 1 开启数据库
```
var openRequest = indexedDB.open("person", 1); //数据库名称 版本号有默认
```

## 2 操作数据库 新建表
新建数据库表，或者修改已有的数据库表， onupgradeneeded api提供必要的更新或者新建表（存储对象） <br >
```
openRequest.onupgradeneeded = function (e) {
    var thisDB = e.target.result;
    if(!thisDB.objectStoreNames.contains("people")) {
        
        // 新建对象存储，相当于表，可以按照某个属性做为key,比如id
        var os = thisDB.createObjectStore("people", { autoIncrement:true });

        // 新增索引，相当于列属性
        os.createIndex("name", "name", {unique:false});
        os.createIndex("email", "email", {unique:true});

    }
}
```
## 3 插入数据
设置对表的只读（readonly）或者 读写（readwrite）权限， 以权限定义事务，然后按照表名获取 *objectStore*，最后调用add方法，add方法会返回对象，可以监听新增一条数据的情况。<br >
```
var transaction = db.transaction(["people"],"readwrite");
//创建事务，指定表格对象
var store = transaction.objectStore("people");

// 如果在创建表对象，设置了keyPath，此处需要指定 keyPath值
var person = {
    name:name,
    email:email,
    created:new Date()
}

// 新增一条数据，会返回一个执行结果的对象
var request = store.add(person);
```

## 4 查找数据
查找的方式有多种，按字段查找，按范围查找，按关键字查找 <br >

```
var transaction = db.transaction(["people"],"readonly");
var store = transaction.objectStore("people");
var index = store.index("name");  // 按照关键字查找
index.get('thelast'); // 获取条件查找的具体条目
```