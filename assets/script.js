document.addEventListener('DOMContentLoaded', () => {
  const scrollButtons = document.querySelectorAll('[data-scroll-target]');
  const animatedElements = document.querySelectorAll('[data-animate]');
  const rsvpForm = document.querySelector('[data-rsvp-form]');
  const rsvpStatus = document.querySelector('[data-rsvp-status]');
  const countdownValueElements = {
    days: document.querySelector('[data-countdown-days]'),
    hours: document.querySelector('[data-countdown-hours]'),
    minutes: document.querySelector('[data-countdown-minutes]'),
    seconds: document.querySelector('[data-countdown-seconds]')
  };
  const countdownMessage = document.querySelector('[data-countdown-message]');
  const countdownTargetLabel = document.querySelector('[data-countdown-target]');
  let countdownIntervalId = null;
  const COUNTDOWN_TARGET_ISO = '2026-04-30T10:00:00+07:00';

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

  const setCountdownDisplay = (days = '--', hours = '--', minutes = '--', seconds = '--') => {
    countdownValueElements.days.textContent = days;
    countdownValueElements.hours.textContent = hours;
    countdownValueElements.minutes.textContent = minutes;
    countdownValueElements.seconds.textContent = seconds;
  };

  const startCountdown = (targetDate) => {
    clearInterval(countdownIntervalId);

    const updateValues = () => {
      const now = Date.now();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setCountdownDisplay('00', '00', '00', '00');
        countdownMessage.textContent = 'Chúc mừng! Ngày trọng đại đã tới.';
        clearInterval(countdownIntervalId);
        countdownIntervalId = null;
        return;
      }

      const totalSeconds = Math.floor(distance / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setCountdownDisplay(
        String(days).padStart(2, '0'),
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0')
      );
    };

    updateValues();
    countdownIntervalId = setInterval(updateValues, 1000);
  };

  if (
    countdownValueElements.days &&
    countdownValueElements.hours &&
    countdownValueElements.minutes &&
    countdownValueElements.seconds &&
    countdownMessage
  ) {
    const targetDate = new Date(COUNTDOWN_TARGET_ISO);

    if (countdownTargetLabel && !Number.isNaN(targetDate.getTime())) {
      const formatter = new Intl.DateTimeFormat('vi-VN', {
        dateStyle: 'full',
        timeStyle: 'short'
      });
      countdownTargetLabel.textContent = formatter.format(targetDate);
    }

    if (Number.isNaN(targetDate.getTime())) {
      countdownMessage.textContent = 'Không thể xác định ngày trọng đại. Vui lòng kiểm tra lại cấu hình.';
      setCountdownDisplay();
    } else if (targetDate.getTime() <= Date.now()) {
      countdownMessage.textContent = 'Ngày trọng đại đã diễn ra rồi. Cùng lưu lại những kỷ niệm nhé!';
      setCountdownDisplay('00', '00', '00', '00');
    } else {
      startCountdown(targetDate);
    }
  }

  scrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.scrollTarget;
      const targetElement = document.getElementById(targetId);

      if (!targetElement) return;

      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const scrollDownBtn = document.getElementById('scroll-down');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Messages Carousel Logic
  const carousel = document.getElementById('messages-carousel');
  const dots = document.querySelectorAll('.message-dot');
  let currentSlide = 0;
  const slideCount = dots.length;
  let carouselInterval;

  const updateCarousel = (index) => {
    if (!carousel) return;
    carousel.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active-dot', i === index);
      dot.classList.toggle('bg-white/50', i !== index);
    });
    currentSlide = index;
  };

  const startCarousel = () => {
    carouselInterval = setInterval(() => {
      let nextSlide = (currentSlide + 1) % slideCount;
      updateCarousel(nextSlide);
    }, 5000);
  };

  if (carousel && slideCount > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(carouselInterval);
        updateCarousel(index);
        startCarousel();
      });
    });
    updateCarousel(0);
    startCarousel();
  }

  // Toast Notification Logic
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  const toastClose = document.getElementById('toast-close');

  const fakeMessages = [
    "Một người bạn vừa gửi lời chúc đến đôi bạn.",
    "Ảnh mới vừa được thêm vào bộ sưu tập.",
    "Có 5 người đang xem thiệp mời này.",
    "Một lời chúc mới từ 'Người em' vừa được gửi.",
    "Thêm một khoảnh khắc đẹp vừa được chia sẻ.",
    "Vừa có thêm khách mời xác nhận tham dự qua RSVP.",
    "Bạn thân của chú rể vừa gửi một lời nhắn nhủ dễ thương.",
    "Đã có 10 lời chúc được gửi từ gia đình và bạn bè.",
    "Một bức ảnh kỷ niệm từ năm 2018 vừa được đăng tải.",
    "Phụ huynh hai bên đang chuẩn bị những món quà đặc biệt.",
    "Nhóm bạn đại học vừa gửi lời chúc trăm năm hạnh phúc.",
    "Có khách mời vừa chọn 'Chắc chắn rồi!' tại RSVP.",
    "Lời chúc ngọt ngào từ 'Người chị' vừa cập bến.",
    "Sự kiện 'Lễ Vu Quy' đang thu hút sự quan tâm của nhiều người."
  ];

  const showToast = (customContent = null) => {
    if (!toast || !toastMessage) return;

    // Use custom content if provided, otherwise pick a random fake message
    if (customContent) {
      toastMessage.innerHTML = customContent;
    } else {
      const randomIndex = Math.floor(Math.random() * fakeMessages.length);
      toastMessage.textContent = fakeMessages[randomIndex];
    }

    // Show the toast
    toast.classList.add('show');

    // Auto hide after 10 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  };

  if (toast && toastMessage && toastClose) {
    toastClose.addEventListener('click', () => {
      toast.classList.remove('show');
    });

    // Initial show after 30 seconds
    setTimeout(showToast, 5000);

    // Show every 1 minute (60000ms)
    setInterval(showToast, 30000);
  }

  if (rsvpForm && rsvpStatus) {
    rsvpForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(rsvpForm);
      const guestName = formData.get('guestName');
      const guestMessage = formData.get('message');

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

      // Show toast with the actual message
      const toastContent = guestMessage
        ? `<strong>${guestName}</strong> vừa chia sẻ: "${guestMessage.substring(0, 50)}${guestMessage.length > 50 ? '...' : ''}"`
        : `<strong>${guestName}</strong> vừa gửi lời chúc đến đôi bạn qua RSVP.`;

      showToast(toastContent);

      rsvpForm.reset();
    });
  }
});

// Hide Preloader on Window Load
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');

  const typeWriter = (element, text, speed = 100) => {
    element.textContent = '';
    element.classList.add('typing-cursor');
    let i = 0;
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        setTimeout(() => {
          element.classList.remove('typing-cursor');
        }, 1500); // Leave cursor for a bit after finishing
      }
    };
    type();
  };

  if (preloader) {
    // Add a slight delay to ensure a smooth transition
    setTimeout(() => {
      preloader.classList.add('preloader-hidden');

      // Start typing animation after preloader starts hiding
      const typingElement = document.getElementById('typing-text');
      if (typingElement) {
        const originalText = typingElement.textContent;
        // Small delay to let preloader fade out a bit
        setTimeout(() => {
          typeWriter(typingElement, originalText, 150);
        }, 800);
      }

      // Remove from DOM after transition
      preloader.addEventListener('transitionend', () => {
        preloader.style.display = 'none';
      }, { once: true });
    }, 1000);
  }
});



