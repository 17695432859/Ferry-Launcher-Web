// ============ 导航:滚动状态 + 移动端菜单 ============
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const island = document.getElementById('island');

function onScroll() {
  nav.classList.toggle('is-scrolled', window.scrollY > 12);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
  if (open && island) {
    island.classList.remove('is-open');
    island.setAttribute('aria-expanded', 'false');
  }
});

// ============ 灵动岛 ============
if (island) {
  island.addEventListener('click', (e) => {
    // 展开态里点空白不再切换,避免误收起
    const open = !island.classList.contains('is-open');
    island.classList.toggle('is-open', open);
    island.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-island-open', open);
    if (open && navLinks.classList.contains('is-open')) {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
    e.stopPropagation();
  });
  document.addEventListener('click', (e) => {
    if (!island.contains(e.target) && island.classList.contains('is-open')) {
      island.classList.remove('is-open');
      island.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-island-open');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && island.classList.contains('is-open')) {
      island.classList.remove('is-open');
      island.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-island-open');
    }
  });
}
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
const titles = {
  home: '启动 · 实例管理',
  accounts: '账户 · 角色与皮肤',
  download: '下载 · 版本与资源',
  multiplayer: '联机 · 房间直连',
  settings: '设置 · Java 来源与外观',
};

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
  });
});
