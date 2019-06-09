## 弹性盒子模型 Flex 布局

## 1 弹性布局
Flexible Box ”弹性布局”，弹性盒子模型提供布局最大灵活性。

## 2 父级Flex属性
### 2.1 flex-direction
表示布局的方向，子项目的排列方向。
```
row          // 横向从左向右
row-reverse  // 横向从右向左
column       // 纵向从上向下
column       // 纵向从下向上
```

### 2.2 flex-wrap
表示子项目是否会换行，默认换行。
```
nowrap       // 不换行
wrap         // 换行
wrap-reverse // 换行、逆序
```

### 2.3 justify-content (水平对齐方式)
子项目在水平方向上的对齐方式。 5种
```
flex-start	  // 默认值。位于开头
flex-end	  // 位于结尾
center	      // 位于中心
space-between // 子项目间相同空白，边框无间距
space-around  // 子项目两边间距相同，子项目间间距相同，子项目到边框间距是项目间间距的 1/2

```

### 2.4 align-item (垂直对齐方式)
子项目在垂直方向上的对齐方式。 5种
```
stretch	           // 默认值、 元素被拉伸 适应父容器，如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制
center	           // 位于中心。 如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度 !
flex-start	       // 位于开头
flex-end	       // 位于结尾
baseline	       // 以基线对齐  行内轴，侧轴重合时和flex-start一致

```

### 2.5 align-content (轴对齐方式)
多轴线之间的对齐方式，轴之间的对齐方式。 单轴无效
```
stretch	          // 默认值, 拉伸以适应容器。各行将会伸展以占用剩余的空间，剩余空间是负数，等效于'flex-start'
center	          // 位于中心，以横轴为对齐单元，如果剩下的空间是负数，则各行会向两个方向溢出的相等距离 ！
flex-start	      // 位于开头
flex-end	      // 位于结尾
space-between	  // 行之间相同空白，紧贴边框
space-around      // 行之间相同空白，到边框保留距离，是其他空间的一半
```

## 3 子元素属性

### 3.1 order
定义排列顺序，数值越小排列越靠前，必须是整数可以为负数，不能是小数。 默认值是 0 <br />

### 3.2 flex-basis
该属性可以给元素设置一个基准的宽度值，会占用父级盒子模型的至少这个宽度 <br />
其他盒子模型宽度会在父级宽度**减去flex-basis后**，再进行**flex-grow**宽度计算 <br />

### 3.3 flex-grow 
盒子模型的扩展比率会按照**flex-grow**计算，默认是0，不进行扩展宽度会自适应 <br />

### 3.4 flex-shrink
默认值为1，依次按照默认值1计算所在因子相加后，计算压缩比率来进行空间压缩 <br />
**举个栗子**
```
#content {
    display: flex;
    width:   500px;
}
#content div {
    flex-basis: 120px;
}
.box {
    flex-shrink: 1;
}
.box1 {
    flex-shrink: 2;
}
// 3个box  2个box1  总宽500  120 *（ 3 + 2 * 2 ）= 600
```
完事发现超出100px！ <br />
需要其他盒子模型割舍一部分空间用来消化100px。 <br />
100 * 3 + 100 * （2 + 2） = 700  <br />
所以第一个box的shrink的压缩值为： 100 / 700 * 100 = 14.29 px  剩余120 - 14.29 = 105.21px <br />

### 3.5 flex
flex 属性是 flex-grow flex-shrink flex-basis 简写 <br />
```
flex: auto | initial | none | 2 ;    // 为auto的盒子，会均分没有flex属性盒子模型之外的盒子均分
flex: 2 | 2px ;                      // 无单位表示 flex-grow, 有单位表示 flex-basis .
flex: 1 30px | 2 2 ;                 // flex-grow flex-basis || flex-grow flex-shrink .
flex: 2 2 20% ;                      // flex-grow flex-shrink flex-basis .

```

### 3.6 align-self
定义flex单项，在侧轴(纵轴)方向上的对齐方式，独立于侧轴对齐方式 <br />
```
取值情况 ：
normal stretch ; 撑开
center         ; 居中
flex-end flex-start left right start end ; 各种正常取值
baseline       ; 基线
```
