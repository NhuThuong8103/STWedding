// --- Lightbox Logic ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxCaption = document.getElementById('lightbox-caption');
const galleryItems = document.querySelectorAll('[data-lightbox-src]');

let currentIndex = 0;

if (lightbox && lightboxImg && lightboxClose) {
  // Function to update the lightbox image based on index
  const updateImage = (index) => {
    if (index >= 0 && index < galleryItems.length) {
      const src = galleryItems[index].dataset.lightboxSrc;
      lightboxImg.src = src;
      currentIndex = index;

      // Update caption
      if (lightboxCaption) {
        const img = galleryItems[index].querySelector('img');
        lightboxCaption.textContent = img ? img.alt : '';
      }
    }
  };

  // Open lightbox on item click
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index;
      updateImage(currentIndex);
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  // Next Button Logic
  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent closing lightbox
      currentIndex = (currentIndex + 1) % galleryItems.length; // Loop to start
      updateImage(currentIndex);
    });
  }

  // Previous Button Logic
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent closing lightbox
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length; // Loop to end
      updateImage(currentIndex);
    });
  }

  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateImage(currentIndex);
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      updateImage(currentIndex);
    }
  });
}
