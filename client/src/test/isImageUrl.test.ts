import { isImageUrl } from '../modules/PlacementForm/components/GeneralStep/GeneralStep.utils';

describe('isImageUrl', () => {
  it('should return true for valid image url with different extensions', () => {
    expect(isImageUrl('https://example.com/image.jpg')).toBe(true);
    expect(isImageUrl('https://example.com/image.jpeg')).toBe(true);
    expect(isImageUrl('https://example.com/image.png')).toBe(true);
    expect(isImageUrl('https://example.com/image.gif')).toBe(true);
    expect(isImageUrl('https://example.com/image.webp')).toBe(true);
    expect(isImageUrl('https://example.com/image.svg')).toBe(true);
  });

  it('should return false for invalid image url', () => {
    expect(isImageUrl('https://example.com/image.txt')).toBe(false);
    expect(isImageUrl('https://example.com/image.docx')).toBe(false);
    expect(isImageUrl('https://example.com/image')).toBe(false);
    expect(isImageUrl('https://example.com/')).toBe(false);
  });

  it('should return false for invalid url', () => {
    expect(isImageUrl('invalid-url')).toBe(false);
    expect(isImageUrl('http://')).toBe(false);
    expect(isImageUrl('')).toBe(false);
  });
});
