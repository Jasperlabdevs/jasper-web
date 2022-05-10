module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#0083FF",
        faded: "#E5F3FF",
        black: "#070D2B",
        white: "#E5E5E5",
        light_grey_text: "#A4ADC6",
        grey_text: "#8390B2",
        label_text: "#7483A9",
        dark_grey_text: "#333C52",
        border: "#E3E6ED",
        icon_background: "#C3C9DA",
      },
      fontSize: {
        tiny: ["10px", { lineHeight: "14px" }],
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "22px" }],
        lg: ["18px", { lineHeight: "26px" }],
        xl: ["22px", { lineHeight: "28px" }],
        "2xl": ["26px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "38px" }],
        "4xl": ["32px", { lineHeight: "38px" }],
        "5xl": ["38px", { lineHeight: "46px" }],
        "6xl": ["54px", { lineHeight: "60px" }],
        "7xl": ["62px", { lineHeight: "70px" }],
      },
      fontFamily: {
        'sans': ['DM Sans', 'sans-serif'] ,
        'sans-display': ['DM Serif Display', 'sans-serif'] ,
      },
    },
  },
  plugins: [],
}
