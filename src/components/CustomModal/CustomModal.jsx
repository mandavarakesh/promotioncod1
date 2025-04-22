const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: " none",
  boxShadow: 24,
  p: 2,
}

import * as React from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"

import CancelIcon from "@mui/icons-material/Cancel"
import { Typography } from "@mui/material"

export default function CustomModal({
  open,
  handleClose,
  width = "773px",
  height = "auto",
  ModalTitle,
  Content,
  showCloseIcon = true,
  isBackdrop = false,
}) {
  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={() => {
          if (!isBackdrop) {
            handleClose()
          }
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        disableAutoFocus={true}
      >
        <Fade in={open}>
          <Box
            sx={{
              ...style,

              width: width,
              height: height,
              borderRadius: "8px",
              background: "#FFF",

              boxShadow:
                "0px 11px 15px -7px rgba(0, 0, 0, 0.20), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "6px 8px 0px 8px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 700,
                }}
              >
                {ModalTitle}
              </Typography>

              {showCloseIcon && (
                <CancelIcon
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleClose()}
                />
              )}
            </Box>

            <Box sx={{ overflow: "auto" }}>{Content}</Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
