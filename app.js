document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeBtn');
  const mainContent = document.getElementById('mainContent');

  menuBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
    mainContent.classList.add('shifted');
  });
  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
    mainContent.classList.remove('shifted');
  });
});
