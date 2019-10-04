# coding=UTF-8

# in 检查指定元素，是否存在于指定列表中 True or False
my_list = ['hello', 'world']
print 'hello' in my_list   # True

# not in
my_list = ['hello', 'world']
print 'wahaha' not in my_list   # True

# + 拼接列表
my_list = [1,2,3] + [4,5,6]
print my_list  # [1,2,3,4,5,6]  拼接

# * 翻倍，重复列表的元素
my_list = [1,2,3] * 2
print my_list  # [1,2,3,1,2,3]  重复  和string 一样

# len() 获取长度
print len(my_list)  # 6

# min max 获取元素中最大小值，string类型，number类型
my_list = ['hello', 'award']
print min(my_list), max(my_list) # award hello 单词也可以判断，依据是 unicode 码


# index() count() list的方法，和函数的区别是，方法必须通过 object.index 在对象上访问。

# index() 获取指定元素在列表中，第一次出现时的索引。
print my_list.index('award')    # 1
#print my_list.index('9')    # ValueError '9' is not in list，所以，要先判断有没有再获取索引吗？

# index() 第二个参数，表示查找的 起始索引位置。第三个参数，表示查找的结束索引位置。
my_list = [1,2,2,5,6,2,2,1,6]
print my_list.index(2, 2, 5) # 2   从索引 2 的位置开始到索引5的位置之前，找到符合的返回索引值
# 如果在指定返回内找不到则报错： ValueError: 2 is not in list


# count() 统计元素出现的次数，区分类型。
print my_list.count(2)






