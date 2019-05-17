
#### 动画插件

bg-particle-canvas 

背景效果，点线互联自由移动的方式展示
```
var options = {
      particleColor: "#72adef",
      background: "#f0f2f5",
      interactive: false,
      speed: "slow",
      density: "low"
    };

var particleCanvas = new ParticleNetwork(
    document.getElementById("bg-particle-canvas"),
    options
);

// dom结构
<div className={styles.canvasStyles}>
    <div id="bg-particle-canvas" />
</div>

```