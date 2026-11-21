// ============ 导航:下滑收成灵动岛 + 移动端菜单 ============
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// 下滑超过阈值就收缩成居中胶囊;回到接近顶部再展开。
// 两个阈值留一点回滞,免得停在边缘时来回抖。
const CONDENSE_AT = 48;
const EXPAND_AT = 24;
let navTicking = false;

function updateNav() {
  const y = window.scrollY;
  const condensed = nav.classList.contains('is-scrolled');
  if (!condensed && y > CONDENSE_AT) {
    nav.classList.add('is-scrolled');
  } else if (condensed && y < EXPAND_AT) {
    nav.classList.remove('is-scrolled');
  }
  navTicking = false;
}

window.addEventListener('scroll', () => {
  if (!navTicking) {
    navTicking = true;
    requestAnimationFrame(updateNav);
  }
}, { passive: true });
updateNav();

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ 滚动进入动画 ============
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-in'));
}

// ============ 界面展示 Tabs ============
const tabs = document.querySelectorAll('.tab');
const shots = document.querySelectorAll('.shot');
const showcaseTitle = document.getElementById('showcaseTitle');
const tabsWrap = document.querySelector('.tabs');
const tabsPill = document.querySelector('.tabs__pill');
const titles = {
  home: '启动 · 实例管理',
  accounts: '账户 · 角色与皮肤',
  download: '下载 · 版本与资源',
  multiplayer: '联机 · 房间直连',
  settings: '设置 · Java 来源与外观',
};

// 滑块跟着当前标签走;标签换行时也按实际位置算
function movePill() {
  const active = tabsWrap && tabsWrap.querySelector('.tab.is-active');
  if (!active || !tabsPill) return;
  tabsPill.style.width = active.offsetWidth + 'px';
  tabsPill.style.height = active.offsetHeight + 'px';
  tabsPill.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;
    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
    });
    shots.forEach((shot) => shot.classList.toggle('is-active', shot.dataset.shot === target));
    showcaseTitle.textContent = titles[target] || '';
    requestAnimationFrame(movePill);
  });
});

// 首屏、字体加载完、窗口尺寸变化后重新对齐滑块
requestAnimationFrame(movePill);
window.addEventListener('load', movePill);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(movePill);
let pillRaf = 0;
window.addEventListener('resize', () => {
  cancelAnimationFrame(pillRaf);
  pillRaf = requestAnimationFrame(movePill);
}, { passive: true });
