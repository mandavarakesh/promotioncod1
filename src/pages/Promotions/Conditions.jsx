import React, { useState } from "react";
import ConditionActionHandler from "./ConditionActionHandler";
import { Box, Stack } from "@mui/material";
import PublishButton from "./PublishButton";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";

const Conditions = ({
  selectedItems,
  setSelectedItems,
  selectedTemplate,
  promotionCode,
  promotionVersion,
  updating,
  onFocus = () => {},
  refreshDisabled,
  formSubmitted,
}) => {
  const [saveClicked, setSaveClicked] = useState(false);
  const conditionFields = selectedTemplate?.conditionFields ?? [];
  const actionFields = selectedTemplate?.actionFields ?? [];
  const navigate = useNavigate();
  const isSubmitDisabled =
    selectedItems?.conditions?.length === 0 ||
    selectedItems?.actions?.length === 0 ||
    formSubmitted;

  const handleSaveClick = () => {
    setSaveClicked(true);
  };

  const handleListClick = () => {
    navigate("/promotions/all-promotions");
  };

  return (
    <Stack spacing={4}>
      <ConditionActionHandler
        id="conditions"
        title="Conditions"
        whichForm="conditionId"
        subTitle="Available Conditions"
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        fields={conditionFields}
        onFocus={onFocus}
      />
      <ConditionActionHandler
        id="actions"
        title="Actions"
        whichForm="actionId"
        subTitle="Available Actions"
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        fields={actionFields}
        onFocus={onFocus}
      />
      <Box sx={{ display: "flex", gap: "20px" }}>
        <CustomButton
          type="submit"
          onClick={updating === false && handleSaveClick}
          disabled={updating === true ? refreshDisabled : isSubmitDisabled}
          // loading={mutation?.isLoading}
          title={updating === true ? "Save" : "Create"}
        />
        <PublishButton
          code={promotionCode}
          version={promotionVersion}
          disableCondition={!saveClicked}
          updating={updating}
        />
        {updating === false && (
          <CustomButton
            type="button"
            onClick={handleListClick}
            disabled={!saveClicked}
            // loading={mutation?.isLoading}
            title={"Promotions List"}
          />
        )}
      </Box>
    </Stack>
  );
};

export default Conditions;
