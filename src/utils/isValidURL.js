function isValidURL(url) {
  try {
    // Create a new URL object
    const parsedUrl = new URL(url);
    // Check if the protocol is either http or https
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch (error) {
    // If URL constructor throws an error, the URL is not valid
    return false;
  }
}

export default isValidURL;