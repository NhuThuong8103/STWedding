// Preloader and Typewriter Logic
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');

  // Lazy loading cho hình ảnh
  const setupLazyLoading = () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Khi hình ảnh bắt đầu tải
          img.onload = () => {
            img.classList.add('loaded');
            // Xóa background placeholder
            if (img.parentElement && img.parentElement.classList.contains('card-stack-card')) {
              img.parentElement.style.background = 'none';
              img.parentElement.style.animation = 'none';
            }
          };

          // Nếu hình ảnh đã được load từ cache
          if (img.complete) {
            img.classList.add('loaded');
            if (img.parentElement && img.parentElement.classList.contains('card-stack-card')) {
              img.parentElement.style.background = 'none';
              img.parentElement.style.animation = 'none';
            }
          }

          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px', // Bắt đầu tải 50px trước khi hình ảnh xuất hiện
      threshold: 0.01
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  };

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
          element.textContent = '';
          i = 0;
          type();
        }, 3000); // Wait 3 seconds before restarting the loop
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

      // Remove from DOM AND unlock scroll after transition
      preloader.addEventListener('transitionend', () => {
        preloader.style.display = 'none';

        // Ensure body and html classes are restored
        document.body.classList.remove('overflow-hidden');
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.add('overflow-x-hidden');

        // Khởi tạo lazy loading sau khi preloader ẩn
        setupLazyLoading();
      }, { once: true });
    }, 1000);
  } else {
    // Nếu không có preloader, khởi tạo lazy loading ngay lập tức
    setupLazyLoading();
  }
});
