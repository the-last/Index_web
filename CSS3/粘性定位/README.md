## position: sticky;  粘性定位
### 介绍
css3中新的定位属性，本身也具有定位元素的属性 <br />
相对于试图固定定位( fixed )、相对定位的混合体( relative )，z-index 有效，内部是定位空间 <br />

```
.nav {
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    bottom: 0px;
}
```
### 生效条件
#### - 1 父元素不能 overflow: hidden 或者 overflow: auto; 
#### - 2 父元素高度 不能低于sticky元素的高度 否则会看不到粘滞效果
#### - 3 必须制定一个方向属性值 top bottom left right 中的一个
#### - 4 sticky 元素仅在父元素内生效

