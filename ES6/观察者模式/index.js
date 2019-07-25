


/** 
 * 通知 触发回调
 * 当一个对象发生改变时，所有依赖于他的对象都会受到通知。
 * */  


class NotificationCenter {
    constructor() {
        this.watchers = {}
    }

    subscribe(key, method) {
        this.watchers[key] = method;
    }

    broadcast(key) {
        if (key && this.watchers[key] && typeof this.watchers[key] === 'function') {
            this.watchers[key]();
        } else {
            Object.keys(this.watchers).forEach((v, i) => {
                let func = this.watchers[v]
                if (typeof func === 'function') {
                    func();
                }
            });
        }
    }
}
let commander = new NotificationCenter();
commander.subscribe('淡定', () => {console.log('您选中了幸福')});
commander.subscribe('暴躁', () => {console.log('您选中犯傻，苦海无边回头是岸')});

commander.broadcast();

/**
 * 观察者 模式
 * 
 * 可以理解为 被观察的目标为中心
 * 
 * */

class Subject {
    constructor() {
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

class Observer {
    update() {
        console.log('触发更新');
    }
}

let subject = new Subject();
let ob = new Observer();

subject.addSub(ob);
subject.notify();


/**
 * 订阅发布
 * 借助管道，重点不是观察目标
 * 是消息传递
 * 
 * 。
 *  */

var pubsub = (()=>{
    var topics = {};
    function subscribe(topic,fn){
      if(!topics[topic]){
        topics[topic] = [];  
      }
      topics[topic].push(fn);
    }
    function publish(topic,...args){
      if(!topics[topic])
        return;
      for(let fn of topics[topic]){
        fn(...args);  
      }
    }
    return {
        subscribe,
        publish
    }
})();

pubsub.subscribe('懒惰', () => {console.log('是不会涨工资的')});
pubsub.publish('懒惰')