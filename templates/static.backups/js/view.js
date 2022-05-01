import { getViewData } from './Echarts/ViewData.js';
import { ScatterView } from './Echarts/Chart.js';
const data = getViewData();
// 散点图1
ScatterView('ScatterView', data, {
  key1: 'Sepal.Length',
  key2: 'Sepal.Width',
  title: '鸢尾花的<花萼>宽度与长度对于种类的影响',
  dataType: 'sepal',
});
// 绘制散点图二
ScatterView('ScatterView2', data, {
  key1: 'Petal.Length',
  key2: 'Petal.Width',
  title: '鸢尾花的<花瓣>宽度与长度对于种类的影响',
  dataType: 'petal',
});
