## 居中
- 1 margin auto，text-align center
```
.outer1 {
    margin: auto;
    display: table;
    width: 800px;
    height: 500px;
    text-align: center;
}
.inner1 {
    display: table-cell;
    width: 50px;
    height: 50px;
    vertical-align: middle;
}
```

- 2 display flex align-items justify-content
```
.outer2 {
    display: flex;
    width: 100%;
    height: 500px;
    align-items: center;      /*垂直*/
    justify-content: center;  /*水平*/
    text-align: center;
    background-color: rgba(109, 192, 189, 0.5);
}
.inner2 {
    display: inline-block;
    width: 100px;
    height: 100px;
}

```

- 3 position relative float left margin-left 一半

- 4 百分比定位，定位百分比transform
```
.outer3 {
    position: relative;
    width: 100%;
    height: 500px;
    text-align: center;
    background-color: rgba(189, 192, 109, 0.5);
}
.inner3 {
    position: absolute;
    width: 200px;
    height: 50px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

```

## transform 居中会比 margin-left 好么
transform 的官方的定义是，允许旋转、平移、缩放、倾斜已知元素  <br />

### 1 浏览器渲染引擎主要做了什么
渲染主要包括：解析html、重计算style、布局、绘制、查找计算样式、排布、图片解码、合并图层等 像ps最终有多个图层合并得出 <br />

### 2 transform原理
 transform 通过创建一个渲染合成层，拥有独立的绘图层 <br />
 每个图表层有一个独立的绘图环境，对应的渲染层会进入绘图层 <br />
 合成器最终将 **绘图环境输出的位图合并成屏幕展示的图案** <br />

以下条件会出现独立的合成层：
- 3D 、 transform属性
- video 标签
- canvas 标签
- flash 
- opacity、transform 添加CSS动画
- filters 滤镜
- 合成层的后代层
- 与合成层重叠，且在该合成层上面z-index
是合成层，就会有独立的渲染层，否则和最近的渲染层公用 <br />
**在独立的渲染层不会引起页面的重绘！**

### 3 GPU原理
合成器会负责将页面绘制为最后的图案， 在硬件上GPU起到加速Render的作用，由GPU负责 <br />
在浏览器多进程模型中，有一个专门的进程传递 Render 进程的命令称为GPU进程 <br />
Render 进程和GPU进程 可以共享内存传递参数。 <br />
Render进程 迅速的将render指令返回给CPU， **Render --> CPU** <br />
CPU 密集的render活动返回给GPU执行，因此有GPU的渲染会更快  **CPU --> GPU** <br />
transform局限性是 **占用的内存可能会越来越多**

### margin-left
margin-left会**改变 render tree 的结构**因此会引起layout重绘，transform不会。






