// Copy email to clipboard (used by overview Email link).
function copyEmail() {
  navigator.clipboard.writeText("jackh98zz@gmail.com");
  alert("Email copied to clipboard");
}

// Language dropdown: toggle on button click, close on outside click or link navigation.
(function () {
  var dropdown = document.querySelector('.nav-lang-dropdown');
  if (!dropdown) return;

  var toggle = dropdown.querySelector('.nav-lang-toggle');
  var menu = dropdown.querySelector('.nav-lang-menu');

  function open() {
    dropdown.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function close() {
    dropdown.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleOpen() {
    if (dropdown.classList.contains('is-open')) close();
    else open();
  }

  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    toggleOpen();
  });

  document.addEventListener('click', function () {
    close();
  });

  dropdown.addEventListener('click', function (e) {
    e.stopPropagation();
  });
})();
