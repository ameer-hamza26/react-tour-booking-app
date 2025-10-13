// Utility functions for handling tour images

// Get the backend base URL for images
const getBackendBaseUrl = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
  // Remove '/api' from the end to get the base server URL
  return apiBaseUrl.replace('/api', '');
};

/**
 * Get the full image URL for a tour image
 * @param {string|object} image - Image URL string or image object with url property
 * @returns {string} Full image URL
 */
export const getImageUrl = (image) => {
  if (!image) {
    return '/default-tour-image.jpg'; // Fallback image
  }

  let imageUrl;
  
  // Handle different image formats
  if (typeof image === 'string') {
    imageUrl = image;
  } else if (image && typeof image === 'object' && image.url) {
    imageUrl = image.url;
  } else {
    return '/default-tour-image.jpg';
  }

  // If the URL is already a full URL (starts with http), return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // If the URL starts with '/uploads', construct the full URL
  if (imageUrl.startsWith('/uploads')) {
    return `${getBackendBaseUrl()}${imageUrl}`;
  }

  // If it's just a filename, assume it's in uploads directory
  if (!imageUrl.startsWith('/')) {
    return `${getBackendBaseUrl()}/uploads/${imageUrl}`;
  }

  // For any other case, prepend the backend base URL
  return `${getBackendBaseUrl()}${imageUrl}`;
};

/**
 * Get the first image URL from an array of images
 * @param {Array} images - Array of image objects or strings
 * @returns {string} First image URL or fallback
 */
export const getFirstImageUrl = (images) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return '/default-tour-image.jpg';
  }

  return getImageUrl(images[0]);
};

/**
 * Get all image URLs from an array of images
 * @param {Array} images - Array of image objects or strings
 * @returns {Array} Array of full image URLs
 */
export const getAllImageUrls = (images) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return ['/default-tour-image.jpg'];
  }

  return images.map(image => getImageUrl(image));
};

/**
 * Check if an image URL is valid
 * @param {string} url - Image URL to validate
 * @returns {boolean} True if URL is valid
 */
export const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  // Check if it's a valid URL format
  try {
    new URL(url);
    return true;
  } catch {
    // If it's not a full URL, check if it's a valid path
    return url.startsWith('/') || url.includes('.');
  }
};
