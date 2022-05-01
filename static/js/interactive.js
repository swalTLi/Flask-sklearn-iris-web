import { getElementById, Element } from './utils/domOperation.js';
import {
  showAlert,
  ajaxForecast,
  ajaxSystematicTraining,
  isPassDetection,
  useSystemCallback,
  handleReset,
  userForecast,
} from './utils/methods.js';
// 展示 消息提示框
const ShowAlert = (message, type) => showAlert(message, type);

// 请求 Forecast 接口
const AjaxForecast = (url, userForecast, ...args) =>
  ajaxForecast(url, userForecast, ...args);

// 请求 /systemDraw /systemDraw
const AjaxSystematicTraining = url => ajaxSystematicTraining(url);

// 是否验证通过
const IsPassDetection = (userForecast, ...args) =>
  isPassDetection(userForecast, ...args);

// 选择预测方式
window.UserClickBtn = function (nodeHidden, nodeShow, fn) {
  new getElementById(nodeHidden, { style: 'display:none' });
  new getElementById(nodeShow, { style: 'display:block' });
  // 系统
  if (fn) {
    const systemTrainData = AjaxSystematicTraining('systemTrainData');
    const systemDraw = AjaxSystematicTraining('systemDraw');
    fn(systemDraw.route, systemTrainData);
  }
};
// 用户提交表单
window.UserForecast = () => userForecast();

// 用户点击回调
window.UseSystemCallback = (pdf, systemTrainData) =>
  useSystemCallback(pdf, systemTrainData);

// 重置页面
window.reset = () => handleReset();

// 关闭弹窗恢复dom状态
$('#exampleModal').on('hidden.bs.modal', handleReset);
