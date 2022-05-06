module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
