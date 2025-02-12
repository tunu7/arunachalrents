/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},  // ✅ Ensure this is included
    autoprefixer: {}, // ✅ Add autoprefixer
  },
};

export default config;
