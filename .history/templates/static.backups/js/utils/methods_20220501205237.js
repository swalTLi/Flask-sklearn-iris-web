import { getElementById, Element } from './domOperation.js';
import { optionArguments } from './parameter.js';

function showAlert(message, type) {
  const alertArr = document.querySelectorAll('.alert');
  alertArr.forEach(el => {
    el.style = `display:none;z-index:1051;width: 800px;position: absolute;left: 50%;top: 10%;transform: translate(-50%,-50%);`;
  });
  const el = new getElementById(type, {
    innerText: `${message}`,
    style: `display:block;z-index:1051;width: 800px;position: absolute;left: 50%;top: 10%;transform: translate(-50%,-50%);`,
  });
  setTimeout(() => {
    el.style = `display:none;z-index:1051;width: 800px;position: absolute;left: 50%;top: 10%;transform: translate(-50%,-50%);`;
  }, 5000);
}

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
      // 该遍 节点 属性
      new getElementById('ycjg', { style: 'display:flex;' });
      new getElementById('colFormLabelLg6', { value: data.data });
      // 预测失败！
      userForecast === data.data
        ? showAlert(
            `预测成功！您的猜测为：${userForecast}, 训练模型结果为${data.data}，由于数据集合的问题，训练模型的猜测可能并不准确！仅供参考。`,
            'alert-success'
          )
        : showAlert(
            `预测失败！您的猜测为：${userForecast}, 训练模型结果为${data.data}，由于数据集合的问题，训练模型的猜测可能并不准确！仅供参考。`,
            'alert-warning'
          );
      new getElementById('reload', { style: 'display:block;' });
      new getElementById('ycbtn', { style: 'display:none' });
    },
    error: function (err) {
      showAlert('网络或者服务器错误', 'alert-danger');
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
      return res;
    },
    error: function (err) {
      showAlert('网络或者服务器错误', 'alert-danger');
    },
  });
  return res;
}

function isOutRange(num) {
  if (num > 0.5 && num < 10) {
    return false;
  }
  return true;
}

// 验证
function isPassDetection(userForecast, ...args) {
  var warn = '长度和宽度在 0.5 - 10之间，类型为数字，且不能为空';
  const res = args.filter(e => {
    // 是否为数字
    if (isNaN(e)) return true;
    // 超出范围
    if (isOutRange(e)) return true;
    if (!e) return true;
    return false;
  });
  return {
    isAdopt: res.length === 0,
    warn,
  };
}

function useSystemCallback(pdf, systemTrainData) {
  setTimeout(() => {
    new getElementById('loading', { style: 'display:none' });
  }, 1000);
  const systemNode = new getElementById('system');
  const { flowerData, pdf1, pdf2, pdf3, pdf4, pdf5 } = systemTrainData;

  // 创建 DOM 并把参数赋值到页面上
  const fc = new Element('h5', optionArguments(flowerData, 'fc'));
  const jc = new Element('h5', optionArguments(flowerData, 'jc'));
  const bzztfb = new Element('h5', optionArguments(flowerData, 'bzztfb'));
  const cdfd = new Element('h5', optionArguments(flowerData, 'cdfd'));
  const kdfd = new Element('h5', optionArguments(flowerData, 'kdfd'));
  /**
   * 此处两种方式实现 点击iframe 跳转打开 PDF
   *
   * 1. 添加 a标签 把iframe包裹起来设置 href 和 target display设置成block就可以
   * 2. 添加 div 把 iframe包裹起来，添加点击事件，我在 new Element 里面添加了链式设置 _addEventListener的函数
   */
  // 1.添加 a标签
  const pdfNode = new Element('a', {
    href: pdf,
    style: 'display:block',
    target: '_blank',
  })._appendChild(
    new Element('iframe', {
      src: pdf,
      id: 'pdfNode',
      height: '100%',
      width: '100%',
    })
  );
  // 2.添加 div标签
  // const pdfNode = new Element('div')
  //   ._appendChild(
  //     new Element('iframe', {
  //       src: pdf,
  //       id: 'pdfNode',
  //       height: '100%',
  //       width: '100%',
  //     })
  //   )
  //   ._addEventListener('click', function () {
  //     window.open(pdf);
  //   });
  // pdf2
  const pdfNode2 = new Element('div')
    ._appendChild(
      new Element('iframe', {
        src: pdf1,
        id: 'pdfNode',
        height: '100%',
        width: '100%',
      })
    )
    ._addEventListener('click', function () {
      window.open(pdf1);
    });
  const pdfNode3 = new Element('div')
    ._appendChild(
      new Element('iframe', {
        src: pdf2,
        id: 'pdfNode',
        height: '100%',
        width: '100%',
      })
    )
    ._addEventListener('click', function () {
      window.open(pdf2);
    });
  const pdfNode4 = new Element('div')
    ._appendChild(
      new Element('iframe', {
        src: pdf3,
        id: 'pdfNode',
        height: '100%',
        width: '100%',
      })
    )
    ._addEventListener('click', function () {
      window.open(pdf3);
    });
  const pdfNode5 = new Element('div')
    ._appendChild(
      new Element('iframe', {
        src: pdf4,
        id: 'pdfNode',
        height: '100%',
        width: '100%',
      })
    )
    ._addEventListener('click', function () {
      window.open(pdf4);
    });
  // 标题1
  const h3 = new Element('h3', {
    innerHTML: '基于matplotlib绘制的数据图',
    id: 'a3',
  });
  // 链接1
  const link1 = new Element('a', {
    href: pdf,
    id: 'a1',
    target: '_blank',
    innerHTML: '1.点此全屏查看 matplotlib.pyplot 图表<br/>',
    style: 'text-decoration:underline',
  });
  // 链接2
  const link2 = new Element('a', {
    href: './static/js/lib/iris.txt',
    id: 'a2',
    target: '_blank',
    innerHTML: '2.查看数据集样本<br/>',
    style: 'text-decoration:underline',
  });
  // 链接3
  const link3 = new Element('a', {
    href: '/view',
    id: 'a4',
    target: '_blank',
    innerHTML: '3.全屏查看下方图表<br/>',
    style: 'text-decoration:underline',
  });
  const ViewIframe = new Element('iframe', {
    id: 'ViewIframe',
    width: '100%',
    height: '1000px',
    src: 'view',
  });

  systemNode
    ._appendChild(h3)
    ._appendChild(fc)
    ._appendChild(jc)
    ._appendChild(bzztfb)
    ._appendChild(cdfd)
    ._appendChild(kdfd)
    ._appendChild(pdfNode)
    ._appendChild(pdfNode2)
    ._appendChild(pdfNode3)
    ._appendChild(pdfNode4)
    ._appendChild(pdfNode5)
    ._appendChild(link1)
    ._appendChild(link2)
    ._appendChild(link3)
    ._appendChild(ViewIframe);

  new getElementById('exampleModalLabel', { innerText: '使用系统集合' });
}

function handleReset() {
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
  new getElementById('system', {
    style: 'display:none',
    innerHTML: '',
  })._appendChild(
    new Element('div', { id: 'loading', style: 'display:block' })
  );
}
function userForecast() {
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
    ajaxForecast(
      'forecast',
      userForecast,
      calyxLength,
      calyxWidth,
      petalLength,
      petalWidth
    );
  } else {
    showAlert(
      '花萼长度、花萼宽度、花瓣长度、花瓣宽度 等参数必须填写完整' +
        detectionResult.warn,
      'alert-danger'
    );
  }
}
export {
  showAlert,
  ajaxForecast,
  ajaxSystematicTraining,
  isPassDetection,
  useSystemCallback,
  handleReset,
  userForecast,
};
