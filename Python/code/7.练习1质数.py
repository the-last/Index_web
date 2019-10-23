# coding=UTF-8
# 判断是否是质数，被1 和 它本身整除的数，就是质数。
# 引入模块，可以对Python扩展，比如 time函数

from time import *
begin = time()
print begin

num2 = int(input('请输入一个整数'))

# 第一次优化在while 循环加break，找到一个引子就break了
# 第二次优化，减少while 循环的次数，比如37，没必要把37之前的所有数都去整除37来判断是质数，比较到37**0.5就能证明37是质数。
# 36是合数
# 因子有：
# 2 18
# 3 12
# 4 9 
# 6 6
# 
i1 = 2
while i1 < num2:
    flag = True
    j = 2
    while j <= i1 ** 0.5:
        if i1 % j == 0:
            flag = False
            break
        j += 1
    if flag:
        print i1
    i1 += 1
else:
    print i1

end = time()
print end
print end - begin
