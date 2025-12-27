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
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

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

  // Auto hide after 5 seconds (as in original script)
  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
};

document.addEventListener('DOMContentLoaded', () => {
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  const toastClose = document.getElementById('toast-close');

  if (toast && toastMessage && toastClose) {
    toastClose.addEventListener('click', () => {
      toast.classList.remove('show');
    });

    // Initial show after 5 seconds
    setTimeout(showToast, 5000);

    // Show every 30 seconds
    setInterval(showToast, 30000);
  }
});
