import React from "react";
import { Box, Typography } from "@mui/material";

const PageHeader = ({ header = "", ...rest }) => {
  return (
    <Box
      sx={{ display: { xs: "block", md: "block" }, mt: { xs: 0.75, md: 0 } }}
      {...rest}
    >
      <Typography
        variant="h3"
        sx={{ fontSize: "26px", fontWeight: "inherit" }}
        pb={1}
      >
        {header}
      </Typography>
    </Box>
  );
};

export default PageHeader;
