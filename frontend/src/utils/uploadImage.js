export const uploadImageToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.NEXT_PUBLIC_PRESET);
  data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    { method: "POST", body: data }
  );

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  const result = await res.json();
  return result.secure_url;
};
