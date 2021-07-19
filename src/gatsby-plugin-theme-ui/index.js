const colors = {
  text: "#412f20",
  background: "#fffaf0",
  primary: "#ff1616",
  secondary: "#ffde59",
};

const theme = {
  space: [
    "0rem",
    "0.25rem",
    "0.5rem",
    "1rem",
    "2rem",
    "4rem",
    "8rem",
    "16rem",
    "32rem",
    "64rem",
  ],
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    display:
      '"Shrikhand", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    monospace: "Menlo, monospace",
  },
  fontSizes: [
    "0.512rem",
    "0.64rem",
    "0.8rem",
    "1rem",
    "calc(100% + 0.5vw)",
    "calc(110% + 0.75vw)",
    "calc(120% + 1vw)",
    "calc(130% + 1.5vw)",
  ],
  fontWeights: {
    body: 400,
    heading: 900,
    display: 900,
    medium: 600,
    bold: 800,
    thick: 900,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
    display: 0.9,
  },
  sizes: {
    body: "50ch",
    main: "80ch",
  },
  colors: colors,
  layout: {
    main: {
      marginTop: "10vmax",
      marginBottom: "10vmax",
      padding: "0 5vw",
      maxWidth: "main",
      overflowX: "hidden",
    },
  },
  buttons: {
    primary: {
      backgroundColor: "transparent",
      borderColor: "primary",
      borderStyle: "solid",
      borderWidth: "2px",
      transition: ".2s linear all",
      color: "primary",
      fontWeight: "bold",
      "&:hover": {
        opacity: 0.8,
        backgroundColor: "primary",
        color: "white",
      },
      "&:active": {
        borderColor: "transparent",
      },
      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.5,
      },
    },
  },
  forms: {
    label: {
      fontSize: 2,
      fontWeight: "bold",
    },
    input: {
      borderColor: "text",
      borderWidth: "2px",
      "&:focus": {
        borderColor: "primary",
        outline: "none",
      },
    },
    checkbox: {
      color: "text",
    },
  },
  styles: {
    root: {
      "@font-face": {
        fontFamily: "Shrikhand",
        fontDisplay: "block",
        src: `url("/fonts/shrikhand/Shrikhand-Regular.otf")`,
      },
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      fontSize: "calc(112.5% + 0.25vw)",
    },
    h1: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 7,
      "&:first-child": {
        color: "primary",
        "-webkit-text-fill-color": colors.secondary,
        "-webkit-text-stroke-width": "thin",
        "-webkit-text-stroke-color": colors.primary,
        fontFamily: "display",
        lineHeight: "display",
        fontWeight: "display",
        fontSize: "calc(100% + 2.5vw)",
        marginBottom: 5,
      },
    },
    h2: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 6,
      marginTop: 5,
    },
    h3: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 5,
    },
    h4: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 4,
    },
    h5: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 3,
    },
    h6: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 2,
    },
    p: {
      color: "text",
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      maxWidth: "body",
    },
    a: {
      color: "primary",
      fontWeight: "medium",
      borderRadius: "3px",
      padding: "0.1em 0.3em",
      "&:hover": {
        backgroundColor: "secondary",
        textDecoration: "none",
      },
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    img: {
      maxWidth: "100%",
      marginTop: 3,
      marginBottom: 3,
    },
    hr: {
      borderTop: "4px solid",
      borderColor: "secondary",
      opacity: "0.7",
      marginTop: 5,
      marginBottom: 5,
      maxWidth: "body",
      marginLeft: 0,
    },
    ".gatsby-resp-iframe-wrapper": {
      borderStyle: "solid",
      borderWidth: "3vw",
      borderTopWidth: "max(3vw, 5vh)",
      borderBottomWidth: "max(3vw, 5vh)",
      borderColor: "secondary",
      borderRadius: "0.5vw",
      marginTop: 4,
      marginBottom: 4,
      marginLeft: "-5.5vw",
      marginRight: "-5.5vw",
    },
  },
};

export default theme;
