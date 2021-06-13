import React from "react";
import { Box } from "theme-ui";

export const Avatar = (props) => {
  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        display: "block",
        borderRadius: "50%",
        backgroundColor: "secondary",
      }}
    />
  );
};
