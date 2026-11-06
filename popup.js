// To be called by the menu to trigger corresponding event in content.js
const keys = [
  'hideRecommended', 'hideEvents', 'hideFooter',
  'hideProfile', 'hideInventory', 'hideBlog',
  'hideOfficialStore', 'hideGiftCards', 'hideRobloxPlus',
  'hideRobloxPlusNav', 'hideFriends', 'hideFavourites'
];

// Sync
chrome.storage.sync.get(keys, (data) => {
  keys.forEach(key => {
    if (data[key] === undefined) chrome.storage.sync.set({ [key]: true });
    document.getElementById(key).checked = data[key] !== false;
  });
});

keys.forEach(key => {
  document.getElementById(key).addEventListener('change', (e) => {
    chrome.storage.sync.set({ [key]: e.target.checked });
  });
});
