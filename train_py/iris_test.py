from click import Path
import collections
import json
import numpy as np
from collections import defaultdict
import matplotlib.pyplot as plt
from collections import Counter

from pandas import array


def init_data():  # 初始化数据
    with open("./iris.txt", mode="r", encoding="utf-8") as fp:
        lines = fp.readlines()  # 按行读取数据
    iris_datas = []
    for i in range(1, len(lines)):  # 从第2行开始读取
        iris_datas.append(lines[i].replace("\n", "").replace("\"", "").split())
    iris_datas = np.array(iris_datas)  # 将数据转化为多维数组
    labels = iris_datas[:, -1]  # 获取标签数据，最后一列
    f_datas = iris_datas[:, 1:-1]  # 获取特征数据，第2列到倒数第2列
    f_datas = f_datas.astype(np.float)  # 改变数据类型
    return f_datas, labels


def draw(f_datas, labels):  # 绘制数据图
    d_dict = defaultdict(list)  # 创建字典，默认值为列表类型
    for i in range(len(labels)):  # 循环遍历每一个样本
        d_dict[labels[i]].append(f_datas[i])  # 将同一品种的鸢尾花放在一起
    styles = ["ro", "b+", "g*"]  # 设置一些样式
    plt.rcParams["font.family"] = "STSong"  # 设置支持中文
    plt.subplot(1, 2, 1)  # 添加子块
    for i, (key, values) in enumerate(d_dict.items()):
        values = np.array(values)  # 获取每一个品种对应的样本
        plt.plot(values[:, 0], values[:, 1], styles[i], label=key)
    plt.legend()  # 显示图例
    plt.title("花萼的分布图")  # 显示标题
    plt.xlabel("花萼的长度")  # 显示X轴标签
    plt.ylabel("花萼的宽度")  # 显示Y轴标签
    plt.subplot(1, 2, 2)  # 添加子块
    for i, (key, values) in enumerate(d_dict.items()):
        values = np.array(values)
        plt.plot(values[:, 2], values[:, 3], styles[i], label=key)
    plt.legend()  # 显示图例
    plt.title("花瓣的分布图")  # 显示标题
    plt.xlabel("花瓣的长度")  # 显示X轴标签
    plt.ylabel("花瓣的宽度")  # 显示Y轴标签
    plt.subplots_adjust(wspace=0.4)  # 调整位置
    # my_file = Path("./static/pdf/flower.pdf")
    # if my_file.exists():
    #     return './static/pdf/flower.pdf'
    # else:
    plt.savefig("./static/pdf/flower.pdf")
    plt.close()
    return './static/pdf/flower.pdf'
    # 出现启动服务后只能调用一次的问题，第二次出现服务器超载，判断可能是内存泄漏，
    # 查阅资料发现是因为matplotlib的缓存问题，需要清理缓存


def knn(test_data, train_datas, train_labels, k):
    nums = train_datas.shape[0]  # 获取已知样本的数量
    test_datas = np.tile(test_data, (nums, 1))
    d_1 = test_datas - train_datas  # 相应位置相减
    d_2 = np.square(d_1)  # 求平方
    d_3 = np.sum(d_2, axis=1)  # 按行求和
    d_4 = np.sqrt(d_3)  # 开平方，得到距离
    index = np.argsort(d_4)  # 排序获取排序后元素的索引
    count = Counter(train_labels[index[:k]])  # 统计最邻近的k个邻居的标签
    print(count)
    return count.most_common()[0][0]  # 返回出现次数最多的标签


def test(f_datas, labels):
    index = np.arange(len(labels))
    np.random.shuffle(index)
    test_data = f_datas[index[-1]]
    test_label = labels[index[-1]]
    train_datas = f_datas[index[:-1]]
    train_labels = labels[index[:-1]]
    predict_label = knn(test_data, train_datas, train_labels, k=10)
    if predict_label == test_label:
        res = ("预测准确")
    else:
        res = ("预测错误，预测类别为：", predict_label, "实际的类别为：", test_label)
    return 2


# def draw(f_datas, labels):  # 绘制数据图
#     d_dict = defaultdict(list)  # 创建字典，默认值为列表类型
#     for i in range(len(labels)):  # 循环遍历每一个样本
#         d_dict[labels[i]].append(f_datas[i])  # 将同一品种的鸢尾花放在一起
#     styles = ["ro", "b+", "g*"]  # 设置一些样式
#     plt.rcParams["font.family"] = "STSong"  # 设置支持中文
#     plt.subplot(1, 2, 1)  # 添加子块
#     for i, (key, values) in enumerate(d_dict.items()):
#         values = np.array(values)  # 获取每一个品种对应的样本
#         plt.plot(values[:, 0], values[:, 1], styles[i], label=key)
#     plt.legend()  # 显示图例
#     plt.title("花萼的分布图")  # 显示标题
#     plt.xlabel("花萼的长度")  # 显示X轴标签
#     plt.ylabel("花萼的宽度")  # 显示Y轴标签
#     plt.subplot(1, 2, 2)  # 添加子块
#     for i, (key, values) in enumerate(d_dict.items()):
#         values = np.array(values)
#         plt.plot(values[:, 2], values[:, 3], styles[i], label=key)
#     plt.legend()  # 显示图例
#     plt.title("花瓣的分布图")  # 显示标题
#     plt.xlabel("花瓣的长度")  # 显示X轴标签
#     plt.ylabel("花瓣的宽度")  # 显示Y轴标签
#     plt.subplots_adjust(wspace=0.4)  # 调整位置
#     plt.show()  # 显示图片


def norm(data):
    """
    标准化输入的数据格式
    """
    if isinstance(data, collections.OrderedDict):
        data = dict(data)
    if isinstance(data, list):
        for i, li in enumerate(data):
            data[i] = dict2json(li)
        return data
    if isinstance(data, dict):
        for k, v in data.items():
            data[k] = dict2json(v)
    if isinstance(data, str):
        # try:
        # 判断字符串是否json类型数据
        #     data = json.loads(data)
        # except Exception as e:
        #     pass
        return data
    return data


def dict2json(data):
    return json.dumps(norm(data), ensure_ascii=False)


#


# def init_data():  # 初始化数据
#     with open("./iris.txt", mode="r", encoding="utf-8") as fp:
#         lines = fp.readlines()  # 按行读取数据
#     iris_datas = []
#     for i in range(1, len(lines)):  # 从第2行开始读取
#         iris_datas.append(lines[i].replace("\n", "").replace("\"", "").split())
#     iris_datas = np.array(iris_datas)  # 将数据转化为多维数组
#     labels = iris_datas[:, -1]  # 获取标签数据，最后一列
#     f_datas = iris_datas[:, 1:-1]  # 获取特征数据，第2列到倒数第2列
#     f_datas = f_datas.astype(np.float)  # 改变数据类型
#     return f_datas, labels


# def draw(f_datas, labels):  # 绘制数据图
#     d_dict = defaultdict(list)  # 创建字典，默认值为列表类型
#     for i in range(len(labels)):  # 循环遍历每一个样本
#         d_dict[labels[i]].append(f_datas[i])  # 将同一品种的鸢尾花放在一起
#     styles = ["ro", "b+", "g*"]  # 设置一些样式
#     plt.rcParams["font.family"] = "STSong"  # 设置支持中文
#     plt.subplot(1, 2, 1)  # 添加子块
#     for i, (key, values) in enumerate(d_dict.items()):
#         values = np.array(values)  # 获取每一个品种对应的样本
#         plt.plot(values[:, 0], values[:, 1], styles[i], label=key)
#     # plt.legend()  # 显示图例
#     plt.title("花萼的分布图")  # 显示标题
#     plt.xlabel("花萼的长度")  # 显示X轴标签
#     plt.ylabel("花萼的宽度")  # 显示Y轴标签
#     plt.subplot(1, 2, 2)  # 添加子块
#     for i, (key, values) in enumerate(d_dict.items()):
#         values = np.array(values)
#         plt.plot(values[:, 2], values[:, 3], styles[i], label=key)
#     # plt.legend()  # 显示图例
#     plt.title("花瓣的分布图")  # 显示标题
#     plt.xlabel("花瓣的长度")  # 显示X轴标签
#     plt.ylabel("花瓣的宽度")  # 显示Y轴标签
#     plt.subplots_adjust(wspace=0.4)  # 调整位置
#     # plt.show()  # 显示图片
#     plt.savefig('./static/pdf/flower.pdf')
#     return './static/pdf/flower.pdf'


# def knn(test_data, train_datas, train_labels, k):
#     nums = train_datas.shape[0]  # 获取已知样本的数量
#     test_datas = np.tile(test_data, (nums, 1))
#     d_1 = test_datas - train_datas  # 相应位置相减
#     d_2 = np.square(d_1)  # 求平方
#     d_3 = np.sum(d_2, axis=1)  # 按行求和
#     d_4 = np.sqrt(d_3)  # 开平方，得到距离
#     index = np.argsort(d_4)  # 排序获取排序后元素的索引
#     count = Counter(train_labels[index[:k]])  # 统计最邻近的k个邻居的标签
#     print(count)
#     return count.most_common()[0][0]  # 返回出现次数最多的标签


# def test(f_datas, labels):
#     index = np.arange(len(labels))
#     np.random.shuffle(index)
#     test_data = f_datas[index[-1]]
#     test_label = labels[index[-1]]
#     train_datas = f_datas[index[:-1]]
#     train_labels = labels[index[:-1]]
#     predict_label = knn(test_data, train_datas, train_labels, k=10)
#     if predict_label == test_label:
#         print("预测准确")
#     else:
#         print("预测错误，预测类别为：", predict_label, "实际的类别为：", test_label)
