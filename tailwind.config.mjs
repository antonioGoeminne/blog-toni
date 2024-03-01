/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: "#FDFEB1",
        },
        boxShadow: {
          custom: "1px 35px 60px -15px rgba(253, 254, 177, 1)",
        },
      },
    },
  },
  plugins: [],
};
