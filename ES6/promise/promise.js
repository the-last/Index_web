
/**
 * 
 * @handle func Promise对象的唯一传参
 */

const isFunction = function (func) {
    return func && typeof func === 'function'
}
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor (handle) {
        if (!isFunction(handle)) {
            throw Error('must accept a function')
        }
        this._status = PENDING
        this._value = undefined
        this._fulfilledQueues = []
        this._rejectedQueues = []
        try {
            handle(this._resolve.bind(this), this._reject.bind(this));
                    } catch (err) {
            this._reject(err)
        }
    }

    _resolve (val) {
        const run = () => {
            
            if (this._status !== PENDING) return;
            this._status = FULFILLED

            const runFulfilled = (value) => {
                let cb;

                while (cb = this._fulfilledQueues.shift()) {
                    cb(value)
                }
            }
            const runRejected = (error) => {
                
                let cb;
                while(cb = this._rejectedQueues.shift()) {
                    
                    cb(error)
                }
            }

            if (val instanceof MyPromise) {
                
                val.then(value => {
                    
                    this._value = value
                    runFulfilled(value)
                }, err => {
                    
                    this._value = err
                    runRejected(err)
                })
            } else {
                
                this._value = val
                runFulfilled(val)
            }
        }
        // 当前脚本所有同步任务执行完才会执行，所以resolved最后输出。
        setTimeout(run, 0);
    }

    _reject (err) {
        if (this._status !== PENDING) return
        
        const run = () => {
            this._status = REJECTED
            this._value = err
            let cb
            
            while(cb = this._rejectedQueues.shift()) {
                
                cb(err)
            }
        }
        // 当前脚本所有同步任务执行完成之后执行，所有resolved最后输出
        setTimeout(run, 0)
    }

    then(onFulfilled, onRejected) {
        
        const { _value, _status } = this;
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            
            let fulfilled = value => {
                
                try {
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(value)
                        
                    } else {
                        
                        let res = onFulfilled(value);
                        
                        if (res instanceof MyPromise) {
                            
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    
                    onRejectedNext(err)
                }
            }

            let rejected = error => {
                
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(error)
                        
                    } else {
                        
                        let res = onRejected(error);
                        if (res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                            
                        } else {
                            onFulfilledNext(res)
                            
                        }
                    }
                } catch (err) {
                    onRejectedNext(err)
                    
                }
            }
            
            switch (_status) {
                case PENDING:
                    
                    this._fulfilledQueues.push(fulfilled)
                    this._rejectedQueues.push(rejected)
                    break;
                case FULFILLED:
                    
                    fulfilled(_value)
                    break;
                case REJECTED:
                    
                    rejected(_value)
                    break;
            }
        })
    }

    catch (onRejected) {
        
        return this.then(undefined, onRejected)
    }

    static resolve (value) {
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }

    static reject (value) {
        return new MyPromise((resolve, reject) => reject(value))
    }

    static all (list) {
        return new MyPromise((resolve, reject) => {
            let values = []
            let count = 0

            for (let [i, p] of list.entries()) {
                this.resolve(p).then(val => {
                    values[i] = val;
                    count++

                    if (count === list.length) {
                        resolve(values)
                    }
                }, err => {
                    reject(err)
                })
            }
        })
    }

    static race (list) {
        return new MyPromise((resolve, reject) => {
            for (let p of list) {
                this.resolve(p).then(val => {
                    resolve(val)
                }, err => {
                    reject(err)
                })
            }
        })
    }

    static finally (cb) {
        return this.then(
            value => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => { throw reason })
        )
    }

    static done (onFulfilled, onRejected) {
        return this.then(onFulfilled, onRejected).catch(reason => {
            setTimeout(()=> {
                throw reason
            }, 0)
        })
    }
}

