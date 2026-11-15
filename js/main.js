(function () {
  document.documentElement.classList.add('js');

  // ヘッダーの下線 & トップへ戻るボタン
  var header = document.querySelector('.site-header');
  var toTop = document.querySelector('.to-top');
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 10);
    toTop.classList.toggle('is-visible', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ページ先頭へ戻る（ロゴ・上に戻るボタン）
  document.querySelectorAll('a[href="#top"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // スマホメニュー
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('global-nav');
  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'メニューを開く' : 'メニューを閉じる');
    nav.classList.toggle('is-open', !open);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'メニューを開く');
      nav.classList.remove('is-open');
    }
  });

  // YouTube：サーバー公開時はページ内で再生、ローカル（file://）ではYouTubeを新しいタブで開く
  var facade = document.querySelector('.yt-facade');
  if (facade && location.protocol !== 'file:') {
    facade.addEventListener('click', function (e) {
      e.preventDefault();
      var id = facade.getAttribute('data-video-id');
      var iframe = document.createElement('iframe');
      iframe.className = 'yt-iframe';
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = facade.getAttribute('aria-label');
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      facade.replaceWith(iframe);
    });
  }

  // スクロールで要素をふわっと表示
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el, i) {
    el.style.transitionDelay = (i % 6) * 60 + 'ms';
    io.observe(el);
  });
})();
