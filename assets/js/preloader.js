// Preloader and Typewriter Logic
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
