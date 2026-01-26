/** @type {import('tailwindcss').Config} */
// Tailwind CSS v4 uses CSS-first configuration via @theme in globals.css
// This file is kept for ShadCN UI compatibility but most config is in CSS
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Theme configuration is now in globals.css using @theme
  // This minimal config is kept for tooling compatibility
}
