/*
  # 按照宽高比例设定html字体, width=device-width initial-scale=1版
  # @pargam win 窗口window对象
  # @pargam option{
    designWidth: 设计稿宽度，必须
    designHeight: 设计稿高度，不传的话则比例按照宽度来计算，可选
    designFontSize: 设计稿宽高下用于计算的字体大小，默认20，可选
    maxWidth: 页面最大宽度值，默认20，可选
    callback: 字体计算之后的回调函数，可选
  }
  # return Boolean;
  # ps:请尽量第一时间运行此js计算字体
*/
!(function (win, option) {
  var count = 0,
    designWidth = option.designWidth,
    designHeight = option.designHeight || 0,
    designFontSize = option.designFontSize || 20,
    maxWidth = option.maxWidth || 800,
    callback = option.callback || null,
    root = document.documentElement,
    rootWidth,
    newSize,
    t,
    self;

  // 返回root元素字体计算结果
  function _getNewFontSize() {
    var winWidth = win.innerWidth > maxWidth ? maxWidth : win.innerWidth;
    var scale =
      designHeight !== 0
        ? Math.min(winWidth / designWidth, win.innerHeight / designHeight)
        : winWidth / designWidth;

    // 750px
    return scale * designFontSize;

    // 375px
    // return scale * designFontSize * 2;
  }

  !(function () {
    var winWidth = win.innerWidth > maxWidth ? maxWidth : win.innerWidth;
    rootWidth = root.getBoundingClientRect().width;
    self = self ? self : arguments.callee;
    // 如果此时屏幕宽度不准确，就尝试再次获取分辨率，只尝试20次，否则使用win.innerWidth计算
    if (rootWidth !== winWidth && count < 20) {
      win.setTimeout(function () {
        count++;
        self();
      }, 0);
    } else {
      newSize = Math.floor(_getNewFontSize());
      // 如果css已经兼容当前分辨率就不管了
      if (newSize + 'px' !== getComputedStyle(root)['font-size']) {
        root.style.fontSize = newSize + 'px';
        return callback && callback(newSize);
      }
    }
  })();

  // 横竖屏切换的时候改变fontSize，根据需要选择使用
  win.addEventListener(
    'onorientationchange',
    function () {
      clearTimeout(t);
      t = setTimeout(function () {
        self();
      }, 200);
    },
    false
  );

  win.addEventListener(
    'resize',
    function () {
      clearTimeout(t);
      t = setTimeout(function () {
        self();
      }, 200);
    },
    false
  );

  // 禁用safari缩放
  win.document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });
})(window, {
  designWidth: 750,
  // designHeight: 1334,
  designFontSize: 100,
  maxWidth: 800
});
