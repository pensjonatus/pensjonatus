document.querySelector('.hamburger')?.addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) {
    throw new Error('Cannot find nav links');
  }
  navLinks.classList.toggle('expanded');
});
