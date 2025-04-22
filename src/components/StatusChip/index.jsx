import { Chip } from "@mui/material";
import React from "react";
import { STATUS } from "../../constants";

const StatusChip = ({ value }) => {
  if (!STATUS[value]) return <span>-</span>;
  return (
    <Chip
      sx={{
        "& .MuiChip-label": {
          fontWeight: 700,
          fontSize: 12,
        },
      }}
      variant="outlined"
      label={STATUS[value]?.message}
      color={STATUS[value]?.color}
      size="small"
    />
  );
};

export default StatusChip;
