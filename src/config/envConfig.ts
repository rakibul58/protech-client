const envConfig = {
  baseApi: process.env.NEXT_PUBLIC_BASE_API_PROD,
  baseApiDev: process.env.NEXT_PUBLIC_BASE_API_DEV,
  cloudinaryPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
  cloudinaryURI: process.env.NEXT_PUBLIC_CLOUDINARY_URI,
};

export default envConfig;
