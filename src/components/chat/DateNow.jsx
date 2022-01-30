export default function DateNow() {
  const dateNow = new Date();
  const day = ('0' + dateNow.getDate()).slice(-2);
  const month = ('0' + (dateNow.getMonth() + 1)).slice(-2);
  const year = dateNow.getFullYear();
  const hours = ('0' + dateNow.getHours()).slice(-2);
  const minutes = ('0' + dateNow.getMinutes()).slice(-2);
  let date = `${day}/${month}/${year} ${hours}:${minutes}`
  return date
}