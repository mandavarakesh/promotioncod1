import {
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import RuleProperties from "./RuleProperties";
import Conditions from "./Conditions";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import TabPanel, { a11yProps } from "../../components/TabPanel";
import { useMutation, useQuery } from "@tanstack/react-query";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import CustomButton from "../../components/CustomButton";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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
const templateOption = (item) => ({
  title: item?.templateName,
  value: item?.templateID,
});
const Promotions = () => {
  const [selectedItems, setSelectedItems] = useState({
    conditions: [],
    actions: [],
  });

  const { id: editId } = useParams();
  const location = useLocation();

  const isEditMode = location.pathname.includes("edit-promotion");
  const [value, setValue] = useState("rule-properties");
  const defaultValues = {
    template: "",
  };

  const { control, handleSubmit, watch, reset } = useForm({ defaultValues });
  const formMethods = useForm({ mode: "onChange" });

  const [loading, setLoading] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();
  const {
    mutate,
    isLoading: tempLoading,
    data,
  } = useMutation({
    mutationFn: (variables) => {
      return axios.get(
        `http://localhost:8081/templates/template/${variables.template}`
      );
    },
  });

  useEffect(() => {
    if (data) {
      setSelectedTemplate(data?.data);
    }
  }, [data]);

  const {
    data: tempList,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: isEditMode ? [editId] : ["PROMOTION_LIST"],
    queryFn: () =>
      isEditMode
        ? axios.get(`http://localhost:8081/templates/template/${editId}`)
        : axios.get("http://localhost:8081/templates/get-all"),
    select: (response) => response.data,
    refetchOnMount: true,
  });

  const options = tempList?.map(templateOption) ?? [];

  const onSubmit = async (data) => {
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
      exclusive,
      ruleGroupCode,
      ...dynamicFields
    } = data;

    const ruleGroupData = {
      exclusive,
      ruleGroupCode,
    };

    console.log(data, "data at onSubmit");

    const payload = {
      templateID,
      status,
      version,
      priority,
      startDate,
      endDate,
      promotionName,
      updating: "false",
      code: promotionCode,
      promotionMessage,
      maxRuleExecutions,
      // groupExclusive,
      // productPromotionRuleGroup,
      ruleGroupData,
      conditions: extractFormFields(dynamicFields.conditions, "condition_id"),
      actions: extractFormFields(dynamicFields.actions, "action_id"),
    };

    localStorage.setItem("promotionCode", data.promotionCode);
    localStorage.setItem("promotionVersion", data.version);

    console.log(payload, "Form Submission Payload");

    try {
      const response = await axios.post(
        "http://localhost:8081/createPromotion",
        payload
      );
      console.log(status, "status");
      console.log("Form submission successful:", response.data);
      showSnackbar("Promotion created successfully", "success");
      // setIsCreated(true);
      setIsPublished(true);
      // navigate("/promotions/all-promotions");
      setFormSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
      showSnackbar("Failed to create template. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const onPromoSubmit = (data) => {
    setSelectedTemplate({});
    mutate(data, {
      onSuccess: () => {
        formMethods.reset({});
        setValue("rule-properties");
        setSelectedItems({
          conditions: [],
          actions: [],
        });
      },
    });
  };

  const handleTabChange = async (event, tab) => {
    const isValid = await formMethods.trigger();

    if (isValid) {
      setValue(tab);
    } else {
      showSnackbar("Please fill out all required fields.");
    }
  };

  const handleCancel = () => {
    reset(defaultValues);
    navigate("/promotions/promotion-templates");
    setSelectedTemplate({});
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

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PageHeader header="Promotion Templates" />
        </Box>
        <Box>
          <Paper
            component="form"
            onSubmit={handleSubmit(onPromoSubmit)}
            sx={{ padding: "24px 16px 16px 16px" }}
          >
            <CustomAutocomplete
              label="Select Promotion Template"
              placeholder={"Please Select a Template"}
              name="template"
              control={control}
              options={options}
              disabled={isLoading || isFetching}
              loading={isLoading || isFetching}
            />
            <Box sx={{ pt: 2 }}>
              <CustomButton
                title="Create Template"
                disabled={!watch("template") || tempLoading}
                loading={tempLoading}
              />
            </Box>
          </Paper>
        </Box>
        <Box sx={{ paddingTop: 1 }}>
          {Object.keys(selectedTemplate).length > 0 && (
            <>
              <Box
                sx={{
                  paddingTop: 1,
                  paddingRight: 1,
                  float: "right",
                }}
              >
                <CustomButton
                  title="Cancel"
                  loading={isLoading || isFetching}
                  onClick={handleCancel}
                />
              </Box>
              <Paper sx={{ p: 1 }}>
                <Box>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleTabChange}>
                      {tabsTitle?.map((title, index) => {
                        return (
                          <Tab
                            key={index}
                            label={
                              <Typography
                                sx={{ fontSize: "14px", fontWeight: "900" }}
                              >
                                {title?.label?.toUpperCase()}
                              </Typography>
                            }
                            value={title?.value}
                            {...a11yProps(index)}
                          />
                        );
                      })}
                    </Tabs>
                  </Box>
                  {tabsTitle?.map((tab, index) => (
                    <TabPanel value={value} index={tab.value} key={index}>
                      <FormProvider {...formMethods}>
                        <form
                          noValidate
                          autoComplete="off"
                          onSubmit={formMethods.handleSubmit(onSubmit)}
                        >
                          {value === "rule-properties" && (
                            <RuleProperties
                              data={data}
                              disabledFields={{
                                promotionCode: false,
                              }}
                            />
                          )}
                          {value === "conditions-actions" && (
                            <Conditions
                              selectedItems={selectedItems}
                              setSelectedItems={setSelectedItems}
                              selectedTemplate={selectedTemplate}
                              isPublished={isPublished}
                              promotionCode={localStorage.getItem(
                                "promotionCode"
                              )}
                              promotionVersion={localStorage.getItem(
                                "promotionVersion"
                              )}
                              updating={false}
                              formSubmitted={formSubmitted}
                            />
                          )}
                        </form>
                      </FormProvider>
                    </TabPanel>
                  ))}
                </Box>
              </Paper>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default Promotions;
