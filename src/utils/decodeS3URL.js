export const decodeS3URL = async (url, type) => {
  try {
    if (type) {
      let decodedURL = atob(url);

      let lastSlashIndex = decodedURL?.lastIndexOf("/");
      let secondLastSlashIndex = decodedURL?.lastIndexOf(
        "/",
        lastSlashIndex - 1
      );
      if (lastSlashIndex !== -1 && secondLastSlashIndex !== -1) {
        let decryptedUrl = decodedURL?.substring(0, secondLastSlashIndex);
        let fileName = decodedURL?.substring(lastSlashIndex + 1);

        const response = await fetch(decryptedUrl);

        if (response) {
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onload = () => {
            const data = new Uint8Array(reader.result);
            const a = document.createElement("a");
            const objUrl = window.URL.createObjectURL(new Blob([data]));
            a.href = objUrl;
            a.download = `${fileName}.${type}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          };
          reader.readAsArrayBuffer(blob);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching file", error);
  }
};
