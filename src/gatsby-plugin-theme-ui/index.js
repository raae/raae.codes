const colors = {
  text: "#412f20",
  background: "#fffaf0",
  primary: "#ff1616",
  secondary: "#ffde59",
};

export default {
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
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    display:
      'Shrikhand, Garamond, "Apple Garamond", "ITC Garamond Narrow", "New Century Schoolbook", "Century Schoolbook", "Century Schoolbook L", Georgia, serif;',
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
    bold: 700,
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
  styles: {
    root: {
      "@font-face": {
        fontFamily: "Shrikhand",
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
        "-webkit-text-fill-color": colors.secondary,
        "-webkit-text-stroke-width": "0.003em",
        "-webkit-text-stroke-color": colors.primary,
        fontFamily: "display",
        lineHeight: "display",
        fontWeight: "display",
        fontSize: "calc(150% + 2vw)",
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
