export function base64ToImage(data) {
  const type = data.split(';')[0].substr(5);
  const binary = atob(data.split(',')[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type });
}
