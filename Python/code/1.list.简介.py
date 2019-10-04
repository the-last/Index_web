# -*- coding:UTF-8 -*-

# 创建列表，用 [] 来创建列表。

# 这里就创建了一个list 空list
my_list = []  
print(my_list, type(my_list));  # ([], <type 'list'>)

# 列表中存的数据，称为元素。 所以元素就是列表中所存储 的数据。
my_list = [10,20,30,40,50]

# 列表中可以存储不同类型的对象
# 数据有序, 有范围
my_list = [10, 'hi', True, None, [1,2,3]]
print(my_list[0]);    # 10
print(my_list[4]);    # [1,2,3] 如果索引是 5 list index outof range, 报 IndexError。 js不同，js报 undefined。


# 长度
# len() 函数，获取列表长度，也是list中元素的个数
print('my_list length is: ',len(my_list));



