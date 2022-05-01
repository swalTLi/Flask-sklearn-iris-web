import json
from warnings import catch_warnings
from xml.sax.handler import property_interning_dict
from flask import Flask, Response, jsonify, request
from flask import render_template
from flask_cors import CORS
from train_py.slearn import iris
from train_py.iris_test import init_data, draw
from train_py.main import getMainData
app = Flask(__name__)

CORS(app, resources=r'/*')


# 首页
@app.route('/', methods=["GET"])
@app.route('/index')
def hello():
    return render_template('index.html')


# 数据页
@app.route('/view')
def view():
    return render_template('view.html')

# 用户输入4个参数 预测 花朵种类


@app.route("/forecast", methods=["POST"])
def getClassifierData():
    data1 = request.json['data1']
    data2 = request.json['data2']
    data3 = request.json['data3']
    data4 = request.json['data4']
    predict = iris(data1, data2, data3, data4)
    data = {"data": predict, }
    return Response(json.dumps(data), mimetype='application/json')


# 系统提供的数据集合 进行训练
@app.route("/systemTrainData", methods=["POST"])
def systemTrainData():
    mainDate = getMainData()
    return jsonify(mainDate)


@app.route('/systemDraw', methods=["POST"])
def systemDraw():
    try:
        f_datas, l_datas = init_data()
        route = draw(f_datas, l_datas)
        return jsonify({'route': route})
    except Exception as e:
        return jsonify({'route': './static/pdf/flower.pdf'})


if __name__ == "__main__":
    app.run()
