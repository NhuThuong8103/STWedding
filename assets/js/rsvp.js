document.addEventListener('DOMContentLoaded', () => {
  const rsvpForm = document.querySelector('[data-rsvp-form]');
  let rsvpStatus = document.querySelector('[data-rsvp-status]');

  // Create status element if it doesn't exist
  if (!rsvpStatus && rsvpForm) {
    rsvpStatus = document.createElement('div');
    rsvpStatus.setAttribute('data-rsvp-status', '');
    rsvpStatus.className = 'mt-4 text-center text-sm font-medium';
    rsvpForm.appendChild(rsvpStatus);
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(rsvpForm);
      const guestName = formData.get('guestName');
      const guestMessage = formData.get('message');
      const attending = formData.get('attending');

      if (!guestName) {
        rsvpStatus.textContent = 'Vui lòng nhập tên của bạn.';
        rsvpStatus.className = 'mt-4 text-center text-sm font-medium text-red-500';
        return;
      }

      // Show loading state
      const submitButton = rsvpForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Đang gửi...';

      try {
        // Submit to Formspree via fetch
        const response = await fetch(rsvpForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success message based on attending status
          const successMessage = attending === 'yes'
            ? `Cảm ơn ${guestName}! Chúng tôi rất mong được gặp bạn tại lễ cưới. 🎉`
            : attending === 'no'
            ? `Cảm ơn ${guestName}. Chúng tôi rất tiếc khi không thể gặp bạn, nhưng chúc bạn mọi điều tốt lành! 💝`
            : `Cảm ơn ${guestName}! Hy vọng bạn sẽ có thể tham dự cùng chúng mình. 🤞`;

          rsvpStatus.textContent = successMessage;
          rsvpStatus.className = 'mt-4 text-center text-sm font-medium text-green-600';

          // Show success icon in button
          submitButton.innerHTML = '<i class="fa-solid fa-check"></i> Đã gửi thành công';
          submitButton.classList.add('!bg-green-500', 'hover:!bg-green-600');

          // Show toast notification
          if (typeof showToast === 'function') {
            const toastContent = guestMessage
              ? `<strong>${guestName}</strong> vừa chia sẻ: "${guestMessage.substring(0, 50)}${guestMessage.length > 50 ? '...' : ''}"`
              : `<strong>${guestName}</strong> vừa gửi lời chúc đến đôi bạn qua RSVP.`;

            showToast(toastContent);
          }

          // Reset form after a delay
          setTimeout(() => {
            rsvpForm.reset();
            submitButton.innerHTML = originalButtonText;
            submitButton.classList.remove('!bg-green-500', 'hover:!bg-green-600');
          }, 3000);
        } else {
          // Error from server
          const data = await response.json();
          rsvpStatus.textContent = 'Có lỗi xảy ra khi gửi. Vui lòng thử lại sau.';
          rsvpStatus.className = 'mt-4 text-center text-sm font-medium text-red-500';
        }
      } catch (error) {
        // Network error
        rsvpStatus.textContent = 'Không thể kết nối. Vui lòng kiểm tra kết nối mạng và thử lại.';
        rsvpStatus.className = 'mt-4 text-center text-sm font-medium text-red-500';
      } finally {
        // Restore button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }
});
