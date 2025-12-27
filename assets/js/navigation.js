document.addEventListener('DOMContentLoaded', () => {
  const scrollButtons = document.querySelectorAll('[data-scroll-target]');
  const scrollDownBtn = document.getElementById('scroll-down');

  scrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.scrollTarget;
      const targetElement = document.getElementById(targetId);

      if (!targetElement) return;

      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
});
