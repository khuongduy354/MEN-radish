import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "sample",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});
export { cloudinary };
