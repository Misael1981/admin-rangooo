"use server";

export async function uploadToCloudinary(file: File) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const base64Data = `data:${file.type};base64,${base64}`;

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", base64Data);
    cloudinaryFormData.append(
      "upload_preset",
      process.env.CLOUDINARY_UPLOAD_PRESET!,
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: cloudinaryFormData,
      },
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return { url: data.secure_url, publicId: data.public_id };
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}
