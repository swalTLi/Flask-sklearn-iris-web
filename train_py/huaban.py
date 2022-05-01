"""
观察鸢尾花花瓣长度和宽度的关系
"""
import numpy as np
import matplotlib.pyplot as plt

plt.switch_backend("TkAgg")

x = np.load("iris.npz")["data"]
d = np.load("iris.npz")["target"]

# 分别取出花瓣长度和宽度的属性值
x1 = x[:, 0]
x2 = x[:, 1]

# 以花瓣长度为横坐标, 宽度为纵坐标, 属性 d区分鸢尾花不同的种类
plt.scatter(x1, x2, c=d)
# plt.show()
print(plt)
