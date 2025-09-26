(function () {
  'use strict';

  if (!document.queryCommandSupported('copy')) return;

  function flashCopyMessage(el, msg) {
    el.textContent = msg;
    setTimeout(() => el.textContent = "Copy", 1000);
  }

  function selectText(node) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    return selection;
  }

  function addCopyButton(pre) {
    // 防止重复添加
    if (pre.querySelector('.copy-code-button')) return;

    // 确保 pre 有定位
    if (getComputedStyle(pre).position === 'static') {
      pre.style.position = 'relative';
    }

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-button';
    copyBtn.textContent = 'Copy';

    copyBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      try {
        const selection = selectText(pre);
        document.execCommand('copy');
        selection.removeAllRanges();
        flashCopyMessage(copyBtn, 'Copied!');
      } catch (err) {
        console.error('Copy failed:', err);
        flashCopyMessage(copyBtn, 'Failed :\'(');
      }
    });

    pre.appendChild(copyBtn); // 加到 pre 内部
  }

  // 等待 DOM 加载完成
  document.addEventListener('DOMContentLoaded', function () {
    const pres = document.querySelectorAll('pre');
    pres.forEach(pre => {
      if (pre.querySelector('code')) {
        addCopyButton(pre);
      }
    });
  });

})();