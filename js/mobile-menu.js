// static/js/mobile-menu.js
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("close-menu");
  const menu = document.getElementById("mobile-menu");

  // 确保关键元素存在
  if (!toggleBtn || !menu) return;

  // 打开菜单
  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    menu.classList.remove("hidden");
    menu.classList.add("active");
    document.body.style.overflow = "hidden"; // 禁止背景滚动
  });

  // 关闭菜单函数
  function closeMenu() {
    menu.classList.remove("active");
    // 延迟添加 hidden 类，确保动画完成
    setTimeout(() => {
      menu.classList.add("hidden");
      document.body.style.overflow = ""; // 恢复滚动
    }, 300);
  }

  // 如果存在关闭按钮，绑定事件
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  // 点击菜单外部关闭
  document.addEventListener("click", function (e) {
    if (
      menu.classList.contains("active") &&
      !menu.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // 防止菜单内部点击事件冒泡导致关闭
  menu.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});