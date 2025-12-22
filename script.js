document.addEventListener('DOMContentLoaded', () => {
  const scrollButtons = document.querySelectorAll('[data-scroll-target]');
  const animatedElements = document.querySelectorAll('[data-animate]');
  const rsvpForm = document.querySelector('[data-rsvp-form]');
  const rsvpStatus = document.querySelector('[data-rsvp-status]');

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

  scrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.scrollTarget;
      const targetElement = document.getElementById(targetId);

      if (!targetElement) return;

      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if (!rsvpForm || !rsvpStatus) return;

  rsvpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(rsvpForm);
    const guestName = formData.get('guestName');

    if (!guestName) {
      rsvpStatus.textContent = 'Vui lòng nhập tên của bạn.';
      rsvpStatus.classList.remove('text-brand-500');
      rsvpStatus.classList.add('text-red-500');
      return;
    }

    const attending = formData.get('attending') === 'yes';

    rsvpStatus.textContent = attending
      ? `Cảm ơn ${guestName}! Chúng tôi rất mong được gặp bạn tại lễ cưới.`
      : `Cảm ơn ${guestName}. Chúng tôi rất tiếc khi không thể gặp bạn, nhưng chúc bạn mọi điều tốt lành!`;
    rsvpStatus.classList.remove('text-red-500');
    rsvpStatus.classList.add('text-brand-500');

    rsvpForm.reset();
  });
});
