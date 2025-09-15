"use server";
import { createClient } from "../supabase/server";

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
  // file returns the name of the file being uploaded eg image.png, pics.jpeg

  if (!file)
    return {
      error: true,
      message: "No file uploaded",
    };

  // Original Extension (ie png,jpeg) will be retained
  // File name will be generated
  // in as much as we are generating a random file name, we still want to retain the original file extension eg png, jpeg. this is important as it helps the browser to know how to handle the file.
  const FileExt = file.name.split(".").pop();
  // we first split the file name ie convert the string into an array wherever it sees a seperator which is dot(.) in this case. Eg image.png will be converted to['image', 'png'].
  // then we use pop() to get the last element of the array which is the file extension ie png. pop removes the last element from an array and returns that element
  const fileName = `${Math.random()}.${FileExt}`;
  // Math.random() generates a random number between 0 and 1. we are using it to generate a random file name to prevent overwriting of files with the same name
  const { error } = await supabase.storage
    .from("Avatars")
    .upload(fileName, file);
  if (error) return { error: true, message: "Error uploading the file" };

  // Removing the old file
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError)
    return { error: true, message: "Something went wrong,try again" };

  const avatar = userData.user.user_metadata.avatar;
  if (avatar) {
    const { error } = await supabase.storage.from("Avatars").remove([avatar]);
    // The above line of code is used to remove the previous avatar whenever an avatar is uploaded

    if (error)
      return {
        error: true,
        message: "Error uploading the file",
      };
  }
  const { error: dataUpdateError } = await supabase.auth.updateUser({
    data: { avatar: fileName },
    // This supabase function updates the properties of the logged in user. In this case it updates the metadata of the user to include the avatar file name
  });
  if (dataUpdateError)
    return { error: true, message: "Error while updating user data" };

  return { error: false, message: "Avatar uploaded successfully" };
}
