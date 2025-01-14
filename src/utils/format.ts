export const  formatDate = (dateString?: any) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Kiểm tra nếu không phải là ngày hợp lệ
    return '';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
export const  formatDateTime = (dateString?: any) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Kiểm tra nếu không phải là ngày hợp lệ
    return '';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}