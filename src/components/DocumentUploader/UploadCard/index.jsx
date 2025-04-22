import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import CancelIcon from "@mui/icons-material/Cancel";

const UploadCard = ({
  fileSize,
  uploadProgress,
  onCancelUpload,
  onDownload,
  label,
  disabled,
  isDownloadDisabled,
}) => {
  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    if (uploadProgress === 100) {
      const timeout = setTimeout(() => {
        setShowProgress(false);
      }, 2000);

      return () => clearTimeout(timeout);
    } else {
      setShowProgress(false);
    }
  }, [uploadProgress]);

  const handleDownload = () => {
    onDownload();
  };
  return (
    <>
      <Stack direction="row">
        <Box width="400px" height="100px" borderRadius="8px">
          <Paper elevation={5} sx={{ height: "100%" }}>
            <Stack
              direction="row"
              sx={{ height: "100%", alignItems: "center", p: "10px" }}
            >
              <UploadFileIcon
                sx={{
                  pointerEvents: disabled ? "none" : "",
                  opacity: disabled ? "0.5" : "1",
                }}
              />
              <Box
                pl="20px"
                height="100%"
                width="90%"
                sx={{
                  pointerEvents: disabled ? "none" : "",
                  opacity: disabled ? "0.5" : "1",
                }}
              >
                <Stack direction="column" height="100%" gap={1}>
                  <Typography>{label}</Typography>
                  <Stack direction="row" spacing={6}>
                    {fileSize ? (
                      <Typography whiteSpace='nowrap' variant="caption" data-testid="file-size">
                        {fileSize}
                      </Typography>
                    ) : undefined}
                    {showProgress ? (
                      <Typography
                        variant="caption"
                        data-testid="progress-status"
                      >
                        {uploadProgress}% completed
                      </Typography>
                    ) : (
                      <Typography  variant="caption" data-testid="upload-status">
                        Status: Success
                      </Typography>
                    )}
                  </Stack>
                  {showProgress && <LinearProgress value={uploadProgress} />}
                </Stack>
              </Box>
              {!showProgress && (
                <>
                  <IconButton
                    disabled={disabled}
                    onClick={onCancelUpload}
                    data-testid="cancel-button"
                  >
                    <CancelIcon />
                  </IconButton>
                  <IconButton
                    disabled={disabled && !isDownloadDisabled}
                    onClick={handleDownload}
                    data-testid="download-button"
                  >
                    <DownloadIcon />
                  </IconButton>
                </>
              )}
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </>
  );
};

export default UploadCard;
