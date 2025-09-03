
export interface UploadedImage {
  file: File;
  base64: string;
}

export interface EditedImageResult {
  imageBase64: string | null;
  text: string | null;
}
