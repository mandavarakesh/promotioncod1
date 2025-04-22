import React from "react";
import { Dialog, DialogTitle, IconButton, Typography } from "@mui/material";
import styled from "@emotion/styled";
import CancelIcon from "@mui/icons-material/Cancel";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  boxShadow: theme.customShadows.dialog,
}));

function BootstrapDialogTitle(props) {
  const { children, showCloseIcon, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      <Typography fontSize="1.2rem" fontWeight="700">
        {children}
      </Typography>
      {showCloseIcon ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CancelIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const DialogBox = ({
  open,
  setOpen,
  children,
  showCloseIcon = true,
  title,
  ...other
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...other}
    >
      <BootstrapDialogTitle
        showCloseIcon={showCloseIcon}
        id="customized-dialog-title"
        onClose={handleClose}
      >
        {title}
      </BootstrapDialogTitle>
      {children}
    </BootstrapDialog>
  );
};

export default DialogBox;
