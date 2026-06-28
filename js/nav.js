// Burger menu toggle for mobile navigation.
(function () {
  var burger = document.querySelector('.nav__burger');
  var mobile = document.querySelector('.nav__mobile');
  if (!burger || !mobile) return;

  burger.addEventListener('click', function () {
    var open = mobile.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close the menu when a link is tapped.
  mobile.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobile.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();
