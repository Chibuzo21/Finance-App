"use server";
import { createClient } from "../supabase/server";
import sharp from "sharp";
import crypto from "crypto";

type initialState = {
  message: string;
  error: boolean;
};

export async function uploadAvatar(
  prevState: initialState,
  formData: FormData
) {
  const supabase = await createClient();
  const file = formData.get("file") as File | null;

  if (!file) return { error: true, message: "No file uploaded" };

  // Normalize extension
  const ext = file.name.split(".").pop()?.toLowerCase();
  const outputFormat = ext === "png" ? "png" : "jpeg";
  const fileName = `${crypto.randomUUID()}.${outputFormat}`;

  // Convert File → Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Resize & compress
  const compressedBuffer = await sharp(buffer)
    .resize(512, 512, { fit: "inside" })
    .toFormat(outputFormat, { quality: 80 })
    .toBuffer();

  // Check file size (512 KB max)
  if (compressedBuffer.length > 512 * 1024) {
    return { error: true, message: "File is too big after compression" };
  }
  const contentType = outputFormat === "png" ? "image/png" : "image/jpeg";
  // Upload
  const { error: uploadError } = await supabase.storage
    .from("Avatars")
    .upload(fileName, compressedBuffer, { contentType, upsert: true });

  if (uploadError) return { error: true, message: uploadError.message };

  // Get user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) return { error: true, message: userError.message };

  // Remove old avatar
  const oldAvatar = userData.user.user_metadata.avatar;
  if (oldAvatar) {
    await supabase.storage.from("Avatars").remove([oldAvatar]);
  }

  // Update user metadata
  const { error: updateError } = await supabase.auth.updateUser({
    data: { avatar: fileName },
  });
  if (updateError) return { error: true, message: updateError.message };

  return { error: false, message: "Avatar uploaded successfully" };
}
