document.addEventListener('DOMContentLoaded', () => {
    const gameControl = document.getElementById('game-control');
    const gameModal = document.getElementById('game-modal');
    const modalClose = document.querySelector('.game-modal-close');

    if (gameControl && gameModal) {
        // Open modal
        gameControl.addEventListener('click', () => {
            gameModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        // Close modal via close button
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                gameModal.classList.remove('show');
                document.body.style.overflow = ''; // Restore scrolling
            });
        }

        // Close modal by clicking outside the content
        gameModal.addEventListener('click', (e) => {
            if (e.target === gameModal) {
                gameModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && gameModal.classList.contains('show')) {
                gameModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
});
