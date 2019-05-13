/**
 * 使一个对象转化成可观测对象
 * @param { Object } obj 对象
 * @param { String } key 对象的key
 * @param { Any }    val 对象的某个key的值
 * 
 */
function defineReactive (obj, key, val) {
    Object.defineProperty(obj, key, {
        get () {
            
            console.log(`我的${key}属性被读取了！`)
            return val
        },
        set (newVal) {
            
            console.log(`我的${key}属性被修改了！`)
            val = newVal
        }
    })
}

/**
 * 把一个对象的每一项都转化成可观测对象
 * @param { Object } obj 对象
 */
function observable (obj) {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
        defineReactive(obj, key, obj[key])
    });
    return obj
}


