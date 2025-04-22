import React from "react";
import termsAndConditions from "../../assets/terms-and-conditions.pdf";
import { Box } from "@mui/material";

const TermsAndConditions = () => {
  return (
    <Box>
      <embed
        src={termsAndConditions}
        type="application/pdf"
        width="100%"
        height={2000}
      />
    </Box>
  );
};

export default TermsAndConditions;
