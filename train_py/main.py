from scipy import stats
import numpy as np

import pandas as pd

import matplotlib.pyplot as plt

import seaborn as sns

from sklearn.datasets import load_iris

import warnings


def getMainData():
    flowerData = {}
    obj = {}

    # 设置seaborn绘图的样式

    sns.set(style="darkgrid")

    plt.rcParams["font.family"] = "SimHei"

    plt.rcParams["axes.unicode_minus"] = False

    # 忽视警告信息

    warnings.filterwarnings("ignore")

    # 加载鸢尾花数据集

    iris = load_iris()

    # display(iris)

    # iris.data:鸢尾花数据集

    # iris.target:每朵鸢尾花对应的类别。(取值为0，1，2)

    # print('data', iris.data[:150], iris.target[:150])
    # flowerData['鸢尾花数据集'] = [iris.data[:150]]
    # flowerData['鸢尾花类别'] = [iris.target[:150]]

    # iris.feature_names:特征列的名称。

    # iris.target_name:鸢尾花类别的名称。

    # print('name', iris.feature_names, iris.target_names)

    # 将鸢尾花数据与对应的类型合并，组合成完整的记录。

    data = np.concatenate([iris.data, iris.target.reshape(-1, 1)], axis=1)

    # print(type(data))

    # print(data[:10])

    # print(data.dtype)

    data = pd.DataFrame(data, columns=[
                        "sepal_length", "sepal_width", "petal_length", "petal_width", "type"])

    # print(type(data))

    data.sample(10)

    # print('head',data.head())
    # flowerData['head'] = [data.head()]

    # data.info()

    # 分析

    # 计算鸢尾花数据中，每个类别出现的频数

    frequency = data["type"].value_counts()

    # print(frequency)
    # flowerData['head'] = [data.head()]

    # print(type(frequency))

    # 计算每个类别出现的频率

    percentage = frequency*100/len(data)

    # flowerData['percentage'] = percentage

    # print(percentage)

    frequency.plot(kind="bar")

    # 计算花萼长度的均值

    mean = data["sepal_length"].mean()

    # 计算花萼长度的中位数

    median = data["sepal_length"].median()

    # 计算花萼长度的众数

    s = data["sepal_length"].mode()

    # 注意，model方法返回的是series类型

    # print(type(s))

    # print(s.info())

    mode = s.iloc[0]

    # print(mean, median, mode)
    # flowerData['mean'] = mean
    # flowerData['median'] = median
    # flowerData['mode'] = mode

    stats.mode(data["sepal_length"]).mode

    # 绘制数据的分布(直方图+密度图)

    sns.distplot(data["sepal_length"])

    plt.axvline(mean, ls="-", color="r", label="均值")

    plt.axvline(median, ls="-", color="g", label="中值")

    plt.axvline(mean, ls="-", color="indigo", label="众数")

    plt.legend()

    plt.savefig("./static/pdf/1.pdf")
    obj['pdf1'] = "./static/pdf/1.pdf"

    x = np.arange(10, 19)

    n = len(x)

    # 计算四分位的索引(index)

    q1_index = (n-1)*0.25

    q2_index = (n-1)*0.5

    q3_index = (n-1)*0.75

    # print(q1_index, q2_index, q3_index)

    # 将index转化成整数类型

    index = np.array([q1_index, q2_index, q3_index]).astype(np.int32)

    # print(x[index])

    plt.figure(figsize=(15, 4))

    plt.xticks(x)

    plt.plot(x, np.zeros(len(x)), ls="", marker="D", ms=15, label="元素值")

    plt.plot(x[index], np.zeros(len(index)), ls="",
             marker="X", ms=15, label="四分位值")

    plt.legend()

    plt.savefig("./static/pdf/2.pdf")
    obj['pdf2'] = "./static/pdf/2.pdf"

    x = np.arange(10, 20)

    n = len(x)

    q1_index = (n-1)*0.25

    q2_index = (n-1)*0.5

    q3_index = (n-1)*0.75

    # print(q1_index, q2_index, q3_index)

    index = np.array([q1_index, q2_index, q3_index])

    # 计算左边元素的值

    left = np.floor(index).astype(np.int32)

    # 计算右边元素的值

    right = np.ceil(index).astype(np.int32)

    # 获取index的小数部分与整数部分

    weight, _ = np.modf(index)

    # 根据左右两边的整数，加权计算四分位数的值，权重与距离成反比

    q = x[left] * (1-weight) + x[right] * weight

    # print(q)

    plt.figure(figsize=(15, 4))

    plt.xticks(x)

    plt.plot(x, np.zeros(len(x)), ls="", marker="D", ms=15, label="元素值")

    plt.plot(q, np.zeros(len(index)), ls="", marker="X", ms=15, label="四分位值")

    for v in q:

        plt.text(v, 0.01, s=v, fontsize=15)

    plt.legend()
    plt.savefig("./static/pdf/3.pdf")
    obj['pdf3'] = "./static/pdf/3.pdf"
    
    # numpy

    x = [1, 3, 10, 15, 18, 20, 23, 25]

    # quantile与percentile都可以就算分位数，不同的是，quantile方法

    # q(要计算的分位数)的取值范围为【0，1】，而percentile方法，q的

    # 取值范围为【0，100】

    # print(np.quantile(x, q=[0.25, 0.5, 0.75]))

    # print(np.percentile(x, q=[25, 50, 75]))

    # pandas

    x = [1, 3, 10, 15, 18, 20, 23, 25]

    s = pd.Series(x)

    # print(s.describe())

    s.describe(percentiles=[0.25, 0.9])

    # 计算极差

    sub = data["sepal_length"].max()-data["sepal_length"].min()

    # 计算方差

    var = data["sepal_length"].var()

    # 计算标准差

    std = data["sepal_length"].std()

    # print(sub, var, std)

    flowerData['极差'] = sub
    flowerData['方差'] = var
    flowerData['    '] = std

    plt.figure(figsize=(15, 4))

    plt.ylim(-0.5, 1.5)

    # print(data["petal_width"])

    plt.plot(data["petal_length"], np.zeros(len(data)), ls="",
             marker="o", ms=10, color="g", label="花瓣长度")

    plt.plot(data["petal_width"], np.ones(len(data)), ls="",
             marker="o", ms=10, color="r", label="花瓣宽度")

    # plt.axvline(data["petal_length"].mean(), ls="–", color="g", label="花瓣长度均值")

    # plt.axvline(data["petal_width"].mean(), ls="–", color="r", label="花瓣长度均值")

    plt.legend()
    plt.savefig("./static/pdf/4.pdf")
    obj['pdf4'] = "./static/pdf/4.pdf"
    # 构造左偏分布数据

    t1 = np.random.randint(1, 11, size=100)

    t2 = np.random.randint(11, 21, size=500)

    t3 = np.concatenate([t1, t2])

    left_skew = pd.Series(t3)

    # 构造右偏分布数据

    t1 = np.random.randint(1, 11, size=500)

    t2 = np.random.randint(11, 21, size=100)

    t3 = np.concatenate([t1, t2])

    right_skew = pd.Series(t3)

    # print(right_skew)
    # 计算偏度

    # print('计算偏度：', left_skew.skew(), right_skew.skew())

    #绘制核密度图 =概率密度图

    sns.kdeplot(left_skew, shade=True, label="左偏")

    sns.kdeplot(right_skew, shade=True, label="右偏")

    plt.legend()

    plt.savefig("./static/pdf/5.pdf")
    obj['pdf5'] = "./static/pdf/5.pdf"
    plt.close()
    # 标准正态分布

    standard_normal = pd.Series(np.random.normal(0, 1, size=100000))

    # print("标准正态分布峰度：", standard_normal.kurt(), "标准差:", standard_normal.std())

    flowerData['标准正态分布峰度'] = [standard_normal.kurt(), standard_normal.std()]
    # print("花萼宽度峰度：", data["sepal_width"].kurt(),
    #       "标准差:", data["sepal_width"].std())

    flowerData['花萼宽度峰度'] = [
        data["petal_length"].std(), data["petal_length"].std()]
    # print("花瓣长度峰度：", data["petal_length"].kurt(),
    #       "标准差:", data["petal_length"].std())

    flowerData['花瓣长度峰度'] = [
        data["petal_length"].kurt(), data["petal_length"].std()]
    sns.kdeplot(standard_normal, label="标准正态分布")

    sns.kdeplot(data["sepal_width"], label="花萼宽度")

    sns.kdeplot(data["petal_length"], label="花瓣长度")
    obj['flowerData'] = flowerData
    # plt.show()
    # print(obj)
    return obj
