document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const animate = (element, entering = true) => {
    const variant = element.dataset.animate;
    const delay = Number(element.dataset.animateDelay || 0);
    const once = element.dataset.animateOnce === 'true';

    if (entering) {
      element.classList.remove('opacity-0');
      element.style.animationDelay = `${delay}s`;
      element.style.animationFillMode = 'forwards';

      const animationClass = {
        'fade-right': 'animate-fade-in-right',
        'fade-left': 'animate-fade-in-left',
        'fade-down': 'animate-fade-in-down',
        fade: 'animate-fade-in'
      }[variant] || 'animate-fade-in-up';

      element.classList.remove(
        'animate-fade-out',
        'animate-fade-out-up',
        'animate-fade-out-down',
        'animate-fade-out-left',
        'animate-fade-out-right'
      );
      element.classList.add(animationClass);

      if (once) element.dataset.animated = 'true';
    } else {
      element.style.animationDelay = '0s';
      element.classList.remove(
        'animate-fade-in',
        'animate-fade-in-up',
        'animate-fade-in-down',
        'animate-fade-in-left',
        'animate-fade-in-right'
      );

      const animationClass = {
        'fade-right': 'animate-fade-out-right',
        'fade-left': 'animate-fade-out-left',
        'fade-down': 'animate-fade-out-up',
        fade: 'animate-fade-out'
      }[variant] || 'animate-fade-out-down';

      element.classList.add(animationClass);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.dataset.animated === 'true') return;
          animate(entry.target, true);
        } else if (entry.target.dataset.animateOnce !== 'true') {
          animate(entry.target, false);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  animatedElements.forEach((element) => {
    element.classList.add('opacity-0');
    observer.observe(element);
  });
});
