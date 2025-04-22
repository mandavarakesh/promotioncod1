import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "./SnackbarProvider";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";

const publishPromotion = async ({ code, version }) => {
  const response = await axios.post("http://localhost:8081/publish-promotion", {
    code,
    version,
  });
  return response.data;
};
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
const PublishUnpublishBotton = ({
  code,
  version,
  actionType,
  onSuccess,
  disableCondition = false,
}) => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const mutation = useMutation(
    actionType === "PUBLISHED" ? unpublishPromotion : publishPromotion,
    {
      onSuccess: () => {
        showSnackbar(
          actionType === "PUBLISHED"
            ? "Promotion unpublished successfully"
            : "Promotion published successfully",
          "success"
        );
        if (onSuccess) onSuccess();
        navigate("/promotions/all-promotions");
      },
      onError: () => {
        showSnackbar(
          actionType === "PUBLISHED"
            ? "Failed to unpublish promotion. Please try again."
            : "Failed to publish promotion. Please try again.",
          "error"
        );
      },
    }
  );

  const handleAction = () => {
    mutation.mutate({ code, version });
  };

  return (
    <>
      <CustomButton
        type="button"
        onClick={handleAction}
        disabled={disableCondition}
        loading={mutation?.isLoading}
        sx={{
          backgroundColor: actionType === "PUBLISHED" && "Gray",
        }}
        title={actionType === "PUBLISHED" ? "Unpublish" : "Publish"}
      />
    </>
  );
};

export default PublishUnpublishBotton;
