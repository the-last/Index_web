# coding=UTF-8

import json;
# 切片，对list操作
# 从现有列表，获取一个子列表

students = ['a', 'b', 'c', 'd', 'e', 'f']

# 列表中的索引可以是 负数，js中返回undefined、
# 如果列表中的索引是负数，最后一个元素索引是 -1，以此类推
print students[-2];  # e

# 获取某一段元素，返回新列表
# 语法 [起始:结束:步长]
# 返回的元素包括起始位置，不包括结束位置。
# 步长可以省略，每次获取元素的间隔。

partofstudents = students[0:2]
print 'new list: ', partofstudents, type(partofstudents) # ['a','b'] <type 'list'>
print 'old list: ', students                             # ['a', 'b', 'c', 'd', 'e', 'f']
# 原来的列表不影响！

# 省略结束位置，会截取到最后一个元素
print students[1:]

# 省略开始，会从第一个开始到结束的位置
print students[:3]

# 省略，开始/结束，的索引，会返回原来列表的副本，嗯？有深拷贝的概念吗？
print students[:]

# 默认步长是1
print 'space 1:', students[::1]

# 步长为 2
print 'space 2:', students[::2]

# 步长 不能是0
# ValueError slice step cannot be zero
# 可以是 负数
print 'space -1', students[::-1]  # 列表的逆序 ['f', 'e', 'd', 'c', 'b', 'a']
print 'space -2', students[::-2]  # 列表逆序的间隔取值 ['f', 'd', 'b']









