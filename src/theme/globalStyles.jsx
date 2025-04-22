// @mui
import { GlobalStyles as MUIGlobalStyles } from "@mui/material";

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  return (
    <MUIGlobalStyles
      styles={{
        "*": {
          boxSizing: "border-box",
        },
        html: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        body: {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          letterSpacing: "0.05rem",
        },
        "#root": {
          width: "100%",
          height: "100%",
        },
        img: {
          display: "block",
          maxWidth: "100%",
        },
        ul: {
          margin: 0,
          padding: 0,
        },
        a: {
          textDecoration: "none",
          color: "inherit",
        },
      }}
    />
  );
}
