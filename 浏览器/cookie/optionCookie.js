
;(function (global) {
    "use strict"
    var cookieoption = {
      isObject: function (obj) {
        if (typeof obj != 'object') {
          conosle.log('请输入对象');
          return false;
        }
        var indexArr = [];
        if (!obj.name) {
          console.log('cookie名称为空');
          return false;
        }
        Object.keys(obj).forEach(function (item) {
          indexArr.push(item);
        });
        if (indexArr.length > 5) {
          console.log('有效参数为: name,value,duration,domain,path');
          return false;
        };
        return true;
      },
      set: function (option) {
        var name   = option.name;
        var val    = option.value;
        var dur    = option.duration ? option.duration : 1;
        var domain = option.domain;
        var path   = option.path;
        var expires;
  
        var d = new Date;
        d.setTime(d.getTime() + 1e3 * 60 * 60 * 24 * dur);
  
        val     = name + "=" + val;
        expires = "; expires=" + d.toGMTString();
        domain  = domain ? domain : window.location.hostname;
        domain  = "; domain=" + domain;
        path    = "; path=/";
  
        console.log(val + expires + path);
        document.cookie = val + expires + domain + path;
      },
      get: function (param) {
        var isobjt = this.isObject(param);
        if (!isobjt) {
          throw new Error('请输入一个对象');
        }
        var keyword = param.name;
        var keyvalue = null;
        var arr = document.cookie.toString().split(';');
        var item, k, v;
        arr.forEach(function (value, index , array) {
          item = value.toString().split('=');
          k = item[0].trim();
          v = item[1];
          if (k == keyword) {
            keyvalue = v;
          }
        })
        return keyvalue;
      },
      delete: function (opt) {
        var isobjt = this.isObject(opt);
        if (!isobjt) {
          throw new Error('请输入一个对象');
        }
        var isHave = this.get(opt);
        if (isHave) {
          var keyword = opt.name, k;
          var arr = document.cookie.toString().split(';');
          var len = arr.length;
          for (var i=0; i< len; i++){
            k = arr[i].split('=')[0];
            k = k.trim();
            if (k == keyword) {
              opt.duration = -1;
              this.set(opt);
              if (this.get(opt)) {
                throw new Error ("属于内部cookie操作请输入domain，或会造成用户信息丢失");
              } else {
                console.log('delete cookie finish');
              }
              break;
            }
          }
        } else {
          throw new Error('key is not exist');
        }
      },
      modify: function (param) {
        var isobjt = this.isObject(param);
        if (!isobjt) {
          throw new Error('请输入一个对象');
        }
        var isHave = this.get(param);
        if (!isHave) {
          throw new Error('key is not exist');
          return;
        } else {
          this.set(param)
        }
      },
      add: function (param) {
        var isobjt = this.isObject(param);
        if (!isobjt) {
          throw new Error('请输入一个对象');
        }
        var isHave = this.get(param);
        console.log(isHave);
        if (isHave) {
          throw new Error('key is exist');
          return;
        } else if (typeof param.value === 'undefined') {
          throw new Error('未输入value');
        } else {
          this.set(param);
        }
      }
    };
    if (!global.cookie) {
      global.cookie = cookieoption;
    } else {
      global.cke = cookieoption;
    }
  })(window);
  