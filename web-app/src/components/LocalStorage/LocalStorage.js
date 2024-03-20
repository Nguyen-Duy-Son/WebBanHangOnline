
// Lưu thông tin vào LocalStorage
function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Lấy thông tin từ LocalStorage
function getItem(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

// Xóa thông tin từ LocalStorage
function removeItem(key) {
  localStorage.removeItem(key);
}

// Export các phương thức để sử dụng trong các module khác
export { setItem, getItem, removeItem};
