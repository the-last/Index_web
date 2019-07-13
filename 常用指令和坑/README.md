## Nginx 启动重启
```
进入安装路径  cd /usr/local/Cellar/nginx/1.13.10bin 
启动 sudo ./nginx
重启 sudo ./nginx -s reload
判断配置文件是否正确 sudo ./nginx -t

nginx停止
查找nginx进程号  ps -ef|grep nginx
正常停止   sudo kill -QUIT 主进程号
快速停止   sudo kill -TERM 主进程号

快速停止命令  sudo nginx -s stop
平稳退出命令  sudo nginx -s quit
重新打开命令  sudo nginx -s reopen

```

## Mac  进程已完成

1、终端机——偏好设定——Shell的打开方式
2、点“命令”，然后输入/bin/sh
3、重新打开

如果不行，
先回归原始设定
1、右键Dock上的终端机——新建命令
2、输入/bin/bash -x，然后重新打开终端
3、偏好设定，打开方式再次设定为命令，/bin/sh
4、再次打开终端
5、输入vi /Users/<your_user>/.bash_profile
6、删除这个文件里面的一些指令，也就是你在步骤2中看到的指令
7、偏好设定，打开方式修改为/bin/bash
8、重新打开。

