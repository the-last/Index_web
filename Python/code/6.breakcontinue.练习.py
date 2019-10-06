# -*- coding:UTF-8 -*-

# break 可以用来立即退出循环语句（包括else） 只对就近的循环起作用

# continue 跳过当前循环      只对就近的循环起作用

# pass 用来在判断或循环语句中站位？？
# while 和 else 可以是一对。


i = 0
while i < 5:
    if i == 3:
        break
    print i
    i += 1
else :
    print 'loop over'

i = 0
while i < 5:
    i += 1
    if i == 2:
        continue
    print i
else :
    print 'loop over.'