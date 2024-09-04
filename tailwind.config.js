module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all JavaScript/TypeScript files in the src directory
    "./public/index.html", // Scans the public index.html file
  ],
  theme: {
    extend: {
      clipPath:{
        "custom-shape":"polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
      },
         width: {
        '96': '24rem', // Example for 24rem (384px)
        '128': '32rem', // Example for 32rem (512px)
        // Add more custom widths if needed
      }
    },
  },
  plugins: [],
};
