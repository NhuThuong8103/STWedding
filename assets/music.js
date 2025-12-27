document.addEventListener('DOMContentLoaded', () => {
  // Music Control Logic
  const audio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-control');

  if (audio && musicBtn) {
    let isPlaying = false;

    const updateState = (playing) => {
      if (playing) {
        musicBtn.classList.add('playing');
        isPlaying = true;
      } else {
        musicBtn.classList.remove('playing');
        isPlaying = false;
      }
    };

    // Toggle play/pause on button click
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent this click from triggering the document listener
      if (isPlaying) {
        audio.pause();
        updateState(false);
      } else {
        audio.play().then(() => {
          updateState(true);
        }).catch(err => {
          console.error("Audio playback failed:", err);
        });
      }
    });

    // Function to attempt playing audio
    const tryPlayAudio = () => {
      if (isPlaying) return;

      audio.play().then(() => {
        updateState(true);
        // Remove listeners once successful
        ['click', 'touchstart', 'keydown'].forEach(event => {
          document.removeEventListener(event, tryPlayAudio);
        });
      }).catch(error => {
        console.log("Autoplay/Interaction play blocked:", error);
      });
    };

    // Try to play immediately (works if autoplay is allowed)
    tryPlayAudio();

    // Add interaction listeners to play music on first user action
    ['click', 'touchstart', 'keydown'].forEach(event => {
      document.addEventListener(event, tryPlayAudio);
    });
  }
});
