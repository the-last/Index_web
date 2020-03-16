
// 定义存储

let toProxy = new WeakMap();   // 根据原始 查询响应后的值
let toRaw = new WeakMap();     // 根据响应后的 查询原始值    . 双向的缓存

// 重点是加上 依赖监听 和 触发  的逻辑
const baseHandler = {
    get(target, key){
        const res = Reflect.get(target, key)

        // 收集依赖
        track(target, key)

        return typeof res === 'object' ? reactive(res) : res   // 返回的是值
    },
    set(target, key, value) {
        const info = { oldValue: target[key], newValue: value }
        const res = Reflect.set(target, key, value)

        // set修改值开始一个 触发更新的操作
        trigger(target, key, info )

        return res
    }
}

function trigger (target, key, info) {
    // 触发更新
    const depsMap = targetMap.get(target);
    if (depsMap === undefined) {
        return 
    }
    const effects = new Set()
    const computedRunners = new Set()
    if (key) {
        let deps = depsMap.get(key);
        deps.forEach(effect => {
            if (effect.computed) {
                computedRunners.add(effect)
            } else {
                effects.add(effect)
            }
            
        })

        effects.forEach(effect => effect())
        computedRunners.forEach(effect => effect())
    }
}

function reactive(target) {
    // 查询是否是 原始值，是原始值返回它响应后的值
    let observed = toProxy.get(target)
    if (observed) {
        return observed
    }

    // 判断是否是响应过的值
    if (toRaw.get(target)) {
        return target
    }
 
    observed = new Proxy(target, baseHandler)

    toProxy.set(target, observed)
    toRaw.set(observed, target)

    return observed;

}

// 存储 effect
let effectStack = [];       // 实际存储
const targetMap = new WeakMap();  // 用于 查缓存

function track(target, key) {
    let effect = effectStack[effectStack.length-1];

    // 如果有依赖说明有依赖需要查询
    if (effect) {
        let depsMap = targetMap.get(target)

        if (depsMap === undefined) {
            depsMap = new Map()
            targetMap.set(target, depsMap)
        }

        let dep = depsMap.get(key)
        if (dep === undefined) {
            dep = new Set()
            depsMap.set(key, dep)
        }

        if (!dep.has(effect)) {
            dep.add(effect)
            effect.deps.push(dep)
        }
    }

}


function effect (fn, options={}) {



    let e = createReactiveEffect(fn, options)

    if (!options.lazy) {
        e()
    }
    
    
    return e;
}


function createReactiveEffect(fn, options) {

    const effect = function effect(...args) {
        run(effect, fn, args)
    }
    effect.deps = []

    effect.computed = options.computed
    effect.lazy = options.lazy
    return effect
}

function run (effect, fn, args) {

    if (effectStack.indexOf(effect) === -1) {
        try {
            effectStack.push(effect)
            return fn(...args)
        }

        finally {
            effectStack.pop()
        }
    }
}

function computed (fn) {
    
    const runner = effect(fn, {computed: true, lazy: true})

    return {
        effect: runner,
        get () {
            return runner()
        }
    }
}

// 为什么能做到 有依赖的才会被触发呢。
// 那是因为 对象在 reactive 初始化的时候的，已经被设置成了可被观察的，observed形式。
// 这样的话，只要是有读取 对象中包含的属性的值 的情况就会触发一次 track 追踪。
// 追踪会执行 effect 函数数组缓存的检查。
// 如果现在有 effect 声明，那 effect函数数组就不为空，就把这个函数写到 effect 缓存数组中
// 这样的话，之后再去修改被 observed 过的对象的值时，就会触发对应的 set函数中的 trigger 函数
// trigger 函数回去检查 effect 的缓存数组，如果有就执行。
// 从而，完整实现了，有依赖才回去响应的目的。