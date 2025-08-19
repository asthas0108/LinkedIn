export const uploadImageToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.NEXT_PUBLIC_PRESET);
  data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);

  let resourceType = file.type.startsWith("video") ? "video" : "image";

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/${resourceType}/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const result = await res.json();
  return {
    url: result.secure_url,
    fileType: resourceType,
  };
};
