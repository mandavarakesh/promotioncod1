import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const showSnackbar = useCallback((message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        severity={severity}
        sx={{
          position: "fixed",
          borderRadius: "8px",
          // color: "#fff",
          color: "black",
          "&.MuiSnackbar-root": {
            right: "32px",
            left: "auto",
          },
          "& .MuiPaper-root.MuiSnackbarContent-root": {
            backgroundColor:
              severity === "error"
                ? "#f44336" // Red
                : severity === "success"
                ? "#4caf50" // Green
                : severity === "warning"
                ? "#ff9800" // Orange
                : "#ffa726", // Merchant color
          },
        }}
      />
    </SnackbarContext.Provider>
  );
};
