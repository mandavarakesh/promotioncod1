import React from "react";
import { Box, CircularProgress, Tooltip } from "@mui/material";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import publishIcon from "../../assets/publishIcon.png";
import { useSnackbar } from "./SnackbarProvider";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";

const publishPromotion = async ({ code, version }) => {
  const response = await axios.post("http://localhost:8081/publish-promotion", {
    code,
    version,
  });
  return response.data;
};

const PublishButton = ({
  code,
  version,
  onSuccess,
  disableCondition = false,
  updating,
  promoList,
}) => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const mutation = useMutation(publishPromotion, {
    onSuccess: () => {
      showSnackbar("Promotion published successfully", "success");
      if (onSuccess) onSuccess();
      navigate("/promotions/all-promotions");
    },
    onError: () => {
      showSnackbar("Failed to publish promotion. Please try again.", "error");
    },
  });

  const handlePublish = () => {
    mutation.mutate({ code, version });
  };

  return (
    <Tooltip
      title={disableCondition ? "" : "Publish Promotion"}
      placement="top"
    >
      <Box>
        {promoList &&
          (mutation?.isLoading ? (
            <CircularProgress
              size={20}
              style={{
                color: disableCondition ? "rgba(0, 0, 0, 0.26)" : "primary",
              }}
            />
          ) : (
            <img
              src={publishIcon}
              alt="publishIcon"
              width="20px"
              style={{
                cursor: disableCondition ? "not-allowed" : "pointer",
                opacity: disableCondition ? 0.5 : 1,
                pointerEvents: disableCondition ? "none" : "auto",
              }}
              onClick={handlePublish}
            />
          ))}
        {updating === false && (
          <CustomButton
            type="button"
            onClick={handlePublish}
            disabled={disableCondition}
            loading={mutation?.isLoading}
            title={"Publish"}
          />
        )}
      </Box>
    </Tooltip>
  );
};

export default PublishButton;
