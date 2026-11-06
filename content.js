function hideSidebarItem(linkHref) {
  const link = document.querySelector(`a[href="${linkHref}"]`);
  return link ? link.closest('li') : null;
}

function findSidebarItemByText(text) {
  const items = document.querySelectorAll('.left-nav li');
  for (const item of items) {
    if (item.textContent.trim().includes(text)) return item;
  }
  return null;
}

function applySettings(settings) {
  const hideRecommended = settings.hideRecommended !== false;
  const hideEvents = settings.hideEvents !== false;
  const hideFooter = settings.hideFooter !== false;
  const hideProfile = settings.hideProfile !== false;
  const hideInventory = settings.hideInventory !== false;
  const hideBlog = settings.hideBlog !== false;
  const hideOfficialStore = settings.hideOfficialStore !== false;
  const hideGiftCards = settings.hideGiftCards !== false;
  const hideRobloxPlus = settings.hideRobloxPlus !== false;
  const hideRobloxPlusNav = settings.hideRobloxPlusNav !== false;
  const hideFriends = settings.hideFriends !== false;
  const hideFavourites = settings.hideFavourites !== false;

  // Home page sections
  document.querySelectorAll('[aria-label="Recommended For You"]').forEach(el => {
    let parent = el;
    for (let i = 0; i < 6; i++) {
      parent = parent.parentElement;
      if (!parent) break;
      if (parent.querySelector('[data-testid="game-grid"]')) {
        parent.style.display = hideRecommended ? 'none' : '';
        break;
      }
    }
  });

  document.querySelectorAll('.game-sort-carousel-wrapper').forEach(wrapper => {
    if (wrapper.querySelector('.event-tile')) {
      wrapper.style.display = hideEvents ? 'none' : '';
    }
  });

  const footer = document.querySelector('.footer');
  if (footer) footer.style.display = hideFooter ? 'none' : '';

  // Hide ads
  document.querySelectorAll('[data-testid="hero-unit"]').forEach(el => {
    const container = el.closest('.sdui-feed-item-container');
    if (container) container.style.display = 'none';
  });



  // Sidebar items
  const profileItem = hideSidebarItem('https://www.roblox.com/users/profile');
  if (profileItem) profileItem.style.display = hideProfile ? 'none' : '';

  const inventoryItem = hideSidebarItem('https://www.roblox.com/users/inventory');
  if (inventoryItem) inventoryItem.style.display = hideInventory ? 'none' : '';

  const blogItem = hideSidebarItem('https://blog.roblox.com/');
  if (blogItem) blogItem.style.display = hideBlog ? 'none' : '';

  const storeItem = findSidebarItemByText('Official Store');
  if (storeItem) storeItem.style.display = hideOfficialStore ? 'none' : '';

  const giftCardsItem = hideSidebarItem('https://www.roblox.com/giftcards-us');
  if (giftCardsItem) giftCardsItem.style.display = hideGiftCards ? 'none' : '';

  const robloxPlusItem = document.querySelector('.left-nav a[href="/plus"]');
  if (robloxPlusItem) robloxPlusItem.closest('li').style.display = hideRobloxPlus ? 'none' : '';

  const robloxPlusNavItem = hideSidebarItem('https://www.roblox.com/plus');
  if (robloxPlusNavItem) robloxPlusNavItem.style.display = hideRobloxPlusNav ? 'none' : '';

  const friendsItem = document.querySelector('.left-nav a[href="https://www.roblox.com/users/friends#!/friend-requests"]');
  if (friendsItem) friendsItem.closest('li').style.display = hideFriends ? 'none' : '';

  const favouritesItem = document.querySelector('.left-nav .roseal-left-nav-item');
  if (favouritesItem) favouritesItem.style.display = hideFavourites ? 'none' : '';

}

// Keys being created again
const allKeys = [
  'hideRecommended', 'hideEvents', 'hideFooter',
  'hideProfile', 'hideInventory', 'hideBlog',
  'hideOfficialStore', 'hideGiftCards', 'hideRobloxPlus',
  'hideRobloxPlusNav', 'hideFriends', 'hideFavourites'
];

// Sync
chrome.storage.sync.get(allKeys, (data) => {
  applySettings(data);
});

const observer = new MutationObserver(() => {
  chrome.storage.sync.get(allKeys, (data) => {
    applySettings(data);
  });
});

observer.observe(document.body, { childList: true, subtree: true });
