import React from "react";
import { Box, CircularProgress, Tooltip } from "@mui/material";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import unpublishIcon from "../../assets/unpublishIcon.png";
import { useSnackbar } from "./SnackbarProvider";

const unpublishPromotion = async ({ code, version }) => {
  const response = await axios.post(
    "http://localhost:8081/unpublish-promotion",
    {
      code,
      version,
    }
  );
  return response.data;
};

const UnPublishButton = ({
  code,
  version,
  onSuccess,
  disableCondition = false,
}) => {
  const { showSnackbar } = useSnackbar();
  const mutation = useMutation(unpublishPromotion, {
    onSuccess: () => {
      showSnackbar("Promotion Unpublished Successfully", "success");
      if (onSuccess) onSuccess();
    },
    onError: () => {
      showSnackbar("Failed to unpublish promotion. Please try again.", "error");
    },
  });

  const handleUnpublish = () => {
    mutation.mutate({ code, version });
  };

  return (
    <Tooltip
      title={disableCondition ? "" : "Unpublish Promotion"}
      placement="top"
    >
      <Box>
        {mutation.isLoading ? (
          <CircularProgress
            size={20}
            style={{
              color: disableCondition ? "rgba(0, 0, 0, 0.26)" : "primary",
            }}
          />
        ) : (
          <img
            src={unpublishIcon}
            alt="unpublishIcon"
            width="20px"
            style={{
              cursor: disableCondition ? "not-allowed" : "pointer",
              opacity: disableCondition ? 0.5 : 1,
              pointerEvents: disableCondition ? "none" : "auto",
            }}
            onClick={handleUnpublish}
          />
        )}
      </Box>
    </Tooltip>
  );
};

export default UnPublishButton;
