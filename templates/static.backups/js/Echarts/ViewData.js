// 处理数据集合，生成图表格
function getViewData() {
  let setosa = [];
  let versicolo = [];
  let virginica = [];
  let valArr = undefined;
  $.ajaxSettings.async = false;
  $.getJSON('/static/js/lib/output.json', data => {}).then(val => {
    valArr = val;
    valArr.forEach((element, index) => {
      if (index >= 0 && index <= 49) {
        setosa.push(element);
      } else if (index >= 50 && index <= 99) {
        versicolo.push(element);
      } else if (index >= 100 && index <= 149) {
        virginica.push(element);
      }
    });
  });
  return {
    // 全部数据
    val: valArr,
    setosa: setosa,
    versicolo: versicolo,
    virginica: virginica,
  };
}
export { getViewData as getViewData };
