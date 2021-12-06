export const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve) => {
    let baseURL: string | ArrayBuffer | null = null;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};
