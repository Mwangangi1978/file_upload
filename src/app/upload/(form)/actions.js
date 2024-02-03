"use server";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY,
  },
});


async function uploadFileToS3(file, fileName) {
  let contentType;

  // Determine the content type based on the file extension
  if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
    contentType = "image/jpeg";
  } else if (fileName.endsWith(".png")) {
    contentType = "image/png";
  } else if (fileName.endsWith(".mp4")) {
    contentType = "video/mp4";
  } else {
    // Default to a generic binary file
    contentType = "application/octet-stream";
  }

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: contentType,
    ContentDisposition: 'inline'
  };

  const command = new PutObjectCommand(params);
  try {
    const response = await s3Client.send(command);
    console.log("File uploaded successfully:", response);
    return fileName;
  } catch (error) {
    throw error;
  }
}

export async function uploadFile(prevState, formData) {
  try {
    const file = formData.get("file");

    if (file.size === 0) {
      return { status: "error", message: "Please select a file." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadFileToS3(buffer, file.name);

    revalidatePath("/");
    return { status: "success", message: "File has been uploaded." };
  } catch (error) {
    return { status: "error", message: "Failed to upload file." };
  }
}