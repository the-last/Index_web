## 栅格布局
### 布局方式
- 二维布局（flex是一维布局）<br ><br >
### 定制行列
- 指定行数和列数，指定列宽的大小或占比<br ><br >
- 重复 repeat(3, 33%)<br ><br >
### 定制单项的行列
- 设定范围 指定区域<br ><br >
```
// 块的行列坐标，以边线所在下标作为位置计算
.item {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
}
// 占据划分后的两个块大小
.item-span {
    grid-column-start: span 2;
}

```
### 内部margin只有左 和 上 <br ><br >

### 布局选项
- 支持列和行两个方向的同等 flex 属性 <br ><br >
- justify-item 水平布局方式 <br ><br >
- align-item 垂直布局方式 <br ><br >
- place-item 是 < **align-item** > < justify-item > 的合并写法 <br ><br >
- item的取值范围：**start | end | center | stretch | space-around | space-between | space-evenly;** <br ><br >
- *evenly 均匀平均* <br ><br >






