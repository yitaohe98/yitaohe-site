(function(){
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  var nav = document.querySelector('.topbar nav');
  if (!nav) return;
  var path = (location.pathname || '/').replace(/^\//, '').split('/')[0] || '';
  var section = (path === '' || path === 'index.html') ? 'overview' : path;
  nav.querySelectorAll('a').forEach(function(a){
    a.classList.toggle('active', (a.getAttribute('data-section') || '') === section);
  });
})();
