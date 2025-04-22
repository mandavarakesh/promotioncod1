import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useRef } from "react";

export default function PopOver({ Component, content, isLoading = false }) {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const ref = useRef();
  const handleClick = () => {
    setAnchorEl(true);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (anchorEl && ref.current && !ref.current.contains(e.target)) {
        setAnchorEl(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [anchorEl]);

  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <Component
          onClick={handleClick}
          data-testid="popover"
          isLoading={isLoading}
        />
        {anchorEl && (
          <Box
            sx={{
              backgroundColor: "#ffff",
              border: "1px solid #fff",
              position: "absolute",
              zIndex: "999",
              borderRadius: "6px",
              right: "0%",
              background: "#FFF",
              boxShadow: "0px 3.79147px 3.79147px 0px rgba(0, 0, 0, 0.25)",
            }}
            data-testis="popover-content"
          >
            {content}
          </Box>
        )}
      </Box>
    </>
  );
}
