import React from "react";
import { LinearProgress, linearProgressClasses, styled } from "@mui/material";

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 4,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
  },
}));

const BorderLinearProgress = ({ loading }) => {
  if (loading) {
    return <StyledLinearProgress />;
  }
  return null;
};

export default BorderLinearProgress;
