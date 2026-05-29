export interface PhotoBase64Payload {
  data: string;
  mimeType: string;
  fileName: string;
}

const MAX_PHOTOS = 10;
const MAX_FILE_SIZE = 8 * 1024 * 1024;

export async function filesToBase64Payload(
  files: File[],
): Promise<PhotoBase64Payload[]> {
  const slice = files.slice(0, MAX_PHOTOS);

  return Promise.all(
    slice.map(
      (file) =>
        new Promise<PhotoBase64Payload>((resolve, reject) => {
          if (file.size > MAX_FILE_SIZE) {
            reject(new Error(`Файл «${file.name}» больше 8 МБ`));
            return;
          }

          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            const comma = result.indexOf(",");
            const data = comma >= 0 ? result.slice(comma + 1) : result;
            resolve({
              data,
              mimeType: file.type || "image/jpeg",
              fileName: file.name,
            });
          };
          reader.onerror = () => reject(new Error(`Не удалось прочитать ${file.name}`));
          reader.readAsDataURL(file);
        }),
    ),
  );
}
