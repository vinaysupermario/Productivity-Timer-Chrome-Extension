document.getElementById('start-timer').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'startTimer' });
});

document.getElementById('stop-timer').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'stopTimer' });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'startTimer') {
    startTimer();
  } else if (message.action === 'stopTimer') {
    if (timerId) clearTimeout(timerId);
  }
});
