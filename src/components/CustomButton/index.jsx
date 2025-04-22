import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";

const CustomButton = ({
  disabled,
  loading,
  icon,
  title,
  type,
  testId = "",
  sx,
  ...restProps
}) => {
  return (
    <Button
      type={type ? type : "submit"}
      disabled={disabled || loading}
      startIcon={icon}
      data-testid={testId}
      {...restProps}
      sx={{
        ...sx,
        ".MuiButton-startIcon": {
          color: loading ? "transparent" : "inherit",
        },
      }}
    >
      {loading && (
        <Box
          sx={{
            display: "inherit",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <CircularProgress
            size={25}
            sx={{
              position: "relative",
              display: "inline-flex",
              WebkitBoxAlign: "center",
              alignItems: "center",
              WebkitBoxPack: "center",
              justifyContent: "center",
            }}
          />
        </Box>
      )}
      <Box sx={{ color: loading ? "transparent" : "inherit" }} component="span">
        {title}
      </Box>
    </Button>
  );
};

export default CustomButton;
