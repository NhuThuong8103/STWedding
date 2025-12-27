document.addEventListener('DOMContentLoaded', () => {
  const countdownValueElements = {
    days: document.querySelector('[data-countdown-days]'),
    hours: document.querySelector('[data-countdown-hours]'),
    minutes: document.querySelector('[data-countdown-minutes]'),
    seconds: document.querySelector('[data-countdown-seconds]')
  };
  const countdownMessage = document.querySelector('[data-countdown-message]');
  const countdownTargetLabel = document.querySelector('[data-countdown-target]');
  let countdownIntervalId = null;
  const COUNTDOWN_TARGET_ISO = '2026-04-30T10:00:00+07:00';

  const setCountdownDisplay = (days = '--', hours = '--', minutes = '--', seconds = '--') => {
    if (countdownValueElements.days) countdownValueElements.days.textContent = days;
    if (countdownValueElements.hours) countdownValueElements.hours.textContent = hours;
    if (countdownValueElements.minutes) countdownValueElements.minutes.textContent = minutes;
    if (countdownValueElements.seconds) countdownValueElements.seconds.textContent = seconds;
  };

  const startCountdown = (targetDate) => {
    clearInterval(countdownIntervalId);

    const updateValues = () => {
      const now = Date.now();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setCountdownDisplay('00', '00', '00', '00');
        if (countdownMessage) countdownMessage.textContent = 'Chúc mừng! Ngày trọng đại đã tới.';
        clearInterval(countdownIntervalId);
        countdownIntervalId = null;
        return;
      }

      const totalSeconds = Math.floor(distance / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setCountdownDisplay(
        String(days).padStart(2, '0'),
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0')
      );
    };

    updateValues();
    countdownIntervalId = setInterval(updateValues, 1000);
  };

  if (
    countdownValueElements.days &&
    countdownValueElements.hours &&
    countdownValueElements.minutes &&
    countdownValueElements.seconds &&
    countdownMessage
  ) {
    const targetDate = new Date(COUNTDOWN_TARGET_ISO);

    if (countdownTargetLabel && !Number.isNaN(targetDate.getTime())) {
      const formatter = new Intl.DateTimeFormat('vi-VN', {
        dateStyle: 'full',
        timeStyle: 'short'
      });
      countdownTargetLabel.textContent = formatter.format(targetDate);
    }

    if (Number.isNaN(targetDate.getTime())) {
      countdownMessage.textContent = 'Không thể xác định ngày trọng đại. Vui lòng kiểm tra lại cấu hình.';
      setCountdownDisplay();
    } else if (targetDate.getTime() <= Date.now()) {
      countdownMessage.textContent = 'Ngày trọng đại đã diễn ra rồi. Cùng lưu lại những kỷ niệm nhé!';
      setCountdownDisplay('00', '00', '00', '00');
    } else {
      startCountdown(targetDate);
    }
  }
});
