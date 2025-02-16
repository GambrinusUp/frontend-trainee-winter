// Функция для валидации ссылки на картинку
export const isImageUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const fileName = parsedUrl.pathname.split(/[#?]/)[0].split('/').pop() || '';
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension);
  } catch {
    return false;
  }
};
