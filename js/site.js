(function(){
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  var nav = document.querySelector('.topbar nav');
  if (!nav) return;
  var segments = (location.pathname || '/').replace(/^\//, '').replace(/\/$/, '').split('/').filter(Boolean);
  var section = (segments[0] === 'en' && segments[1]) ? segments[1] : 'overview';
  nav.querySelectorAll('a').forEach(function(a){
    a.classList.toggle('active', (a.getAttribute('data-section') || '') === section);
  });
})();
