import React from "react";

const PreloadFont = () => {
  return (
    <link
      rel="preload"
      href="/fonts/shrikhand/Shrikhand-Regular.otf"
      crossorigin="anonymous"
      as="font"
      type="font/otf"
    />
  );
};

const onRenderBody = ({ setHeadComponents }) => {
  return setHeadComponents([PreloadFont()]);
};

export { onRenderBody };
