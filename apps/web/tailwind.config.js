/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      mono: ["Menlo", "Monaco", "Courier New", "monospace"],
    },
    colors: {
      button: "var(--color-button-text)",
      transparent: "transparent",
      primary: {
        1: "var(--color-primary-1)",
        2: "var(--color-primary-2)",
      },
      secondary: {
        1: "var(--color-secondary-1)",
        2: "var(--color-secondary-2)",
      },
      accent: {
        DEFAULT: "var(--color-accent)",
        secondary: "var(--color-accent-secondary)",
        hover: "var(--color-accent-hover)",
        disabled: "var(--color-accent-disabled)",
      },
      black: "#000",
    },
    spacing: {
      0: "0px",
      1: "5px",
      1.5: "6px",
      2: "10px",
      3: "15px",
      4: "20px",
      4.5: "25px",
      5: "30px",
      5.5: "35px",
      6: "40px",
      6.5: "50px",
      7: "60px",
      7.5: "65px",
      8: "75px",
      9: "80px",
      10: "90px",
      11: "100px",
      15: "150px",
      "5l": "10rem",
      "n1/2": "-50%",
      24: "24rem",
      400: "400px",
    },

    boxShadow: {
      outlineLg: "0 0 0 4pt var(--color-primary-800)",
      outlineMd: "0 0 0 2pt var(--color-primary-800)",
      outlineSm: "0 0 0 1pt var(--color-primary-800)",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0px",
      4: "4px",
      2: "2px",
    },
    extend: {
      borderRadius: {
        5: "5px",
        8: "8px",
        20: "20px",
        40: "40px",
      },
      borderColor: {
        "color-800": "var(--color-primary-2)",
      },
      outline: {
        "no-chrome": "none",
      },
      transitionTimingFunction: {
        "in-out-hard": "cubic-bezier(.77, 0, .175, 1)",
      },
      transitionDuration: {
        400: "400ms",
      },
      keyframes: {
        breathe: {
          "0%, 100%": {
            boxShadow: "0 0 20px 2px var(--color-primary-2)",
            borderColor: "var(--color-primary-2)",
          },
          "50%": {
            boxShadow: "0 0 20px 2px transparent",
            borderColor: "var(--color-primary-2)",
          },
        },
      },
      animation: {
        "breathe-slow": "breathe 5s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
