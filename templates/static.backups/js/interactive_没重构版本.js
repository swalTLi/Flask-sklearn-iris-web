import { getElementById, Element } from './utils/domOperation.js';
import { optionArguments } from './utils/parameter.js';
// 展示 消息提示框
function ShowAlert(message, type) {
  const el = new getElementById(type, {
    innerText: `${message}`,
    style: `display:block;z-index:1051;width: 800px;position: absolute;left: 50%;top: 10%;transform: translate(-50%,-50%);`,
  });
  // el.innerText = `${message}`;
  // el.style = `display:block;z-index:1051;width: 800px;position: absolute;left: 50%;top: 10%;transform: translate(-50%,-50%);`;
  setTimeout(() => {
    el.style = `display:none;z-index:1051;width: 800px;position: absolute;left: 50%;top: 10%;transform: translate(-50%,-50%);`;
  }, 5000);
}
// 请求
function ajaxForecast(url, userForecast, ...args) {
  var data = {
    data1: args[0],
    data2: args[1],
    data3: args[2],
    data4: args[3],
  };
  $.ajax({
    url: `http://127.0.0.1:5000/${url}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
    crossDomain: true,
    success: function (data) {
      const ycjg = new getElementById('ycjg', { style: 'display:flex;' });
      const inp = new getElementById('colFormLabelLg6', { value: data.data });
      // inp.value = data.data;
      // ycjg.style = 'display:flex;';
      // 预测失败！
      userForecast === data.data
        ? ShowAlert(
            `预测成功！您的猜测为：${userForecast}, 训练模型结果为${data.data}，由于数据集合的问题，训练模型的猜测可能并不准确！仅供参考。`,
            'alert-success'
          )
        : ShowAlert(
            `预测失败！您的猜测为：${userForecast}, 训练模型结果为${data.data}，由于数据集合的问题，训练模型的猜测可能并不准确！仅供参考。`,
            'alert-warning'
          );
      const reload = new getElementById('reload', { style: 'display:block;' });
      // reload.style = 'display:block;';
      const ycbtn = new getElementById('ycbtn', { style: 'display:none' });
      // ycbtn.style = 'display:none;';
    },
    error: function (err) {
      ShowAlert('网络或者服务器错误', 'alert-danger');
    },
  });
}

function ajaxSystematicTraining(url) {
  var res = undefined;
  $.ajax({
    url: `http://127.0.0.1:5000/${url}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    async: false,
    data: {},
    crossDomain: true,
    success: function (data) {
      res = data;
    },
    error: function (err) {
      ShowAlert('网络或者服务器错误', 'alert-danger');
    },
  });
  return res;
}

// 是否验证通过
function isPassDetection(userForecast, ...args) {
  // console.log(...args);
  return {
    isAdopt: false,
  };
}

// 选择预测方式
window.userClickBtn = function (nodeHidden, nodeShow, fn) {
  const el1 = new getElementById(nodeHidden);
  el1.style = 'display:none';
  const el2 = new getElementById(nodeShow);
  el2.style = 'display:block';

  // 系统
  if (fn) {
    const systemTrainData = ajaxSystematicTraining('systemTrainData');
    const systemDraw = ajaxSystematicTraining('systemDraw');
    fn(systemTrainData, systemDraw.route);
  }
};

// 用户提交表单
window.userForecast = function () {
  const calyxLength = new getElementById('colFormLabelLg1').value;
  const calyxWidth = new getElementById('colFormLabelLg2').value;
  const petalLength = new getElementById('colFormLabelLg3').value;
  const petalWidth = new getElementById('colFormLabelLg4').value;
  const userForecast = new getElementById('colFormLabelLg5').value;
  const detectionResult = isPassDetection(
    userForecast,
    calyxLength,
    calyxWidth,
    petalLength,
    petalWidth
  );
  if (detectionResult.isAdopt) {
    // console.log(1);
    // ajax(forecast);
  } else {
    ajaxForecast(
      'forecast',
      userForecast,
      calyxLength,
      calyxWidth,
      petalLength,
      petalWidth
    );
  }
};

// 用户点击回调
window.useSystemCallback = function (systemTrainData, pdf) {
  setTimeout(() => {
    new getElementById('loading').style = 'display:none;';
  }, 1000);
  const systemNode = new getElementById('system');
  const { flowerData, pdf1, pdf2, pdf3, pdf4, pdf5 } = systemTrainData;

  // 创建 DOM 并把参数赋值到页面上
  const fc = new Element('h5', optionArguments(flowerData, 'fc'));
  const jc = new Element('h5', optionArguments(flowerData, 'jc'));
  const bzztfb = new Element('h5', optionArguments(flowerData, 'bzztfb'));
  const cdfd = new Element('h5', optionArguments(flowerData, 'cdfd'));
  const kdfd = new Element('h5', optionArguments(flowerData, 'kdfd'));
  // fc.id = 'fc';
  // jc.id = 'jc';
  // bzztfb.id = 'bzztfb';
  // cdfd.id = 'cdfd';
  // kdfd.id = 'kdfd';
  // // fc.innerText = '方差：' + Number(flowerData['方差']).toFixed(5);
  // jc.innerText = '极差：' + flowerData['极差'].toFixed(5);
  // bzztfb.innerText = '标准正态分布峰度：' + flowerData['标准正态分布峰度'];
  // cdfd.innerText = '花瓣长度峰度：' + flowerData['花瓣长度峰度'];
  // kdfd.innerText = '花萼宽度峰度：' + flowerData['花萼宽度峰度'];
  // pdf
  const pdfNode = new Element('iframe', {
    src: pdf,
    id: 'pdfNode',
    height: '100%',
    width: '100%',
  });
  // pdfNode.addEventListener('click', function () {
  //   window.open(pdf);
  // });
  // pdf2
  const pdfNode2 = new Element('iframe', {
    src: pdf1,
    id: 'pdfNode2',
    height: '100%',
    width: '100%',
  });
  // pdfNode2.src = pdf1;
  // pdfNode2.id = 'pdfNode2';
  // pdfNode2.height = '100%';
  // pdfNode2.width = '100%';
  // pdfNode2.addEventListener('click', function () {
  //   window.open(pdf1);
  // });
  // 标题1
  const h3 = new Element('h3', {
    innerHTML: '基于matplotlib绘制的数据图',
    id: 'a3',
  });
  // h3.innerHTML = '基于matplotlib绘制的数据图';
  // h3.id = 'a3';
  // 链接1
  const link1 = new Element('a', {
    href: pdf,
    id: 'a1',
    target: '_blank',
    innerHTML: '1.点此全屏查看 matplotlib.pyplot 图表<br/>',
    style: 'text-decoration:underline',
  });
  // link1.href = pdf;
  // link1.id = 'a1';
  // link1.target = '_blank';
  // link1.innerHTML = '1.点此全屏查看 matplotlib.pyplot 图表<br/>';
  // link1.style = 'text-decoration:underline';
  // 链接2
  const link2 = new Element('a', {
    href: './static/iris.txt',
    id: 'a2',
    target: '_blank',
    innerHTML: '2.查看数据集样本<br/>',
    style: 'text-decoration:underline',
  });
  // link2.href = './static/iris.txt';
  // link2.id = 'a2';
  // link2.target = '_blank';
  // link2.innerHTML = '2.查看数据集样本<br/>';
  // link2.style = 'text-decoration:underline';
  // 链接3
  const link3 = new Element('a', {
    href: '/view',
    id: 'a4',
    target: '_blank',
    innerHTML: '3.全屏查看下方图表<br/>',
    style: 'text-decoration:underline',
  });
  // link3.href = '/view';
  // link3.id = 'a4';
  // link3.target = '_blank';
  // link3.innerHTML = '3.全屏查看下方图表<br/>';
  // link3.style = 'text-decoration:underline';
  const ViewIframe = new Element('iframe', {
    id: 'ViewIframe',
    width: '100%',
    height: '1000px',
    src: 'view',
  });
  // ViewIframe.id = 'ViewIframe';
  // ViewIframe.width = '100%';
  // ViewIframe.height = '1000px';
  // ViewIframe.src = 'view';

  systemNode
    ._appendChild(h3)
    ._appendChild(fc)
    ._appendChild(jc)
    ._appendChild(bzztfb)
    ._appendChild(cdfd)
    ._appendChild(kdfd)
    ._appendChild(pdfNode)
    ._appendChild(pdfNode2)
    ._appendChild(link1)
    ._appendChild(link2)
    ._appendChild(link3)
    ._appendChild(ViewIframe);
  // systemNode.appendChild(h3);
  // systemNode.appendChild(fc);
  // systemNode.appendChild(jc);
  // systemNode.appendChild(bzztfb);
  // systemNode.appendChild(cdfd);
  // systemNode.appendChild(kdfd);
  // systemNode.appendChild(pdfNode);
  // systemNode.appendChild(pdfNode2);
  // systemNode.appendChild(link1);
  // systemNode.appendChild(link2);
  // systemNode.appendChild(link3);
  // systemNode.appendChild(ViewIframe);

  new getElementById('exampleModalLabel', { innerText: '使用系统集合' });
};

// 重置页面
window.reset = function (fn = undefined) {
  if (fn) {
    fn();
  }
};
// location.reload();
// 关闭弹窗恢复dom状态
$('#exampleModal').on('hidden.bs.modal', function (event) {
  new getElementById('colFormLabelLg1', { value: '' });
  new getElementById('colFormLabelLg2', { value: '' });
  new getElementById('colFormLabelLg3', { value: '' });
  new getElementById('colFormLabelLg4', { value: '' });
  new getElementById('colFormLabelLg5', { value: "I don't know" });
  new getElementById('text-dialog', { style: 'display:flex' });
  new getElementById('user', { style: 'display:none' });
  new getElementById('ycjg', { style: 'display:none' });
  new getElementById('colFormLabelLg6', { value: '' });
  new getElementById('reload', { style: 'display:none' });
  new getElementById('ycbtn', { style: 'display:block' });
  new getElementById('exampleModalLabel', { innerText: '请选择预测方式' });
  new getElementById('exampleModalLabel', { innerText: '输入预测参数' });
  new getElementById('loading', { style: 'display:block' });
  const systemNode = new getElementById('system', {
    style: 'display:none',
    innerHTML: '',
  })._appendChild(loading);
});
