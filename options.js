// Load saved token
window.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['apiToken'], (result) => {
    document.getElementById('token').value = result.apiToken || '';
  });
});

// Save token
const saveBtn = document.getElementById('save');
if (saveBtn) {
  saveBtn.addEventListener('click', () => {
    const token = document.getElementById('token').value;
    chrome.storage.sync.set({ apiToken: token }, () => {
      alert('Token saved!');
    });
  });
}
