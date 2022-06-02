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
        faded_red: "#FFECEB",
        faded_yellow: "#FFF3E6",
        red: "#ed1c24",
        peach: "#FF8168",
        transparent: "rgba(7, 13, 43, 0.75)"
      },
      fontSize: {
        tiny: ["8px", { lineHeight: "10px" }],
        xs: ["10px", { lineHeight: "12px" }],
        sm: ["12px", { lineHeight: "16px" }],
        base: ["14px", { lineHeight: "28px" }],
        lg: ["16px", { lineHeight: "26px" }],
        xl: ["18px", { lineHeight: "28px" }],
        "2xl": ["22px", { lineHeight: "32px" }],
        "3xl": ["26px", { lineHeight: "38px" }],
        "4xl": ["28px", { lineHeight: "38px" }],
        "5xl": ["34px", { lineHeight: "46px" }],
        "6xl": ["50px", { lineHeight: "60px" }],
        "7xl": ["58px", { lineHeight: "70px" }],
      },
      fontFamily: {
        'sans': ['DM Sans', 'sans-serif'] ,
        'sans-display': ['DM Serif Display', 'sans-serif'] ,
      },
      transitionProperty: {
        'width': 'width'
      },
    },
  },
  plugins: [],
}
