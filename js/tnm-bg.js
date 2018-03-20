var c = chrome || browser;
var regex = /https:\/\/twitter\.com\/(.*)/;

c.pageAction.onClicked.addListener(function (tab) {
  c.storage.local.get({
    'nightmode': true
  }, function (items) {
    if (items.nightmode) {
      unsetNightMode(tab);
      c.tabs.reload(tab.id);
    } else {
      setNightMode(tab);
    }
  });
});

function unsetNightMode(tab) {
  c.storage.local.set({
    'nightmode': false
  }, function () {
    c.pageAction.setIcon({
      tabId: tab.id,
      path: 'images/icon32-blue.png'
    });
    c.pageAction.setTitle({
      tabId: tab.id,
      title: 'Ночной режим выключен. Нажмите чтобы включить.'
    });
  });
}

function setNightMode(tab) {
  c.storage.local.set({
    'nightmode': true
  }, function () {
    c.tabs.insertCSS(tab.id, {
      file: 'css/style.css',
      allFrames: true
    });
    c.pageAction.setIcon({
      tabId: tab.id,
      path: 'images/icon32.png'
    });
    c.pageAction.setTitle({
      tabId: tab.id,
      title: 'Ночной режим включен.Нажмите чтобы выключить.'
    });
    c.tabs.sendMessage(tab.id, {
      text: "removeUserStyle"
    });
  });
}

c.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url && regex.test(tab.url)) {
    c.pageAction.show(tab.id);
    c.storage.local.get({
      'nightmode': true
    }, function (items) {
      if (items.nightmode) {
        setNightMode(tab);
      } else {
        unsetNightMode(tab);
      }
    });
  } else {
    c.pageAction.setTitle({
      tabId: tab.id,
      title: 'Расширение включено откройте twitter.com'
    });
  }
});