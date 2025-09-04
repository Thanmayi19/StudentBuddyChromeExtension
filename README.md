# Student Buddy - Chrome Extension  
*Your all-in-one study companion: tasks, quick links, timer, and more — right inside Chrome.*  

---

## 📖 Description  
**Student Buddy** is a Chrome extension designed to help students stay organized and productive.  
It combines essential study tools in one convenient popup interface, including task management, quick access to educational websites, and a customizable timer for study sessions.  

---

## ✨ Features  
- 📝 **Task Management** – Add, track, and remove study tasks with persistent storage  
- 🔗 **Quick Links** – Pre-configured links to Canvas, Gmail, Google Drive, plus ability to add custom sites  
- ⏰ **Custom Timer** – Start, pause, reset, and set your own study session length (HH:MM:SS)  
- 🌙 **Dark Mode** – Toggle between light and dark themes for comfort  
- 🔔 **Notifications** – Get desktop alerts when sessions complete  
- 💾 **Data Sync** – All tasks, links, and settings sync across devices using Chrome storage  

---

## 🚀 Installation  

### From Source Code  
1. **Clone or download** this repository  
2. Open Chrome and go to `chrome://extensions/`  
3. Toggle **Developer Mode** (top-right corner)  
4. Click **Load unpacked** and select the extension folder  
5. Pin **Student Buddy** from the Chrome toolbar puzzle piece  

---

## 🛠️ Usage  
- **Access**: Click the Student Buddy icon in Chrome toolbar  
- **Add Tasks**: Enter a task and click *Add*  
- **Manage Links**: Add/edit quick links (Canvas, Gmail, Drive, or your own)  
- **Use Timer**: Set custom duration or use the default Pomodoro style  
- **Switch Theme**: Toggle dark/light mode for comfort 

---

## 📸 Screenshots
<p float="left">
  <img src="https://drive.google.com/uc?export=view&id=1t2Wdihbxi7Y7wGdyTndhJkmHf8QEKRiw" width="220"/>
  <img src="https://drive.google.com/uc?export=view&id=1Qv0zMQAtmrGPuyqXdJIr9acRKRb4xBxF" width="220"/>
  <img src="https://drive.google.com/uc?export=view&id=1aYt4o9MxdZPb0CvtNklSYp-WwngJ1Zie" width="220"/>
  <img src="https://drive.google.com/uc?export=view&id=1W4c1_LckggcWAGdCh62n672SHUlDPGU5" width="220"/>
</p>

---

## 🧩 Technologies Used  
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)  
- **Chrome APIs**:  
  - `chrome.storage.sync` → Data persistence  
  - `chrome.notifications` → Alerts  
  - `chrome.alarms` → Timer logic  
  - `chrome.runtime` → Background messaging  
- **Architecture**: Manifest V3  
- **Styling**: Custom CSS (dark/light theme support)  

---

## 📂 File Structure  
<pre>Student Buddy/
├── manifest.json          # Extension configuration
├── popup.html            # Main interface
├── popup.js              # Core functionality
├── popup.css             # Main styling
├── background.js         # Service worker for notifications
├── options.html          # Settings page
├── options.js            # Settings functionality
├── options.css           # Settings styling
└── icons/                # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
</pre>
