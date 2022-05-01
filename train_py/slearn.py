from sklearn import tree
import numpy as np
from sklearn import datasets


def iris(data1, data2, data3, data4):

    # 载入数据集
    iris = datasets.load_iris()
    iris_data = iris['data']
    iris_label = iris['target']
    iris_target_name = iris['target_names']
    X = np.array(iris_data)
    Y = np.array(iris_label)

    # 训练
    clf = tree.DecisionTreeClassifier(max_depth=3)
    clf.fit(X, Y)

    # 这里预测当前输入的值的所属分类
    predict = iris_target_name[clf.predict([[data1, data2, data3, data4]])[0]]
    
    return predict
