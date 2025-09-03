// Background service worker
console.log("Background service worker running...");

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "pomodoroDone") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon128.png", // make sure this file exists
      title: "Pomodoro Complete!",
      message: "Time for a short break 🎉",
      priority: 2,
    });
  }
});
