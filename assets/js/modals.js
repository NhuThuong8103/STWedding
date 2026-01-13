// Modal System - Visitor Tracking and Display Logic

document.addEventListener('DOMContentLoaded', () => {
  const VISITOR_KEY = 'wedding_visitor_data';

  // Update Configuration
  const updates = {
    2: {
      title: "Chào mừng bạn quay lại! 🎊",
      content: "Thông tin về các sự kiện lễ cưới đã được cập nhật chi tiết. Đừng bỏ lỡ nhé!",
      scrollTo: "#events"

    },
    3: {
      title: "Cập nhật ảnh đẹp mới! 📅",
      content: "Chúng mình đã cập nhật thêm ảnh mới trong Gallery. Hãy ghé xem những khoảnh khắc tuyệt đẹp nhé!",
      scrollTo: "#gallery"
    },
    4: {
      title: "Lời chúc mới từ người thân! 💌",
      content: "Chúng mình đã thêm những lời chúc ấm áp từ người thân. Cảm ơn bạn đã quan tâm!",
      scrollTo: "#messages"
    }
  };

  // Get modal elements
  const welcomeModal = document.getElementById('welcome-modal');
  const updateModal = document.getElementById('update-modal');
  const welcomeBtn = document.getElementById('welcome-btn');
  const updateDetailsBtn = document.getElementById('update-details-btn');
  const updateCloseBtn = document.getElementById('update-close-btn');
  const modalClose = document.querySelector('.modal-close');
  const updateContent = document.getElementById('update-content');

  // Get or initialize visitor data
  function getVisitorData() {
    const data = localStorage.getItem(VISITOR_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return {
      visitCount: 0,
      firstVisit: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      lastUpdateShown: 0
    };
  }

  // Save visitor data
  function saveVisitorData(data) {
    localStorage.setItem(VISITOR_KEY, JSON.stringify(data));
  }

  // Show modal
  function showModal(modal) {
    if (!modal) return;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  // Hide modal
  function hideModal(modal) {
    if (!modal) return;
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Scroll to section smoothly
  function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
      hideModal(updateModal);
      // Small delay to let modal close animation complete
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Add temporary highlight effect
        element.style.transition = 'background-color 0.5s ease';
        element.style.backgroundColor = 'rgba(251, 113, 133, 0.1)';
        setTimeout(() => {
          element.style.backgroundColor = '';
        }, 2000);
      }, 300);
    }
  }

  // Play music
  function playMusic() {
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-control');

    if (audio && musicBtn) {
      audio.play().then(() => {
        musicBtn.classList.add('playing');
      }).catch(err => {
        console.error("Audio playback failed:", err);
      });
    }
  }

  // Show update notification
  function showUpdateNotification(visitCount) {
    const update = updates[visitCount];
    if (!update) return false;

    updateContent.innerHTML = `
      <h3>${update.title}</h3>
      <p>${update.content}</p>
    `;

    // Store scroll target for the details button
    if (updateDetailsBtn) {
      updateDetailsBtn.dataset.scrollTo = update.scrollTo || '';
    }

    showModal(updateModal);
    return true;
  }

  // Main initialization
  function init() {
    const visitorData = getVisitorData();
    visitorData.visitCount++;
    visitorData.lastVisit = new Date().toISOString();

    // First visit - show welcome modal
    if (visitorData.visitCount === 1) {
      saveVisitorData(visitorData);
      showModal(welcomeModal);
      return;
    }

    // Subsequent visits - check for updates
    if (visitorData.visitCount > visitorData.lastUpdateShown) {
      const hasUpdate = showUpdateNotification(visitorData.visitCount);
      if (hasUpdate) {
        visitorData.lastUpdateShown = visitorData.visitCount;
      }
    }

    saveVisitorData(visitorData);
  }

  // Event Listeners

  // Create fire/heart particles effect
  function createParticles(button) {
    const buttonRect = button.getBoundingClientRect();
    const particles = ['❤️', '🔥', '💝', '✨', '💕', '🎉'];

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'blessing-particle';
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];

      // Position at button center
      particle.style.left = buttonRect.left + buttonRect.width / 2 + 'px';
      particle.style.top = buttonRect.top + buttonRect.height / 2 + 'px';

      // Random horizontal spread
      const spreadX = (Math.random() - 0.5) * 200;
      particle.style.setProperty('--spread-x', spreadX + 'px');

      // Random animation duration
      const duration = 1 + Math.random() * 0.5;
      particle.style.animationDuration = duration + 's';

      // Random delay
      particle.style.animationDelay = (Math.random() * 0.2) + 's';

      document.body.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        particle.remove();
      }, (duration + 0.2) * 1000);
    }
  }

  // Show blessing toast notification
  function showBlessingMessage() {
    // Create or get toast element
    let toast = document.getElementById('blessing-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'blessing-toast';
      toast.className = 'blessing-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="blessing-toast-content">
        <span class="blessing-icon">🎉</span>
        <p>Một lời chúc phúc đã được gởi đến Sang và Thương</p>
      </div>
    `;

    // Show toast
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Hide toast after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Welcome modal button - play music and close
  if (welcomeBtn) {
    welcomeBtn.addEventListener('click', (e) => {
      // Add click effect to button
      welcomeBtn.classList.add('blessing-clicked');

      // Create particle effect
      createParticles(welcomeBtn);

      // Show blessing message
      setTimeout(() => {
        showBlessingMessage();
      }, 500);

      // Play music and close modal
      setTimeout(() => {
        playMusic();
        hideModal(welcomeModal);
        welcomeBtn.classList.remove('blessing-clicked');
      }, 800);
    });
  }

  // Update modal - View Details button
  if (updateDetailsBtn) {
    updateDetailsBtn.addEventListener('click', () => {
      const scrollTo = updateDetailsBtn.dataset.scrollTo;
      if (scrollTo) {
        scrollToSection(scrollTo);
      } else {
        hideModal(updateModal);
      }
    });
  }

  // Update modal - Close button
  if (updateCloseBtn) {
    updateCloseBtn.addEventListener('click', () => {
      hideModal(updateModal);
    });
  }

  // Update modal - X button
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      hideModal(updateModal);
    });
  }

  // Close modal on overlay click
  if (welcomeModal) {
    welcomeModal.addEventListener('click', (e) => {
      if (e.target === welcomeModal) {
        hideModal(welcomeModal);
      }
    });
  }

  if (updateModal) {
    updateModal.addEventListener('click', (e) => {
      if (e.target === updateModal) {
        hideModal(updateModal);
      }
    });
  }

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideModal(welcomeModal);
      hideModal(updateModal);
    }
  });

  // Initialize modal system after preloader
  // Wait a bit to ensure page is ready
  setTimeout(() => {
    init();
  }, 500);
});
