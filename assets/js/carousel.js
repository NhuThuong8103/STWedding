document.addEventListener('DOMContentLoaded', () => {
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
});
