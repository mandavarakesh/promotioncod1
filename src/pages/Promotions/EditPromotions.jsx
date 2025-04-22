import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../components/PageHeader";
import RuleProperties from "./RuleProperties";
import Conditions from "./Conditions";
import { a11yProps } from "../../components/TabPanel";
import { extractFormFields } from "./promotionUtils";
import { useSnackbar } from "./SnackbarProvider";
import PageLoader from "../../components/PageLoader";

const tabsTitle = [
  {
    label: "Rule Properties",
    value: "rule-properties",
  },
  {
    label: "Conditions & Actions",
    value: "conditions-actions",
  },
];

const EditPromotions = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState({
    conditions: [],
    actions: [],
  });
  const [tabValue, setTabValue] = useState("rule-properties");
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [refreshDisabled, setRefreshDisabled] = useState(true);

  const methods = useForm({ defaultValues: {} });
  const {
    handleSubmit,
    resetField,
    reset,
    formState: { isDirty },
  } = methods;
  const code = searchParams.get("code") ?? "";
  const version = searchParams.get("version") ?? "";
  const templateID = searchParams.get("templateId") ?? "";

  const { data, isLoading, isError, value } = useQuery({
    queryKey: ["editPromotion", templateID, code, version],
    queryFn: () =>
      axios.post(`http://localhost:8081/edit-promotion`, {
        templateID,
        code,
        version,
      }),
    select: (response) => response.data,
    refetchOnMount: true,
  });

  const selectedTemplate = data ?? {};

  useEffect(() => {
    if (Object.keys(selectedTemplate).length > 0) {
      const { conditionFields, actionFields, ...promotionData } = data;

      Object.keys(promotionData).forEach((key) => {
        resetField(key, {
          defaultValue: promotionData[key],
        });
      });

      setSelectedItems({
        conditions: conditionFields || [],
        actions: actionFields || [],
      });
    }
  }, [data, resetField]);

  const onFocus = () => {
    setRefreshDisabled(false);
  };

  const handleRefresh = () => {
    reset();
    setTabValue("rule-properties");
    setRefreshDisabled(true);
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    const {
      templateID,
      status,
      version,
      priority,
      startDate,
      endDate,
      promotionMessage,
      promotionName,
      promotionCode,
      updating,
      maxRuleExecutions,
      // groupExclusive,
      // productPromotionRuleGroup,
      exclusive,
      ruleGroupCode,
      ...dynamicFields
    } = formData;

    const ruleGroupData = {
      exclusive,
      ruleGroupCode,
    };

    const payload = {
      templateID,
      status: "UNPUBLISHED",
      version,
      priority,
      startDate,
      endDate,
      promotionMessage,
      promotionName,
      updating: "true",
      code: promotionCode,
      maxRuleExecutions,
      // groupExclusive,
      // productPromotionRuleGroup,
      ruleGroupData,
      conditions: extractFormFields(dynamicFields.conditions, "condition_id"),
      actions: extractFormFields(dynamicFields.actions, "action_id"),
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await axios.post(
        `http://localhost:8081/createPromotion`,
        payload
      );
      console.log("Form submission successful:", response.data);
      showSnackbar("Template updated successfully", "success");
      navigate("/promotions");
    } catch (error) {
      console.error("Form submission error:", error);
      showSnackbar("Failed to update template. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = async (event, newValue) => {
    const isValid = await methods.trigger();
    if (isValid) {
      setTabValue(newValue);
    } else {
      showSnackbar("Please fill out all required fields.");
    }
  };
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Box sx={{ position: "relative" }}>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 999,
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}

      <Box mx={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PageHeader header="Edit Promotion" />
          <Box sx={{ gap: "16px", display: "flex" }}>
            <Button
              onClick={() => {
                navigate("/promotions");
              }}
              // disabled={!isDirty}
            >
              Back
            </Button>
            <Button
              // onClick={() => {
              //   reset(), setTabValue("rule-properties");
              // }}
              // disabled={!isDirty}
              onClick={handleRefresh}
              disabled={refreshDisabled}
            >
              Refresh
            </Button>
          </Box>
        </Box>

        <Paper sx={{ p: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              {tabsTitle.map((title, index) => (
                <Tab
                  key={index}
                  label={
                    <Typography sx={{ fontSize: "14px", fontWeight: "900" }}>
                      {title.label.toUpperCase()}
                    </Typography>
                  }
                  value={title.value}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
          <FormProvider {...methods}>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              {tabValue === "rule-properties" && (
                <RuleProperties
                  data={data}
                  disabledFields={{
                    promotionCode: true,
                  }}
                  onFocus={onFocus}
                />
              )}
              {tabValue === "conditions-actions" && (
                <Conditions
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  selectedTemplate={selectedTemplate}
                  updating={true}
                  isDirty={isDirty}
                  setRefreshDisabled={setRefreshDisabled}
                  onFocus={onFocus}
                  refreshDisabled={refreshDisabled}
                  promotionCode={code}
                  promotionVersion={version}
                />
              )}
            </form>
          </FormProvider>
        </Paper>
      </Box>
    </Box>
  );
};

export default EditPromotions;
