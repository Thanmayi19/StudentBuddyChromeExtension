// ===== Dark Mode Toggle =====
const themeBtn = document.getElementById("toggleTheme");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

  chrome.storage.sync.set({ darkMode: isDark });
});

// Load saved theme
chrome.storage.sync.get("darkMode", (data) => {
  if (data.darkMode) {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ Light Mode";
  }
});

// ===== Custom Links =====
const addLinkBtn = document.getElementById("addLink");
const customLinks = document.getElementById("customLinks");

function loadLinks() {
  chrome.storage.sync.get("links", (data) => {
    customLinks.innerHTML = "";
    if (data.links) {
      data.links.forEach((link, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${link.url}" target="_blank">${link.name}</a>
          <button class="removeLink" data-index="${index}">❌</button>`;
        customLinks.appendChild(li);
      });

      // Remove buttons
      document.querySelectorAll(".removeLink").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = btn.getAttribute("data-index");
          data.links.splice(idx, 1);
          chrome.storage.sync.set({ links: data.links }, loadLinks);
        });
      });
    }
  });
}

addLinkBtn.addEventListener("click", () => {
  const name = document.getElementById("newLinkName").value.trim();
  const url = document.getElementById("newLinkURL").value.trim();
  if (name && url) {
    chrome.storage.sync.get("links", (data) => {
      const links = data.links || [];
      links.push({ name, url });
      chrome.storage.sync.set({ links }, loadLinks);
    });
    document.getElementById("newLinkName").value = "";
    document.getElementById("newLinkURL").value = "";
  }
});

loadLinks();

// ===== To-Do List =====
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Load saved tasks
chrome.storage.sync.get("tasks", (data) => {
  if (data.tasks) {
    data.tasks.forEach(addTaskToUI);
  }
});

addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task) {
    addTaskToUI(task);
    saveTask(task);
    taskInput.value = "";
  }
});

function saveTask(task) {
  chrome.storage.sync.get("tasks", (data) => {
    const tasks = data.tasks || [];
    tasks.push(task);
    chrome.storage.sync.set({ tasks });
  });
}

function addTaskToUI(task) {
  const li = document.createElement("li");
  li.innerHTML = `${task} <button class="removeTask">❌</button>`;

  li.querySelector(".removeTask").onclick = () => {
    li.remove();
    removeTask(task);
  };

  taskList.appendChild(li);
}

function removeTask(task) {
  chrome.storage.sync.get("tasks", (data) => {
    const tasks = (data.tasks || []).filter((t) => t !== task);
    chrome.storage.sync.set({ tasks });
  });
}

// ===== Timer =====
let timerInterval;
let timeLeft = 25 * 60; // default 25 min

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const setBtn = document.getElementById("setTime");

function updateDisplay() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  if (hours > 0) {
    timerDisplay.textContent = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
}

startBtn.addEventListener("click", () => {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("⏰ Time's up!");
    }
  }, 1000);
});

pauseBtn.addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = 25 * 60;
  updateDisplay();
});

setBtn.addEventListener("click", () => {
  const hours = parseInt(document.getElementById("hoursInput").value) || 0;
  const minutes = parseInt(document.getElementById("minutesInput").value) || 0;
  const seconds = parseInt(document.getElementById("secondsInput").value) || 0;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds > 0) {
    timeLeft = totalSeconds;
    updateDisplay();
  }
});

updateDisplay();
