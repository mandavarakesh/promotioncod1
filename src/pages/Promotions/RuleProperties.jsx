import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, Box, MenuItem } from "@mui/material";
import CustomDatePicker from "../../components/CustomDatePicker";
import NumberInput from "../../components/NumberInput";

const RuleProperties = ({ data, disabledFields, onFocus = () => {} }) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const startDate = watch("startDate");

  const validateEndDate = (endDate) => {
    if (!endDate) return true;

    if (endDate <= startDate) {
      return "End date must be after the start date";
    }
    return true;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, margin: 2 }}>
      <Controller
        name="templateID"
        control={control}
        defaultValue={data?.data?.templateID}
        render={({ field }) => (
          <TextField
            {...field}
            label="Template Id"
            variant="outlined"
            disabled
          />
        )}
      />
      <TextInput
        name="promotionName"
        label="Promotion Name"
        required
        rules={{ required: "Name is required" }}
        onFocus={onFocus}
      />
      <TextInput
        name="promotionCode"
        label="Promotion Code"
        // rules={{ required: "Code is required" }}
        // disabled={disabledFields?.promotionCode}
        required={!disabledFields?.promotionCode}
        rules={{
          required: disabledFields?.promotionCode
            ? undefined
            : "Code is required",
        }}
        disabled={disabledFields?.promotionCode}
      />
      <NumberInput
        name="priority"
        defaultValue={0}
        rules={{
          required: "Version is required",
          pattern: {
            value: /^\d+$/,
            message: "Version must be a number",
          },
        }}
        label="Priority"
        control={control}
        fullWidth
        onFocus={onFocus}
      />
      <NumberInput
        name="maxRuleExecutions"
        defaultValue={1}
        rules={{
          required: "maxRuleExecutions is required",
          pattern: {
            value: /^\d+$/,
            message: "maxRuleExecutions must be a number",
          },
        }}
        label="Maximum Rule Executions"
        control={control}
        fullWidth
        onFocus={onFocus}
      />
      <Controller
        name="exclusive"
        control={control}
        defaultValue="NO"
        render={({ field }) => (
          <TextField
            {...field}
            label="Group Exclusive"
            error={!!errors.status}
            helperText={errors.status?.message}
            fullWidth
            select
          >
            <MenuItem value="YES">Yes</MenuItem>
            <MenuItem value="NO">No</MenuItem>
          </TextField>
        )}
      />
      <TextInput
        name="ruleGroupCode"
        label="Product Promotion Rule Group"
        onFocus={onFocus}
      />
      <Controller
        name="status"
        control={control}
        defaultValue="UNPUBLISHED"
        render={({ field }) => (
          <TextField
            {...field}
            label="Status"
            error={!!errors.status}
            helperText={errors.status?.message}
            fullWidth
            select
            disabled
            sx={{
              "& .MuiInputBase-root.MuiOutlinedInput-root.Mui-disabled svg": {
                display: "none",
              },
            }}
          >
            <MenuItem value="PUBLISHED">PUBLISHED</MenuItem>
            <MenuItem value="UNPUBLISHED">UNPUBLISHED</MenuItem>
          </TextField>
        )}
      />
      <NumberInput
        name="version"
        defaultValue={0}
        rules={{
          required: "Version is required",
          pattern: {
            value: /^\d+$/,
            message: "Version must be a number",
          },
        }}
        label="Version"
        control={control}
        fullWidth
        disabled
      />
      <CustomDatePicker
        control={control}
        name="startDate"
        label="Start Date"
        fullWidth
        defaultValue=""
        type="date-time"
        onFocus={onFocus}
      />
      <CustomDatePicker
        control={control}
        name="endDate"
        label="End Date"
        fullWidth
        defaultValue=""
        type="date-time"
        onFocus={onFocus}
      />
      {data?.data?.creationDate !== null && (
        <CustomDatePicker
          control={control}
          name="creationDate"
          label="Creation Date"
          fullWidth
          defaultValue={data?.creationDate}
          disabled
          type="date-time"
        />
      )}
      {data?.data?.creationDate !== null && (
        <CustomDatePicker
          control={control}
          name="modificationDate"
          label="Modification Date"
          fullWidth
          defaultValue={data?.modificationDate}
          disabled
          type="date-time"
        />
      )}
      <TextInput
        name="promotionMessage"
        label="Promotion Message"
        rows={3}
        onFocus={onFocus}
      />
    </Box>
  );
};

export const TextInput = ({
  name,
  defaultValue,
  label,
  disabled,
  rules,
  required,
  rows,
  onFocus = () => {},
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      rules={rules}
      defaultValue={defaultValue ?? ""}
      render={({
        field: { value, onChange, ...rest },
        fieldState: { error },
      }) => {
        return (
          <TextField
            {...rest}
            label={label}
            required={required}
            value={value || ""}
            error={!!error}
            helperText={error?.message}
            fullWidth
            disabled={disabled}
            rows={rows}
            multiline
            onChange={(_event) => {
              onChange(_event.target.value);
              onFocus();
            }}
          />
        );
      }}
    />
  );
};

export default RuleProperties;
