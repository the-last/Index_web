#### 拖拽
需要浏览器支持

#### 拖拽目标区域响应事件

**dataTransfer.getData() 只在 ondrop 中可以用**
```
// 元素放置目标区域，进入目标区域触发 ondragenter 事件
ondragenter()

// 进入目标区域后触发 ondragover 事件，会一直响应over事件不会触发ondrag
ondragover = function(e) {
    e.preventDefault();
}

// 元素放置目标区域，离开目标区域触发 ondragleave 事件
ondragleave()

// 元素放置目标区域，鼠标弹起触发 ondrop 事件
ondrop = function(e) {
    // 从开始触发时 dataTransfer.setData() 获取储存的数据
    // 获取dataTransfer.getData() 其他回调事件无法获取 getData()
    this.append(document.getElementById(e.dataTransfer.getData('item')));
}
```

#### 拖拽元素对象方法
##### setData(format, data)
将指定格式的数据赋值给dataTransfer对象，参数format定义数据的格式也就是数据的类型，data为待赋值的数据
```
e.dataTransfer.setData("text/plain", ev.target.id);
e.dataTransfer.setData("text/html", "<p>Example paragraph</p>");
e.dataTransfer.setData("text/uri-list", "http://developer.mozilla.org");
```
##### getData(format)
从dataTransfer对象中获取指定格式的数据，format代表数据格式，data为数据。
##### clearData([format])
从dataTransfer对象中删除指定格式的数据，参数可选，若不给出，则为删除对象中所有的数据。
##### addElement(element)
添加自定义图标
##### setDragImage(element,x,y)
设置拖放操作的自定义图标。其中element设置自定义图标，x设置图标与鼠标在水平方向上的距离，y设置图标与鼠标在垂直方向上的距离。

#### 拖拽元素对象属性
##### dropEffect
设置或返回拖放**目标区域**上允许发生的拖放行为。
如果此处设置的拖放行为不再effectAllowed属性设置的多种拖放行为之内，拖放操作将会失败。
该属性值只允许为 null、copy、link、move
none：不能把拖动的元素放在这里。这是除了文本框之外所有元素默认的值。
move：把拖动的元素移动到放置目标。
copy：把拖动的元素复制到放置目标。
link：放置目标会打开拖动的元素(但拖动的元素必须是个链接URL地址)。

##### effectAllowed
设置或返回**被拖拽元素**允许发生的拖动行为。
该属性值可设为none、copy、copyLink、copyMove、link、linkMove、move、all和uninitialized。
items:该属性返回DataTransferItems对象，该对象代表拖动数据。
types:该属性返回一个DOMStringList对象，该对象包括了存入dataTransfer中数据的所有类型。

