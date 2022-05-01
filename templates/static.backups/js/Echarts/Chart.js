// 散点图
async function ScatterView(node, viewData, userOptions) {
  var myChart = echarts.init(document.getElementById(node));
  const setosa_length = await viewData.setosa.map(_ => {
    return [_[userOptions.key1], _[userOptions.key2]];
  });
  const versicolo_length = await viewData.versicolo.map(_ => {
    return [_[userOptions.key1], _[userOptions.key2]];
  });
  const virginica_length = viewData.virginica.map(_ => {
    return [_[userOptions.key1], _[userOptions.key2]];
  });

  // 拿出 长度 宽度 数组
  const option = {
    title: {
      text: userOptions.title,
      subtext: 'Data from: 李大庆',
    },
    grid: {
      left: '3%',
      right: '7%',
      bottom: '7%',
      containLabel: true,
    },
    tooltip: {
      // trigger: 'axis',
      showDelay: 0,
      formatter: function (params) {
        if (params.value.length > 1) {
          return (
            params.seriesName +
            ' :<br/>' +
            params.value[0] +
            'cm ' +
            params.value[1] +
            'cm '
          );
        } else {
          return (
            params.seriesName +
            ' :<br/>' +
            params.name +
            ' : ' +
            params.value +
            'cm '
          );
        }
      },
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 1,
        },
      },
    },
    toolbox: {
      feature: {
        dataZoom: {},
        brush: {
          type: ['rect', 'polygon', 'clear'],
        },
      },
    },
    brush: {},
    legend: {
      data: [
        'setosa ' + userOptions.dataType,
        'versicolo ' + userOptions.dataType,
        'virginica ' + userOptions.dataType,
      ],
      left: 'center',
      bottom: 10,
    },
    xAxis: [
      {
        type: 'value',
        scale: true,
        axisLabel: {
          formatter: '{value} cm',
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        axisLabel: {
          formatter: '{value} cm',
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: 'setosa ' + userOptions.dataType,
        type: 'scatter',
        emphasis: {
          focus: 'series',
        },
        // prettier-ignore
        data:setosa_length,
        markArea: {
          silent: true,
          itemStyle: {
            color: 'transparent',
            borderWidth: 1,
            borderType: 'dashed',
          },
          data: [
            [
              {
                name: 'setosa ' + userOptions.dataType + ' Data Range',
                xAxis: 'min',
                yAxis: 'min',
              },
              {
                xAxis: 'max',
                yAxis: 'max',
              },
            ],
          ],
        },
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        markLine: {
          lineStyle: {
            type: 'solid',
          },
          data: [{ type: 'average', name: 'AVG' }, { xAxis: 160 }],
        },
      },
      {
        name: 'versicolo ' + userOptions.dataType,
        type: 'scatter',
        emphasis: {
          focus: 'series',
        },
        // prettier-ignore
        data: versicolo_length,
        markArea: {
          silent: true,
          itemStyle: {
            color: 'transparent',
            borderWidth: 1,
            borderType: 'dashed',
          },
          data: [
            [
              {
                name: 'versicolo ' + userOptions.dataType + ' Data Range',
                xAxis: 'min',
                yAxis: 'min',
              },
              {
                xAxis: 'max',
                yAxis: 'max',
              },
            ],
          ],
        },
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        markLine: {
          lineStyle: {
            type: 'solid',
          },
          data: [{ type: 'average', name: 'Average' }, { xAxis: 170 }],
        },
      },
      {
        name: 'virginica ' + userOptions.dataType,
        type: 'scatter',
        emphasis: {
          focus: 'series',
        },
        // prettier-ignore
        data: virginica_length,
        markArea: {
          silent: true,
          itemStyle: {
            color: 'transparent',
            borderWidth: 1,
            borderType: 'dashed',
          },
          data: [
            [
              {
                name: 'virginica ' + userOptions.dataType + ' Data Range',
                xAxis: 'min',
                yAxis: 'min',
              },
              {
                xAxis: 'max',
                yAxis: 'max',
              },
            ],
          ],
        },
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        markLine: {
          lineStyle: {
            type: 'solid',
          },
          data: [{ type: 'average', name: 'Average' }, { xAxis: 170 }],
        },
      },
    ],
  };
  myChart.setOption(option);
}
export { ScatterView };
