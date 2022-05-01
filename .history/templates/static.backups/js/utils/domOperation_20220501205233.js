// 获取 DOM 并设置参数
function getElementById(id, options = undefined) {
  this._id = id;
  this._options = options;
  this._dom = document.getElementById(id);
  const that = this;
  // 设置dom属性
  if (this._options) {
    for (const key in this._options) {
      this._dom[key] = this._options[key];
    }
  }
  this.getOptions = function () {
    return this._options;
  };
  this._dom._appendChild = function (child) {
    that._dom.appendChild(child);
    return that._dom;
  };
  this._dom._addEventListener = function (event, fn) {
    that._dom.addEventListener(event, fn);
    return that._dom;
  };
  return this._dom;
}

// 创建 DOM 并设置参数
function Element(node, options) {
  this._node = node;
  this._options = options;
  this._dom = document.createElement(node);
  const that = this;
  // 设置dom属性
  if (this._options) {
    for (const key in this._options) {
      this._dom[key] = this._options[key];
    }
  }
  this.getOptions = function () {
    return this._options;
  };
  this._dom._appendChild = function (child) {
    that._dom.appendChild(child);
    return that._dom;
  };
  this._dom._addEventListener = function (event, fn) {
    that._dom.addEventListener(event, fn);
    return that._dom;
  };
  return this._dom;
}
export { getElementById, Element };
