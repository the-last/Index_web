# coding=UTF-8
# 判断是否是质数，被1 和 它本身整除的数，就是质数。

num = int(input('请输入一个大于1的整数：'));

# 首先获取所有可能的因数
i = 2
prime = False;
while i < num:
    # 能否被 i整除
    if num % i == 0:
        prime = True;
    i += 1

if prime:
    print num, 'is prime'
else:
    print num, 'is not prime'