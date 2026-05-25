/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#121821",
        nori: "#0f2f2b",
        tuna: "#f25767",
        salmon: "#ff825c",
        yuzu: "#f6c453",
        wasabi: "#79b84a",
        rice: "#fff8ec",
        wave: "#2ec4b6"
      },
      boxShadow: {
        panel: "0 18px 44px rgba(18, 24, 33, 0.12)"
      }
    }
  },
  plugins: []
};
