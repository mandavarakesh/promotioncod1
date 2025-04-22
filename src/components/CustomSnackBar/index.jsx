import { Alert, Snackbar } from "@mui/material";
import React from "react";

const CustomSnackBar = ({ open, setOpen, message = "", isErrorMsg }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={isErrorMsg ? "error" : "success"}
        sx={{ width: "100%" }}
        icon={false}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
