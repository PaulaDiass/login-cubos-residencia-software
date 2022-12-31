function setLocalItem(key, value) {
  sessionStorage.setItem(key, value);
}

function getLocalItem(key) {
  return sessionStorage.getItem(key);
}

function removeLocalItem(key) {
  sessionStorage.removeItem(key);
}

function clearSessionStorage() {
  sessionStorage.clear();
}

export { setLocalItem, getLocalItem, removeLocalItem, clearSessionStorage };
