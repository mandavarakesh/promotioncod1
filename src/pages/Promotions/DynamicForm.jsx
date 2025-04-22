import { TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomDatePicker from "../../components/CustomDatePicker";
import CustomAutocomplete from "../../components/CustomAutocomplete";

const DynamicForm = ({ field, itemName, onFocus }) => {
  const {
    fieldType,
    linkedOperator,
    name,
    required,
    options,
    validationPattern,
    validationMessage,
    value = "",
    fieldId,
  } = field;

  const { control, watch } = useFormContext();
  const fieldName = itemName ? `${itemName}.${fieldId}` : fieldId;
  const modifiedFieldName = linkedOperator
    ? `${fieldName}.${linkedOperator}`
    : fieldName;

  const validations = () => {
    let rules = {};

    if (required) {
      rules.required = {
        value: true,
        message: "This field is required",
      };
    }

    if (fieldType === "text" && validationPattern) {
      rules.pattern = {
        value: new RegExp(validationPattern),
        message: validationMessage,
      };
    }

    if (fieldType === "date") {
      rules.validate = {
        startDateNotGreaterThanEndDate: (value) => {
          const endDate = watch("endDate");
          if (value && endDate && new Date(value) > new Date(endDate)) {
            return "Start date should not be greater than end date";
          }
          return true;
        },
        endDateNotLessThanStartDate: (value) => {
          const startDate = watch("startDate");
          if (value && startDate && new Date(value) < new Date(startDate)) {
            return "End date should not be less than start date";
          }
          return true;
        },
      };
    }

    return rules;
  };

  const modifiedRules = validations();

  const parseValue = (value) => {
    const parsedValue = Number(value);
    if (!isNaN(parsedValue) && isFinite(parsedValue)) {
      return parsedValue;
    }
    return undefined;
  };
  switch (fieldType) {
    case "List":
    case "String":
      return (
        <Controller
          name={modifiedFieldName}
          control={control}
          rules={modifiedRules}
          defaultValue={value}
          render={({
            field: { ref, value, onChange, ...rest },
            fieldState: { error },
          }) => (
            <TextField
              {...rest}
              value={value ?? ""}
              inputRef={ref}
              label={name}
              required={required}
              error={!!error}
              helperText={error?.message}
              onChange={(_event) => {
                onChange(_event.target.value);
                onFocus();
              }}
            />
          )}
        />
      );

    case "Integer":
      return (
        <Controller
          name={modifiedFieldName}
          control={control}
          rules={modifiedRules}
          defaultValue={value}
          render={({
            field: { ref, value, ...rest },
            fieldState: { error },
          }) => (
            <TextField
              {...rest}
              value={value ?? ""}
              inputRef={ref}
              label={name}
              required={required}
              error={!!error}
              helperText={error?.message}
              onChange={(e) => {
                const parsedValue = parseValue(e.target.value);
                rest.onChange(parsedValue);
                onFocus();
              }}
            />
          )}
        />
      );

    case "Enum":
      return (
        <CustomAutocomplete
          label={name}
          name={modifiedFieldName}
          control={control}
          rules={modifiedRules}
          options={options.map((item) => ({
            title: item?.name,
            value: item.value,
          }))}
          required={required}
          defaultValue={value}
          onFocus={onFocus}
        />
      );

    case "Boolean":
      return (
        <CustomAutocomplete
          label={name}
          name={modifiedFieldName}
          control={control}
          defaultValue={value}
          rules={modifiedRules}
          options={[
            { title: "Yes", value: "true" },
            { title: "No", value: "false" },
          ]}
          required={required}
          onFocus={onFocus}
        />
      );

    case "date":
      return (
        <CustomDatePicker
          name={modifiedFieldName}
          label={name}
          control={control}
          rules={modifiedRules}
          required={required}
          defaultValue={value}
          onFocus={onFocus}
        />
      );

    case "Double":
      return (
        <Controller
          name={modifiedFieldName}
          control={control}
          rules={modifiedRules}
          defaultValue={value}
          render={({
            field: { ref, value, ...rest },
            fieldState: { error },
          }) => (
            <TextField
              {...rest}
              style={{ width: "100%" }}
              type="text"
              value={value ?? ""}
              inputRef={ref}
              label={name}
              required={required}
              error={!!error}
              helperText={error?.message}
              InputProps={{
                inputMode: "decimal",
                pattern: "^\\d*\\.?\\d*$",
              }}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^-?\d*\.?\d*$/.test(inputValue)) {
                  rest.onChange(inputValue === "" ? null : inputValue);
                }
                onFocus();
              }}
              onBlur={(e) => {
                const formattedValue = parseFloat(value ?? 0).toFixed(2);
                rest.onChange(parseFloat(formattedValue));
              }}
              onMouseEnter={(e) => {
                e.target.focus();
              }}
            />
          )}
        />
      );

    default:
      return null;
  }
};

export default DynamicForm;
