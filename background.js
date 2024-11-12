let timerId;
const TIMER_DURATION = 25 * 60 * 1000; // 25 minutes in milliseconds

// Function to start the 25-minute timer
function startTimer() {
  // Clear any existing timer before starting a new one
  if (timerId) clearTimeout(timerId);

  timerId = setTimeout(() => {
    // Show a notification when the timer ends
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",  // Optional icon for the notification
      title: "Timer Over",
      message: "Your 25-minute productivity timer has ended.",
      buttons: [
        { title: "Dismiss" },
        { title: "Restart" }
      ]
    });
  }, TIMER_DURATION);
}

// Handle notification button clicks
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (buttonIndex === 0) {
    // Dismiss button
    chrome.notifications.clear(notificationId);
  } else if (buttonIndex === 1) {
    // Restart button
    startTimer();
  }
});

// Monitor active tabs to start timer on specific sites
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.includes("example.com")) {  // Change this to specific websites
    startTimer();
  }
});
