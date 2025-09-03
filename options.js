const linkName = document.getElementById("linkName");
const linkUrl = document.getElementById("linkUrl");
const addLinkBtn = document.getElementById("addLink");
const linkList = document.getElementById("linkList");
const darkModeToggle = document.getElementById("darkModeToggle");

// Load saved settings
chrome.storage.sync.get(["links", "darkMode"], (data) => {
  if (data.links) {
    data.links.forEach(addLinkToUI);
  }
  if (data.darkMode) {
    darkModeToggle.checked = true;
  }
});

// Add new link
addLinkBtn.addEventListener("click", () => {
  const name = linkName.value.trim();
  const url = linkUrl.value.trim();
  if (name && url) {
    addLinkToUI({ name, url });
    saveLink({ name, url });
    linkName.value = "";
    linkUrl.value = "";
  }
});

// Save link to storage
function saveLink(link) {
  chrome.storage.sync.get("links", (data) => {
    const links = data.links || [];
    links.push(link);
    chrome.storage.sync.set({ links });
  });
}

// Add link to UI
function addLinkToUI(link) {
  const li = document.createElement("li");
  li.textContent = `${link.name} - ${link.url}`;

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.style.marginLeft = "10px";
  delBtn.onclick = () => {
    li.remove();
    removeLink(link);
  };

  li.appendChild(delBtn);
  linkList.appendChild(li);
}

// Remove link from storage
function removeLink(link) {
  chrome.storage.sync.get("links", (data) => {
    const links = (data.links || []).filter(
      (l) => l.name !== link.name || l.url !== link.url
    );
    chrome.storage.sync.set({ links });
  });
}

// Dark Mode toggle
darkModeToggle.addEventListener("change", () => {
  chrome.storage.sync.set({ darkMode: darkModeToggle.checked });
});
