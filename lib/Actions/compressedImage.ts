"use client";
import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 0.5, // must be <=0.5MB(512kb bucket limit)
  maxWidthOrHeight: 512, // keep dimensions reasonable
  useWebWorker: true,
};

export function FileCompressor(file: File) {
  return imageCompression(file, options);
}
