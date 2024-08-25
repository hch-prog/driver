import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.R2_REGION,
  endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToR2(file: Buffer, key: string) {
  const uploadParams = {
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
    Body: file,
  };
  const command = new PutObjectCommand(uploadParams);
  try {
    const data = await s3Client.send(command);
    return data;
  } catch (err) {
    console.log("Error", err);
    throw new Error("Error uploading file to R2");
  }
}
