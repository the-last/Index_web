## Float 浮动

### 于此相关 会形成BFC的情况
- 浮动元素，**float 除 none**以外的值 <br >
- 绝对定位元素，**position为absolute/fixed**。<br >

- display为以下其中之一的值**inline-blocks，table，table-cell，table-caption**。<br >
- overflow除了visible以外的值（**hidden，auto，scroll**）。<br >

- **fieldset元素**<br >

**display: flow-root;**
在浮动元素父级display属性设置为 **flow-root** <br >
还是会受到定位属性的影响。 <br >

```
// 清理浮动
.parent {
    overflow: scroll; // hidden;
    clear: both;
}

// 浮动兼容性处理
.wrapper{
    display: flow-root;
} 
@supports not (display:flow-root) {
    .wrapper::after {
        content: '';
        display: table;
        clear:both;
    }

}
```

## 模型表现 display

- flow-root <br> 
```
It always establishes a new block formatting context for its contents.
官方解释display设置为这个属性会得到一个BFC空间，空间内类似一个Block块。
```

- table-caption <br >
作为表格的标题显示，不常见**比较常用**， 可以和 **caption-side: bottom** 定义特殊性的排版！。<br >


- contents <br >
**display: contents样式规则使div元素不产生任何边界框** <br >
标签**背景、padding、margin、border部分**都不会渲染，字体和颜色属性会基础！ <br >


##  inline-block 会出现不同大小间隙的问题
### 产生原因
inline-blcok块之间的不可见符号会被保留父层字体的1/3大小的空间 <br >
### 解决办法大概有5中：
- 父级font-size设置为0
- float浮动
- margin  设置负值 -.3333em
- 标签书写方式不分行
- letter-spacing: 设置负值 -.3333em;
