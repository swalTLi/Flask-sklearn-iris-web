import { getElementById } from './utils/domOperation.js';

// 加载北京动画
window.onload = function () {
  VANTA.BIRDS({
    el: '#my-background',
    mouseControls: false,
    touchControls: false,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    backgroundColor: 0x0,
    color1: 0x7900ff,
    color2: 0xffffff,
    birdSize: 0.7,
    wingSpan: 12.0,
    speedLimit: 3.0,
    separation: 100.0,
    alignment: 11.0,
  });
};

// 实现 动画 实时显示 FPS 功能
var rAF = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

var frame = 0;
var allFrameCount = 0;
var lastTime = Date.now();
var lastFameTime = Date.now();
var FPS = document.getElementById('FPS');
var loop = function () {
  var now = Date.now();
  var fs = now - lastFameTime;
  var fps = Math.round(1000 / fs);

  lastFameTime = now;
  // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
  allFrameCount++;
  frame++;

  if (now > 100 + lastTime) {
    var fps = Math.round((frame * 1000) / (now - lastTime));
    FPS.innerText = `FPS: ` + fps;
    frame = 0;
    lastTime = now;
  }

  rAF(loop);
};

loop();

const clock = setInterval(() => {
  if (VANTA) {
    clearInterval(clock);
    new getElementById('FPS', { style: `display:'';z-index:10` });
    new getElementById('title', { style: 'display:block' });
    new getElementById('train', { style: `display:'';z-index:10` });
  }
}, 200);
