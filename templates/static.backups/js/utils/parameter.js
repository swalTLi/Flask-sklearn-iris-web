function optionArguments(flowerData, key) {
  const _value = {
    fc: {
      id: 'fc',
      style: 'font-size:14px;',
      innerText: '方差：' + Number(flowerData['方差']).toFixed(5),
    },
    jc: {
      id: 'jc',
      style: 'font-size:14px;',
      innerText: '极差：' + flowerData['极差'].toFixed(5),
    },
    bzztfb: {
      id: 'bzztfb',
      style: 'font-size:14px;',
      innerText: '标准正态分布峰度：' + flowerData['标准正态分布峰度'],
    },
    cdfd: {
      id: 'cdfd',
      style: 'font-size:14px;',
      innerText: '花瓣长度峰度：' + flowerData['花瓣长度峰度'],
    },
    kdfd: {
      id: 'kdfd',
      style: 'font-size:14px;',
      innerText: '花萼宽度峰度：' + flowerData['花萼宽度峰度'],
    },
  };
  return _value[key];
}
export { optionArguments };
