export const checkLoadImage = (url) => {
  const image = new Image();
  return new Promise((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = reject;
    image.src = url;
  });
}