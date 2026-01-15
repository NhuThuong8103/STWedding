document.addEventListener('DOMContentLoaded', () => {
  const rsvpForm = document.querySelector('[data-rsvp-form]');
  const rsvpStatus = document.querySelector('[data-rsvp-status]') || document.createElement('div'); // Fallback if not found

  if (rsvpForm) {
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

      // Show toast with the actual message (showToast is defined in notifications.js)
      if (typeof showToast === 'function') {
        const toastContent = guestMessage
          ? `<strong>${guestName}</strong> vừa chia sẻ: "${guestMessage.substring(0, 50)}${guestMessage.length > 50 ? '...' : ''}"`
          : `<strong>${guestName}</strong> vừa gửi lời chúc đến đôi bạn qua RSVP.`;

        showToast(toastContent);
      }

      rsvpForm.submit();
      rsvpForm.reset();
    });
  }
});
