
#### 搭建代理福利
### 搭建服务端
购买一台vps  https://cloud.ramnode.com
登录到这台vps
```
sudo apt update
sudo apt install shadowsocks-libev
```
安装代理的服务端 <br>

到这个路径下创建 config配置文件 <br >
配置代理服务器的 端口、密码、协议。 <br >
```

sudo vim /etc/shadowsocks-libev/config.json
sudo systemctl start shadowsocks-libev

```
还有其他配置可以在 [这里查看](https://github.com/shadowsocks/shadowsocks-libev 'ss-server') <br>

检查服务是否已启动 <br>
```
ps -ef | grep ss-server
```

### 搭建客户端
[客户端安装](https://github.com/shadowsocks/ShadowsocksX-NG/releases/ 'ss-client') <br>

下载最新版本的.zip文件 安装dmg <br >
安装完成 <br >
右键应用修改配置 <br>
点击添加服务器 <br >
输入服务器地址、端口号、密码、加密协议，完成 <br>
尝试连接到Google，完成。<br >

### 查看IP地址
[ipip.net](https://en.ipip.net/ip.html)