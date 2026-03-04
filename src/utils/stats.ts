export const calculateStats = (text: string) => {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const characters = text.length;
  
  // Average reading speed is roughly 200-250 words per minute
  const readingTime = Math.ceil(words / 225);
  
  return { words, characters, readingTime };
};