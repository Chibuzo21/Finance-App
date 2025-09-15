"use client";
import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 0.5, // must be <=0.5MB(512kb bucket limit)
  maxWidthOrHeight: 512, // keep dimensions reasonable
  useWebWorker: true,
};

export function FileCompressor(file: File) {
  imageCompression(file, options);
  if (file.size > 512 * 1024)
    return {
      error: true,
      message: "File is too big after compression, Try a smaller image",
    };
}
